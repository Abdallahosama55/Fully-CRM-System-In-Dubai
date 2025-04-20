import { Col, Image, Row, Typography } from "antd";

import invoiceImg from "assets/images/invoice.png";

import "./styles.css";
import { MailSVG, WhatsappSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import { useContext } from "react";
import userContext from "context/userContext";
import Logo from "components/common/Logo";

export default function Invoice({ orderdata }) {
  const { user } = useContext(userContext);
  return (
    <main className="invoice-main">
      <img alt="background" src={invoiceImg} className="background-img" />
      <section className="invoice-container">
        <Row justify="space-between" className="invoice-inner">
          <Col>
            <Typography.Text className="fz-24 fw-300">N0. {orderdata?.id}</Typography.Text>
          </Col>
          <Col>
            <Row justify="end">
              <Logo height={50} />
            </Row>
            <Row justify="end">
              <Typography.Text className="invoice-text">Business</Typography.Text>
            </Row>

            <Row justify="end" align="middle" gutter={10} style={{ margin: "18px 0 16px" }}>
              <Col>
                <Row align="middle">
                  <WhatsappSVG />
                </Row>
              </Col>
              <Col>
                <Typography.Text className="fz-20">
                  {user?.prefix} {user?.mobile}
                </Typography.Text>
              </Col>
            </Row>

            <Row justify="end" align="middle" gutter={10}>
              <Col>
                <Row align="middle">
                  <MailSVG />
                </Row>
              </Col>
              <Col>
                <Typography.Text className="fz-20">{user.email}</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="invoice-inner">
          <Typography.Text style={{ fontSize: "42px", margin: "48px 0 7px" }}>
            INVOICE
          </Typography.Text>
        </Row>

        <Row className="invoice-inner" style={{ marginBottom: "15px" }}>
          <Typography.Text className="fz-24">Date: {dayjs().format("DD-MM-YYYY")}</Typography.Text>
        </Row>

        <Row justify="space-between" className="invoice-inner">
          <Col xs={16}>
            <Row>
              <Typography.Text className="fz-26 fw-500" style={{ margin: "15px 0px 1px" }}>
                Bill To
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text className="fz-20" style={{ marginTop: "6px" }}>
                {orderdata?.customer?.fullName}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text className="fz-20" style={{ marginTop: "6px" }}>
                {orderdata?.customerAddress?.city}, {orderdata?.customerAddress?.street},
                {orderdata?.customerAddress?.building}
              </Typography.Text>
            </Row>
          </Col>
          <Col xs={8}>
            <Row>
              <Typography.Text className="fz-26 fw-500" style={{ margin: "15px 0px 1px" }}>
                store owner
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text className="fz-20" style={{ marginTop: "6px" }}>
                {user.name}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text className="fz-20" style={{ marginTop: "6px" }}>
                {user.email}
              </Typography.Text>
            </Row>
          </Col>
        </Row>

        <div>
          <Row
            style={{
              borderTop: "1px dashed #000",
              padding: "20px 30px",
              marginTop: "48px",
            }}>
            <Col xs={9}>
              <Typography.Text className="fz-20 fw-600">Description</Typography.Text>
            </Col>
            <Col xs={5}>
              <Row justify="center">
                <Typography.Text className="fz-20 fw-600">Quantity</Typography.Text>
              </Row>
            </Col>
            <Col xs={5}>
              <Row justify="center">
                <Typography.Text className="fz-20 fw-600">Price</Typography.Text>
              </Row>
            </Col>
            <Col xs={5}>
              <Row justify="center">
                <Typography.Text className="fz-20 fw-600">Amount</Typography.Text>
              </Row>
            </Col>
          </Row>

          {orderdata?.orderDetails.map((row) => (
            <Row key={row.id} style={{ borderTop: "1px dashed #000", padding: "20px 30px" }}>
              <Col xs={9}>
                <Typography.Text ellipsis className="fz-20">
                  {
                    row?.product?.productTranslations?.filter(
                      (translations) => translations.languageCode === user.languageCode,
                    )[0].name
                  }
                </Typography.Text>
              </Col>
              <Col xs={5}>
                <Row justify="center">
                  <Typography.Text ellipsis className="fz-20">
                    {row?.quantity}
                  </Typography.Text>
                </Row>
              </Col>
              <Col xs={5}>
                <Row justify="center">
                  <Typography.Text ellipsis className="fz-20">
                    {user?.symbol} {row?.price}
                  </Typography.Text>
                </Row>
              </Col>
              <Col xs={5}>
                <Row justify="center">
                  <Typography.Text ellipsis className="fz-20">
                    {user?.symbol} {row.quantity * row.price}
                  </Typography.Text>
                </Row>
              </Col>
            </Row>
          ))}

          <Row style={{ borderTop: "1px dashed #000", padding: "20px 30px" }}>
            <Col xs={9}></Col>
            <Col xs={5}></Col>
            <Col xs={5}>
              <Row justify="center">
                <Typography.Text ellipsis className="fz-20 fw-600">
                  Total
                </Typography.Text>
              </Row>
            </Col>
            <Col xs={5}>
              <Row justify="center">
                <Typography.Text ellipsis className="fz-20 fw-600">
                  {user?.symbol} {orderdata?.totalPrice}
                </Typography.Text>
              </Row>
            </Col>
          </Row>

          <Row className="invoice-inner">
            <Typography.Text className="fz-20 fw-600" style={{ margin: "53px 0 100px" }}>
              Payment Method : Cash on delivery
            </Typography.Text>
          </Row>

          <Row justify="center" style={{ borderTop: "1px dashed #000", padding: "20px 30px" }}>
            <Typography.Text className="fz-16">
              If you have any question please contact :{user.email}
            </Typography.Text>
          </Row>
        </div>
      </section>
    </main>
  );
}
