import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Col, message, Row, Typography } from "antd";
import React, { useState } from "react";

const StripForm = ({ total, currencyCode, isCreatePaymentIntentLoading, goToNextStep }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) {
      message.error("Stripe.js has not loaded yet.");
      return;
    }

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    console.log({ error, paymentIntent });

    if (error) {
      message.error(error.message || "Payment failed. Please try again.");
    } else if (paymentIntent?.status === "succeeded") {
      message.success("Payment succeeded!");
      goToNextStep({strip: {
        paymentIntentId: paymentIntent.id,
        paymentMethod: "stripe",
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      }});
    } else {
      message.info("Payment is processing. Please wait.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <PaymentElement options={{ layout: "tabs" }} />
      <Button
        style={{ marginTop: "1rem" }}
        onClick={handlePay}
        type="primary"
        className="pay-button mt-1 w-100"
        disabled={isCreatePaymentIntentLoading || isLoading || !stripe || !elements}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Text className="wc">
              {currencyCode?.toUpperCase()} {total}
            </Typography.Text>
          </Col>
        </Row>
      </Button>
    </div>
  );
};

export default StripForm;
