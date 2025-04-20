import React, { useMemo } from "react";
import { Col, Divider, Form, Input, Row, Select } from "antd";
import { ArrowDownSVG, InfoSVG } from "assets/jsx-svg";
import dayjs from "dayjs";

const PassengersDataForm = ({ roomIndex, bookingKey, adults, childsAges, room , mealType }) => {
  const childAges = useMemo(() => (childsAges ? childsAges?.split("-") : []), [childsAges]);
  return (
    <div>
      <Form.Item hidden initialValue={bookingKey} name={["rooms", roomIndex, "bookingKey"]} />
      <Form.Item hidden initialValue={room?.name} name={["rooms", roomIndex, "roomName"]} />
      <Form.Item hidden initialValue={mealType} name={["rooms", roomIndex, "mealType"]} />  
      <Form.Item
        hidden
        initialValue={`${adults}${childsAges ? "-" + childsAges : ""}`}
        name={["rooms", roomIndex, "pax"]}
      />

      <Form.Item
        hidden
        initialValue={
          room?.rate?.amountWithPromotion ||
          room?.amount ||
          room?.rate?.amount ||
          room?.totalFare ||
          room?.TotalFare
        }
        name={["rooms", roomIndex, "roomPrice"]}
      />
      {[...new Array(Number(adults) || 0)]?.map((_, index) => {
        return (
          <Row gutter={[12, 20]} key={index}>
            <Form.Item
              hidden
              initialValue={"adult"}
              name={["rooms", roomIndex, "paxes", index, "type"]}
            />
            <Col span={24}>
              <p className="fz-14 fw-600">{index + 1}. Passenger (Adult)</p>
            </Col>
            <Col md={4} xs={12}>
              <Form.Item
                name={["rooms", roomIndex, "paxes", index, "title"]}
                label="Title"
                initialValue={"Mr"}
                rules={[{ required: true, message: "Select title" }]}>
                <Select
                  suffixIcon={<ArrowDownSVG />}
                  options={[
                    { label: "Mr", value: "Mr" },
                    { label: "Mrs", value: "Mrs" },
                    { label: "Ms", value: "Ms" },
                  ]}
                  placeholder="title"
                />
              </Form.Item>
            </Col>
            <Col md={10} xs={12}>
              <Form.Item
                name={["rooms", roomIndex, "paxes", index, "firstName"]}
                label="First name"
                rules={[{ required: true, message: "Enter first name" }]}>
                <Input placeholder="Enter First Name" />
              </Form.Item>
            </Col>
            <Col md={10} xs={12}>
              <Form.Item
                name={["rooms", roomIndex, "paxes", index, "lastName"]}
                label="Last name"
                rules={[{ required: true, message: "Enter last name" }]}>
                <Input placeholder="Enter Last Name" />
              </Form.Item>
            </Col>
            {/* <Col md={6} xs={12}>
              <Form.Item
                name={["rooms",roomIndex , "paxes", index, "dateOfBirth"]}
                label="Birth date"
                inalValue={dayjs().subtract(18, "year")}>
                <DatePicker
                  disabledDate={(current) => {
                    return dayjs(current).isAfter(dayjs(new Date()));
                  }}
                  placeholder="YYYY-MM-DD"
                  className="w-100"
                />
              </Form.Item>
            </Col> */}
            {/* <Col md={6} xs={12}>
              <Form.Item
                name={["rooms",roomIndex , "paxes", index, "nationality"]}
                label="Nationality"
                rules={[{ required: true, message: "Enter Nationality" }]}>
                <Select
                  showSearch={true}
                  placeholder="Palestinian"
                  disabled={nationalitesQuery?.isLoading}
                  options={nationalitesQuery?.data?.map((el) => ({
                    label: el.nationality,
                    value: el.nationality,
                  }))}
                />
              </Form.Item>
            </Col> */}
          </Row>
        );
      })}

      {childAges?.length > 0 && (
        <>
          <Divider />
          {[...new Array(childAges?.length || 0)]?.map((_, index) => {
            return (
              <Row gutter={[12, 20]} key={index}>
                <Form.Item
                  hidden
                  initialValue={"child"}
                  name={["rooms", roomIndex, "paxes", Number(adults) + index, "type"]}
                />
                <Form.Item
                  hidden
                  initialValue={dayjs().subtract(
                    !isNaN(childAges[index]) ? Number(childAges[index]) : 10,
                    "year",
                  )}
                  name={["rooms", roomIndex, "paxes", Number(adults) + index, "dateOfBirth"]}
                />
                <Col span={24}>
                  <p className="fz-14 fw-600">
                    {Number(adults) + index + 1}. Passenger ({childAges[index]} years old)
                  </p>
                </Col>
                <Col md={4} xs={12}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", Number(adults) + index, "title"]}
                    label="Title"
                    initialValue={"Mr"}
                    rules={[{ required: true, message: "Select title" }]}>
                    <Select
                      suffixIcon={<ArrowDownSVG />}
                      options={[
                        { label: "Mr", value: "Mr" },
                        { label: "Mrs", value: "Mrs" },
                        { label: "Ms", value: "Ms" },
                      ]}
                      placeholder="title"
                    />
                  </Form.Item>
                </Col>
                <Col md={10} xs={12}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", Number(adults) + index, "firstName"]}
                    label="First name"
                    rules={[{ required: true, message: "Enter first name" }]}>
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                </Col>
                <Col md={10} xs={12}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", Number(adults) + index, "lastName"]}
                    label="Last name"
                    rules={[{ required: true, message: "Enter last name" }]}>
                    <Input placeholder="Enter Last Name" />
                  </Form.Item>
                </Col>
                {/* <Col md={6} xs={12}>
                  <Form.Item
                    name={[
                      "rooms", roomIndex, "paxes", Number(adults) + index,
                      "dateOfBirth",
                    ]}
                    label="Birth date">
                    <DatePicker
                      disabledDate={(current) => {
                        return (
                          (current && current.isAfter(dayjs())) ||
                          current.isBefore(dayjs().subtract(18, "year"), "day")
                        );
                      }}
                      placeholder="YYYY-MM-DD"
                      className="w-100"
                    />
                  </Form.Item>
                </Col>
                <Col md={6} xs={12}>
                  <Form.Item
                    name={[
                      "rooms", roomIndex, "paxes", Number(adults) + index,
                      "nationality",
                    ]}
                    label="Nationality"
                    rules={[{ required: true, message: "Enter Nationality" }]}>
                    <Select
                      showSearch={true}
                      placeholder="Palestinian"
                      disabled={nationalitesQuery.isLoading}
                      options={nationalitesQuery.data?.map((el) => ({
                        label: el.nationality,
                        value: el.nationality,
                      }))}
                    />
                  </Form.Item>
                </Col> */}
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
