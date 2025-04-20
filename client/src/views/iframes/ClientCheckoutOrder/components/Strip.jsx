import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Flex, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import StripForm from "./StripForm";
import UnityCheckoutService from "../api";

const stripePromise = loadStripe(
  "pk_test_51MpgtPIO9wkKsa8Q5nuzPo5MLmo1UXps32SQpRna9nVYaxCtsjKNxbe8x3sfop0Aae3o1cDLVjFD4Mp8aDFIQ2NR006ueWFgB9",
);

const Strip = ({ token, total, currencyCode, goToNextStep }) => {
  const [isCreatePaymentIntentLoading, setIsCreatePaymentIntentLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Create PaymentIntent as soon as the component mounts
    (async () => {
      if (token) {
        try {
          const res = await UnityCheckoutService.createPaymentIntent(token);
          setClientSecret(res.data.clientSecret);
        } catch (err) {
          message.error(err.message || "Error in creating payment intent");
        } finally {
          setIsCreatePaymentIntentLoading(false);
        }
      }
    })();
  }, [token]);

  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
    locale: "en",
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <StripForm
        goToNextStep={goToNextStep}
        total={total}
        currencyCode={currencyCode}
        isCreatePaymentIntentLoading={isCreatePaymentIntentLoading}
      />
    </Elements>
  ) : (
    <Flex style={{ height: "100dvh" }} vertical align="center" justify="center">
      <Spin />
    </Flex>
  );
};

export default Strip;
