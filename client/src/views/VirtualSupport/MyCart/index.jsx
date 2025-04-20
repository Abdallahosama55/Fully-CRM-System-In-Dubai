import { useEffect, useState, useRef, useContext } from "react";
import { Button, Col, Divider, Image, Row, Skeleton, Typography } from "antd";

import userContext from "context/userContext";
import CustomerCartService from "services/customerCart.service";
import { axiosCatch } from "utils/axiosUtils";
import defualtImage from "assets/images/download.png";
import "./styles.css";
import TravelCartService from "services/travel/travel.cart.service";
import isValidJson from "utils/isValidJson";

export default function MyCart({ setActiveBtn, setCheckoutPrice, meetingSettings, setCardItems }) {
  const [cart, setCart] = useState([]);
  const [travelCart, setTravelCart] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [refreshTravel, setRefreshTravel] = useState(0);

  const [loading, setLoading] = useState(false);
  const { user } = useContext(userContext);
  const prevCartItems = useRef();
  const prevTravelCartItems = useRef();
  // for normal cart
  useEffect(() => {
    if (
      meetingSettings.addedToCart &&
      Object.keys(meetingSettings.addedToCart)?.length !== 0 &&
      prevCartItems.current &&
      meetingSettings.addedToCart[user.id] !== prevCartItems.current
    ) {
      if (Object.keys(meetingSettings.addedToCart).includes(user.id + "")) {
        setRefresh((prev) => prev + 1);
      }
    }

    if (meetingSettings.addedToCart && Object.keys(meetingSettings.addedToCart)?.length !== 0) {
      prevCartItems.current = meetingSettings.addedToCart[user.id];
    }
  }, [meetingSettings.addedToCart, user.id]);

  // for travel cart
  useEffect(() => {
    if (
      meetingSettings.travelCart &&
      Object.keys(meetingSettings.travelCart)?.length !== 0 &&
      prevTravelCartItems.current &&
      meetingSettings.travelCart[user.id] !== prevTravelCartItems.current
    ) {
      if (Object.keys(meetingSettings.travelCart).includes(user.id + "")) {
        setRefreshTravel((prev) => prev + 1);
        console.log("NEW TRAVEL ITEM !!!!!!!!!");
      }
    }

    if (meetingSettings.travelCart && Object.keys(meetingSettings.travelCart)?.length !== 0) {
      prevTravelCartItems.current = meetingSettings.travelCart[user.id];
    }
  }, [meetingSettings?.travelCart, user.id]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await CustomerCartService.list();
        setCart(res.data.data.rows);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        console.log(user);
        const data = await TravelCartService.getCart(user?.id, user?.cGAccessToken);
        setTravelCart(data?.cartData || []);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshTravel]);

  function calculateTotalPrice() {
    let totalPrice = 0;

    // Loop through each item in the array
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];

      // Get the quantity and price of the current item
      const quantity = item.quantity;
      const price = item.productVariant?.price || 0;

      // Calculate the subtotal for the current item (quantity * price)
      const subtotal = quantity * price;

      // Add the subtotal to the total price
      totalPrice += subtotal;
    }

    // Loop through each item in the travelCart
    for (let i = 0; i < travelCart?.length; i++) {
      const item = travelCart[i];

      // Get the quantity and price of the current item
      const quantity = item.quantity;
      const price = item?.price || 0;

      // Calculate the subtotal for the current item (quantity * price)
      const subtotal = quantity * price;

      // Add the subtotal to the total price
      totalPrice += subtotal;
    }

    return totalPrice;
  }

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <Typography.Text className="fz-18 fw-500">My Cart</Typography.Text>
      <section className="support-my-cart">
        {cart?.map((item) => (
          <Row
            key={item.id}
            align="middle"
            justify="space-between"
            gutter={[0, 25]}
            className="cart-item">
            <Col>
              <Row align="middle" justify="space-between" gutter={[16, 0]} wrap={false}>
                <Col>
                  <Image
                    alt="product image"
                    src={
                      item.productVariant?.images?.length
                        ? item.productVariant?.images[0]
                        : defualtImage
                    }
                    width={70}
                    height={70}
                    style={{ borderRadius: "16px" }}
                    preview={false}
                  />
                </Col>
                <Col>
                  <Row style={{ maxWidth: "160px" }}>
                    <Col xs={24}>
                      <Typography.Text className="fz-14 fw-600" ellipsis>
                        {item.productVariant?.title}
                      </Typography.Text>
                    </Col>
                    <Col xs={24}>
                      <Typography.Text className="fz-12" style={{ color: "#77838F" }} ellipsis>
                        Qty: {item.quantity}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col>
              <Typography.Text className="fz-16 fw-600">
                {window.location.hostname.match("airsenegal") ? "XOF" : "USD"}{" "}
                {item.productVariant?.price}
              </Typography.Text>
            </Col>
          </Row>
        ))}
      </section>
      {travelCart && travelCart.length > 0 && (
        <>
          {/* 
      {
id: 29,
    travelCartId: 31,
    itemType: 'EXPERINCES',
    itemId: 105,
    itemRef: 'EB0000000081',
    quantity: 1,
    image: '["https://chickchack.s3.eu-west-2.amazonaws.com/vindo-files/1726563191089Screenshot_2024-09-17_at_10.36.38%E2%80%AFAM.png"]',
    name: 'istanbul trip',
    price: 176.57,
    updatedAt: 2024-10-22T11:44:16.508Z,
    createdAt: 2024-10-22T11:44:16.508Z
}
      */}
          <Divider />
          <Typography.Text className="fz-18 fw-500">Travel Cart</Typography.Text>
          <section className="support-my-cart">
            {travelCart?.map((item) => (
              <Row
                key={item.id}
                align="middle"
                justify="space-between"
                gutter={[0, 25]}
                className="cart-item">
                <Col>
                  <Row align="middle" justify="space-between" gutter={[16, 0]} wrap={false}>
                    <Col>
                      <Image
                        alt="product image"
                        src={
                          item?.itemType === "EXPERINCES" && item?.image
                            ? item?.image
                            : isValidJson(item.image)
                            ? Boolean(JSON.parse(item.image)[0]?.link)
                              ? JSON.parse(item.image)[0]?.link
                              : defualtImage
                            : defualtImage
                        }
                        width={70}
                        height={70}
                        style={{ borderRadius: "16px" }}
                        preview={false}
                      />
                    </Col>
                    <Col>
                      <Row style={{ maxWidth: "160px" }}>
                        <Col xs={24}>
                          <Typography.Text className="fz-14 fw-600" ellipsis>
                            {item?.name}
                          </Typography.Text>
                        </Col>
                        <Col xs={24}>
                          <Typography.Text className="fz-12" style={{ color: "#77838F" }} ellipsis>
                            Qty: {item.quantity}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Typography.Text className="fz-16 fw-600">
                    {window.location.hostname.match("airsenegal") ? "XOF" : "USD"} {item?.price}
                  </Typography.Text>
                </Col>
              </Row>
            ))}
          </section>
        </>
      )}
      {cart?.length > 0 || travelCart?.length > 0 ? (
        <Row style={{ marginTop: "24px" }}>
          <Col xs={24}>
            <Button
              type="primary"
              className="w-100"
              onClick={() => {
                setCardItems && setCardItems(cart);
                setCheckoutPrice(calculateTotalPrice() || 1);
                setActiveBtn("cart");
              }}>
              Checkout Now
            </Button>
          </Col>
        </Row>
      ) : (
        <Typography.Text className="fz-16 fw-500">There's no items in cart</Typography.Text>
      )}
    </>
  );
}
