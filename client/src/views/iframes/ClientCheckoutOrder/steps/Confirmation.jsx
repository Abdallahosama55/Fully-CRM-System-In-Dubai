import { Flex, message, Spin, Typography } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import UnityCheckoutService from "../api";

const Confirmation = ({ total, currencyCode, data, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState({});
  useEffect(() => {
    setIsLoading(true);
    UnityCheckoutService.addOrder(
      { ...data, total, currencyCode, mobile: data?.mobile },
      token,
    )
      .then((res) => {
        setOrder({
          ...data,
          total,
          currencyCode,
          mobile: data?.mobile,
          id: res?.data?.data,
        });
        setOrderId(res?.data?.data);
        message.success("Order has been successfully placed");
      })
      .catch((error) => {
        message.error(error.message || "Error in registaring the order");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Flex style={{ height: "100dvh" }} vertical align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  if (!isLoading && !orderId) {
    return (
      <div>
        <Typography.Title level={4}>Order Failed!</Typography.Title>
        <p style={{ fontSize: "18px", marginTop: "20px" }}>
          Your order has been failed to place. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Typography.Title level={4}>Thank You for Your Order!</Typography.Title>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Your order has been successfully placed. We appreciate your business!
      </p>

      <div>
        <p>
          <strong>Order Number:</strong> #{orderId}
        </p>
        <p>
          <strong>Order Date:</strong> {dayjs().format("MMMM DD, YYYY")}
        </p>
        <p>
          <strong>Total Amount:</strong> {order?.currencyCode} {order?.total}
        </p>
        <p style={{ marginTop: "10px" }}>A confirmation email has been sent to your inbox.</p>
      </div>
    </div>
  );
};

export default Confirmation;
