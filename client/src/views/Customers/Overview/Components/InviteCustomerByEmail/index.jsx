import React from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { useToggle } from "hooks/useToggle";

import useInviteCustomer from "services/Customers/Mutations/useInviteCustomer";

const InviteCustomerEmail = ({ children }) => {
  const [form] = Form.useForm();
  const [isOpen, setOpen] = useToggle();
  const { inviteCustomer, isPending } = useInviteCustomer({
    onSuccess: (data) => {
      console.log(data);
      message.success("Contact invited successfully");
      setOpen();
      form.resetFields();
    },
    onError: (data) => {
      message.error(data?.response?.data?.errors);
    },
  });
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };
  const onFinish = async (data) => {
    await inviteCustomer({ data: [data] });
  };
  return (
    <>
      {children &&
        React.cloneElement(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        centered={true}
        width={400}
        title={null}
        open={isOpen}
        onCancel={handleClose}
        footer={null}>
        <h3
          style={{
            marginBottom: "4px",
            textAlign: "center",
            fontSize: "14px",
          }}>
          Invite New Contact
        </h3>

        <Form requiredMark="optional" form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            labelCol={{ span: 24 }} // Default label column width
            wrapperCol={{ span: 24 }} // Default wrapper (input) column width
            name="fullName"
            label={
              <span>
                Name
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            rules={[
              {
                required: true,
              },
              {
                type: "string",
                min: 2,
              },
            ]}>
            <Input placeholder="Write Here" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }} // Default label column width
            wrapperCol={{ span: 24 }} // Default wrapper (input) column width
            name="email"
            label={
              <span>
                Email
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </span>
            }
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}>
            <Input placeholder="Write Here" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button size="small" style={{ width: "48%" }} block onClick={handleClose}>
                Cancel
              </Button>
              <span style={{ width: 5 }}></span>
              <Button
                style={{
                  width: "48%",
                  flex: "1 1 auto",
                  textAlign: "center",
                  textTransform: "uppercase",
                  transition: "0.5s",
                  backgroundSize: "150% auto",
                  color: "white",
                  boxShadow: "0 0 20px #eee",
                  borderRadius: "12px",
                  background:
                    "transparent linear-gradient(258deg, #3a5ee3 0%, #8fcaf3 100%) 0% 0%\n    no-repeat padding-box",
                }}
                loading={isPending}
                size="small"
                htmlType="submit">
                invite
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default InviteCustomerEmail;
