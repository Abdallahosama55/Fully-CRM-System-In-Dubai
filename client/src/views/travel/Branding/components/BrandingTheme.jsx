import { Col, Form, Input, Row, Typography, Upload } from "antd";
import ColorInput from "components/common/ColorInput";
import React from "react";
import UploadInput from "components/common/UploadInput";
import { TRAVEL_API_URL } from "services/travel/config";

const BrandingTheme = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col md={12} xs={24}>
        <div className="branding_section">
          <Typography.Title level={3} className="fz-18 fw-600" style={{ marginBottom: "0px" }}>
            Logo Assets
          </Typography.Title>
          <Typography.Paragraph className="fz-12 fw-400">
            Please upload your brand logos with the following specifications
          </Typography.Paragraph>
          <Form.Item name="logo" label="Header">
            <UploadInput
              action={TRAVEL_API_URL + "common/add-image"}
              name={"image"}
              maxText={"100 x 75px"}
            />
          </Form.Item>
          <Form.Item name="waterMark" label="Water Mark">
            <UploadInput
              action={TRAVEL_API_URL + "common/add-image"}
              name={"image"}
              maxText={"200 x 200px"}
            />
          </Form.Item>
        </div>
      </Col>
      <Col md={12} xs={24}>
        <div className="branding_section">
          <Typography.Title level={3} className="fz-18 fw-600" style={{ marginBottom: "0px" }}>
            Colors
          </Typography.Title>
          <Typography.Paragraph className="fz-12 fw-400">
            Please add your brand colors
          </Typography.Paragraph>
          <Form.Item
            label="Primary Color"
            name="primaryColor"
            initialValue={"000000"}
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value === "#") {
                    return Promise.reject("");
                  }

                  console.log("value", value);
                  return Promise.resolve();
                },
              },
            ]}
            extra={<p>Please add the hex code color.</p>}>
            <ColorInput />
          </Form.Item>
          <Form.Item
            label="Secondary Color"
            name="secondaryColor"
            initialValue={"000000"}
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value === "#") {
                    return Promise.reject("");
                  }

                  console.log("value", value);
                  return Promise.resolve();
                },
              },
            ]}
            extra={<p>Please add the hex code color.</p>}>
            <ColorInput />
          </Form.Item>
        </div>
      </Col>
    </Row>
  );
};

export default BrandingTheme;
