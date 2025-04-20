import { Button, Col, ConfigProvider, DatePicker, Empty, Flex, Form, message, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { CalenderSVG3, LocationSVG2, SearchSVG } from "assets/jsx-svg";

import useGetHotels from "services/travel/booking/Accommodation/Queries/useGetHotels";
import dayjs from "dayjs";
// style
import "./styles.css";
import Filters from "./components/Filters";
import { useCallback, useEffect, useMemo, useState } from "react";
import HotelsResults from "./components/HotelsResults";
import useGetLocalHotels from "services/travel/accommodations/LocalHotels/Queries/useGetLocalHotels";
import SystemLocationsInput from "components/common/SystemLocationsInput";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import NationalityInput from "components/common/NationalityInput";
import { getSearchParamsAsURIComponent } from "utils/uri-params";
import RoomsTravelaresInput from "components/common/RoomsTravelaresInput";
import TurboLoadingPage from "components/common/TurboLoadingPage";
const HotlesTab = ({ setTabContent, isLocalBook = false, participants }) => {
  const [form] = useForm();
  const search = useWatch("search", form);
  const [filters, setFilters] = useState({});
  const filterFunction = useCallback(
    (data) => {
      try {
        const tempArr = data?.filter((el) => {
          let temp = true;
          if (
            filters?.debounceName &&
            !el?.name.toLowerCase().includes(filters?.debounceName.toLowerCase())
          ) {
            temp = false;
          }

          if (temp && filters?.pensions.length > 0) {
            const pensionMatch = el.pensionData.some((pension) =>
              filters?.pensions.includes(pension.id),
            );
            if (!pensionMatch) {
              temp = false;
            }
          }

          if (
            temp &&
            filters?.rates.length > 0 &&
            !filters?.rates.includes(typeof el.rate === "number" ? el?.rate : Number(el.rate || 5))
          ) {
            temp = false;
          }

          if (
            !el?.HotelCode &&
            temp &&
            filters?.accommodationTypes.length > 0 &&
            !filters?.accommodationTypes.includes(el.accommodationTypeId)
          ) {
            temp = false;
          }

          return temp;
        });

        if (data?.length !== tempArr?.lenght) {
          return tempArr;
        }
      } catch (error) {
        console.log("error >> ", error);
        return data;
      }
    },
    [filters],
  );

  const [page, setPage] = useState(1);
  const searchParams = useMemo(() => {
    return {
      arrival: dayjs(search?.arrival).format("YYYY-MM-DD"),
      departure: dayjs(search?.departure).format("YYYY-MM-DD"),
      night: Math.abs(dayjs(search?.arrival).diff(dayjs(search?.departure), "day")) + 1,
      location: search?.location,
      cityId: search?.location?.cityId,
      areaId: search?.location?.areaId,
      location: undefined,
      GuestNationality: search?.nationality,
      page: page,
      size: 10,
      rooms: search?.rooms?.map((room) => {
        return {
          ...room,
          children: Array.isArray(room?.childsAges) ? room?.childsAges?.join("-") : "",
        };
      }),
    };
  }, [search, page]);

  const localHotelsQuery = useGetLocalHotels(searchParams, {
    enabled: false,
  });

  const hotelsListQuery = useGetHotels(searchParams, {
    enabled: false,
  });

  const hotelQuery = useMemo(
    () => (isLocalBook ? localHotelsQuery : hotelsListQuery),
    [isLocalBook, localHotelsQuery, hotelsListQuery],
  );

  useEffect(() => {
    if (search?.location && search?.travelers?.adults) {
      if (isLocalBook) {
        localHotelsQuery.refetch();
      } else {
        hotelsListQuery.refetch();
      }
    }
  }, [page, isLocalBook]);

  useEffect(() => {
    if (Array.isArray(hotelQuery?.data?.rows) && hotelQuery.isSuccess) {
      if (hotelQuery?.data?.rows?.length === 0) {
        message.warning("No available rooms with this requirements");
      }
    }
  }, [hotelQuery?.data?.rows, hotelQuery.isSuccess]);

  useEffect(() => {
    if (hotelQuery?.error?.message === "Accommodation Does Not Exist") {
      message.warning("No available rooms with this requirements");
      return;
    }
    if (hotelQuery?.isError) {
      message.error("Something went wrong");
    }
  }, [hotelQuery?.isError, hotelQuery?.error]);

  useEffect(() => {
    if (hotelQuery?.isFetching) {
      setTabContent(<TurboLoadingPage height="calc(100dvh - 200px)" />);
    } else if (hotelQuery?.isSuccess && hotelQuery?.data?.rows?.length === 0) {
      setTabContent(
        <div className="mt-1 center-items" style={{ minHeight: "450px" }}>
          <Empty
            image={empty_booking_screen}
            description={
              <p>
                We don't have available <br />
                properties for your search
              </p>
            }
          />
        </div>,
      );
    } else {
      setTabContent(
        <Row className="mt-1" gutter={[16, 16]}>
          <Col lg={6} md={8} sm={24}>
            {hotelQuery?.data?.rows && (
              <Filters setFilters={setFilters} results={hotelQuery?.data?.rows} />
            )}
          </Col>
          <Col lg={18} md={16} sm={24}>
            {hotelQuery?.data?.rows?.length > 0 &&
            filterFunction(hotelQuery?.data?.rows).length === 0 ? (
              <Flex
                justify="center"
                align="center"
                className="mt-1"
                style={{ minHeight: "450px", border: "1px solid #E5E5EA", borderRadius: "8px" }}>
                <Empty description={"No results match your filters"} image={empty_booking_screen} />
              </Flex>
            ) : (
              <HotelsResults
                totalResults={hotelQuery?.data?.count}
                page={page}
                setPage={setPage}
                isLocalBook={isLocalBook}
                data={filterFunction(hotelQuery?.data?.rows)}
                queryString={`${getSearchParamsAsURIComponent({
                  ...searchParams,
                  isLocalBook,
                  participants,
                })}`}
              />
            )}
          </Col>
        </Row>,
      );
    }
  }, [
    hotelQuery?.isFetching,
    hotelQuery?.isSuccess,
    hotelQuery?.data?.count,
    hotelQuery?.data?.rows,
    filterFunction,
    page,
  ]);

  const handelFinish = () => {
    if (isLocalBook) {
      localHotelsQuery.refetch();
    } else {
      hotelsListQuery.refetch();
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            cellHeight: 20,
            cellWidth: 30,
            textHeight: 40,
          },
        },
      }}>
      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <div className="serach_block">
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={22}>
              <Row gutter={[12, 12]}>
                <Col xs={24} lg={6} md={12}>
                  <Form.Item
                    name={["search", "location"]}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject("Enter a location");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                    validateStatus={form.getFieldError("location").length ? "error" : ""}>
                    <SystemLocationsInput
                      className="w-100"
                      placeholder="Enter Location"
                      prefix={<LocationSVG2 />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={4} md={12}>
                  <Form.Item
                    name={["search", "nationality"]}
                    initialValue={"AE"}
                    rules={[{ required: true, message: "Select nationality" }]}>
                    <NationalityInput />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={4} md={12}>
                  <Form.Item
                    name={["search", "arrival"]}
                    initialValue={dayjs()}
                    rules={[{ required: true, message: "Select check in" }]}>
                    <DatePicker
                      className="w-100"
                      placeholder="Check in"
                      suffixIcon={<CalenderSVG3 />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={4} md={12}>
                  <Form.Item
                    name={["search", "departure"]}
                    initialValue={dayjs().add(1, "day")}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject("Select check out");
                          }

                          if (dayjs(value).isBefore(dayjs(search?.arrival), "day")) {
                            return Promise.reject("Can't be before check in");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <DatePicker
                      className="w-100"
                      placeholder="Check out"
                      disabledDate={(date) => {
                        return dayjs(date).isBefore(dayjs(search?.arrival), "day");
                      }}
                      suffixIcon={<CalenderSVG3 />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={6} md={12}>
                  <Form.Item
                    name={["search", "rooms"]}
                    required
                    initialValue={[{ adults: 1 }]}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value || !Array.isArray(value)) {
                            return Promise.reject("Add travelers data");
                          }

                          if (value?.length === 0) {
                            return Promise.reject("Number of rooms can't be 0");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <RoomsTravelaresInput />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={2}>
              <Button
                loading={hotelsListQuery?.isFetching}
                type="primary"
                icon={<SearchSVG color={"#FFF"} />}
                htmlType="submit"
                className="w-100 search_btn">
                Search
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </ConfigProvider>
  );
};
export default HotlesTab;
