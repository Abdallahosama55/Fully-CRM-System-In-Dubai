import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Empty, Form, message, Radio, Row, Typography } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { SearchSVG } from "assets/jsx-svg";
import AirportInput from "components/common/AirportInput";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Filters from "./components/Filters";
import FlightsResults from "./components/FlightsResults";
import TravelersInput from "components/common/TravelaresInput";
import TurboLoadingPage from "components/common/TurboLoadingPage";
import convertMinutesToTime from "utils/convertMinutesToTime";
import useGetSearchFlight from "services/travel/external_flights/Queries/useGetSearchFlight";

const FlightsTab = ({ setTabContent }) => {
  const [form] = useForm();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const filterFunction = useCallback(
    (data) => {
      if (!filters || JSON.stringify(filters) === "{}") return data;
      try {
        return data?.filter((el) => {
          const outboundFlight = el?.outboundFlight?.[0];
          const returnFlight = el?.returnFlight?.[0];

          if (outboundFlight?.airlineCompany?.name && filters?.debounceName) {
            if (
              !outboundFlight?.airlineCompany?.name
                ?.toLowerCase()
                ?.includes(filters?.debounceName?.toLowerCase())
            ) {
              return false;
            }
          }

          if (returnFlight?.airlineCompany?.name && filters?.debounceName) {
            if (
              !returnFlight?.airlineCompany?.name
                ?.toLowerCase()
                ?.includes(filters?.debounceName?.toLowerCase())
            ) {
              return false;
            }
          }

          if (
            el?.totalPrice &&
            (el?.totalPrice < filters?.debouncePriceRange?.[0] ||
              el?.totalPrice > filters?.debouncePriceRange?.[1])
          ) {
            return false;
          }

          if (
            el?.totalPrice &&
            (el?.totalPrice < filters?.debouncePriceRange?.[0] ||
              el?.totalPrice > filters?.debouncePriceRange?.[1])
          ) {
            return false;
          }
          // Format the times
          const fromDateTimeFormatted = dayjs.utc(outboundFlight?.fromDateTime).format("HH:mm");
          const toDateTimeTimeFormatted = dayjs.utc(outboundFlight?.toDateTime).format("HH:mm");

          if (
            dayjs(fromDateTimeFormatted, "HH:mm").isBefore(
              dayjs(convertMinutesToTime(filters?.departureTimeRange?.[0]), "HH:mm"),
            )
          ) {
            return false;
          }

          if (
            dayjs(fromDateTimeFormatted, "HH:mm").isAfter(
              dayjs(convertMinutesToTime(filters?.departureTimeRange?.[1]), "HH:mm"),
            )
          ) {
            return false;
          }

          if (
            dayjs(toDateTimeTimeFormatted, "HH:mm").isBefore(
              dayjs(convertMinutesToTime(filters?.arrivalTimeRange?.[0]), "HH:mm"),
            )
          ) {
            return false;
          }

          if (
            dayjs(toDateTimeTimeFormatted, "HH:mm").isAfter(
              dayjs(convertMinutesToTime(filters?.arrivalTimeRange?.[1]), "HH:mm"),
            )
          ) {
            return false;
          }

          return true;
        });
      } catch (error) {
        console.log("error >> ", error);
        return data;
      }
    },
    [filters],
  );

  const search = useWatch("search", form);
  const flightsList = useGetSearchFlight({
    ...search,
    page,
    size: 10,
    fromDate:
      search?.type === "TWO_WAY" && search?.rangeDate?.[0]
        ? dayjs(search?.rangeDate?.[0])?.format("YYYY-MM-DD")
        : dayjs(search?.date).format("YYYY-MM-DD"),
    toDate: search?.rangeDate?.[1] ? dayjs(search?.rangeDate?.[1]).format("YYYY-MM-DD") : undefined,
    ...search?.travelers,
    rangeDate: undefined,
    travelers: undefined,
    date: undefined,
  });

  useEffect(() => {
    if (Array.isArray(flightsList?.data) && flightsList.isSuccess) {
      if (flightsList?.data?.length === 0) {
        message.warning("No available flights with this requirements");
      }
    }
  }, [flightsList?.data, flightsList.isSuccess]);

  useEffect(() => {
    if (flightsList?.error?.message === "Accommodation Does Not Exist") {
      message.warning("No available rooms with this requirements");
      return;
    }
    if (flightsList?.isError) {
      message.error("Something went wrong");
    }
  }, [flightsList?.isError, flightsList?.error]);

  const flightsListRows = useMemo(
    () => filterFunction(flightsList?.data?.rows),
    [filterFunction, flightsList?.data?.rows],
  );
  useEffect(() => {
    if (flightsList?.isFetching) {
      setTabContent(<TurboLoadingPage height="calc(100dvh - 200px)" />);
    } else if (flightsListRows?.length === 0) {
      setTabContent(
        <div className="mt-1 center-items" style={{ minHeight: "450px" }}>
          <Empty
            description={
              <p>
                We don't have available <br />
                flights match your search
              </p>
            }
          />
        </div>,
      );
    } else {
      setTabContent(
        <Row className="mt-1" gutter={[16, 16]}>
          <Col lg={6} md={8} sm={24}>
            <Filters setFilters={setFilters} results={flightsListRows} />
          </Col>
          <Col lg={18} md={16} sm={24}>
            <FlightsResults
              setPage={setPage}
              page={page}
              totalFlightsCount={flightsList?.data?.count}
              travelers={search?.travelers}
              data={flightsListRows}
              fromDate={
                search?.type === "TWO_WAY"
                  ? Array.isArray(search?.rangeDate)
                    ? dayjs(search?.rangeDate[0]).format("YYYY-MM-DD")
                    : undefined
                  : dayjs(search?.date).format("YYYY-MM-DD")
              }
              toDate={
                Array.isArray(search?.rangeDate)
                  ? dayjs(search?.rangeDate[1]).format("YYYY-MM-DD")
                  : undefined
              }
              queryString={`?arrival=${dayjs(form.getFieldValue("arrival")).format(
                "YYYY-MM-DD",
              )}&departure=${dayjs(form.getFieldValue("departure")).format("YYYY-MM-DD")}&adults=${
                form.getFieldValue("travelers")?.adults
              }${
                form.getFieldValue("travelers")?.childsAges?.length > 0
                  ? "&children=" + form.getFieldValue("travelers")?.childsAges.join("-")
                  : ""
              }`}
            />
          </Col>
        </Row>,
      );
    }
  }, [
    flightsList?.isFetching,
    flightsListRows,
    setTabContent,
    flightsList?.data?.count,
    form,
    filterFunction,
    setPage,
    page,
    search,
  ]);

  return (
    <div>
      <Typography.Title level={5}>Great deals. One easy search.</Typography.Title>
      <Form
        onFinish={() => {
          flightsList?.search();
          setPage(1);
        }}
        form={form}
        layout="vertical">
        <Form.Item name={["search", "type"]} initialValue={"TWO_WAY"}>
          <Radio.Group>
            <Radio value={"TWO_WAY"}>
              <SwapOutlined /> Round Trip
            </Radio>
            <Radio value={"ONE_WAY"}>
              <ArrowRightOutlined /> One Way
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[12, 12]}>
          <Col md={5}>
            <Form.Item
              rules={[{ required: true }]}
              label="Where from?"
              name={["search", "fromAirportId"]}>
              <AirportInput />
            </Form.Item>
          </Col>
          <Col md={5}>
            <Form.Item
              rules={[{ required: true }]}
              label="Where to?"
              name={["search", "toAirportId"]}>
              <AirportInput />
            </Form.Item>
          </Col>
          <Col md={7}>
            {search?.type === "TWO_WAY" ? (
              <Form.Item
                label="Departure and Return"
                name={["search", "rangeDate"]}
                initialValue={[dayjs(), dayjs().add(1, "day")]}
                rules={[{ required: true }]}>
                <DatePicker.RangePicker className="w-100" />
              </Form.Item>
            ) : (
              <Form.Item
                label="Departure date"
                initialValue={dayjs()}
                name={["search", "date"]}
                rules={[{ required: true }]}>
                <DatePicker className="w-100" />
              </Form.Item>
            )}
          </Col>
          <Col md={5}>
            <Form.Item
              rules={[{ required: true }]}
              label="Travelers"
              name={["search", "travelers"]}>
              <TravelersInput hasInfant={true} form={form} />
            </Form.Item>
          </Col>
          <Col style={{ placeContent: "center" }} md={2}>
            <Button
              loading={flightsList?.isFetching}
              type="primary"
              icon={<SearchSVG color={"#FFF"} />}
              onClick={form.submit}
              style={{ marginTop: "16px" }}
              className="w-100 search_btn">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FlightsTab;
