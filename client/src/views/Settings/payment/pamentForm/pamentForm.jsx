import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import StoreService from "services/store.service";
import { useNotification } from "context/notificationContext";
import { axiosCatch } from "utils/axiosUtils";

function PamentForm({
  listPayment,
  handleCancel,
  setRefentsh,
  id,
  setId,
  setListCompanyPaymentGatewayData,
}) {
  const { openNotificationWithIcon } = useNotification();
  const [isLoading, setISLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setISLoading(true);
    const data = {
      name: listPayment.name,
      productionData: Object.entries(values.productionData).map(([name, type]) => ({
        name,
        type,
      })),

      testingData: Object.entries(values.testingData).map(([name, type]) => ({
        name,
        type,
      })),

      paymntGatewayId: listPayment.id,
    };

    try {
      if (id) {
        const res = await StoreService.updateCompanyPaymentGateway(id, data);
        setId("");
        setListCompanyPaymentGatewayData((prev) =>
          prev.map((data) => {
            if (data.id === id) {
              return res.data.data;
            }
            return data;
          }),
        );
        setRefentsh((prev) => !prev);
        openNotificationWithIcon("success", "Edit Company Payment Gateway sucessfully");
      } else {
        const res = await StoreService.addCompanyPaymentGateway(data);
        setListCompanyPaymentGatewayData((prev) => [
          ...prev,
          { ...res.data.data, paymntGateway: listPayment },
        ]);
        openNotificationWithIcon("success", "add Company Payment Gateway sucessfully");
      }

      form.resetFields();
      setISLoading(false);
      handleCancel();
    } catch (error) {
      axiosCatch(error);
      setISLoading(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
        name="basic"
        style={{ Width: 1000 }}
        onFinish={onFinish}
        autoComplete="off">
        <div style={{ marginBottom: "10px" }} className="fz-16 fw-600 mb-1">
          production
        </div>
        {JSON.parse(listPayment.productionForm).map((Payment) => (
          <Form.Item
            label={Payment.name}
            name={["productionData", Payment.name]}
            rules={[
              {
                required: true,
                message: `Please input your ${Payment.name}!`,
              },
            ]}>
            <Input type={Payment.type} />
          </Form.Item>
        ))}
        <div style={{ marginBottom: "10px" }} className="fz-16 fw-600 mb-1">
          testing
        </div>
        {JSON.parse(listPayment.testingForm).map((testing) => (
          <Form.Item
            label={testing.name}
            name={["testingData", testing.name]}
            rules={[
              {
                required: true,
                message: `Please input your ${testing.name}!`,
              },
            ]}>
            <Input type={testing.type} />
          </Form.Item>
        ))}

        <Form.Item
          wrapperCol={{
            span: 24,
          }}>
          <Button loading={isLoading} className="w-100" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PamentForm;
