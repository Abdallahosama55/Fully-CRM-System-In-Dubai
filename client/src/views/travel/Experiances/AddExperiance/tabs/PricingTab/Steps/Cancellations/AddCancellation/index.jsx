import React, { useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
// API CALLS
import useGetCancelationPoliciesTypes from "services/travel/experiance/CancelationTab/Queries/useGetCancelationPoliciesTypes";
import useAddCancelationPolicy from "services/travel/experiance/CancelationTab/Mutations/useAddCancelationPolicy";
import useEditCancelationPolicy from "services/travel/experiance/CancelationTab/Mutations/useEditCancelationPolicy";

import LoadingPage from "components/common/LoadingPage";
import dayjs from "dayjs";
import {
  CANCELLATION_POLICY_DATE_RANGE_TYPES,
  CANCELLATION_POLICY_PERIOD_TYPE,
} from "constants/EXPERIENCE";
import ArrowDownSVG from "assets/jsx-svg/ArrowDownSVG";
const AddCancellation = ({ data, id, experianceId, onEnd }) => {
  const [form] = useForm();
  const applicableDateRange = useWatch("applicableDateRange", form);
  const type = useWatch("type", form);

  // QUERIES
  const cancelationPoliciesTypesQuery = useGetCancelationPoliciesTypes({
    onSuccess: () => {
      if (!form.getFieldValue("type")) {
        form.setFieldValue(
          "type",
          Array.isArray(cancelationPoliciesTypesQuery.data)
            ? cancelationPoliciesTypesQuery?.data?.[0]?.id
            : undefined,
        );
      }

      if (!form.getFieldValue("name")) {
        form.setFieldValue(
          "name",
          Array.isArray(cancelationPoliciesTypesQuery.data)
            ? cancelationPoliciesTypesQuery?.data?.[0]?.name
            : "",
        );
      }
      if (!form.getFieldValue("fees")) {
        form.setFieldValue("fees", 0);
      }
      if (!form.getFieldValue("description")) {
        form.setFieldValue(
          "description",
          Array.isArray(cancelationPoliciesTypesQuery.data)
            ? cancelationPoliciesTypesQuery?.data?.[0]?.name
            : "",
        );
      }
    },
  });
  // MUTATIONS
  const addCancelationPolicyMutation = useAddCancelationPolicy({
    onSuccess: () => {
      message.success("Cancellation policy added successfully");
      onEnd();
    },
    onError: (error) => message.error(error.message),
  });

  const editCancelationPolicyMutation = useEditCancelationPolicy({
    onSuccess: () => {
      message.success("Cancellation policy updated successfully");
      onEnd();
    },
    onError: (error) => message.error(error.message),
  });

  const handelFinish = (values) => {
    const temp = {
      productId: experianceId,
      ...values,
      dateRangeFrom: values.dateRange ? dayjs(values.dateRange[0]).format("YYYY-MM-DD") : undefined,
      dateRangeTo: values.dateRange ? dayjs(values.dateRange[1]).format("YYYY-MM-DD") : undefined,
      dateRange: undefined,
      type: cancelationPoliciesTypesQuery.data?.find((el) => el.id === values.type).name,
    };

    if (id) {
      editCancelationPolicyMutation.mutate({
        id,
        ...data,
        ...temp,
      });
    } else {
      addCancelationPolicyMutation.mutate(temp);
    }
  };

  useEffect(() => {
    if (String(type) === "1") {
      form.setFieldValue("refundPercentage", 100);
    } else if (String(type) === "3") {
      form.setFieldValue("refundPercentage", 0);
    }
  }, [type]);

  // SET THE DATA IN THE FORM
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        type: cancelationPoliciesTypesQuery.data?.find((el) => el.name === data.type).id,
        periodType: data.periodType,
        applicableDateRange: data.applicableDateRange,
        dateRange: dayjs(data.dateRangeFrom).isValid()
          ? [dayjs(data.dateRangeFrom), dayjs(data.dateRangeTo)]
          : undefined,
      });
    }
  }, []);

  if (addCancelationPolicyMutation.isPending || editCancelationPolicyMutation.isPending) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Typography.Text className="fz-20 fw-500">
        {!id ? "Add" : "Edit"} Cancelation Policy
      </Typography.Text>
      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <div className="mt-1">
          <Row gutter={[20, 5]}>
            <Col lg={12} xs={24}>
              <Form.Item
                name="type"
                label={<p className="fz-16">Cancellation Type</p>}
                rules={[{ required: true, message: "Please select cancellation policy type" }]}>
                <Select
                  placeholder="cancellation type"
                  onSelect={(value) => {
                    form.setFieldValue(
                      "name",
                      cancelationPoliciesTypesQuery.data?.find((el) => el.id === value).name,
                    );
                  }}
                  options={cancelationPoliciesTypesQuery.data?.map((el) => ({
                    label: el.name,
                    value: el.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="name"
                label={<p className="fz-16">Policy Name</p>}
                rules={[{ required: true, message: "Please add policy name" }]}>
                <Input placeholder="policy name" />
              </Form.Item>
            </Col>

            <Col lg={12} xs={24}>
              <Form.Item
                name="refundPercentage"
                label={<p className="fz-16">Refund Percentage</p>}
                rules={[
                  {
                    validator: (_, value) => {
                      if (isNaN(value)) {
                        return Promise.reject("Please add refund percentage");
                      }
                      if (value < 0 || value > 100) {
                        return Promise.reject("refund percentage must be between 0 and 100");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input
                  disabled={String(type) === "1" || String(type) === "3"}
                  type="number"
                  min={0}
                  max={100}
                  placeholder="refund percentage"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fees"
                label={<p className="fz-16">Cancellation Fees</p>}
                rules={[
                  { required: true, message: "Please add cancellation fees" },
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Fees must be greater than 0");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input type="number" placeholder="cancellation fees" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label={<p className="fz-16">Policy Description</p>}
                rules={[{ required: true, message: "Please add policy description" }]}>
                <Input.TextArea rows={5} placeholder="policy description" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Typography.Title level={5}>Period :</Typography.Title>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="periodType"
                label={<p className="fz-16">Period Type</p>}
                initialValue={CANCELLATION_POLICY_PERIOD_TYPE.AFTER_RESRVATION}
                rules={[
                  { required: true, message: "Please select cancellation policy period type" },
                ]}>
                <Select
                  placeholder="period type"
                  suffixIcon={<ArrowDownSVG />}
                  options={[
                    {
                      value: CANCELLATION_POLICY_PERIOD_TYPE.AFTER_RESRVATION,
                      label: "After reservation",
                    },
                    {
                      value: CANCELLATION_POLICY_PERIOD_TYPE.BEFORE_CHECK_IN,
                      label: "Before check-in",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                name="periodHours"
                label={<p className="fz-16">Hours</p>}
                initialValue={0}
                rules={[
                  { required: true, message: "Please enter number of hours" },
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Hours must be greater than 0");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}>
                <InputNumber type="number" placeholder="period hours" className="w-100" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="applicableDateRange"
                label={<p className="fz-16">Applicable Date Range</p>}
                initialValue={CANCELLATION_POLICY_DATE_RANGE_TYPES.NO_RESTRICTIONS}
                rules={[{ required: true, message: "Please select date range type" }]}>
                <Select
                  suffixIcon={<ArrowDownSVG />}
                  options={[
                    {
                      label: "No Restrictions",
                      value: CANCELLATION_POLICY_DATE_RANGE_TYPES.NO_RESTRICTIONS,
                    },
                    {
                      label: "Restrict Date Range",
                      value: CANCELLATION_POLICY_DATE_RANGE_TYPES.RESTRICTED_DATE_RANGE,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            {applicableDateRange === CANCELLATION_POLICY_DATE_RANGE_TYPES.RESTRICTED_DATE_RANGE && (
              <Col span={24}>
                <Form.Item
                  name="dateRange"
                  label={<p className="fz-16">Date Range</p>}
                  rules={[{ required: true, message: "Please select date range" }]}>
                  <DatePicker.RangePicker className="w-100" />
                </Form.Item>
              </Col>
            )}
          </Row>
        </div>
        <Button htmlType="submit" type="primary" className="w-100 mt-1" color="dark">
          {id ? "Edit" : "Add"}
        </Button>
      </Form>
    </div>
  );
};

export default AddCancellation;
