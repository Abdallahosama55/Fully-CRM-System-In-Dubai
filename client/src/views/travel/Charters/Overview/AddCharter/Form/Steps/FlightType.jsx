import RadioBox from "../../../components/RadioBox";
import { Col, Flex, Form, Input, Radio, Row, Space, TimePicker } from "antd";
import Box from "components/Box";
import { ExchangeSVG } from "assets/jsx-svg";
import { useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
const FlightType = ({ form }) => {
  const type = useWatch("type", form);

  return (
    <Box sx={{ marginTop: "16px" }}>
      <Form.Item name="type">
        <Radio.Group style={{ gap: "32px" }} className="w-100 gap-16 ">
          <Space className="w-100" direction="vertical" size={[24, 24]}>
            <RadioBox
              option={[
                {
                  value: "oneWay",
                  title: "One-Way Flight",
                  descriptions: "Choose this for a single trip to your destination.",
                },
                {
                  value: "twoWay",
                  title: "Round-Trip Flight",
                  descriptions: "Choose this for a trip to your destination and back.",
                },
              ]}
              isActive={true}>
              {type === "oneWay" && (
                <Box sx={{ marginTop: "24px" }}>
                  <ShardFields />
                </Box>
              )}
              {type === "twoWay" && (
                <Box sx={{ marginTop: "24px" }}>
                  <ShardFields form={form} />
                  <Row gutter={32}>
                    <Col span={8}>
                      <Form.Item
                        rules={[{ required: true }]}
                        name="return_flightNo"
                        required
                        label="Return Flight Number">
                        <Input placeholder="Enter Flight Number" />
                      </Form.Item>
                    </Col>

                    <Col span={16}>
                      <Form.Item
                        initialValue={dayjs("02:00", "HH:mm")}
                        name="return_after_hours"
                        label="Return after (Hours)">
                        <WrapperTimePicker
                          showNow={false}
                          format="HH:mm"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      {/* <Box style={{ display: "none" }}>
                        <Flex gap={12}>
                          <Form.Item
                            style={{ width: "100%" }}
                            name="return_departure"
                            required
                            rules={[{ required: true }]}
                            label="Departure">
                            <WrapperTimePicker format="HH:mm" style={{ width: "100%" }} />
                          </Form.Item>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}>
                            <ExchangeSVG />
                          </Box>
                          <Form.Item
                            rules={[{ required: true }]}
                            style={{ width: "100%" }}
                            name="return_arrival"
                            required
                            label={<>Arrival</>}>
                            <WrapperTimePicker format="HH:mm" style={{ width: "100%" }} />
                          </Form.Item>{" "}
                        </Flex>
                      </Box> */}
                    </Col>
                  </Row>
                </Box>
              )}
            </RadioBox>
          </Space>
        </Radio.Group>
      </Form.Item>
    </Box>
  );
};
const ShardFields = ({ form }) => {
  return (
    <Row gutter={32} style={{ marginBottom: "16px" }}>
      <Col span={8}>
        <Form.Item rules={[{ required: true }]} name="flightNo" required label="Flight Number">
          <Input placeholder="Enter Flight Number" />
        </Form.Item>
      </Col>
      <Col span={16}>
        <Flex gap={12}>
          <Form.Item
            rules={[{ required: true }]}
            style={{ width: "100%" }}
            name="departure"
            required
            label="Departure">
            <WrapperTimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <ExchangeSVG />
          </Box>
          <Form.Item
            rules={[{ required: true }]}
            style={{ width: "100%" }}
            name="arrival"
            required
            label="Arrival">
            <WrapperTimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </Flex>
      </Col>
    </Row>
  );
};
const WrapperTimePicker = ({ postChange, onChange, ...props }) => {
  const handlePostChange = (value) => {
    postChange && postChange(value);
    onChange(value);
  };
  const disabledHours = () => {
    // Return an array with only the hour 0 to be disabled
    return [24];
  };

  return (
    <TimePicker
      disabledTime={disabledHours}
      onChange={handlePostChange}
      format="HH:mm"
      {...props}
    />
  );
};
export default FlightType;
