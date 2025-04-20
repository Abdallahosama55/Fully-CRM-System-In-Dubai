import { Button, Col, Row, Typography } from "antd";
import { CalenderSVG, CheckSVG, PersonSVG, TimeSVG } from "assets/jsx-svg";
import dayjs from "dayjs";

export default function BookingConfirme({ bookingData, setSelectedService }) {
  return (
    <>
      <Row justify="center" style={{ textAlign: "center" }}>
        <Col xs={24}>
          <Typography.Text className="fw-500 fz-16">
            Booking Confirmed!
          </Typography.Text>
        </Col>
        <Col xs={24}>
          <Typography.Text style={{ color: "#8E8E93" }} className="fz-10">
            The booking confirmation has been sent to your Email Address
          </Typography.Text>
        </Col>
      </Row>

      <Row
        justify="center"
        style={{ textAlign: "center", marginBlock: "12px 24px" }}
      >
        <Typography.Text style={{ color: "#3F65E4" }} className="fw-500">
          Booking ID - 20231104
        </Typography.Text>
      </Row>

      <Row justify="center">
        <div className="success-check">
          <CheckSVG color="#fff" />
        </div>
      </Row>

      <Row
        justify={"center"}
        gutter={[8, 0]}
        align="middle"
        wrap={false}
        style={{ marginBlock: "32px 12px" }}
      >
        <Col>
          <Row align="middle">
            <PersonSVG
              color="#3F65E4"
              style={{ width: "12px", height: "12px" }}
            />
          </Row>
        </Col>
        <Col>
          <Typography.Text className="fw-500">
            {bookingData.name}
          </Typography.Text>
        </Col>
      </Row>

      <Row justify="center" align="middle" gutter={[12, 12]}>
        <Col>
          <Row
            justify="center"
            align="middle"
            gutter={[8, 8]}
            style={{ color: "#8E8E93" }}
          >
            <Col>
              <Row align="middle">
                <CalenderSVG
                  color="#8E8E93"
                  style={{ width: "12px", height: "12px" }}
                />
              </Row>
            </Col>
            <Col>{dayjs(bookingData.day).format("ddd DD MMM YYYY")}</Col>
          </Row>
        </Col>
        <Col>
          <Row
            justify="center"
            align="middle"
            gutter={[8, 8]}
            style={{ color: "#8E8E93" }}
          >
            <Col>
              <Row align="middle">
                <TimeSVG
                  color="#8E8E93"
                  style={{ width: "12px", height: "12px" }}
                />
              </Row>
            </Col>
            <Col>
              {dayjs(bookingData.time).format("H")}.00{" "}
              {dayjs(bookingData.time).format("A")}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "12px" }}>
        <Button
          type="primary"
          style={{
            borderRadius: "12px",
            background: "#3F65E4",
            height: "35px",
            width: "120px",
          }}
          onClick={() => setSelectedService(null)}
        >
          Done
        </Button>
      </Row>
    </>
  );
}
