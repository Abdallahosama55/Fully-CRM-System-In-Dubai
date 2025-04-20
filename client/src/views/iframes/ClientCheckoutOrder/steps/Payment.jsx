import React from "react";
import { PAYMENT_METHODS } from "..";
import { Button, Flex, Form, Input, Typography } from "antd";
import Strip from "../components/Strip";
const Payment = ({ token, paymentMethod, total, currencyCode, stripConfirmId, goToNextStep }) => {
  if (!total || !currencyCode) {
    return <></>;
  }

  if (paymentMethod === PAYMENT_METHODS.STRIPE) {
    return (
      <Strip
        token={token}
        total={total}
        currencyCode={currencyCode}
        stripConfirmId={stripConfirmId}
        goToNextStep={goToNextStep}
      />
    );
  }

  return (
    <Flex vertical justify="space-between" style={{ height: "calc(100dvh - 40px)" }}>
      <div>
        <Typography.Title level={4}>Payment verification</Typography.Title>
        <Form.Item
          name="verificationCode"
          label="Verification Code"
          rules={[{ required: true, message: "Verification code is required" }]}>
          <Input.OTP length={6} />
        </Form.Item>
      </div>
      <Button htmlType="submit" type="primary" block>
        Verify
      </Button>
    </Flex>
  );
};

export default Payment;
