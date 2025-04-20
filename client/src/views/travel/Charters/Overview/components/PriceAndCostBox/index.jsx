import React, { useState } from "react";
import { Button, Col, Flex, Form, Input, Row, Switch, Typography } from "antd";
import Box from "components/Box";

import "./styles.css";
import { DeleteSVG, PluseSVG } from "assets/jsx-svg";

const PriceAndCostBox = ({ title, name, data }) => {
  const [active, setActive] = useState(name === "adult");
  return (
    <Box
      sx={{
        width: "100%",
        border: `1px solid ${active ? "#A4B3ED" : "#E5E5EA"} `,
        padding: "16px",
        borderRadius: "8px",
      }}>
      <Flex justify="space-between" align="center">
        <Typography.Text className="fz-14 line-height-20">{title}</Typography.Text>
        <div>
          <Switch
            disabled={name === "adult"}
            onChange={() => setActive((prev) => !prev)}
            checked={active}
            className="travel-charters-comp-price-and-cost-switch"
            size="small"
          />
        </div>
      </Flex>
      {active && (
        <Box sx={{ marginTop: "24px" }}>
          <Form.List
            name={name}
            initialValue={[{ from: 1, to: undefined, costValue: 0, sellValue: 0 }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((filed, index) => (
                  <Row
                    gutter={8}
                    key={filed.name + index}
                    align="middle"
                    style={{ marginBottom: 16 }}>
                    <Col span={10}>
                      <Form.Item
                        {...filed}
                        initialValue={index === 0 ? 1 : data[index - 1]?.to}
                        name={[filed.name, "from"]}
                        rules={[
                          { required: true, message: "Enter From" },
                          {
                            validator: (_, value) => {
                              if (value && index === 0 && Number(value) > 1) {
                                return Promise.reject("From value should be 1");
                              }

                              if (value && Number(value) < Number(data[index - 1]?.to || 1)) {
                                return Promise.reject(`At least ${data[index - 1]?.to}`);
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                        label="From night">
                        <Input
                          type="number"
                          disabled={index === 0}
                          placeholder="From"
                          min={index === 0 ? 1 : Number(data[index - 1]?.to || 1)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        {...filed}
                        name={[filed.name, "to"]}
                        rules={[
                          { required: index !== fields?.length - 1, message: "Enter To" },
                          {
                            validator: (_, value) => {
                              if (value && Number(value) < Number(data[index]?.from)) {
                                return Promise.reject(`At least ${data[index]?.from}`);
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                        label="To night">
                        <Input
                          disabled={index === fields?.length - 1}
                          type="number"
                          placeholder={
                            index === fields?.length - 1 ? " (to the end)" : "Enter 'To' value"
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button
                        style={{ marginTop: "14px" }}
                        danger
                        type={"primary"}
                        disabled={name === "adult" && index === 0}
                        onClick={() => {
                          if (name !== "adult" && index !== 0) {
                            remove(filed.name);
                          }
                        }}
                        icon={<DeleteSVG color={name === "adult" && index === 0 ? "#F00" : "#FFF"} />}
                      />
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...filed}
                        name={[filed.name, "costValue"]}
                        rules={[
                          { required: true, message: "Enter cost" },
                          {
                            validator: (_, value) => {
                              if (value && Number(value) < 0) {
                                return Promise.reject("At least 0");
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                        label="Cost Value">
                        <Input type="number" placeholder="Enter cost" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...filed}
                        name={[filed.name, "sellValue"]}
                        rules={[
                          { required: true, message: "Enter sell price" },
                          {
                            validator: (_, value) => {
                              if (value && Number(value) < 0) {
                                return Promise.reject("At least 0");
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                        label="Sell Value">
                        <Input type="number" placeholder="Enter sell price" />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PluseSVG />}>
                    Add Range
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Box>
      )}
    </Box>
  );
};
export default PriceAndCostBox;
