import { Col, DatePicker, Form, Input, Row, TimePicker, Select, Radio } from "antd";
import React from "react";
import "./styles.css";
import AddCancelButtons from "components/common/AddCancelButtons";
import { IconlyLightOutlineCalendar } from "assets/jsx-svg";

function AddTimeForm({ onClose }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    onClose();
  };
  const cancel = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <div>
      <div className="fz-20 fw-400">Add Time-Off Management</div>
      <Form form={form} onFinish={onFinish} className="add-time-form" layout="vertical">
        <div>
          <Form.Item
            name="Name"
            label="Name (Description)"
            rules={[
              {
                required: true,
                message: "Please input your Name",
              },
            ]}>
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Row gutter={8} align="top">
              <Col span={8}>
                <Form.Item
                  label="Date"
                  name="Date"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Date",
                    },
                  ]}>
                  <DatePicker
                    className="w-100 "
                    suffixIcon={
                      <Row gutter={[5, 0]} align="middle">
                        <Col>
                          <Row align="middle">
                            <IconlyLightOutlineCalendar
                              style={{ width: "14px", height: "14px" }}
                              color="#AEAEB2"
                            />
                          </Row>
                        </Col>
                      </Row>
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="Time"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: "Please input your time",
                    },
                  ]}>
                  <TimePicker.RangePicker className="w-100" format={"hh:mm A"} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input your type",
              },
            ]}>
            <Radio.Group className="w-100">
              <Row className="w-100">
                <Col span={7}>
                  <Radio value="Leave">Leave</Radio>
                </Col>
                <Col span={7}>
                  <Radio value="Vacation">Vacation</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="employees"
            label="Employees"
            initialValue="Specific"
            rules={[
              {
                required: true,
                message: "Please input your employees",
              },
            ]}>
            <Radio.Group className="w-100">
              <Row className="w-100">
                <Col span={7}>
                  <Radio value="All">All</Radio>
                </Col>
                <Col span={7}>
                  <Radio value="Specific">Specific</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="select-employees"
            label="Select Employees"
            initialValue={["lucy"]}
            rules={[
              {
                required: true,
                message: "Please input your employees",
              },
            ]}>
            <Select
              mode="multiple"
              allowClear={true}
              // initialValue={["jack"]}
              className="w-100"
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div>
          <AddCancelButtons addName="Save" cancel={cancel} />
        </div>
      </Form>
    </div>
  );
}

export default AddTimeForm;
