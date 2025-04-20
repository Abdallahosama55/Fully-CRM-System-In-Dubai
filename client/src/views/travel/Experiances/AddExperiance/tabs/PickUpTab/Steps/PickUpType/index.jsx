import { Form, Radio, Skeleton, Typography, message } from "antd";
import RadioInputCard from "components/common/RadioInputCard";
import { PICK_UP_TYPES } from "constants/EXPERIENCE";
import useAddPickUpType from "services/travel/experiance/PickUpTab/Mutations/useAddPickUpType";
import useGetPickUpType from "services/travel/experiance/PickUpTab/Querys/useGetPickUpType";
import { queryClient } from "services/queryClient";
import { useWatch } from "antd/es/form/Form";
import { STEPS_KEYS } from "views/travel/Experiances/AddExperiance";
import { useEffect } from "react";

const PickUpType = ({ next, setPickUpType, updateDoneSteps, id: productId }) => {
  const [form] = Form.useForm();
  const pickUp = useWatch("pickUp", form);

  useEffect(() => {
    setPickUpType(pickUp);
  }, [pickUp]);
  // GET DATA
  const getPickUpTypeQuery = useGetPickUpType(productId, {
    onSuccess: (data) => {
      if (!data.pickUp) {
        setPickUpType(PICK_UP_TYPES.MEET_ON_LOCATION);
        form.setFieldValue("pickUp", PICK_UP_TYPES.MEET_ON_LOCATION);
      } else {
        setPickUpType(data.pickUp);
        form.setFieldValue("pickUp", data.pickUp);
      }
    },
  });

  // Add Pickup
  const addPickUpTypeMutation = useAddPickUpType(productId, {
    onSuccess: (data) => {
      if (data) {
        setPickUpType(data);
        queryClient.setQueryData(getPickUpTypeQuery.key, (prev) => ({ ...prev, pickUp: data }));
      }
      updateDoneSteps(STEPS_KEYS.PICK_UP_TYPE);
      next();
    },
    onError: (error) => message.error(error.message),
  });

  const handelFinish = (values) => {
    addPickUpTypeMutation.mutate(values.pickUp);
  };

  if (getPickUpTypeQuery?.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      <Typography.Title level={3} className="fz-26 title">
        Can travellers be picked up for the experience?
      </Typography.Title>
      <Typography.Paragraph className="fz-18 sub_title">
        ...or should the travellers meet you on location?
      </Typography.Paragraph>
      <Form id="form_inside_tab" layout="vertical" onFinish={handelFinish} form={form}>
        <Form.Item
          name="pickUp"
          rules={[{ required: true, message: "Select the pick-up type" }]}
          initialValue={PICK_UP_TYPES.MEET_ON_LOCATION}>
          <Radio.Group>
            <RadioInputCard
              title={"Meet on location"}
              description={
                "This experience has no pick-up service, customers have to make their way to our meeting point."
              }
              value={PICK_UP_TYPES.MEET_ON_LOCATION}
              isChecked={pickUp === PICK_UP_TYPES.MEET_ON_LOCATION}
            />
            <RadioInputCard
              title={"Pick-up only"}
              description={"Customers must be picked up from selected pick-up locations."}
              value={PICK_UP_TYPES.PICK_UP_ONLY}
              isChecked={pickUp === PICK_UP_TYPES.PICK_UP_ONLY}
            />
            <RadioInputCard
              title={"Meet on location or pick-up"}
              description={"Customers can come to our location or we can pick them up on request."}
              value={PICK_UP_TYPES.MEET_ON_LOCATION_OR_PICK_UP}
              isChecked={pickUp === PICK_UP_TYPES.MEET_ON_LOCATION_OR_PICK_UP}
            />
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PickUpType;
