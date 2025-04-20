import React, { Fragment, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Typography,
} from "antd";
import CustomButton from "components/common/Button";
import { AVAILABILITY_TYPES, PASSENGER_PRICE_TYPE } from "constants/EXPERIENCE";
import dayjs from "dayjs";
import { queryClient } from "services/queryClient";
// API CALLS
import useGetPricingCategorySystem from "services/travel/experiance/PricingTab/Querys/useGetPricingCategorySystem";
import useAddPricingRate from "services/travel/experiance/PricingTab/Mutations/useAddPricingRate";
import useGetPricingRates from "services/travel/experiance/PricingTab/Querys/useGetPricingRates";
import useUpdatePricingRate from "services/travel/experiance/PricingTab/Mutations/useUpdatePricingRate";
import useDeletePricingRate from "services/travel/experiance/PricingTab/Mutations/useDeletePricingRate";
import useGetExperienceSessions from "services/travel/experiance/PricingTab/Querys/useGetExperienceSessions";
import useGetUnusedExperienceSessions from "services/travel/experiance/PricingTab/Querys/useGetUnusedExperienceSessions";

import { Delete2SVG } from "assets/jsx-svg";
// style
import "./style.css";
import { useWatch } from "antd/es/form/Form";
import useGetCancelationPoliciesList from "services/travel/experiance/CancelationTab/Queries/useGetCancelationPoliciesList";
import useGetAvailability from "services/travel/experiance/AvailabilityTab/Querys/useGetAvailability";
const NewRates = ({ productId, next }) => {
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [isAddNewRate, setIsAddNewRate] = useState(false);
  const [activeEditId, setActiveEditId] = useState(null);

  const editPriceType = useWatch([activeEditId, "priceType"], editForm);
  const addPriceType = useWatch(["priceType"], addForm);

  // API CALLS
  const avilableExperienceSessions = useGetUnusedExperienceSessions(productId, {
    initialData: [],
  });

  const availabilityQuery = useGetAvailability(productId, {
    enabled: Boolean(productId),
    initialData: {},
  });

  const experienceSessions = useGetExperienceSessions(productId, {
    initialData: [],
  });

  const pricingCategories = useGetPricingCategorySystem({ initialData: [] });
  const pricingRates = useGetPricingRates(productId);
  const cancelationPoliciesQuery = useGetCancelationPoliciesList(productId, {
    enabled: !!productId,
  });

  // MUTATIONS
  const addPricingRateMutation = useAddPricingRate(productId, {
    onSuccess: () => {
      message.success("New rate added successfully");
      pricingRates.refetch();
      avilableExperienceSessions.refetch();
      setIsAddNewRate(false);
      addForm.resetFields();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const updatePricingRateMutation = useUpdatePricingRate(productId, {
    onSuccess: () => {
      message.success("Rate updated successfully");
      pricingRates.refetch();
      avilableExperienceSessions.refetch();
      setIsAddNewRate(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { deletePricingRate, isPending: isDeletePricingRatePending } = useDeletePricingRate({
    onSuccess: (_, id) => {
      message.success("Rate deleted successfully");
      avilableExperienceSessions.refetch();
      queryClient.setQueryData(pricingRates.key, (temp) => {
        return temp.filter((el) => el.id !== id);
      });
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const handelAddNewRate = (values) => {
    addPricingRateMutation.mutate({
      ...values,
      price: values.priceType === PASSENGER_PRICE_TYPE.PER_BOOKING ? values.price : null,
      pricingCategory: values?.pricingCategory
        ?.filter(
          (el) =>
            (values.priceType === PASSENGER_PRICE_TYPE.PER_BOOKING && el.doesIncluded) ||
            (!isNaN(el.price) && el.price > 0),
        )
        .map((el) => ({
          id: el.id,
          isDefault: el.isDefault,
          price: values.priceType === PASSENGER_PRICE_TYPE.PER_BOOKING ? null : el?.price,
        })),
    });
  };

  const handelEditRate = (id, values) => {
    const temp = values[id];
    updatePricingRateMutation.mutate({
      id,
      ...temp,
      price: temp.priceType === PASSENGER_PRICE_TYPE.PER_BOOKING ? temp.price : null,
      pricingCategory: temp?.pricingCategory
        ?.filter((el) => el.doesIncluded || (!isNaN(el.price) && el.price > 0))
        .map((el) => ({
          id: el.id,
          isDefault: el.isDefault,
          price: temp.priceType === PASSENGER_PRICE_TYPE.PER_BOOKING ? null : el?.price,
        })),
    });
  };

  const handelFinish = () => {
    if (pricingRates?.data?.length === 0) {
      message.error("Add at least one rate");
    } else {
      next();
    }
  };

  if (
    pricingCategories.isLoading ||
    pricingCategories.isFetching ||
    pricingRates.isLoading ||
    pricingRates.isFetching
  ) {
    return <Skeleton active />;
  }

  return (
    <div className="pricing_tab">
      <Typography.Title level={3} className="fz-18 title">
        Define your pricing structure
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        You can set up prices for your different pricing categories, rates, and additional extras.
        These prices will automatically be converted to other currencies, so you don't have to worry
        about exchange rates
      </Typography.Paragraph>
      <Form id="form_inside_tab" layout="vertical" onFinish={handelFinish} hidden />
      <div className="rates_list">
        {pricingRates?.data?.length > 0 && (
          <Collapse
            activeKey={[activeEditId]}
            onChange={(key) => setActiveEditId(key[0])}
            className="mb-1"
            size="small"
            accordion={true}
            items={pricingRates?.data.map((rate) => {
              return {
                key: rate.id,
                label: rate.title,
                extra: (
                  <Button
                    className="table_action_button"
                    type="primary"
                    danger
                    icon={<Delete2SVG color="currentColor" />}
                    loading={isDeletePricingRatePending}
                    onClick={(e) => {
                      deletePricingRate(rate.id);
                      e.stopPropagation();
                    }}
                  />
                ),
                children: (
                  <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={(values) => handelEditRate(rate.id, values)}>
                    <Row gutter={[16, 12]}>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name={[rate.id, "title"]}
                          label={"Title"}
                          initialValue={rate.title}
                          rules={[{ required: true, message: "Please add rate title" }]}>
                          <Input placeholder="title" />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name={[rate.id, "priceType"]}
                          initialValue={rate.priceType}
                          label={"Passenger price type"}
                          rules={[{ required: true, message: "Please select price type" }]}>
                          <Select
                            placeholder={"price type"}
                            options={[
                              { label: "Per person", value: PASSENGER_PRICE_TYPE.PER_PERSON },
                              { label: "Per booking", value: PASSENGER_PRICE_TYPE.PER_BOOKING },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        md={availabilityQuery.data.type === AVAILABILITY_TYPES.PASS ? 24 : 12}
                        xs={24}>
                        <Form.Item
                          name={[rate.id, "cancellationPolicy"]}
                          rules={[
                            {
                              required: true,
                              message: "You have to select the Cancellation policy",
                            },
                          ]}
                          label="Cancellation Policy"
                          initialValue={Number(rate?.cancellationPolicy)}>
                          <Select
                            placeholder="cancellation"
                            options={cancelationPoliciesQuery?.data?.map((el) => {
                              return { value: el.id, label: el.name };
                            })}
                          />
                        </Form.Item>
                      </Col>
                      {availabilityQuery.data.type === AVAILABILITY_TYPES.PASS ? (
                        <Form.Item
                          name={[rate.id, "sessionIds"]}
                          initialValue={[avilableExperienceSessions?.data[0]?.id]}
                          hidden
                        />
                      ) : (
                        <Col md={12} xs={24}>
                          {[
                            ...(avilableExperienceSessions.data || []),
                            ...(experienceSessions.data?.filter((el) =>
                              rate.sessionIds.includes(el?.id),
                            ) || []),
                          ]?.length > 0 && (
                            <div className="select_with_select_all">
                              <Form.Item
                                initialValue={rate.sessionIds}
                                label={"Pricing sessions"}
                                name={[rate.id, "sessionIds"]}
                                rules={[
                                  {
                                    validator: (_, value) => {
                                      if (!value || value?.length === 0) {
                                        return Promise.reject("Select at least one session");
                                      }

                                      return Promise.resolve();
                                    },
                                  },
                                ]}>
                                <Select mode="multiple">
                                  {[
                                    ...(avilableExperienceSessions.data || []),
                                    ...(experienceSessions.data?.filter((el) =>
                                      rate.sessionIds.includes(el?.id),
                                    ) || []),
                                  ].map((el) => (
                                    <Select.Option key={el?.id} value={Number(el?.id)}>
                                      {el?.fromDate && dayjs(el?.fromDate).format("DD/MM/YYYY")} -
                                      {el?.toDate && dayjs(el?.toDate).format("DD/MM/YYYY")}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <CustomButton
                                className="select_with_select_all_btn"
                                size="small"
                                onClick={() => {
                                  editForm.setFieldValue(
                                    "sessionIds",
                                    avilableExperienceSessions.data.map((el) => el.id),
                                  );
                                  editForm.validateFields(["sessionIds"]);
                                }}
                                color="dark">
                                Select all
                              </CustomButton>
                            </div>
                          )}
                        </Col>
                      )}

                      <Col span={24}>
                        {editPriceType === PASSENGER_PRICE_TYPE.PER_BOOKING ? (
                          <>
                            <Form.Item
                              name={[rate.id, "price"]}
                              label={"Price"}
                              initialValue={rate.price}
                              rules={[
                                {
                                  validator: (_, value) => {
                                    if (!value) {
                                      return Promise.reject("Price is required filed");
                                    }

                                    if (value <= 0) {
                                      return Promise.reject("Price can't be less than 0");
                                    }

                                    return Promise.resolve();
                                  },
                                },
                              ]}>
                              <Input type="number" min={0} placeholder="Enter price" />
                            </Form.Item>
                            {pricingCategories?.data.map((el, index) => (
                              <Fragment key={el.id}>
                                <Form.Item
                                  hidden
                                  name={[rate.id, "pricingCategory", index, "id"]}
                                  initialValue={el?.id}
                                />
                                <Form.Item
                                  hidden
                                  name={[rate.id, "pricingCategory", index, "isDefault"]}
                                  initialValue={false}
                                />
                                <Form.Item
                                  initialValue={null}
                                  name={[rate.id, "pricingCategory", index, "price"]}
                                  hidden
                                />
                              </Fragment>
                            ))}
                            <p className="fz-16 fw-600">Included categories</p>
                            <div className="d-flex" style={{ gap: "16px" }}>
                              {pricingCategories?.data.map((el, index) => (
                                <Form.Item
                                  key={el.id}
                                  initialValue={rate.pricingCategory.find(
                                    (item) => item.pricingCategoryId === el.id,
                                  )}
                                  valuePropName="checked"
                                  name={[rate.id, "pricingCategory", index, "doesIncluded"]}
                                  rules={[
                                    {
                                      validator: () => {
                                        const Included = editForm
                                          .getFieldValue([rate.id, "pricingCategory"])
                                          ?.filter((el) => el.doesIncluded);
                                        if (Included?.length === 0) {
                                          return Promise.reject("Select at least one category");
                                        }
                                        return Promise.resolve();
                                      },
                                    },
                                  ]}>
                                  <Checkbox id={"pricingCategory" + index}>{el.name}</Checkbox>
                                </Form.Item>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div>
                            <p className="f-18 fw-600">Categories pricess</p>
                            <p className="fz-14 fw-400 gc" style={{ marginBottom: "0.5rem" }}>
                              The category that doesn't have a price will consider not included for
                              this rate
                            </p>
                            {pricingCategories?.data.map((el, index) => (
                              <div className="system_category space-between" key={el.id}>
                                <Form.Item
                                  hidden
                                  name={[rate.id, "pricingCategory", index, "id"]}
                                  initialValue={el?.id}
                                />
                                <Form.Item
                                  hidden
                                  name={[rate.id, "pricingCategory", index, "isDefault"]}
                                  initialValue={false}
                                />
                                <Form.Item
                                  className="w-100"
                                  label={`Price for ${el.name}`}
                                  initialValue={
                                    rate?.pricingCategory?.find(
                                      (item) => item.pricingCategoryId === el.id,
                                    )?.price
                                  }
                                  name={[rate.id, "pricingCategory", index, "price"]}
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        const pricesCount = editForm
                                          .getFieldValue([rate.id, "pricingCategory"])
                                          ?.filter(
                                            (el) => !isNaN(el?.price) && el?.price > 0,
                                          )?.length;

                                        if (pricesCount === 0 && (isNaN(value) || value === "")) {
                                          return Promise.reject("Add at least one categoriy price");
                                        }
                                        return Promise.resolve();
                                      },
                                    },
                                  ]}>
                                  <Input
                                    type="number"
                                    min={0}
                                    placeholder={`Enter price for ${el.name}`}
                                    addonAfter={"USD"}
                                  />
                                </Form.Item>
                              </div>
                            ))}
                          </div>
                        )}
                      </Col>
                      <Col span={24} style={{ display: "flex", justifyItems: "flex-end" }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={updatePricingRateMutation.isPending}>
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                ),
              };
            })}
          />
        )}
      </div>
      {/* ADD FORM */}
      {avilableExperienceSessions?.data?.length > 0 &&
        (pricingRates?.data?.length === 0 || isAddNewRate) && (
          <Collapse
            activeKey={"new"}
            size="small"
            items={[
              {
                key: "new",
                label: "New Rate",
                children: (
                  <Form form={addForm} layout="vertical" onFinish={handelAddNewRate}>
                    <Row gutter={[16, 12]}>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name="title"
                          label={"Title"}
                          initialValue={pricingRates?.data?.length === 0 ? "Stander rate" : ""}
                          rules={[{ required: true, message: "Please add rate title" }]}>
                          <Input placeholder="title" disabled={pricingRates?.data?.length === 0} />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item
                          name={"priceType"}
                          label={"Passenger price type"}
                          initialValue={PASSENGER_PRICE_TYPE.PER_PERSON}
                          rules={[{ required: true, message: "Please select price type" }]}>
                          <Select
                            placeholder={"price type"}
                            options={[
                              { label: "Per person", value: PASSENGER_PRICE_TYPE.PER_PERSON },
                              { label: "Per booking", value: PASSENGER_PRICE_TYPE.PER_BOOKING },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        md={availabilityQuery.data.type === AVAILABILITY_TYPES.PASS ? 24 : 12}
                        xs={24}>
                        <Form.Item
                          name="cancellationPolicy"
                          rules={[
                            {
                              required: true,
                              message: "You have to select the Cancellation policy",
                            },
                          ]}
                          initialValue={cancelationPoliciesQuery?.data?.[0]?.id}
                          label="Cancellation Policy">
                          <Select
                            placeholder="cancellation"
                            options={cancelationPoliciesQuery?.data?.map((el) => {
                              return { value: el.id, label: el.name };
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        {avilableExperienceSessions?.data?.length > 0 &&
                          (availabilityQuery.data.type === AVAILABILITY_TYPES.PASS ? (
                            <Form.Item
                              name={["sessionIds"]}
                              initialValue={[avilableExperienceSessions?.data[0]?.id]}
                              hidden
                            />
                          ) : (
                            <div className="select_with_select_all">
                              <Form.Item
                                label={"Pricing sessions"}
                                name={"sessionIds"}
                                initialValue={avilableExperienceSessions?.data?.map((el) =>
                                  Number(el?.id),
                                )}>
                                <Select mode="multiple">
                                  {avilableExperienceSessions?.data.map((el) => (
                                    <Select.Option key={el?.id} value={Number(el?.id)}>
                                      {el?.fromDate && dayjs(el?.fromDate).format("DD/MM/YYYY")} -
                                      {el?.toDate && dayjs(el?.toDate).format("DD/MM/YYYY")}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <CustomButton
                                className="select_with_select_all_btn"
                                size="small"
                                onClick={() => {
                                  addForm.setFieldValue(
                                    "sessionIds",
                                    avilableExperienceSessions?.data.map((el) => el.id),
                                  );
                                  addForm.validateFields(["sessionIds"]);
                                }}
                                color="dark">
                                Select all
                              </CustomButton>
                            </div>
                          ))}
                      </Col>
                      <Col span={24}>
                        {addPriceType === PASSENGER_PRICE_TYPE.PER_BOOKING ? (
                          <>
                            <Form.Item
                              name={"price"}
                              label={"Price"}
                              rules={[
                                {
                                  validator: (_, value) => {
                                    if (!value) {
                                      return Promise.reject("Price is required filed");
                                    }

                                    if (value <= 0) {
                                      return Promise.reject("Price can't be less than 0");
                                    }

                                    return Promise.resolve();
                                  },
                                },
                              ]}>
                              <Input type="number" min={0} placeholder="Enter price" />
                            </Form.Item>
                            {pricingCategories?.data.map((el, index) => (
                              <Fragment key={el.id}>
                                <Form.Item
                                  hidden
                                  name={["pricingCategory", index, "id"]}
                                  initialValue={el?.id}
                                />
                                <Form.Item
                                  hidden
                                  name={["pricingCategory", index, "isDefault"]}
                                  initialValue={false}
                                />
                                <Form.Item
                                  initialValue={null}
                                  name={["pricingCategory", index, "price"]}
                                  hidden
                                />
                              </Fragment>
                            ))}
                            <p className="fz-16 fw-600">Included categories</p>
                            <div className="d-flex" style={{ gap: "16px" }}>
                              {pricingCategories?.data.map((el, index) => (
                                <Form.Item
                                  key={el.id}
                                  valuePropName="checked"
                                  name={["pricingCategory", index, "doesIncluded"]}
                                  rules={[
                                    {
                                      validator: () => {
                                        const Included = addForm
                                          .getFieldValue("pricingCategory")
                                          ?.filter((el) => el.doesIncluded);
                                        if (Included?.length === 0) {
                                          return Promise.reject("Select at least one category");
                                        }
                                        return Promise.resolve();
                                      },
                                    },
                                  ]}>
                                  <Checkbox id={"pricingCategory" + index}>{el.name}</Checkbox>
                                </Form.Item>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div>
                            <p className="f-18 fw-600">Categories pricess</p>
                            <p className="fz-14 fw-400 gc" style={{ marginBottom: "0.5rem" }}>
                              The category that doesn't have a price will consider not included for
                              this rate
                            </p>
                            {pricingCategories?.data.map((el, index) => (
                              <div className="system_category space-between" key={el.id}>
                                <Form.Item
                                  hidden
                                  name={["pricingCategory", index, "id"]}
                                  initialValue={el?.id}
                                />
                                <Form.Item
                                  hidden
                                  name={["pricingCategory", index, "isDefault"]}
                                  initialValue={false}
                                />
                                <Form.Item
                                  className="w-100"
                                  label={`Price for ${el.name}`}
                                  name={["pricingCategory", index, "price"]}
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        const pricesCount = addForm
                                          .getFieldValue("pricingCategory")
                                          ?.filter(
                                            (el) => !isNaN(el?.price) && el?.price > 0,
                                          )?.length;
                                        if ((pricesCount === 0 && isNaN(value)) || value === "") {
                                          return Promise.reject("Add at least one categoriy price");
                                        }

                                        if (value < 0) {
                                          return Promise.reject("Price can't be less than 0");
                                        }
                                        return Promise.resolve();
                                      },
                                    },
                                  ]}>
                                  <Input
                                    type="number"
                                    min={0}
                                    placeholder={`Enter price for ${el.name}`}
                                    addonAfter={"USD"}
                                  />
                                </Form.Item>
                              </div>
                            ))}
                          </div>
                        )}
                      </Col>
                      <Col span={24}>
                        <CustomButton
                          type="default"
                          className="mr-1"
                          onClick={() => setIsAddNewRate(false)}>
                          cancel
                        </CustomButton>
                        <Button
                          type="primary"
                          loading={addPricingRateMutation?.isPending}
                          color="dark"
                          htmlType="submit">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                ),
              },
            ]}
          />
        )}
      {avilableExperienceSessions?.data?.length > 0 &&
        !(pricingRates?.data?.length === 0 || isAddNewRate) && (
          <CustomButton
            onClick={() => {
              setIsAddNewRate(true);
            }}
            color="dark">
            Add new Rate
          </CustomButton>
        )}
      {avilableExperienceSessions?.data?.length === 0 && pricingRates?.data?.length === 0 && (
        <p className="fz-18 mt-1 fw-600">
          You have to add sessions before adding price go to availability tab and add sessions
        </p>
      )}
    </div>
  );
};

export default NewRates;
