import { Button, Col, ConfigProvider, DatePicker, Form, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { CalenderSVG3, LocationSVG2, SearchSVG } from "assets/jsx-svg";
import SystemLocationsInput from "components/common/SystemLocationsInput";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import useGetHotels from "services/travel/booking/Accommodation/Queries/useGetHotels";
import ViewRoomsSection from "./ViewRoomsSection";
import NationalityInput from "components/common/NationalityInput";
import RoomsTravelaresInput from "components/common/RoomsTravelaresInput";
import ViewRoomsHotelCard from "./ViewRoomsSection/ViewRoomsHotelCard";

const AddNewHotelModal = ({ onClose = () => {} }) => {
  const [form] = useForm();
  const search = useWatch("search", form);
  const [hotelViewRoomsId, setHotelViewRoomsId] = useState(undefined);

  const searchParams = useMemo(() => {
    return {
      arrival: dayjs(search?.dates?.[0])?.isValid()
        ? dayjs(search?.dates?.[0]).format("YYYY-MM-DD")
        : "",
      departure: dayjs(search?.dates?.[1])?.isValid()
        ? dayjs(search?.dates?.[1]).format("YYYY-MM-DD")
        : "",
      night:
        dayjs(search?.dates?.[0])?.isValid() && dayjs(search?.dates?.[1])?.isValid()
          ? Math.abs(dayjs(search?.dates?.[0]).diff(dayjs(search?.dates?.[1]), "day")) + 1
          : "",
      location: search?.location,
      cityId: search?.location?.cityId,
      areaId: search?.location?.areaId,
      location: undefined,
      GuestNationality: search?.nationality,
      page: 1,
      size: 10,
      rooms: search?.rooms?.map((room) => {
        return {
          ...room,
          children: Array.isArray(room?.childsAges) ? room?.childsAges?.join("-") : "",
        };
      }),
    };
  }, [search]);

  const hotelsListQuery = useGetHotels(searchParams, {
    enabled: false,
  });

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
      <Form
        form={form}
        hidden={Boolean(hotelViewRoomsId)}
        layout="vertical"
        onFinish={() => {
          hotelsListQuery.refetch();
          setHotelViewRoomsId(undefined);
        }}>
        <div className="serach_block">
          <Row gutter={[12, 12]}>
            <Col xs={24} md={12}>
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
                ]}>
                <SystemLocationsInput
                  className="w-100"
                  placeholder="Enter Location"
                  prefix={<LocationSVG2 />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name={["search", "nationality"]}
                initialValue={"AE"}
                rules={[{ required: true, message: "Select nationality" }]}>
                <NationalityInput />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name={["search", "dates"]}
                initialValue={[dayjs(), dayjs()?.add(1, "day")]}
                rules={[{ required: true, message: "Select check in" }]}>
                <DatePicker.RangePicker
                  className="w-100"
                  placeholder="Check in"
                  suffixIcon={<CalenderSVG3 />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
            <Col xs={24} lg={24}>
              <Button
                loading={hotelsListQuery?.isLoading}
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
      <div style={{ marginTop: "1rem" }}>
        {!hotelViewRoomsId &&
          hotelsListQuery?.data?.rows?.map((el) => (
            <ViewRoomsHotelCard
              data={el}
              key={el?.id}
              isAddItemCard={true}
              onAddViewRoomsClicked={() => setHotelViewRoomsId(el?.id || el?.HotelCode)}
            />
          ))}
        {hotelViewRoomsId && (
          <ViewRoomsHotelCard
            isBackToSearch={true}
            onBackToSearchClicked={() => setHotelViewRoomsId(undefined)}
            data={hotelsListQuery?.data?.rows?.find(
              (el) => el?.id === hotelViewRoomsId || el?.HotelCode === hotelViewRoomsId,
            )}
          />
        )}
        {hotelViewRoomsId && (
          <ViewRoomsSection
          onBack={() => setHotelViewRoomsId(undefined)}
            searchParams={searchParams}
            onAddItemClicked={onClose}
            accommodationId={hotelViewRoomsId}
            data={hotelsListQuery?.data?.rows?.find(
              (el) => el?.id === hotelViewRoomsId || el?.HotelCode === hotelViewRoomsId,
            )}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default AddNewHotelModal;
