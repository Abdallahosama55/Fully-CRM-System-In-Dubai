import React from "react";
import { Button, Form, Input, Select } from "antd";
import { useNotification } from "context/notificationContext";
import useAddGroupEmailConfig from "services/EmailConfig/Mutations/useAddGroupEmailConfig";
import useEditGroupEmailConfig from "services/EmailConfig/Mutations/useEditGroupEmailConfig";
export default function AddEditDrawer({
  refetchEmailConfig,
  form,
  DrawerAPI,
  isEditAction,
  groupList,
}) {
  const { openNotificationWithIcon } = useNotification();

  const { addGroupEmailConfig, isPending: isAddGroupPending } = useAddGroupEmailConfig({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      refetchEmailConfig();
      closeDrawer();
      openNotificationWithIcon("success", "Added successfully");
    },
  });
  const { editGroupEmailConfig, isPending: isEditGroupPending } = useEditGroupEmailConfig({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      refetchEmailConfig();
      closeDrawer();
      openNotificationWithIcon("success", "Edited successfully");
    },
  });
  const onFinish = (values) => {
    const objectToAdd = {
      groupId: values?.groupId,
      email: values?.email,
      userName: values?.emailUsername,
      password: values?.emailPassword,
      generalSettingId: 3,
    };
    isEditAction
      ? editGroupEmailConfig({ groupid: isEditAction.id, data: objectToAdd })
      : addGroupEmailConfig(objectToAdd);
  };
  const closeDrawer = () => {
    DrawerAPI.close();
  };

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {isEditAction ? <span>Edit </span> : <span>Add New </span>}
        Group Email
      </h3>

      <Form
        requiredMark="optional"
        labelCol={{ span: 24 }} // Default label column width
        wrapperCol={{ span: 24 }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size={"small"}
        autoComplete="off">
        <Form.Item
          style={{ marginBottom: 0 }}
          // label="Countries"
          label={
            <span>
              Group
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          name="groupId"
          rules={[
            {
              required: true,
              message: "Select",
            },
          ]}>
          <Select>
            {groupList.map((group) => (
              <Select.Option key={group.id} value={group.id}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Email is required",
            },
          ]}>
          <Input placeholder="Write here" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="emailUsername"
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
          autoComplete="nope">
          <Input autoComplete="nope" placeholder="Write here" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="emailPassword"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
          autoComplete="nope">
          <Input.Password autoComplete="nope" placeholder="Write here" />
        </Form.Item>

        <Form.Item style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button size="small" style={{ width: "48%" }} block onClick={closeDrawer}>
              Cancel
            </Button>
            <span style={{ width: 5 }}></span>
            <Button
              loading={isAddGroupPending || isEditGroupPending}
              size="small"
              htmlType="submit"
              className="btn-add"
              style={{ width: "48%" }}>
              {isEditAction ? <span>Edit</span> : <span>Add</span>}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
