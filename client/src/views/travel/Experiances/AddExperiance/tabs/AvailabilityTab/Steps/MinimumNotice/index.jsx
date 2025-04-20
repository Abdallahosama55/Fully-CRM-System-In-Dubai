import { Form, Input, Skeleton, Typography, message } from "antd";
import { useEffect } from "react";
import useAddMinimumNotice from "services/travel/experiance/AvailabilityTab/Mutations/useAddMinimumNotice";
import useGetAvailability from "services/travel/experiance/AvailabilityTab/Querys/useGetAvailability";
import { AVAILABILITY_TYPES } from "constants/EXPERIENCE";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";

const MinimumNotice = ({ productId, next, availabilityType, updateDoneSteps }) => {
  const [form] = Form.useForm();

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
  }, [error, isError]);

  const { addMinimumNotice, isPending } = useAddMinimumNotice({
    onSuccess: () => {
      updateDoneSteps(STEPS_KEYS.MINIMUM_NOTICE);
      next();
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const handelFinish = (values) => {
    if (!isPending) {
      addMinimumNotice({ data: values, productId });
    }
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Form layout="vertical" onFinish={handelFinish} form={form} id="form_inside_tab">
      <Typography.Title level={3} className="fz-18 title availability_tab_title">
        What is the advance booking time?
      </Typography.Title>
      <Typography.Paragraph className="fz-14 sub_title">
        Is the experience easy, daily, or flexible?
      </Typography.Paragraph>
      <Form.Item
        label={"Minimum Notice"}
        name="minimumNotice"
        rules={[{ required: true, message: "You have to add the minimum notice" }]}>
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};

export default MinimumNotice;
