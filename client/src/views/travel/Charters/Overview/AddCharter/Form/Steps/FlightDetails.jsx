import { Col, DatePicker, Flex, Form, Input, Row, Select } from "antd";
import {
  AirLineDownSVG,
  ArrowDownSVG,
  CalendarSVG,
  CharterSourceSVG,
  ExchangeSVG,
} from "assets/jsx-svg";
import Box from "components/Box";
import AirportInput from "components/common/AirportInput";
import CurrencyInput from "components/common/CurrencyInput";
import useGetAllAirlineCompanies from "services/travel/Settings/Queries/useGetAllAirlineCompanies";
import AddNewAirlineCompany from "../components/AddNewAirlineCompany";

const filterOption = (input, option) => {
  return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
};

const FlightDetails = ({ form }) => {
  const { isPending, data } = useGetAllAirlineCompanies(
    { size: 400 },
    {
      refetchOnMount: false,
      select: (data) => {
        return data.data.data.rows.map((item) => {
          return { ...item, value: item?.code, label: item.name };
        });
      },
    },
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        gap: "24px",
      }}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            rules={[{ required: true }]}
            name="airlineComapnyCode"
            required
            label="Airline Company">
            <Select
              filterOption={filterOption}
              showSearch
              suffixIcon={<ArrowDownSVG color={"#2D6ADB"} />}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <AddNewAirlineCompany
                    onAdd={(id) => {
                      console.log(id);
                      form.setFieldValue("airlineComapnyCode", id);
                    }}
                  />
                </>
              )}
              loading={isPending}
              options={data}
              placeholder="Select Airline"
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Flex gap={12}>
            <Form.Item
              rules={[{ required: true }]}
              style={{ width: "100%" }}
              name="fromAirportId"
              required
              label="From Airport">
              <AirportInput
                placeholder="Select Source"
                suffixIcon={<CharterSourceSVG color={"#2D6ADB"} />}
              />
            </Form.Item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
              <ExchangeSVG color={"#2D6ADB"} />
            </Box>
            <Form.Item
              rules={[{ required: true }]}
              style={{ width: "100%" }}
              name="toAirportId"
              required
              label="To Airport">
              <AirportInput
                placeholder="Select Destination"
                suffixIcon={<AirLineDownSVG color={"#2D6ADB"} />}
              />
            </Form.Item>
          </Flex>
        </Col>
        <Col span={16}>
          <Flex gap={12}>
            <Form.Item
              rules={[{ required: true }]}
              style={{ width: "100%" }}
              name="fromDate"
              required
              label="From Date">
              <DatePicker
                style={{ width: "100%" }}
                suffixIcon={<CalendarSVG color={"#2D6ADB"} />}
              />
            </Form.Item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
              <ExchangeSVG color={"#2D6ADB"} />
            </Box>
            <Form.Item
              rules={[{ required: true }]}
              style={{ width: "100%" }}
              name="toDate"
              required
              label="To Date">
              <DatePicker
                style={{ width: "100%" }}
                suffixIcon={<CalendarSVG color={"#2D6ADB"} />}
              />
            </Form.Item>
          </Flex>
        </Col>
        <Col span={8}>
          <Form.Item rules={[{ required: true }]} name="valid_days" required label="Valid Days">
            <Select
              suffixIcon={<ArrowDownSVG color={"#2D6ADB"} />}
              options={[
                {
                  label: "Saturday",
                  value: "saturday",
                },
                {
                  label: "Sunday",
                  value: "sunday",
                },
                {
                  label: "Monday",
                  value: "monday",
                },
                {
                  label: "Tuesday",
                  value: "tuesday",
                },
                {
                  label: "Wednesday",
                  value: "wednesday",
                },
                {
                  label: "Thursday",
                  value: "thursday",
                },
                {
                  label: "Friday",
                  value: "friday",
                },
              ]}
              placeholder="Select Valid Days"
              mode="multiple"
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            rules={[{ required: true }, { min: 1 }]}
            name="allotment"
            required
            label="Allotment">
            <Input type="number" placeholder="Enter Allotment" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item rules={[{ required: true }]} name="currencyCode" required label="Currency">
            <CurrencyInput placeholder={"Select currency"} />
          </Form.Item>
        </Col>
      </Row>
    </Box>
  );
};

export default FlightDetails;
