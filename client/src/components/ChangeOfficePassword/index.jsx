import { KeyOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
import { useUserContext } from "context/userContext";
import React, { useMemo, useState } from "react";
import useUpdateOfficePassword from "services/agencies/Mutations/useUpdateOfficePassword";

const ChangeOfficePassword = ({ officeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserContext();
  const isDMC = useMemo(() => user?.officerType === OFFICER_TYPES.DMC, [user.officerType]);
  const [form] = useForm();
  const updateOfficePassword = useUpdateOfficePassword(officeId, {
    onSuccess: () => {
      message.success("Office password updated");
      setIsOpen(false);
      form.resetFields();
    },
    onError: (error) => {
      message.error(error?.error || "Something went wrong");
    },
  });

  const handelFinish = (values) => {
    updateOfficePassword.mutate(values);
  };

  if (!isDMC) {
    return <></>;
  }

  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          title={"Change Password"}
          okText={"Save"}
          okButtonProps={{ size: "small", loading: updateOfficePassword?.isPending }}
          onOk={form.submit}
          onCancel={() => setIsOpen(false)}
          cancelButtonProps={{ size: "small" }}>
          <Form layout="vertical" onFinish={handelFinish} form={form}>
            <Form.Item
              label={"New password"}
              name="password"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Please enter a new password");
                    }

                    if (value?.length < 8) {
                      return Promise.reject("The password must be at least 8 characters long");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input.Password placeholder="New passwprd" />
            </Form.Item>
            <Form.Item
              label={"Repeat password"}
              name="confirmedPassword"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Please confirm your new password");
                    }

                    if (value !== form.getFieldValue("password")) {
                      return Promise.reject("The passwords do not match");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input.Password placeholder="Repeat passwprd" />
            </Form.Item>
          </Form>
        </Modal>
      )}
      <Tooltip title="Change Password">
        <Button
          className="table_action_button"
          icon={<KeyOutlined />}
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
    </>
  );
};

export default ChangeOfficePassword;
