import { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Typography, notification } from "antd";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { LoadingOutlined } from "@ant-design/icons";
import { useChat } from "@livekit/components-react";

import useAddPlaceOrder from "services/Store/Mutations/useAddPlaceOrder";
import { axiosCatch } from "utils/axiosUtils";
import { ArrowSVG } from "assets/jsx-svg";
import userContext from "context/userContext";

import "./styles.css";

export default function CheckoutForm({
  setActiveBtn,
  counterFormData,
  checkoutPrice,
  cardItems,
  setCardItems,
  isAgentMeeting,
  createPaymentIntentLoading,
}) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { addPlaceOrder } = useAddPlaceOrder();
  const { send } = useChat();
  const { user } = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      //   confirmParams: {
      //     // Make sure to change this to your payment completion page
      //     return_url: `${window.location.href}?step=3`,

      //   },
      redirect: "if_required",
    });

    if (!error) {
      try {
        if (paymentIntent && cardItems) {
          await addPlaceOrder({
            paymentType: 1,
            customerId: isAgentMeeting ? user.id : cardItems?.[0].customerId,
          });
          setCardItems && setCardItems([]);
        }
      } catch (err) {
        axiosCatch(err);
      }
      if (isAgentMeeting) {
        send("<systemCommand> { functionType: 'PaymentSuccessed' } </systemCommand>");
      }
      setActiveBtn("paymentSucess");
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      setActiveBtn("paymentFailed");
      if (error.type === "card_error" || error.type === "validation_error") {
        notification.error({ message: error.message });
      } else {
        notification.error({ message: "An unexpected error occurred." });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          notification.success({ message: "Payment succeeded!" });
          break;
        case "processing":
          notification.info({ message: "Your payment is processing." });
          break;
        case "requires_payment_method":
          notification.error({ message: "Your payment was not successful, please try again." });
          break;
        default:
          notification.error({ message: "Something went wrong." });
          break;
      }
    });
  }, [stripe]);

  return (
    <form id="payment-form" onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => console.log(e.target?.value)}
      />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />

      <Button
        className="pay-button mt-1 w-100"
        onClick={handleSubmit}
        type="primary"
        style={{
          pointerEvents: (createPaymentIntentLoading || loading || !stripe || !elements) && "none",
        }}
        id="submit">
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Text className="wc">{`${
              window.location.hostname.match("airsenegal")
                ? "XOF"
                : window.location.hostname.match("misa")
                ? "SAR"
                : "AED"
            } ${
              counterFormData?.price ? counterFormData?.price || 0 : checkoutPrice || 0
            }.00`}</Typography.Text>
          </Col>
          <Col>
            <Row align="middle" gutter={[8, 0]}>
              <Col>
                <Typography.Text className="wc">Pay</Typography.Text>
              </Col>
              <Col>
                <Row align="middle">
                  {createPaymentIntentLoading || loading || !stripe || !elements ? (
                    <LoadingOutlined className="wc" />
                  ) : (
                    <ArrowSVG />
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
}
