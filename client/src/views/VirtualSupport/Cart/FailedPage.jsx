import { Button, Typography } from "antd";
import { FailedPaymentSVG } from "assets/jsx-svg";
import dayjs from "dayjs";

export default function FailedPage({ setActiveBtn }) {
  return (
    <section className="w-100 h-100 center-items" style={{ flexDirection: "column" }}>
      <div className="success-payment-icon">
        <FailedPaymentSVG />
      </div>

      <Typography.Title level={3}>Payment Failed</Typography.Title>

      <Typography.Text className="gc" style={{ marginBlock: "8px 32px" }}>
        {dayjs().format("DD MMM, YYYY, HH:mma")}
      </Typography.Text>

      <Button type="primary" className="w-100" onClick={() => setActiveBtn("cart")}>
        Change Payment method
      </Button>

      <Button
        type="dashed"
        className="w-100"
        onClick={() => setActiveBtn("cart")}
        style={{ marginTop: "12px" }}>
        Retry with same card
      </Button>
    </section>
  );
}
