import { useState } from "react";
import dayjs from "dayjs";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";

import { BackArrow } from "assets/jsx-svg";

import "./styles.css";
import BookingConfirme from "./BookingConfirme";

export default function SchedualeCall({ setSelectedService }) {
  const [form] = Form.useForm();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState(null);

  const onFinish = (values) => {
    if (!selectedDay) {
      message.info("You Must Select Date");
      return;
    }

    if (!selectedTime) {
      message.info("You Must Select Time");
      return;
    }
    setBookingData({
      name: values.name,
      day: selectedDay,
      time: selectedTime,
    });
    console.log(values);
    console.log(selectedDay);
    console.log(selectedTime);
  };

  return (
    <section className="widget-service-section">
      <div className="service-section-header"></div>
      <div className="service-section-main">
        <Row align="middle" style={{ textAlign: "center" }}>
          <Col>
            <div
              style={{ width: "18px" }}
              className="clickable"
              onClick={() => setSelectedService(null)}
            >
              <BackArrow color="#000" />
            </div>
          </Col>
          <Col flex={1}>
            {!bookingData && (
              <Typography.Text className="fw-500 fz-16">
                Schedule a call
              </Typography.Text>
            )}
          </Col>
        </Row>

        {bookingData ? (
          <BookingConfirme
            bookingData={bookingData}
            setSelectedService={setSelectedService}
          />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: "6px", paddingInline: "5px" }}
          >
            <Form.Item
              name="email"
              label="Enter Your E-mail"
              rules={[{ required: true, message: "Please Enter Email" }]}
            >
              <Input placeholder="ex: ahmed@gmail.com" />
            </Form.Item>

            <Form.Item
              name="name"
              label="Enter Your Name"
              rules={[
                { required: true, message: "Please Enter Enter Your Name" },
              ]}
            >
              <Input placeholder="ex: ahmed ali" />
            </Form.Item>

            <Form.Item label="Date" required>
              <Row
                align="middle"
                gutter={[8, 0]}
                style={{
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  paddingBottom: "6px",
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((item) => {
                  const currentDay = dayjs().add(item, "days");
                  const isActive = selectedDay
                    ? selectedDay.format("DD") === currentDay.format("DD")
                    : false;

                  return (
                    <Col>
                      <div
                        className={`date-item ${
                          isActive ? "date-item-active" : ""
                        }`}
                        key={item}
                        onClick={() => setSelectedDay(currentDay)}
                      >
                        <span className="fw-600">
                          {currentDay.format("DD")}
                        </span>
                        {dayjs().add(item, "days").format("ddd")}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Form.Item>

            <Form.Item label="Time" required>
              <Row
                align="middle"
                gutter={[8, 0]}
                style={{
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  paddingBottom: "6px",
                }}
              >
                {new Array(23 - +dayjs().format("H"))
                  .fill(+dayjs().format("H"))
                  .map((item, index) => {
                    const currentTime = dayjs().add(item + index, "hours");
                    const isActive = selectedTime
                      ? selectedTime.format("H") === currentTime.format("H")
                      : false;

                    return (
                      <Col>
                        <div
                          className={`time-item ${
                            isActive ? "time-item-active" : ""
                          }`}
                          key={index}
                          onClick={() => setSelectedTime(currentTime)}
                        >
                          <span>
                            {currentTime.format("H")}
                            .00
                          </span>
                          {dayjs()
                            .add(item + index, "hours")
                            .format("A")}
                        </div>
                      </Col>
                    );
                  })}
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="w-100"
                style={{
                  borderRadius: "12px",
                  background: "#3F65E4",
                  height: "35px",
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </section>
  );
}
