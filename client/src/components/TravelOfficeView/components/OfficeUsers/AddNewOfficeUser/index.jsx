import { Button, Col, Form, Input, message, Row, Select, Space, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { ArrowBackSVG } from "assets/jsx-svg";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import React, { useEffect } from "react";
import useAddOfficeUser from "services/agencies/Users/Mutations/useAddOfficeUser";
import useEditOfficeUser from "services/agencies/Users/Mutations/useEditOfficeUser";
import useGetOfficeUserById from "services/agencies/Users/Queries/useGetOfficeUserById";
const tempRoles = [
  { label: "Admin", value: 0 },
  { label: "User", value: 1 },
];
const AddNewOfficeUser = ({ userId, officerId, back, onEndAdd, onEndEdit }) => {
  const [form] = useForm();
  // QUERYES
  const userQuery = useGetOfficeUserById(userId, {
    enabled: !!userId,
  });

  useEffect(() => {
    if (userQuery?.data) {
      console.log(userQuery?.data);
      console.log({
        prefix: userQuery?.data?.prefix,
        mobile: userQuery?.data?.mobile,
      });
      form.setFieldsValue({
        ...userQuery?.data,
        phone: {
          prefix: userQuery?.data?.prefix,
          mobile: userQuery?.data?.mobile,
        },
        accessLevel:
          userQuery?.data?.roles && userQuery?.data?.roles[0] && userQuery?.data?.roles[0]?.id,
      });
    }
  }, [userQuery?.data]);

  // MUTATIONS
  const addUserMutation = useAddOfficeUser({
    onSuccess: (res, payload) => {
      onEndAdd({
        ...payload,
        id: res,
        mobile: payload?.phone,
        employeeRoles: [
          {
            id: payload?.accessLevel,
            role: {
              id: payload?.accessLevel,
              name: tempRoles.find((item) => item.value === payload?.accessLevel)?.label,
            },
          },
        ],
      });
      back();
    },
    onError: (error) => {
      console.log(error);
      message.error(error.message);
    },
  });

  const editUserMutation = useEditOfficeUser({
    onSuccess: (_, payload) => {
      onEndEdit({ ...payload, id: userId, mobile: payload?.phone });
      back();
    },
    onError: (error) => {
      console.log(error);
      message.error("Failed to update user");
    },
  });

  const handelFinish = (values) => {
    const temp = { ...values, phone: values?.phone };
    if (userId) {
      editUserMutation.mutate({ userId, ...temp });
    } else {
      addUserMutation.mutate({ ...temp });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Space>
          <Button icon={<ArrowBackSVG />} size="small" onClick={back} />
          <p className="lg_text_medium">{userId ? "" : "Add New User"}</p>
        </Space>
      </div>
      <Form layout="vertical" form={form} onFinish={handelFinish}>
        <Form.Item hidden name={"officerId"} initialValue={officerId} />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="fullName"
              label={"Full Name"}
              rules={[{ required: true, message: "Enter user full name" }]}>
              <Input placeholder="first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="accessLevel"
              label={"Access Level"}
              rules={[{ required: true, message: "Select user access level" }]}>
              <Select placeholder="Access level" options={tempRoles} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label={"Email"}
              rules={[
                { required: true, message: "Enter user email" },
                { type: "email", message: "Enter valid email" },
              ]}>
              <Input placeholder="first name" type={"email"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="phone"
              label={"Phone"}
              rules={[{ required: true, message: "Enter user phone" }]}>
              <PhoneNumberInput placeholder="05000000000" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex" style={{ marginTop: "2rem", justifyContent: "flex-end" }}>
          <Space>
            <Button onClick={back}>Cancel</Button>
            <Button
              disabled={addUserMutation.isPending || editUserMutation.isPending}
              type="primary"
              htmlType="submit">
              {" "}
              {addUserMutation.isPending || editUserMutation.isPending ? (
                <Spin size="small" />
              ) : userId ? (
                "Edit User"
              ) : (
                "Add User"
              )}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default AddNewOfficeUser;
