import { Button, Typography } from "antd";
import { SucessPaymentSVG } from "assets/jsx-svg";
import { useUserContext } from "context/userContext";
import dayjs from "dayjs";
import { useEffect } from "react";
import TravelCartService from "services/travel/travel.cart.service";

export default function SuccessPage({ setActiveBtn, setShowCounterBtn }) {
  const { user } = useUserContext();

  useEffect(() => {
    (async () => {
      const { cartData: travelCart } = await TravelCartService.getCart(
        user?.id,
        user?.cGAccessToken,
      );
      if (Array.isArray(travelCart) && travelCart?.length > 0) {
        TravelCartService.checkoutCart(user?.id, user?.cGAccessToken);
      }
    })();
  }, [user]);

  return (
    <section className="w-100 h-100 center-items" style={{ flexDirection: "column" }}>
      <div className="success-payment-icon">
        <SucessPaymentSVG />
      </div>

      <Typography.Title level={3}>Payment Done</Typography.Title>

      <Typography.Text className="gc" style={{ marginBlock: "8px 32px" }}>
        Payment ID:23553, {dayjs().format("DD MMM, YYYY, HH:mma")}
      </Typography.Text>

      <Button
        type="primary"
        className="w-100"
        onClick={() => {
          setActiveBtn("participant");
          setShowCounterBtn(false);
        }}>
        Done
      </Button>
    </section>
  );
}
