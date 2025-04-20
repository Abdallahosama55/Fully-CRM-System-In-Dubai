import React, { useContext } from "react";
import { Button, Modal, Form, Input, Switch } from "antd";
import { useNotification } from "context/notificationContext";
import "./styles.css";
import userContext from "context/userContext";
import axios from "axios";

import useChangePassword from "services/Employee/Mutations/useChangePassword";
import { useNavigate } from "react-router-dom";
export default function ChagngePasswordModal({ isModalOpen, handleModalCancel }) {
  const { user, setUser } = useContext(userContext);

  const { openNotificationWithIcon } = useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { changePassword, isPending } = useChangePassword({
    onSuccess: (data) => {
      openNotificationWithIcon("success", data.data?.message);
      localStorage.removeItem("vindo-token");
      localStorage.removeItem("DMC_TOKEN");
      setUser(null);
      axios.defaults.headers.authorization = null;
      navigate("/");
    },
    onError: (error) => {
      openNotificationWithIcon("error", error?.response?.data?.errors[0]);
    },
  });
  const isPasswordValidPattern = (password) => {
    if (password.length < 8) {
      openNotificationWithIcon("error", "Password must be at least 8 characters");
      return false;
    }
    if (password.search(/[a-z]/) < 0) {
      openNotificationWithIcon("error", "Password must contain at least one lowercase letter");
      return false;
    }
    if (password.search(/[A-Z]/) < 0) {
      openNotificationWithIcon("error", "Password must contain at least one uppercase letter");
      return false;
    }
    if (password.search(/[0-9]/) < 0) {
      openNotificationWithIcon("error", "Password must contain at least one number");
      return false;
    }
    return true;
  };
  const onFinish = (values) => {
    if (!isPasswordValidPattern(values.newPassword)) {
      return;
    }
    if (values.newPassword != values.confirmedPassword) {
      openNotificationWithIcon("error", "New password and Confirmed password does not matching");
      return;
    }

    changePassword(values);
  };

  return (
    <Modal
      centered={true}
      width={400}
      title={null}
      open={isModalOpen}
      onCancel={handleModalCancel}
      footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Change Password</h3>

      <Form requiredMark="optional" form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }} // Default wrapper (input) column width
          name="oldPassword"
          label={
            <span>
              Old Password
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please Enter Old Password",
            },
          ]}>
          <Input.Password placeholder="Old Password" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }} // Default wrapper (input) column width
          name="newPassword"
          label={
            <span>
              New Password
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please Enter New Password",
            },
          ]}>
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }} // Default wrapper (input) column width
          name="confirmedPassword"
          label={
            <span>
              Confirm Password
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please Enter Confirm Password",
            },
          ]}>
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button size="small" style={{ width: "48%" }} block onClick={handleModalCancel}>
              Cancel
            </Button>
            <span style={{ width: 5 }}></span>
            <Button
              loading={isPending}
              size="small"
              type="primary"
              htmlType="submit"
              className="btn-add"
              style={{ width: "48%" }}>
              Change & Logout
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
