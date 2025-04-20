import { Breadcrumb, Col, Row, Typography } from "antd";

import logo from "assets/images/logo.png";
import { PrintSVG } from "assets/jsx-svg";
//import { QRCodeSVG } from "qrcode.react";
import "../styles.css";

export default function ViewOrderMain({ orderdata }) {
  return (
    <>
      <section className="mt-1 view-order-info w-100 ">
        <Row
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}
          justify="space-between">
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Order Id
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text>{orderdata?.id}</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Order Number
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text>#{orderdata?.id}</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Order QR
            </Typography.Text>
          </Col>
          <Col>
            <div className="view-order-img">
              {
                /*
                <QRCodeSVG
                value={"https://dashboard.vverse.co/"}
                size={50}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
                imageSettings={{
                  src: logo,
                  x: undefined,
                  y: undefined,
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />*/
              }
            </div>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Coupon
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Coupon</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Discount Type
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Discount Type</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Discount Amount
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Discount Amount</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Tax Amount
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Tax Amount</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Shipping Amount
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Shipping Amount</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Order Total Amount
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>{orderdata?.totalQuantity}</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Free Shipping
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Free Shipping</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Assign Delivery / Shipment Agent
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Shipment Agent</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Payment Method
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Payment Method</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Payment Status
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Payment Status</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Delivery Status
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Delivery Status</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Weight
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Weight</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Shipping Address
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>
              {orderdata?.customerAddress?.city}, {orderdata?.customerAddress?.street},
              {orderdata?.customerAddress?.building}, {orderdata?.customerAddress?.apartment}
            </Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Tracking Code
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Tracking Code</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Customer First Name
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>{orderdata?.customer?.firstName}</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Customer Last Name
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>{orderdata?.customer?.lastName}</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Customer Email
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>{orderdata?.customer?.email}</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Customer Phone Number
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>{orderdata?.customer?.mobile}</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Order Status
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>Order Status</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Created at
            </Typography.Text>
          </Col>
          <Col>
            <Typography.Text ellipsis>12/12/2022</Typography.Text>
          </Col>
        </Row>

        <Row
          justify="space-between"
          style={{ background: "transparent", padding: "18px", borderRadius: "8px" }}>
          <Col xs={24} lg={6}>
            <Typography.Text className="fz-14" style={{ color: "#8E8E93" }}>
              Updated at
            </Typography.Text>
          </Col>
          <Col justify="end">
            <Typography.Text ellipsis>12/12/2022</Typography.Text>
          </Col>
        </Row>
      </section>
    </>
  );
}
