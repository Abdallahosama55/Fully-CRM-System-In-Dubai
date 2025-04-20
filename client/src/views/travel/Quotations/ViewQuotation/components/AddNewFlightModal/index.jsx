import { Button, Col, ConfigProvider, DatePicker, Divider, Form, Radio, Row } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { SearchSVG } from "assets/jsx-svg";
import TravelersInput from "components/common/TravelaresInput";
import dayjs from "dayjs";
import React from "react";
import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import AirportInput from "components/common/AirportInput";
import useGetSearchFlight from "services/travel/charters/Queries/useGetSearchCharter";
import FlightCard from "../FlightCard";

const AddNewFlightModal = ({ onClose = () => {} }) => {
  const [form] = useForm();
  const search = useWatch("search", form);
  const { data, refetch, isFetching } = useGetSearchFlight(
    {
      ...search,
      fromDate:
        search?.type === "TWO_WAY"
          ? Array.isArray(search?.rangeDate)
            ? dayjs(search?.rangeDate[0]).format("YYYY-MM-DD")
            : undefined
          : dayjs(search?.date).format("YYYY-MM-DD"),
      toDate: Array.isArray(search?.rangeDate)
        ? dayjs(search?.rangeDate[1]).format("YYYY-MM-DD")
        : undefined,
      adult: search?.travelers?.adults,
      child: search?.travelers?.childs,
      infant: search?.travelers?.infants,
      rangeDate: undefined,
      travelers: undefined,
      date: undefined,
    },
    { enabled: false, select: (data) => data?.data?.data },
  );

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
      <Form onFinish={refetch} form={form} layout="vertical">
        <Form.Item name={["search", "type"]} initialValue={"TWO_WAY"} noStyle>
          <Radio.Group>
            <Radio value={"TWO_WAY"}>
              <SwapOutlined /> Round Trip
            </Radio>
            <Radio value={"ONE_WAY"}>
              <ArrowRightOutlined /> One Way
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={[8, 0]} style={{ marginTop: "0.5rem" }}>
          <Col md={12}>
            <Form.Item
              rules={[{ required: true }]}
              label="Where from?"
              name={["search", "fromAirportId"]}>
              <AirportInput />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              rules={[{ required: true }]}
              label="Where to?"
              name={["search", "toAirportId"]}>
              <AirportInput />
            </Form.Item>
          </Col>
          <Col md={11}>
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
          <Col md={10}>
            <Form.Item
              rules={[{ required: true }]}
              label="Travelers"
              name={["search", "travelers"]}>
              <TravelersInput hasInfant={true} form={form} />
            </Form.Item>
          </Col>
          <Col style={{ placeContent: "center" }} md={3}>
            <Button
              loading={isFetching}
              type="primary"
              icon={<SearchSVG color={"#FFF"} />}
              onClick={form.submit}
              style={{ marginTop: "16px" }}
              block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      {Array.isArray(data?.rows) && data?.rows?.length > 0 && <Divider />}
      {Array.isArray(data?.rows) &&
        data?.rows?.length > 0 &&
        data?.rows?.map((el) => (
          <FlightCard
            data={el}
            key={el?.id}
            isAddItemCard={true}
            onAddItem={onClose}
            paxes={search?.travelers}
            arrivalDate={
              search?.type === "TWO_WAY"
                ? Array.isArray(search?.rangeDate)
                  ? dayjs(search?.rangeDate[0]).format("YYYY-MM-DD")
                  : undefined
                : dayjs(search?.date).format("YYYY-MM-DD")
            }
            departureDate={
              Array.isArray(search?.rangeDate)
                ? dayjs(search?.rangeDate[1]).format("YYYY-MM-DD")
                : undefined
            }
          />
        ))}
    </ConfigProvider>
  );
};

export default AddNewFlightModal;
