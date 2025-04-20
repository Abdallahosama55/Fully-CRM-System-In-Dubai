import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Flex, Form, Input, Select } from "antd";
import { AirLineDownSVG, ArrowDownSVG, CalendarSVG, CharterSourceSVG, ExchangeSVG } from "assets/jsx-svg";
import Box from "components/Box";
import AirportInput from "components/common/AirportInput";
import FormAutoSave from "components/FormAutoSave";

import dayjs from "dayjs";
const Filters = ({ setFilter }) => {
  const onFinish = (item) => {
    setFilter({ ...item, fromDate: item?.fromDate && dayjs(item?.fromDate).format("YYYY-MM-DD") });
  };
  return (
    <FormAutoSave
      onFinish={onFinish}
      layout="horizontal"
      labelAlign="left"
      style={{ width: "100%", marginBottom: "24px" }}>
      <Flex gap={16}>
        {/* <Form.Item
          style={{ marginBottom: "0px", maxWidth: "400px", minWidth: "300px" }}
          name="search">
          <Input
            style={{ maxWidth: "100%" }}
            prefix={<SearchOutlined />}
            placeholder="Search Airline name, source, destination"
          />
        </Form.Item> */}
        <Form.Item style={{ marginBottom: "0px" }} name="fromDate">
          <DatePicker
            allowClear
            style={{ minWidth: "220px" }}
            placeholder="Select Date"
            suffixIcon={<CalendarSVG color={"#2d5feb"} />}
          />
        </Form.Item>
        <Flex gap={12}>
          <Form.Item style={{ marginBottom: "0px", width: "220px" }} name="fromAirportId">
            <AirportInput placeholder="From Airport" suffixIcon={<CharterSourceSVG color="#2d5feb" />} />
          </Form.Item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <ExchangeSVG color="#2d5feb" />
          </Box>
          <Form.Item style={{ marginBottom: "0px", width: "220px" }} name="toAirportId">
            <AirportInput placeholder="To Airport" suffixIcon={<AirLineDownSVG color="#2d5feb" />} />

          </Form.Item>
        </Flex>
      </Flex>
    </FormAutoSave>
  );
};

export default Filters;
