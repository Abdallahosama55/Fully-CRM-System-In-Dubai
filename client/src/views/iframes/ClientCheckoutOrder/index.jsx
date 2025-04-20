import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DataCollection from "./steps/DataCollection";
import OrderInfo from "./steps/OrderInfo";
import Payment from "./steps/Payment";
import Confirmation from "./steps/Confirmation";
import { Flex, Form, message, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import UnityCheckoutService from "./api";
const STEPS_IDS = {
  DATA_COLLECTION: 1,
  ORDER_INFO: 2,
  PAYMENT: 3,
  CONFIRMATION: 4,
};

export const PAYMENT_METHODS = {
  STRIPE: 1,
  CASH: 2,
  HANDEL_ON_DELIVERY: 3,
};

const ClientCheckoutOrder = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    UnityCheckoutService.getCart(token)
      .then((res) => {
        setCart(
          res?.data?.data?.reduce(
            (acc, item) => {
              return {
                total: acc.total + item.totalPriceWithTax,
                taxes: acc.taxes + (item.totalPriceWithTax - item.totalPrice),
                subTotal: acc.subTotal + item.totalPrice,
                currencyCode: item?.productVariant?.priceCurrencyCode || "usd",
              };
            },
            { total: 0, taxes: 0, subTotal: 0, currencyCode: "usd" },
          ),
        );
      })
      .catch((error) => {
        message.error(error?.message || "Error in getting cart");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const [formData, setFormData] = useState({});
  const [stepId, setStepId] = useState(STEPS_IDS.DATA_COLLECTION);
  const [form] = useForm();

  const onFinish = (values) => {
    setFormData((prevData) => ({ ...prevData, ...values }));

    switch (stepId) {
      case STEPS_IDS.DATA_COLLECTION:
        setStepId(STEPS_IDS.ORDER_INFO);
        break;
      case STEPS_IDS.ORDER_INFO:
        if (values?.paymentMethod === PAYMENT_METHODS.HANDEL_ON_DELIVERY) {
          setStepId(STEPS_IDS.CONFIRMATION);
        } else {
          setStepId(STEPS_IDS.PAYMENT);
        }
        break;
      case STEPS_IDS.PAYMENT:
        setStepId(STEPS_IDS.CONFIRMATION);
        break;
      case STEPS_IDS.CONFIRMATION:
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <Flex style={{ height: "100dvh" }} vertical align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={formData}>
        {stepId === STEPS_IDS.DATA_COLLECTION && <DataCollection />}
        {stepId === STEPS_IDS.ORDER_INFO && (
          <OrderInfo
            total={cart?.total}
            subTotal={cart?.subTotal}
            taxes={cart?.taxes}
            currencyCode={cart?.currencyCode}
          />
        )}
        {stepId === STEPS_IDS.PAYMENT && (
          <Payment
            token={token}
            total={cart?.total}
            currencyCode={cart?.currencyCode}
            paymentMethod={formData?.paymentMethod}
            goToNextStep={(data) => {
              setFormData((prevData) => ({ ...prevData, ...data }));
              form.submit();
            }}
          />
        )}
        {stepId === STEPS_IDS.CONFIRMATION && (
          <Confirmation
            total={cart?.total}
            currencyCode={cart?.currencyCode}
            data={formData}
            token={token}
          />
        )}
      </Form>
    </div>
  );
};

export default ClientCheckoutOrder;
