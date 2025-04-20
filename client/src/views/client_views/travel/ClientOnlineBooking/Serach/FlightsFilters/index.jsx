import { ArrowRightOutlined, SwapOutlined } from "@ant-design/icons";
import { Col, Form, Radio, Row, Typography, DatePicker, Button, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { AirLineDownSVG, CharterSourceSVG, SearchSVG } from "assets/jsx-svg";
import CustomButton from "components/common/Button";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useState } from "react";
import useSearchAirports from "services/travel/Settings/Queries/useSearchAirports";
import SelectAirport from "views/travel/Charters/Overview/EditCharter/SelectAirport";
const { RangePicker } = DatePicker;
const FlightsFilters = ({ onSubmitSearchFlight }) => {
  const [form] = Form.useForm();
  const [searchAirLine, setSearchAirLine] = useState();

  const [searchFromAirbort, setSearchFromAirbort] = useState("");
  const [searchToAirbort, setSearchToAirbort] = useState("");

  const [fromAirbortOption, setFromAirbortOption] = useState([]);
  const [toAirbortOption, setToAirbortOption] = useState([]);

  const debounceSearchFromAirbort = useDebounce(searchFromAirbort, 300);
  const debounceSearchToAirbort = useDebounce(searchToAirbort, 300);

  const searchFromAirbortOptions = useSearchAirports(debounceSearchFromAirbort, {
    initialValue: [],
  });
  const searchToAirbortOptions = useSearchAirports(debounceSearchToAirbort, {
    initialValue: [],
  });

  useEffect(() => {
    if (searchFromAirbortOptions?.data?.data?.data) {
      setFromAirbortOption(
        searchFromAirbortOptions?.data?.data?.data?.map((el) => ({
          label: el?.name,
          value: el?.id,
        })),
      );
    }
  }, [searchFromAirbortOptions?.data?.data?.data]);

  useEffect(() => {
    if (searchToAirbortOptions?.data?.data?.data) {
      setToAirbortOption(
        searchToAirbortOptions?.data?.data?.data?.map((el) => ({
          label: el?.name,
          value: el?.id,
        })),
      );
    }
  }, [searchToAirbortOptions?.data?.data?.data]);

  const onFightsSearch = (data) => {
    if (typeof onSubmitSearchFlight == "function") onSubmitSearchFlight(data);
  };
  return (
    <div>
      <Typography.Title level={5}>Great deals. One easy search.</Typography.Title>
      <Form
        onFinish={onFightsSearch}
        form={form}
        initialValues={{
          type: "TWO_WAY",
        }}
        layout="vertical">
        <Form.Item name="type">
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
          <Col span={5}>
            <Form.Item rules={[{ required: true }]} label="Where from?" name="fromAirportId">
              <Select
                onSearch={setSearchFromAirbort}
                suffixIcon={<CharterSourceSVG color={"#3A5EE3"} />}
                placeholder="Enter Source"
                showSearch
                options={fromAirbortOption}
                loading={searchFromAirbortOptions.isLoading}
                filterOption={false}
                notFoundContent={null}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item rules={[{ required: true }]} label="Where to?" name="toAirportId">
              <Select
                onSearch={setSearchToAirbort}
                placeholder="Enter Destination"
                suffixIcon={<AirLineDownSVG color={"#3A5EE3"} />}
                showSearch
                options={toAirbortOption}
                loading={searchToAirbortOptions.isLoading}
                filterOption={false}
                notFoundContent={null}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Departure and Return" name="rangeDate" rules={[{ required: true }]}>
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col style={{ placeContent: "center" }} span={2}>
            <Button
              type="primary"
              style={{ marginTop: "16px" }}
              icon={<SearchSVG />}
              htmlType="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default FlightsFilters;
