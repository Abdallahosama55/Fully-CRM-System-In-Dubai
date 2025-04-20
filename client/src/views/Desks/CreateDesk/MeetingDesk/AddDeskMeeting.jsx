import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row, TimePicker, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { Delete2SVG } from "assets/jsx-svg";
import { useEffect, useState } from "react";
import BookedMeetingService from "services/bookedMeeting.service";
import { axiosCatch } from "utils/axiosUtils";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNotification } from "context/notificationContext";

dayjs.extend(customParseFormat);

export default function AddDeskMeeting({ deskId , DrawerAPI }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { openNotificationWithIcon } = useNotification();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await BookedMeetingService.bookMeeting({
        date: values.date,
        deskId,
        list: values.times.map((time) => ({
          fromTime: dayjs(time.time[0]).format("HH:mm"),
          toTime: dayjs(time.time[1]).format("HH:mm"),
        })),
      });
      openNotificationWithIcon("success", "Meetings Added Successfully");
      DrawerAPI.close();
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldValue("times", [{ time: undefined }]);
  }, []);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {DrawerAPI.Render}
      <Form.Item
        name="date"
        label="Date"
        initialValue={dayjs()}
        rules={[{ required: true, message: "Please Enter Date" }]}>
        <DatePicker placeholder="Enter Date" className="w-100" />
      </Form.Item>
      <Row style={{ marginBottom: "8px" }}>
        <Typography.Text>Times</Typography.Text>
      </Row>
      <Form.List name="times" className="times-list">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name, index }) => (
              <Row
                key={`${name} + ${index}`}
                align="middle"
                gutter={[16, 0]}
                wrap={false}
                style={{ marginBottom: "12px" }}>
                <Col flex={1}>
                  <Form.Item
                    name={[name, "time"]}
                    rules={[{ required: true, message: "Please Enter Time" }]}>
                    <TimePicker.RangePicker format="HH:mm" minuteStep={30} className="w-100" />
                  </Form.Item>
                </Col>
                <Col>
                  <Row align="middle" style={{ marginBottom: "12px" }}>
                    <Delete2SVG
                      color="#000"
                      onClick={() => {
                        if (fields.length > 1) {
                          remove(name);
                        } else {
                          message.error("At least one time must be added");
                        }
                      }}
                      style={{
                        cursor: fields.length > 1 ? "pointer" : "not-allowed",
                      }}
                    />
                  </Row>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Time
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-100" loading={loading}>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
