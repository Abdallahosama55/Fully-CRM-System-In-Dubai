import { Form, Input, Select, Typography } from "antd";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import React from "react";

const VoucherConfigure = () => {
  return (
    <div className="branding_section w-100">
      <div>
        <Typography.Title level={5} className="fz-18 fw-600" style={{ marginBottom: 0 }}>
          Voucher Configure
        </Typography.Title>
        <Typography.Paragraph className="fz-12 fw-400">
          Please fill in the fields below with the information you want to include in your voucher.
        </Typography.Paragraph>
        <Form.Item
          label={"Email on voucher"}
          name="voucherEmail"
          rules={[{ type: "email", message: "Enter valid email" }]}>
          <Input placeholder="Travels@email.com" />
        </Form.Item>
        <Form.Item
          label={"Voucher template"}
          initialValue={"default"}
          name="voucherTemplate"
          rules={[{ required: true, message: "select voucher template" }]}>
          <Select placeholder="Default" options={[{ label: "Default", value: "default" }]} />
        </Form.Item>
        <Form.Item label={"Voucher header text"} name="voucherHeaderText">
          <Input.TextArea placeholder="Enter a description..." rows={6} />
        </Form.Item>
        <Form.Item label={"Phone on voucher"} name="voucherPhone" initialValue={"+971 55555555"}>
          <PhoneNumberInput />
        </Form.Item>
        <Form.Item label={"Voucher font"} name="voucherFont" initialValue={"Arial, sans-serif"}>
          <Select
            showSearch
            options={[
              { label: "Arial", value: "Arial, sans-serif" },
              { label: "Verdana", value: "Verdana, sans-serif" },
              { label: "Helvetica", value: "Helvetica, sans-serif" },
              { label: "Tahoma", value: "Tahoma, sans-serif" },
              { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
              { label: "Times New Roman", value: "'Times New Roman', serif" },
              { label: "Georgia", value: "Georgia, serif" },
              { label: "Courier New", value: "'Courier New', monospace" },
              { label: "Lucida Console", value: "'Lucida Console', monospace" },
              { label: "Poppins", value: "Poppins, sans-serif" },
              { label: "Roboto", value: "Roboto, sans-serif" },
              { label: "Lato", value: "Lato, sans-serif" },
              { label: "Montserrat", value: "Montserrat, sans-serif" },
              { label: "Oswald", value: "Oswald, sans-serif" },
              { label: "Raleway", value: "Raleway, sans-serif" },
              { label: "Playfair Display", value: "'Playfair Display', serif" },
              { label: "Open Sans", value: "'Open Sans', sans-serif" },
              { label: "Noto Sans", value: "'Noto Sans', sans-serif" },
              { label: "Fira Sans", value: "'Fira Sans', sans-serif" },
            ]}
          />
        </Form.Item>
        <Form.Item label={"Voucher footer text"} name="voucherFooterText">
          <Input.TextArea placeholder="Enter a description..." rows={6} />
        </Form.Item>
      </div>
    </div>
  );
};

export default VoucherConfigure;
