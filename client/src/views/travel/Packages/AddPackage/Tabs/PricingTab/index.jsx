import { Button, Col, Divider, Flex, Form, Input, message, Row, Select, Switch } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { DeleteSVG, PluseSVG } from "assets/jsx-svg";
import Section from "components/common/Section";
import TextEditor from "components/common/TextEditor";
import { PACKAGE_AVAILABILITY_TYPES, PACKAGE_OFFERED_TYPES } from "constants/PACKAGE_TYPES";
import React, { useEffect } from "react";
import useAddPackagePricingRule from "services/travel/packages/pricing/Mutations/useAddPackagePricingRule";
import useGetPackagePricingRule from "services/travel/packages/pricing/Queries/useGetPackagePricingRule";
import useGetTotalPricingItem from "services/travel/packages/pricing/Queries/useGetTotalPricingItem";
import formatNumber from "utils/formatNumber";
import { ADD_PACKAGES_TABS_KEYS } from "../..";

const PricingTab = ({ id: tripId, setActiveTab, packageType }) => {
  const [form] = useForm();
  const rules = useWatch("rules", form);
  const avilability = useWatch("avilability", form);
  const isDeadLine = useWatch("isDeadLine", form);
  console.log(
    packageType === PACKAGE_OFFERED_TYPES.RECURRING_TRIP
      ? ADD_PACKAGES_TABS_KEYS.DEPARTURE
      : ADD_PACKAGES_TABS_KEYS.PASSENGERS)
  // QUERIES
  const tripPricingRule = useGetPackagePricingRule(tripId, { enabled: !!tripId });
  const pricingItemTotalPrice = useGetTotalPricingItem(tripId, { enabled: !!tripId });
  console.log("pricingItemTotalPrice?.data >> ", pricingItemTotalPrice?.data);
  useEffect(() => {
    if (tripPricingRule?.data && tripPricingRule?.isSuccess) {
      if (Array.isArray(tripPricingRule?.data) && tripPricingRule?.data?.length === 0) {
        return;
      }
      form.setFieldsValue(tripPricingRule.data);
    }
  }, [tripPricingRule?.data]);

  // MUTATIONS
  const addPricingRule = useAddPackagePricingRule(tripId, {
    onSuccess: () => {
      message.success("Pricing updated successfully");
      if(packageType === PACKAGE_OFFERED_TYPES.RECURRING_TRIP){
        setActiveTab(ADD_PACKAGES_TABS_KEYS.DEPARTURE)
      }else{
        setActiveTab(ADD_PACKAGES_TABS_KEYS.PASSENGERS)
      }
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });
  const handleFinish = (values) => {
    if (addPricingRule?.isPending) return;

    const postData = {
      ...values,
      availableUntil: values?.isDeadLine ? values?.availableUntil : undefined,
      groupSize:
        values?.avilability === PACKAGE_AVAILABILITY_TYPES?.LIMITED ? values?.groupSize : undefined,
      tripId,
      rules: values?.rules?.map((rule) => {
        return {
          ...rule,
          pricePerChild: rule?.pricePerChild || 0,
        };
      }),
    };

    addPricingRule.mutate(postData);
  };

  return (
    <Section
      title="Pricing"
      headerEnd={
        <Button type="primary" onClick={() => form.submit()}>
          Save & Next
        </Button>
      }>
      <p className="md_text_medium mb-1" style={{ color: "var(--gray-700)" }}>
        Total Pricing for all items
      </p>
      <Row gutter={[12, 12]}>
        <Col span={9}>
          <p
            className="sm_text_medium"
            style={{ color: "var(--gray-700)", marginBottom: "6px" }}>
            Total Dynamic Items
          </p>
          <p
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid var(--gray-300)",
              width: "100%",
              color: "var(--gray-500)",
            }}>
            ${pricingItemTotalPrice?.data?.totalDynamicPrice}
          </p>
          <p
            className="sm_text_medium"
            style={{ color: "var(--gray-500)", marginTop: "4px" }}>
            Depending on availability and user options
          </p>
        </Col>
        <Col span={9}>
          <p
            className="sm_text_medium"
            style={{ color: "var(--gray-700)", marginBottom: "6px" }}>
            Total static Items
          </p>
          <p
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid var(--gray-300)",
              width: "100%",
              color: "var(--gray-500)",
            }}>
            ${pricingItemTotalPrice?.data?.totalStaticPrice}
          </p>
          <p
            className="sm_text_medium"
            style={{ color: "var(--gray-500)", marginTop: "4px" }}>
            Depending on availability and user options
          </p>
        </Col>
      </Row>
      <Divider className="divider-space-16" />
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        scrollToFirstError={{ behavior: "smooth" }}>
        <p className="md_text_medium mb-1" style={{ color: "var(--gray-700)" }}>
          Pricing options
        </p>

        <Form.List name="rules">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row gutter={[12, 12]} key={key} align="middle">
                  {/* Adults Count */}
                  <Col span={5}>
                    <Form.Item
                      label={"Adults"}
                      {...restField}
                      name={[name, "adultsCount"]}
                      initialValue={1}
                      rules={[{ required: true, message: "Select adults count" }]}>
                      <Select
                        placeholder={"Adults count"}
                        options={[...new Array(50)].map((el, i) => ({
                          label: i + 1,
                          value: i + 1,
                        }))}
                      />
                    </Form.Item>
                  </Col>

                  {/* Price Per Adult */}
                  <Col
                    span={6}
                    style={{
                      borderInlineEnd: "1px solid var(--gray-200)",
                      paddingInlineEnd: "16px",
                    }}>
                    <Form.Item
                      label={"Price Per Adult"}
                      {...restField}
                      name={[name, "pricePerAdult"]}
                      rules={[
                        {
                          required: true,
                          message: "Enter adult price",
                        },
                        {
                          validator: (_, value) => {
                            if (value && value < 0) {
                              return Promise.reject("At lest 0");
                            }

                            return Promise.resolve();
                          },
                        },
                      ]}>
                      <Input
                        prefix={<span style={{ color: "var(--gray-500)" }}>$</span>}
                        placeholder="Price Per Adult"
                      />
                    </Form.Item>
                  </Col>

                  {/* Children Count */}
                  <Col span={5} style={{ paddingInlineStart: "16px" }}>
                    <Form.Item
                      {...restField}
                      label={"Child"}
                      name={[name, "childrenCount"]}
                      rules={[{ required: true, message: "Select children count" }]}>
                      <Select
                        placeholder={"Children count"}
                        options={[...new Array(50)].map((el, i) => ({
                          label: i,
                          value: i,
                        }))}
                      />
                    </Form.Item>
                  </Col>

                  {/* Price Per Child */}
                  {rules[index]?.childrenCount > 0 && (
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        label={"Price Per Child"}
                        name={[name, "pricePerChild"]}
                        rules={[
                          {
                            required: true,
                            message: "Enter child price",
                          },
                          {
                            validator: (_, value) => {
                              if (value && value < 0) {
                                return Promise.reject("At lest 0");
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}>
                        <Input
                          prefix={<span style={{ color: "var(--gray-500)" }}>$</span>}
                          placeholder="Price Per Child"
                        />
                      </Form.Item>
                    </Col>
                  )}

                  {/* Delete Button */}
                  <Col span={rules[index]?.childrenCount > 0 ? 2 : 8}>
                    <Flex justify="flex-end">
                      <Button
                        style={{ marginTop: "14px" }}
                        type="primary"
                        danger
                        icon={<DeleteSVG color={"#fff"} />}
                        onClick={() => remove(name)}
                      />
                    </Flex>
                  </Col>
                </Row>
              ))}
              <Button onClick={() => add()} icon={<PluseSVG color={"#2D6ADB"} />}>
                Add Rule
              </Button>
            </>
          )}
        </Form.List>
        <Divider className="divider-space-16" />
        <Row>
          <Col md={12} xs={24}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name={"avilability"}
                  label={"Availability"}
                  rules={[{ required: true, messsage: "Select availability type" }]}
                  initialValue={PACKAGE_AVAILABILITY_TYPES?.UNLIMITED}>
                  <Select
                    placeholder={"Availability"}
                    options={[
                      { label: "Limited", value: PACKAGE_AVAILABILITY_TYPES?.LIMITED },
                      { label: "Unavailable", value: PACKAGE_AVAILABILITY_TYPES?.UNAVAILABEL },
                      { label: "Unlimited", value: PACKAGE_AVAILABILITY_TYPES?.UNLIMITED },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                {avilability === PACKAGE_AVAILABILITY_TYPES?.LIMITED && (
                  <Form.Item
                    name={"groupSize"}
                    label={"Group Size"}
                    initialValue={1}
                    rules={[
                      { required: true, message: "Enter group size" },
                      {
                        validator: (_, value) => {
                          if ((value || value === 0) && value < 1) {
                            return Promise.reject("Can't be less than 1");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <Input type={"number"} min={1} placeholder="size" />
                  </Form.Item>
                )}
              </Col>

              <Col span={12}>
                <p className="sm_text_medium mb-1" style={{ color: "var(--gray-700)" }}>
                  Is there a booking deadline?
                </p>
                <Flex align="center" gap={12}>
                  <Form.Item
                    name={"isDeadLine"}
                    noStyle
                    valuePropName="checked"
                    initialValue={false}>
                    <Switch />
                  </Form.Item>
                  <span>{isDeadLine ? "Yes" : "No"}</span>
                </Flex>
              </Col>

              <Col span={12}>
                {isDeadLine && (
                  <Form.Item
                    name={"availableUntil"}
                    label={"Available Until"}
                    initialValue={1}
                    extra={
                      <p className="sm_text_normal" style={{ color: "var(--gray-500)" }}>
                        Days before departure
                      </p>
                    }
                    rules={[
                      { required: true, message: "Enter available until" },
                      {
                        validator: (_, value) => {
                          if ((value || value === 0) && value < 1) {
                            return Promise.reject("Can't be less than 1");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <Input type={"number"} min={1} placeholder="size" />
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider className="divider-space-16" />
        <Form.Item
          name={"termsAndConditions"}
          label={"Terms and Conditions"}
          validateTrigger={"onBlur"}
          rules={[{ required: true, message: "Enter Terms and Conditions" }]}>
          <TextEditor minHeight={"200px"} />
        </Form.Item>
      </Form>
    </Section>
  );
};

export default PricingTab;
