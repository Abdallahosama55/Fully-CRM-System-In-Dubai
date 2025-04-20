import { Col, Form, Input, Radio, Row, Skeleton, Typography, message } from "antd";
import RadioInputCard from "components/common/RadioInputCard";
import { AVAILABILITY_TYPES, CAPACITY_TYPES } from "constants/EXPERIENCE";
import useGetAvailability from "services/travel/experiance/AvailabilityTab/Querys/useGetAvailability";
import useAddCapacity from "services/travel/experiance/AvailabilityTab/Mutations/useAddCapacity";
import { useEffect } from "react";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";

const Capacity = ({ next, productId, availabilityType , updateDoneSteps }) => {
  const [form] = Form.useForm();
  const capacityType = Form.useWatch("capacityType", form);

  const {
    data: availabilitData,
    isError,
    error,
    isPending: isLoading,
  } = useGetAvailability(productId);

  useEffect(() => {
    if (availabilitData) {
      form.setFieldsValue(availabilitData);
    }
  }, [availabilitData, form]);

  useEffect(() => {
    if (isError) {
      message.error(error.message);
    }
  }, [isError, error]);

  const addCapacityMutation = useAddCapacity(productId, {
    onSuccess: () => {
      updateDoneSteps(STEPS_KEYS.CAPACITY);
      next();
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const handelFinish = (values) => {
    addCapacityMutation.mutate(values);
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Form
      scrollToFirstError={{ behavior: "smooth" }}
      form={form}
      layout="vertical"
      onFinish={handelFinish}
      id="form_inside_tab">
      <Typography.Title level={3} className="fz-18 title availability_tab_title">
        What is your experience's capacity?
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        Do you have a maximum number of travellers per departure, or do you review and approve each
        booking individually?
      </Typography.Paragraph>
      <Form.Item
        name="capacityType"
        rules={[{ required: true, message: "chose the capacity type" }]}>
        <Radio.Group>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <RadioInputCard
                title={"Free sale (unlimited)"}
                description={"There is no limit. Confirm as many bookings as possible."}
                value={CAPACITY_TYPES.FREE_SALE}
              />
            </Col>
            <Col span={24}>
              <RadioInputCard
                title={"Limited number"}
                description={
                  "I have limited capacity. Bookings should only be confirmed as long as there are seats remaining."
                }
                value={CAPACITY_TYPES.LIMITED_NUMBER}
              />
            </Col>
            <Col span={24}>
              <RadioInputCard
                title={"On request (not recommended)"}
                description={
                  "Bookings cannot be confirmed immediately. The customer waits until I manually confirm or reject their booking request."
                }
                value={CAPACITY_TYPES.ON_REQUEST}
              />
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>
      {capacityType === CAPACITY_TYPES.LIMITED_NUMBER && (
        <Form.Item
          name="limitNo"
          label={"Limit number"}
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject("Add the limit number");
                }

                if (value < 0) {
                  return Promise.reject("limit number have to be gretar than 0");
                }

                return Promise.resolve();
              },
            },
          ]}>
          <Input type="number" min={0} />
        </Form.Item>
      )}
    </Form>
  );
};

export default Capacity;
