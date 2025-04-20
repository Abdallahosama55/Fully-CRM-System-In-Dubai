import { Button, Col, Collapse, DatePicker, Divider, Flex, Form, Input, Row, Select } from "antd";
import { ArrowDownSVG } from "assets/jsx-svg";
import NationalityInput from "components/common/NationalityInput";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import dayjs from "dayjs";
import React, { useEffect } from "react";
const disabledFutureDates = (current) => current && current > dayjs().endOf("day");
const disabledPastDates = (current) => current && current < dayjs().startOf("day");
export const getRoomByPassengerIndex = (rooms, index) => {
  if (!rooms) return null;

  let globalCount = 0;

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const numAdults = Number(room?.adults);
    const numChilds = Number(room?.childs);
    const roomPassengerCount = numAdults + numChilds;

    if (index < globalCount + roomPassengerCount) {
      const localIndex = index - globalCount;
      const passengerType = localIndex < numAdults ? "Adult" : "Child";
      return {
        roomIndex: i,
        room,
        localIndex,
        passengerType,
      };
    }

    globalCount += roomPassengerCount;
  }

  return {};
};

const PassengersDataForm = ({
  adults,
  childs,
  infants,
  isLastItem,
  handelNext,
  handelPrev,
  inatialData,
  addedPassengers,
  type,
  details: { rooms },
}) => {
  const [form] = Form.useForm();
  const paxes = Form.useWatch("paxes", form);
  useEffect(() => {
    form.setFieldsValue(inatialData);
  }, [inatialData]);

  const handelFinish = (values) => {
    handelNext({
      paxes: values?.paxes?.map((el, index) => ({
        ...el,
        roomIndex: getRoomByPassengerIndex(rooms, index)?.roomIndex || 0,
        index: getRoomByPassengerIndex(rooms, index)?.localIndex,
        type:
          type === QUOTATION_ITEM_TYPES?.ACCOMMODATION
            ? getRoomByPassengerIndex(rooms, index)?.passengerType?.toUpperCase()
            : index < adults
            ? "ADULT"
            : index < adults + childs
            ? "CHILD"
            : "INFANT",
      })),
    });
  };

  return (
    <Form form={form} onFinish={handelFinish} layout="vertical">
      {[
        ...Array(
          type === QUOTATION_ITEM_TYPES.ACCOMMODATION
            ? rooms?.reduce((acc, room) => acc + room?.adults + room?.childs, 0)
            : adults + childs + infants,
        ),
      ].map((_, index) => (
        <Collapse
          key={index}
          style={{ marginBottom: "0.75rem" }}
          defaultActiveKey={index === 0 ? "1" : undefined}
          items={[
            {
              key: "1",
              label: (
                <Flex align="center" gap={8}>
                  {type === QUOTATION_ITEM_TYPES.ACCOMMODATION ? (
                    <p>
                      <span style={{ textTransform: "capitalize" }}>
                        {getRoomByPassengerIndex(rooms, index)?.room?.name}
                      </span>{" "}
                      , Passenger {getRoomByPassengerIndex(rooms, index)?.localIndex + 1} (
                      {getRoomByPassengerIndex(rooms, index)?.passengerType})
                    </p>
                  ) : (
                    <p>
                      Passenger {index + 1} (
                      {index < adults ? "Adult" : index < adults + childs ? "Child" : "Infant"})
                    </p>
                  )}

                  <Select
                    onClick={(e) => e.stopPropagation()}
                    className="prevent-collapse"
                    onSelect={(value) => {
                      const passenger = JSON.parse(value);
                      form.setFieldValue(["paxes", index], {
                        ...passenger,
                        dateOfBirth: dayjs(passenger.dateOfBirth),
                        passportExpiry: dayjs(passenger.passportExpiry),
                      });
                    }}
                    style={{ width: "300px" }}
                    options={addedPassengers?.map((pax) => ({
                      label: `${pax?.passportID} - ${pax?.firstName} ${pax?.lastName}`,
                      value: JSON.stringify(pax),
                      disabled: paxes?.find((p) => p?.passportID === pax?.passportID),
                    }))}
                    placeholder="Add from added"
                  />
                </Flex>
              ),
              children: (
                <Row gutter={[8, 8]}>
                  <Col span={4}>
                    <Form.Item
                      rules={[{ required: true }]}
                      label="Title"
                      initialValue={"Mr"}
                      name={["paxes", index, "title"]}>
                      <Select
                        suffixIcon={<ArrowDownSVG />}
                        options={[
                          { label: "Mr", value: "Mr" },
                          { label: "Mrs", value: "Mrs" },
                          { label: "Ms", value: "Ms" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      rules={[{ required: true }]}
                      label="First Name"
                      name={["paxes", index, "firstName"]}>
                      <Input placeholder="first name" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      rules={[{ required: true }]}
                      label={"Last Name"}
                      name={["paxes", index, "lastName"]}>
                      <Input placeholder="last name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      rules={[{ required: true }]}
                      label={"Nationality"}
                      initialValue={"AE"}
                      name={["paxes", index, "nationality"]}>
                      <NationalityInput placeholder="nationality" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      rules={[{ required: true }]}
                      label="Date of Birth"
                      name={["paxes", index, "dateOfBirth"]}
                      initialValue={dayjs().subtract(
                        index > adults ? 20 : index > adults + childs ? 6 : 1,
                        "year",
                      )}>
                      <DatePicker className="w-100" disabledDate={disabledFutureDates} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      rules={[{ required: true }]}
                      label="Passport ID"
                      name={["paxes", index, "passportID"]}>
                      <Input placeholder="passport ID" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      rules={[{ required: true }]}
                      label="Passport Expiry"
                      name={["paxes", index, "passportExpiry"]}
                      initialValue={dayjs().add(2, "year")}>
                      <DatePicker className="w-100" disabledDate={disabledPastDates} />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      ))}
      <Divider />
      <Flex align="center" justify="space-between">
        <Button onClick={() => handelPrev(form.getFieldsValue())}>Prev</Button>
        <Button type={"primary"} onClick={() => form.submit()}>
          {isLastItem ? "Book" : "Next"}
        </Button>
      </Flex>
    </Form>
  );
};

export default PassengersDataForm;
