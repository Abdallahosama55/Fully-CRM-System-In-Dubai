import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import StripeService from "services/stripe.service";

import "./styles.css";
import { Col, Row, Typography } from "antd";
import { ArrowRightSVG } from "assets/jsx-svg";
import { useLocation } from "react-router-dom";
import { axiosCatch } from "utils/axiosUtils";

const stripePromise = loadStripe(
  "pk_test_51MpgtPIO9wkKsa8Q5nuzPo5MLmo1UXps32SQpRna9nVYaxCtsjKNxbe8x3sfop0Aae3o1cDLVjFD4Mp8aDFIQ2NR006ueWFgB9",
);
export default function Cart({
  setActiveBtn,
  meetingSettings,
  checkoutPrice,
  isHost,
  cardItems,
  setCardItems,
  isAgentMeeting,
}) {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [counterFormData, setCounterFormData] = useState({});
  const [createPaymentIntentLoading, setCreatePaymentIntentLoading] = useState(false);

  useEffect(() => {
    console.log({meetingSettings})
    if (meetingSettings.counter.dataAskedFor !== "null") {
      try {
        const data = JSON.parse(meetingSettings.counter.dataAskedFor);
        setCounterFormData(data.formData);
      } catch (ignored) {}
    }
  }, [meetingSettings.counter]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    (async () => {
      if (counterFormData.price || checkoutPrice) {
        try {
          const res = await StripeService.createPaymentIntent({
            price: counterFormData.price ? counterFormData?.price || 1 : checkoutPrice || 1,
            currency: window.location.hostname.match("airsenegal")
              ? "xof"
              : window.location.hostname.match("misa")
              ? "sar"
              : "aed",
          });
          setClientSecret(res.data.clientSecret);
        } catch (err) {
          axiosCatch(err);
        } finally {
          setCreatePaymentIntentLoading(false);
        }
      }
    })();
  }, [checkoutPrice, counterFormData?.price, location.pathname]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
    locale: "en",
  };

  if (clientSecret) {
    return (
      <div className="checkourt-form">
        {isHost && (
          <Row
            wrap={false}
            align="middle"
            gutter={[8, 0]}
            style={{ width: "fit-content" }}
            className="clickable"
            onClick={() => setActiveBtn("counter")}>
            <Col>
              <Row align="middle">
                <ArrowRightSVG color="#8E8E93" style={{ rotate: "180deg" }} />
              </Row>
            </Col>
            <Col>
              <Typography.Text className="gc">Back</Typography.Text>
            </Col>
          </Row>
        )}

        <Row className="mt-1">
          <Typography.Title level={4}>Checkout</Typography.Title>
        </Row>
        <div className="price-info">
          <Row gutter={[0, 16]}>
            {[
              {
                id: 1,
                title: "Sub Total",
                price: `${
                  window.location.hostname.match("airsenegal")
                    ? "XOF"
                    : window.location.hostname.match("misa")
                    ? "SAR"
                    : "USD"
                } ${counterFormData?.price ? counterFormData?.price || 0 : checkoutPrice || 0}.00`,
              },
              {
                id: 2,
                title: "Shipping",
                price: `${
                  window.location.hostname.match("airsenegal")
                    ? "XOF"
                    : window.location.hostname.match("misa")
                    ? "SAR"
                    : "USD"
                } 0`,
              },
              {
                id: 3,
                title: "Tax",
                price: `${
                  window.location.hostname.match("airsenegal")
                    ? "XOF"
                    : window.location.hostname.match("misa")
                    ? "SAR"
                    : "USD"
                } 0`,
              },
            ].map((info) => (
              <Col xs={24} key={info.id}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Typography.Text className="gc fw-500">{info.title}</Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text className="fw-500">{info.price}</Typography.Text>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </div>

        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            cardItems={cardItems}
            setCardItems={setCardItems}
            setActiveBtn={setActiveBtn}
            counterFormData={counterFormData}
            checkoutPrice={checkoutPrice}
            isAgentMeeting={isAgentMeeting}
            createPaymentIntentLoading={createPaymentIntentLoading}
          />
        </Elements>
      </div>
    );
  }
}
