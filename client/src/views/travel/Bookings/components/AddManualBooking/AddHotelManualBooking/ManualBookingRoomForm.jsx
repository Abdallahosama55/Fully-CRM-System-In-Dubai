import {
  AutoComplete,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { ArrowDownSVG } from "assets/jsx-svg";
import NationalityInput from "components/common/NationalityInput";
import dayjs from "dayjs";
import React from "react";
import useGetRoomsTypesList from "services/travel/accommodations/Rooms/Queries/useGetRoomsTypesList";
import { disableAfterDates, disablePastDates } from "utils/disableDates";

const ManualBookingRoomForm = ({ form, roomIndex, room, roomPaxs }) => {
  const roomsTypesListQuery = useGetRoomsTypesList();
  console.log("roomPaxs", roomPaxs);
  return (
    <div>
      <Form.Item
        hidden
        name={["rooms", roomIndex, "categories"]}
        initialValue={{
          adults: roomPaxs?.adults || 1,
          childs: roomPaxs?.children,
        }}
      />
      <Row gutter={[8, 8]} align="middle">
        <Col span={8}>
          <Form.Item
            name={["rooms", roomIndex, "name"]}
            label="Room Name"
            rules={[{ required: true }]}>
            <AutoComplete
              options={room?.rooms?.map((room) => ({
                label:
                  room?.name + " - " + room?.type + " - " + room?.cost + "$ - " + room?.sale + "$",
                value: JSON.stringify(room),
              }))}
              onSelect={(data) => {
                form?.setFieldValue(["rooms", roomIndex, "name"], JSON.parse(data)?.name);
                form?.setFieldValue(["rooms", roomIndex, "type"], JSON.parse(data)?.type);
                form?.setFieldValue(["rooms", roomIndex, "sale"], JSON.parse(data)?.sale);
                form?.setFieldValue(["rooms", roomIndex, "cost"], JSON.parse(data)?.cost);
              }}
              placeholder="Room name"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["rooms", roomIndex, "type"]} label="Type" rules={[{ required: true }]}>
            <Select
              placeholder={"room type"}
              suffixIcon={<ArrowDownSVG />}
              disabled={roomsTypesListQuery.isLoading}
              options={roomsTypesListQuery.data?.map((el) => ({
                label: el.name,
                value: el.name,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name={["rooms", roomIndex, "cost"]} label="Cost" rules={[{ required: true }]}>
            <InputNumber type="number" placeholder="Cost" min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            dependencies={["rooms", roomIndex, "cost"]}
            name={["rooms", roomIndex, "sale"]}
            label="Sale"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (value && value < form.getFieldValue(["rooms", roomIndex, "cost"])) {
                    return Promise.reject("Must be grater than cost");
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <InputNumber type="number" placeholder="Sale" min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <>
        {roomPaxs?.adults &&
          roomPaxs?.adults > 0 &&
          [...new Array(Number(roomPaxs?.adults) + Number(roomPaxs?.childs || 0))].map(
            (_, paxIndex) => (
              <Row gutter={[8, 8]} align="middle" key={paxIndex}>
                <Col span={24}>
                  {paxIndex + 1} - {paxIndex < Number(roomPaxs?.adults) ? "(Adult)" : "(Child)"}
                  <Form.Item
                    hidden={true}
                    name={["rooms", roomIndex, "paxes", paxIndex, "type"]}
                    inatialValue={paxIndex < Number(roomPaxs?.adults) ? "Adult" : "Child"}
                  />
                </Col>
                <Col span={4}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", paxIndex, "salutation"]}
                    label="Salutation"
                    initialValue={"Mr"}
                    rules={[{ required: true }]}>
                    <Select suffixIcon={<ArrowDownSVG />}>
                      <Select.Option value="Mr">Mr.</Select.Option>
                      <Select.Option value="Ms">Ms.</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", paxIndex, "firstName"]}
                    label="First Name"
                    rules={[{ required: true }]}>
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", paxIndex, "lastName"]}
                    label="Last Name"
                    rules={[{ required: true }]}>
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", paxIndex, "nationality"]}
                    label="Nationality"
                    initialValue={"AE"}
                    rules={[{ required: true }]}>
                    <NationalityInput placeholder="Nationality" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    dependencies={["rooms", roomIndex, "paxes"]}
                    name={["rooms", roomIndex, "paxes", paxIndex, "passportID"]}
                    label="Passport ID"
                    rules={[
                      {
                        validator: (_, value) => {
                          const passportIDs = form
                            ?.getFieldValue(["rooms", roomIndex, "paxes"])
                            ?.map((pax) => pax.passportID);

                          if (passportIDs.filter((id) => id === value).length > 1) {
                            return Promise.reject("Passport ID must be unique");
                          }

                          if (!value) {
                            return Promise.reject("Passport ID is required");
                          }
                          if (value.length < 6) {
                            return Promise.reject("Passport ID must be at least 6 characters");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <Input placeholder="Passport ID" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", paxIndex, "passportExpiry"]}
                    label="Passport Expiry"
                    rules={[{ required: true }]}>
                    <DatePicker disabledDate={(curr) => disablePastDates(curr , dayjs())} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["rooms", roomIndex, "paxes", paxIndex, "dob"]}
                    label="DOB"
                    rules={[{ required: true }]}>
                    <DatePicker disabledDate={(curr) => disableAfterDates(curr , dayjs())} />
                  </Form.Item>
                </Col>
              </Row>
            ),
          )}
      </>
      <Divider />
    </div>
  );
};

export default ManualBookingRoomForm;
