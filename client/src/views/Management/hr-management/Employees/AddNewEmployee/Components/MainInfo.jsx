import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Table,
  Typography,
  Switch,
  Form,
  DatePicker,
  Select,
  Radio,
} from "antd";
import AvatarUpload from "./AvatarUpload/index";
import employeeService from "services/Employees/Employees.service";
import { useNavigate } from "react-router-dom";
import { useNotification } from "context/notificationContext";

import "../../../Employees/style.css";
import PhoneNumberInputObjectValue from "components/common/PhoneNumberInputObjectValue";
export default function MainInfo({
  form,
  next,
  departmentList,
  jobTitleList,
  roleList,
  setIsAddNewEmpOpen,
}) {
  const [previewPicData, setPreviewPicData] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  // const [fform]=Form.useForm();
  const onFinish = (values) => {
    form.setFieldValue("image", previewPicData);
    next();
  };
  const AddEmployee = async () => {
    try {
      const values = await form.validateFields();

      const addEmployeeFormData = new FormData();
      addEmployeeFormData.append("mobile", form.getFieldsValue()?.prefix?.mobile?.mobile);
      // Loop through key-value pairs
      Object.entries(form.getFieldsValue()).forEach(([key, value]) => {
        // if (key != "employeeRoles") {
        if (key == "startDate")
          value && addEmployeeFormData.append(key, value.format("YYYY-MM-DD"));
        else if (key == "prefix") value && addEmployeeFormData.append(key, value?.mobile?.prefix);
        else if (key == "image") addEmployeeFormData.append("image", previewPicData);
        else {
          value && addEmployeeFormData.append(key, value);
        }
      });
      //need to delete
      // addEmployeeFormData.append("countryId", 851);
      // addEmployeeFormData.append('workingTimes', "[]");

      AddEmployeeRequest(addEmployeeFormData);

      console.log("Validation successful:", values);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };
  const { openNotificationWithIcon } = useNotification();

  const AddEmployeeRequest = (data) => {
    setIsloading(true);
    employeeService
      .addEmployee(data)
      .then(({ data }) => {
        // debugger;
        setIsloading(false);

        var employeeId = data.data;
        navigate(`/view-employee/${employeeId}`);
      })
      .catch((error) => {
        setIsloading(false);

        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  // const onFormLayoutChange = ({ size }) => {
  //   setComponentSize(size);
  // };

  return (
    <div className="card p-3">
      <Form
        autoComplete="off"
        onFinish={onFinish}
        form={form}
        colon={false}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // initialValues={{
        //     size: componentSize,
        // }}
        labelAlign="left"
        // onValuesChange={onFormLayoutChange}
        size={"small"}
        style={{
          maxWidth: 600,
        }}>
        <Form.Item name="image" label="Avatar" className="avater-label">
          <AvatarUpload setPreviewPicData={setPreviewPicData} />
        </Form.Item>
        <Form.Item label="Id Number" name="employeeID">
          <Input placeholder="Write here" />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input placeholder="Write here" />
        </Form.Item>

        <Form.Item
          label="Department"
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
          label="Roles"
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
        <div style={{ fontWeight: "bold", textAlign: "left", marginBottom: 20 }}>Contact Info</div>
        <Form.Item
          name={["prefix", "mobile"]}
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
          label="Email"
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
      </Form>
      <div className="row" style={{ display: "flex", justifyContent: "end" }}>
        {/* <Button htmlType='submit' type="primary">
                        Next
                    </Button> */}

        <Button
          style={{
            width: 100,
            // margin: '0 8px',
          }}
          onClick={() => setIsAddNewEmpOpen(false)}>
          Cancel
        </Button>
        <Button
          loading={isLoading}
          style={{
            margin: "0 8px",

            width: 100,
          }}
          type="primary"
          onClick={AddEmployee}>
          Save
        </Button>
        <Button
          onClick={form.submit}
          style={{
            width: 100,
          }}>
          Next
        </Button>
      </div>
    </div>
  );
}
