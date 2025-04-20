import { Button, Divider, Flex, Form, Radio, Typography } from "antd";
import React from "react";
import formatNumber from "utils/formatNumber";
import { PAYMENT_METHODS } from "..";

const OrderInfo = ({ total, subTotal, taxes, currencyCode }) => {
  return (
    <Flex vertical justify="space-between" style={{ height: "calc(100dvh - 40px)" }}>
      <div>
        <Typography.Title level={4}>Your payment</Typography.Title>
        <Flex align="center" justify="space-between">
          <Typography.Paragraph>Sub Total</Typography.Paragraph>
          <Typography.Paragraph>
            {formatNumber(subTotal)} {currencyCode}
          </Typography.Paragraph>
        </Flex>
        <Flex align="center" justify="space-between">
          <Typography.Paragraph>Taxes</Typography.Paragraph>
          <Typography.Paragraph>
            {formatNumber(taxes)} {currencyCode}
          </Typography.Paragraph>
        </Flex>
        <Flex align="center" justify="space-between">
          <Typography.Paragraph>Total</Typography.Paragraph>
          <Typography.Paragraph>
            {formatNumber(total)} {currencyCode}
          </Typography.Paragraph>
        </Flex>
      </div>
      <div>
        <Divider />
        <Typography.Title level={4}>Choose your payment</Typography.Title>
        <Form.Item
          name={"paymentMethod"}
          initialValue={PAYMENT_METHODS.STRIPE}
          rules={[{ required: true, message: "Payment method is required" }]}>
          <Radio.Group>
            <Radio value={PAYMENT_METHODS.STRIPE}>Credit Card</Radio>
            <Radio value={PAYMENT_METHODS.CASH}>Cash</Radio>
            <Radio value={PAYMENT_METHODS.HANDEL_ON_DELIVERY}>Handel on delivery</Radio>
          </Radio.Group>
        </Form.Item>
        <Button htmlType="submit" type="primary" block>
          Pay
        </Button>
      </div>
    </Flex>
  );
};

export default OrderInfo;
