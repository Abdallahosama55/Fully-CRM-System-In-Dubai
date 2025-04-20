import { Button, Form, Input, Modal, Select, Space, message } from "antd";
import SelectionTagRender from "components/Studio/GoLive/components/CustomersSelectionTable/SelectionTagRender";
import userContext from "context/userContext";
import { useContext, useState } from "react";
import useSendEmail from "services/Customers/Mutations/useSendEmail";

export default function SendEmailModal({ isOpen, selectedCustomers, onClose, onEmailSent }) {
  const { sendEmail, isPending } = useSendEmail();
  const [form] = Form.useForm();
  const { user } = useContext(userContext);

  const handleOk = () => {
    const values = form.getFieldsValue();
    sendEmail({
      title: values.title,
      text: values.text,
      fromEmail: user.email,
      reciepantAccountsArr: selectedCustomers.map((c) => c.value.accountId),
    }).then(() => {
      message.success(`Email is sent successfully`);
      onEmailSent?.();
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      centered
      width={500}
      title="Send Email"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleClose}
      footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item label="Recipients" initialValue={selectedCustomers}>
          <Select
            optionLabelProp="fullName"
            allowClear={false}
            maxTagCount={8}
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Select participants"
            value={selectedCustomers}
            options={selectedCustomers ?? []}
            showSearch={false}
            popupClassName="d-none"
            suffixIcon
            optionRender={() => null}
            dropdownRender={() => null}
            searchValue=""
            tagRender={SelectionTagRender}
          />
        </Form.Item>
        <Form.Item name="title" label="Email Title" rules={[{ required: true }]}>
          <Input placeholder="write title here" />
        </Form.Item>
        <Form.Item name="text" label="Email Content" rules={[{ required: true }]}>
          <Input.TextArea rows={5} placeholder="write content here" />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Space>
            <Button block onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={selectedCustomers.length === 0}
              loading={isPending}
              onClick={handleOk}>
              Send Now!
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
