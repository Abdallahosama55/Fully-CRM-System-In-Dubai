import { useState } from "react";
import { Button, Modal, Form, Input, Switch, Select } from "antd";
import { useNotification } from "context/notificationContext";
import employeeService from "services/Employees/Employees.service";
import "../../style.css";
export default function InvitationModal({
  departmentList,
  jobTitleList,
  countryList,
  isEditModalOpen,
  handleEditModalCancel,
}) {
  const { openNotificationWithIcon } = useNotification();
  const [isLoading, setIsloading] = useState(false);
  const [form] = Form.useForm();
  const isActiveShowDesk = Form.useWatch("isEmployeeDefaultDeskActive", form);

  const onFinish = (values) => {
    var data = [{ ...values }];
    inviteEmployeeRequest({ data });
  };

  const inviteEmployeeRequest = (data) => {
    setIsloading(true);
    employeeService
      .inviteEmployee(data)
      .then(({ data }) => {
        setIsloading(false);

        openNotificationWithIcon("success", "Invitation sent successfully");
        form.resetFields();

        handleEditModalCancel();
      })
      .catch((error) => {
        setIsloading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  return (
    <Modal
      centered={true}
      width={400}
      title={null}
      open={isEditModalOpen}
      onCancel={() => {
        form.resetFields();
        handleEditModalCancel();
      }}
      footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>Invite Employee</span>
      </h3>

      <Form
        className="invite-page"
        labelCol={{ span: 24 }} // Default label column width
        wrapperCol={{ span: 24 }} // Default wrapper (input) column width
        requiredMark="optional"
        form={form}
        size="small"
        onFinish={onFinish}
        initialValues={{
          isEmployeeDefaultDeskActive: true,
        }}
        autoComplete="off"
        colon={false}>
        <Form.Item
          label={
            <span>
              Email
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}>
          <Input placeholder="Write here" />
        </Form.Item>
        <Form.Item
          label={
            <span>
              Full Name
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please enter full name",
            },
          ]}>
          <Input placeholder="Write here" />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Department
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          name="departmentId"
          rules={[
            {
              required: true,
              message: "Please select a department",
            },
          ]}>
          <Select placeholder="select" style={{ textAlign: "left" }}>
            {departmentList.map((department) => (
              <Select.Option key={department.id} value={department.id}>
                {department.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          label={`Schedule Desk ${isActiveShowDesk ? "(Active)" : "(Not Active)"}`}
          name="isEmployeeDefaultDeskActive">
          <Switch />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              size="small"
              style={{ width: "48%" }}
              block
              onClick={() => {
                form.resetFields();
                handleEditModalCancel();
              }}>
              Cancel
            </Button>
            <span style={{ width: 5 }}></span>
            <Button
              loading={isLoading}
              size="small"
              htmlType="submit"
              className="btn-add"
              style={{ width: "48%" }}>
              Invite
            </Button>
          </div>
        </Form.Item>
        {/* <Form.Item>
                    <Button size="small" htmlType="submit" className="btn-add" style={{ width: '100%' }}>

                        <span>Invite</span>

                    </Button>
                </Form.Item> */}
      </Form>
    </Modal>
  );
}
