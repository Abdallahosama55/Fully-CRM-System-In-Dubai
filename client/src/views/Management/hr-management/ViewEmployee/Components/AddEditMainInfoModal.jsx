import { useState } from "react";
import { Button, Modal, Form, Input, Switch, Select, DatePicker, Radio } from "antd";
import "./style.css";
import AvatarUpload from "./AvatarUpload/index";
import employeesService from "../../../../../services/Employees/Employees.service";
import { useNotification } from "context/notificationContext";
import allTimezones from "constants/TIME_ZONES";
import PhoneNumberInputObjectValue from "components/common/PhoneNumberInputObjectValue";

export default function AddEditMainInfoModal({
  form,
  departmentList,
  jobTitleList,
  roleList,
  isEditModalOpen,
  handleEditModalCancel,
  employeeData,
  getEmployeeByIdRequest,
}) {
  const editEmployeeFormData = new FormData();
  const [PreviewPicData, setPreviewPicData] = useState();
  const isActiveShowDesk = Form.useWatch("isEmployeeDefaultDeskActive", form);
  const onFinish = (values) => {
    localStorage.setItem("time-zone", values?.timeZone);

    PreviewPicData && editEmployeeFormData.append("image", PreviewPicData);
    editEmployeeFormData.append("mobile", values?.mobile?.mobile);
    Object.entries(values).forEach(([key, value]) => {
      // if (key != "employeeRoles") {
      if (key == "startDate") value && editEmployeeFormData.append(key, value.format("YYYY-MM-DD"));
      else if (key == "mobile")
        value?.mobile && editEmployeeFormData.append("prefix", value?.prefix);
      else if (key == "image") console.log("image==>");
      else {
        value && editEmployeeFormData.append(key, value);
      }
      // }
    });
    console.log("--->employeeData", editEmployeeFormData);
    console.log("--->values", values);
    editMainInfoEmployeeRequest(employeeData.id, editEmployeeFormData);
  };
  const { openNotificationWithIcon } = useNotification();
  const [isLoading, setIsloading] = useState(false);
  const editMainInfoEmployeeRequest = (id, data) => {
    setIsloading(true);
    employeesService
      .editMainInfo(id, data)
      .then(({ data }) => {
        setIsloading(false);

        // var employeeId = data.data;
        // navigate(`/Management/hr-management/view-employee/${employeeId}`);
        getEmployeeByIdRequest(id);
        handleEditModalCancel();
      })
      .catch((error) => {
        setIsloading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  return (
    <Modal
      centered={true}
      width={400}
      title={null}
      open={isEditModalOpen}
      onCancel={handleEditModalCancel}
      footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>Edit Employee Info</span>
      </h3>

      <Form
        className="edit-page"
        labelCol={{ span: 24 }} // Default label column width
        wrapperCol={{ span: 24 }} // Default wrapper (input) column width
        requiredMark="optional"
        form={form}
        size="small"
        onFinish={onFinish}
        autoComplete="off"
        colon={false}>
        <Form.Item name="image" label="Avatar" className="avater-label">
          {console.log("employeeData?.profileImage=>", employeeData?.profileImage)}
          <AvatarUpload
            previewImg={employeeData?.profileImage}
            setPreviewPicData={setPreviewPicData}
          />
        </Form.Item>
        <Form.Item label="Id Number" name="employeeID">
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
        <Form.Item label="Job Title" name="jobTitleId">
          <Select placeholder="select" style={{ textAlign: "left" }}>
            {jobTitleList.map((jobTitle) => (
              <Select.Option key={jobTitle.id} value={jobTitle.id}>
                {jobTitle.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="employeeRoles"
          label={
            <span>
              Roles
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              // required: false,
              required: true,
              message: "Please select roles!",
              type: "array",
            },
          ]}>
          <Select mode="multiple" placeholder="Please select roles" style={{ textAlign: "left" }}>
            {roleList.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Start Date" name="startDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          valuePropName="checked"
          label={`Schedule Desk ${isActiveShowDesk ? "(Active)" : "(Not Active)"}`}
          name="isEmployeeDefaultDeskActive">
          <Switch />
        </Form.Item>
        <Form.Item
          name={"mobile"}
          label="Phone Number"
          // rules={[
          //     {
          //         required: true,
          //     },
          // ]}
        >
          <PhoneNumberInputObjectValue />
        </Form.Item>
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
          // rules={[
          //     {
          //         required: true,
          //     },
          // ]}
          name="gender"
          label="Gender">
          <Radio.Group defaultValue={0} style={{ display: "flex", alignItems: "left" }}>
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="timeZone" label="Time zone">
          <Select
            showSearch
            options={allTimezones.map((item) => ({ label: item, value: item }))}></Select>
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            size="small"
            htmlType="submit"
            className="btn-add"
            style={{ width: "100%" }}>
            <span>Save</span>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
