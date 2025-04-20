import React from "react";
import { Col, DatePicker, Divider, Form, Input, Row, Select } from "antd";
import { ArrowDownSVG, InfoSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import NationalityInput from "components/common/NationalityInput";
/*
{
            "type": "adult",
            "firstName": "Larissa",
            "lastName": "Mckinney",
            "dateOfBirth": "1997-02-13",
            "nationality": "Palestinian",
            "passportID": "764892765",
            "passportExpiry": "1997-02-13"
        }
*/
const PassengersDataForm = ({ adults, childs }) => {
  return (
    <div>
      {/* <Form.Item hidden initialValue={bookingKey} name={["bookingKey"]} /> */}
      {[...new Array(adults)]?.map((_, index) => {
        return (
          <Row gutter={[12, 20]} key={index}>
            <Form.Item hidden initialValue={"adult"} name={["paxes", index, "type"]} />
            <Col span={24}>
              <p className="fz-14 fw-600">{index + 1}. Passenger (Adult)</p>
            </Col>
            <Col md={4} sm={8} xs={12}>
              <Form.Item
                name={["paxes", index, "firstName"]}
                label="First name"
                rules={[{ required: true, message: "Enter first name" }]}>
                <Input placeholder="Enter First Name" />
              </Form.Item>
            </Col>
            <Col md={4} sm={8} xs={12}>
              <Form.Item
                name={["paxes", index, "lastName"]}
                label="Last name"
                rules={[{ required: true, message: "Enter last name" }]}>
                <Input placeholder="Enter Last Name" />
              </Form.Item>
            </Col>
            <Col md={4} sm={8} xs={12}>
              <Form.Item
                name={["paxes", index, "dateOfBirth"]}
                label="Birth date"
                initialValue={dayjs().subtract(18, "year")}
                rules={[{ required: true, message: "Enter Birth date" }]}>
                <DatePicker
                  disabledDate={(current) => {
                    return dayjs(current).isAfter(dayjs(new Date()));
                  }}
                  placeholder="YYYY-MM-DD"
                  className="w-100"
                />
              </Form.Item>
            </Col>
            <Col md={4} sm={8} xs={12}>
              <Form.Item
                name={["paxes", index, "nationality"]}
                label="Nationality"
                initialValue={"AE"}
                rules={[{ required: true, message: "Enter Nationality" }]}>
                <NationalityInput />
              </Form.Item>
            </Col>
            <Col md={4} sm={8} xs={12}>
              <Form.Item
                name={["paxes", index, "passportID"]}
                label="Passport ID"
                rules={[{ required: true, message: "Enter passport ID" }, { min: 4 }]}>
                <Input placeholder="Enter Passport ID" />
              </Form.Item>
            </Col>
            <Col md={4} sm={8} xs={12}>
              <Form.Item
                name={["paxes", index, "passportExpiry"]}
                label="Passport Expiry"
                initialValue={dayjs().add(6, "M")}
                rules={[{ required: true, message: "Enter Passport Expiry" }]}>
                <DatePicker
                  disabledDate={(current) => {
                    return dayjs(current).isBefore(dayjs(new Date()));
                  }}
                  placeholder="YYYY-MM-DD"
                  className="w-100"
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}

      {childs > 0 && (
        <>
          <Divider />
          {[...new Array(childs)]?.map((_, index) => {
            return (
              <Row gutter={[12, 20]} key={index}>
                <Form.Item hidden initialValue={"adult"} name={["paxes", index, "type"]} />
                <Col span={24}>
                  <p className="fz-14 fw-600">{Number(adults) + index + 1}. Passenger (Child)</p>
                </Col>
                <Col md={4} sm={8} xs={12}>
                  <Form.Item
                    name={["paxes", adults + index, "firstName"]}
                    label="First name"
                    rules={[{ required: true, message: "Enter first name" }]}>
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                </Col>
                <Col md={4} sm={8} xs={12}>
                  <Form.Item
                    name={["paxes", adults + index, "lastName"]}
                    label="Last name"
                    rules={[{ required: true, message: "Enter last name" }]}>
                    <Input placeholder="Enter Last Name" />
                  </Form.Item>
                </Col>
                <Col md={4} sm={8} xs={12}>
                  <Form.Item
                    name={["paxes", adults + index, "dateOfBirth"]}
                    label="Birth date"
                    initialValue={dayjs().subtract(6, "year")}
                    rules={[{ required: true, message: "Enter Birth date" }]}>
                    <DatePicker
                      disabledDate={(current) => {
                        return dayjs(current).isAfter(dayjs(new Date()));
                      }}
                      placeholder="YYYY-MM-DD"
                      className="w-100"
                    />
                  </Form.Item>
                </Col>
                <Col md={4} sm={8} xs={12}>
                  <Form.Item
                    name={["paxes", adults + index, "nationality"]}
                    label="Nationality"
                    rules={[{ required: true, message: "Enter Nationality" }]}>
                    <NationalityInput />
                  </Form.Item>
                </Col>
                <Col md={4} sm={8} xs={12}>
                  <Form.Item
                    name={["paxes", adults + index, "passportID"]}
                    label="Passport ID"
                    rules={[{ required: true, message: "Enter passport ID" }, { min: 4 }]}>
                    <Input placeholder="Enter Passport ID" />
                  </Form.Item>
                </Col>
                <Col md={4} sm={8} xs={12}>
                  <Form.Item
                    name={["paxes", adults + index, "passportExpiry"]}
                    label="Passport Expiry"
                    initialValue={dayjs().add(6, "M")}
                    rules={[{ required: true, message: "Enter Passport Expiry" }]}>
                    <DatePicker
                      disabledDate={(current) => {
                        return dayjs(current).isBefore(dayjs(new Date()));
                      }}
                      placeholder="YYYY-MM-DD"
                      className="w-100"
                    />
                  </Form.Item>
                </Col>
              </Row>
            );
          })}
        </>
      )}
      <p className="d-flex" style={{ gap: "6px", alignItems: "center" }}>
        <InfoSVG />
        <span>
          Use all given names and surnames exactly as they appear in your passport/iD to avoid
          boarding complications.
        </span>
      </p>
    </div>
  );
};

export default PassengersDataForm;
