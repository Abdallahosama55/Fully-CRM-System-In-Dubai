import React, { useState } from "react";
import AvatarUpload from "../AvatarUpload";
import { Button, Col, Form, Input, Row, Select } from "antd";
// style
import "./styles.css";
import allTimezones from "constants/TIME_ZONES";
import SelectLookups from "components/SelectLookups";
const EditEmployeeHeader = () => {
  return (
    <div className="edit_employee_container">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={5}>
          <Form.Item name="avatar">
            <AvatarUpload />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Row gutter={[8, 12]}>
            <Col span={24}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Please Enter Full Name" }]}>
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col span={24}>
              {/* <Form.Item label="Job title" name="job_title">
                <Input placeholder="Job Title" />
              </Form.Item> */}
              <Form.Item label="Job Title" name="jobTitleId">
                <SelectLookups showSearch placeholder="Select a job" type={"job"} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="timeZone" label="Time zone">
                <Select
                  showSearch
                  options={allTimezones.map((item) => ({ label: item, value: item }))}></Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EditEmployeeHeader;
