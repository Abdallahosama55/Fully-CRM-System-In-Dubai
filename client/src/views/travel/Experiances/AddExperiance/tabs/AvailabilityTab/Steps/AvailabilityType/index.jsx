import { useEffect } from "react";
import { Col, DatePicker, Form, Radio, Row, Skeleton, Typography, message } from "antd";
import dayjs from "dayjs";

import useAddAvailability from "services/travel/experiance/AvailabilityTab/Mutations/useAddAvailability";
import useGetAvailability from "services/travel/experiance/AvailabilityTab/Querys/useGetAvailability";

import RadioInputCard from "components/common/RadioInputCard";

import { AVAILABILITY_TYPES } from "constants/EXPERIENCE";
import { queryClient } from "services/queryClient";
import { STEPS_KEYS } from "../../../../";
const AvailabilityType = ({ productId, next, setAvailabilityType, updateDoneSteps }) => {
  const [form] = Form.useForm();
  const availabilityType = Form.useWatch("availabilityType", form);
  useEffect(() => {
    setAvailabilityType(availabilityType);
  }, [availabilityType]);

  const fromDate = Form.useWatch("fromDate", form);
  const availabilityQuery = useGetAvailability(productId, {
    enabled: Boolean(productId),
    initialData: {},
  });

  // For set inatial data
  useEffect(() => {
    if (availabilityQuery.isSuccess && availabilityQuery.data) {
      form.setFieldValue({
        ...availabilityQuery.data,
        availabilityType: availabilityQuery?.data?.type,
      });
      if (availabilityQuery.data?.type) {
        setAvailabilityType(availabilityQuery.data.type);
      }
    }

    if (availabilityQuery?.isError) {
      message.error(availabilityQuery?.error?.message);
    }
  }, [
    availabilityQuery.isSuccess,
    availabilityQuery.isError,
    availabilityQuery.data,
    availabilityQuery.error,
    form,
    setAvailabilityType,
  ]);

  const addAvailabilityMutation = useAddAvailability(productId, {
    onSuccess: () => {
      setAvailabilityType(availabilityType);
      queryClient.setQueryData(availabilityQuery.key, (prev) => ({
        ...prev,
        type: availabilityType,
      }));
      updateDoneSteps(STEPS_KEYS.AVAILABILITY_TYPE);
      next();
    },
    onError: (error) => message.error(error?.message),
  });

  const handelNext = (values) => {
    if (!addAvailabilityMutation.isPending) {
      if (availabilityQuery?.data?.type && availabilityType === availabilityQuery?.data?.type) {
        setAvailabilityType(availabilityType);
        queryClient.setQueryData(availabilityQuery.key, (prev) => ({
          ...prev,
          type: availabilityType,
        }));
        updateDoneSteps(STEPS_KEYS.AVAILABILITY_TYPE);
        next();
      } else {
        addAvailabilityMutation.mutate({
          ...values,
          fromDate: dayjs(values.fromDate).format("YYYY-MM-DD"),
          toDate: dayjs(values.toDate).format("YYYY-MM-DD"),
        });
      }
    }
  };

  if (availabilityQuery?.isLoading || availabilityQuery?.isFetching) {
    return <Skeleton active />;
  }

  return (
    <Form
      scrollToFirstError={{ behavior: "smooth" }}
      id="form_inside_tab"
      initialValues={{
        ...availabilityQuery?.data,
        availabilityType: availabilityQuery?.data?.type || AVAILABILITY_TYPES.FREE_SALE,
        fromDate: availabilityQuery?.data?.fromDate
          ? dayjs(availabilityQuery?.data?.fromDate)
          : undefined,
        toDate: availabilityQuery?.data?.toDate
          ? dayjs(availabilityQuery?.data?.toDate)
          : undefined,
      }}
      layout="vertical"
      onFinish={handelNext}
      form={form}>
      <Typography.Title level={3} className="fz-18 title availability_tab_title">
        Define your pricing structure
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        You can set up prices for your different pricing categories, rates, and additional extras.
        These prices will automatically be converted to other currencies, so you don't have to worry
        about exchange rates
      </Typography.Paragraph>

      <Form.Item
        name="availabilityType"
        label={<p className="fz-16">Type</p>}
        rules={[{ required: true, message: "you have to select the availability type" }]}>
        <Radio.Group>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <RadioInputCard
                value={AVAILABILITY_TYPES.FREE_SALE}
                title={"Free sale"}
                description={"Customers can book at any time without any restrictions or details"}
              />
            </Col>
            <Col span={24}>
              <RadioInputCard
                value={AVAILABILITY_TYPES.DATE_AND_TIME}
                title={"Date and time"}
                description={"Customers select both date and time when booking this product"}
              />
            </Col>
            <Col span={24}>
              <RadioInputCard
                value={AVAILABILITY_TYPES.PASS}
                title={"Pass"}
                description={
                  "No date is selected when booking this product. It is more of a pass than a date based ticket"
                }
              />
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>

      {availabilityType && availabilityType === AVAILABILITY_TYPES.DATE_AND_TIME && (
        <Row gutter={[12, 12]}>
          <Col lg={12} md={24}>
            <Form.Item
              name="fromDate"
              label={"Start Date"}
              rules={[{ required: true, message: "You have to select start date" }]}>
              <DatePicker className="w-100" />
            </Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item
              name="toDate"
              label={"End Date"}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("You have to select end date");
                    }

                    if (fromDate && dayjs(value).isBefore(fromDate)) {
                      return Promise.reject("End date can't be befor start date");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <DatePicker
                className="w-100"
                disabledDate={(current) => {
                  return dayjs(current).isBefore(dayjs(fromDate), "day");
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default AvailabilityType;
