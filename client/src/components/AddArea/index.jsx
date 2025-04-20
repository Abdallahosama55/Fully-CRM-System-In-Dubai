import { Button, Modal, Form, Input, Flex, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusSVG } from "assets/jsx-svg";
import CityInput from "components/common/CityInput";
import { useEffect } from "react";
import useAddArea from "services/travel/Settings/areas/Mutations/useAddArea";
export default function AddArea({ isOpen, city, close = () => {}, editObject }) {
  const [form] = useForm();
  useEffect(() => {
    if (editObject) {
      console.log("editObject", editObject);
      form.setFieldsValue({
        name: editObject?.name,
        city: editObject?.worldcity?.city,
      });
    }
  }, [editObject]);

  const addAreaMutation = useAddArea({
    onSuccess: (res) => {
      message?.success("Area added successfully");
      close(res);
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const onFinish = (values) => {
    console.log(values);
    const temp = {
      name: values?.name,
      cityId: values?.city ? values?.city?.id : undefined,
    };

    if (editObject) {
      // TODO: edit mutation
    } else {
      addAreaMutation.mutate(temp);
    }
  };

  return (
    <Modal centered={true} width={400} title={null} open={isOpen} onCancel={close} footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }} className="fz-18 fw-600">
        {editObject ? <span>Edit </span> : <span>Add New </span>}
        Area
      </h3>

      <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.Item
          required={false}
          label={"City"}
          name="city"
          initialValue={city}
          rules={[{ required: true, message: "Please select a city" }]}>
          <CityInput />
        </Form.Item>

        <Form.Item
          required={false}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter area name",
            },
          ]}>
          <Input placeholder="name" />
        </Form.Item>

        <Flex align="center" justify="space-between">
          <Button style={{ width: "48%" }} block onClick={close}>
            Cancel
          </Button>
          <span style={{ width: 5 }}></span>
          <Button
            htmlType="submit"
            type={"primary"}
            loading={addAreaMutation?.isPending}
            style={{ width: "48%" }}
            icon={<PlusSVG color={"#fff"} />}>
            {editObject ? <span>Edit</span> : <span>Add</span>}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}
