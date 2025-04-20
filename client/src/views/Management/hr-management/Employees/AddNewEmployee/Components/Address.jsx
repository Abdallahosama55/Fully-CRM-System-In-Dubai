import React, { useState } from "react";
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

import "../../../Employees/style.css";
import statesService from "services/newSettings/states.service";
import citiesService from "services/newSettings/cities.service";
import { useNotification } from "context/notificationContext";
import employeeService from "services/Employees/Employees.service";
import { useNavigate } from "react-router-dom";
export default function Address({
  mianInfoForm,
  form,
  current,
  stepsLength,
  next,
  prev,
  CountryList,
  setIsAddNewEmpOpen,
}) {
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  const { openNotificationWithIcon } = useNotification();
  const navigate = useNavigate();

  const getStatesByCountryIdRequest = (CountryId) => {
    statesService
      .getStatesByCountryId(CountryId)
      .then(({ data }) => {
        var states = data?.data.map((item) => ({
          id: item.id,
          state_name: item.name,
        }));
        setStateList(states);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const getCitesByStateIdRequest = (stateId) => {
    citiesService
      .getCitiesByStateId(stateId)
      .then(({ data }) => {
        var cities = data?.data.map((item) => ({
          id: item.id,
          city_name: item.name,
        }));
        setCityList(cities);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const onChangeCountryId = (CountryId) => {
    form.setFieldsValue({
      state_id: undefined, // Set the value to undefined or null to clear the selection
    });
    getStatesByCountryIdRequest(CountryId);
  };
  const onChangeStateId = (StateId) => {
    form.setFieldsValue({
      city_id: undefined, // Set the value to undefined or null to clear the selection
    });
    getCitesByStateIdRequest(StateId);
  };
  // const [form] = Form.useForm();
  const onFinish = (values) => {
    next();
  };

  const AddEmployee = async () => {
    try {
      const values = await form.validateFields();
      console.log("aaaaa", values);

      const addEmployeeFormData = new FormData();
      addEmployeeFormData.append("mobile", mianInfoForm.getFieldsValue()?.prefix?.mobile?.mobile);
      // Loop through key-value pairs
      Object.entries(mianInfoForm.getFieldsValue()).forEach(([key, value]) => {
        // if (key != "employeeRoles") {
        if (key == "startDate")
          value && addEmployeeFormData.append(key, value.format("YYYY-MM-DD"));
        else if (key == "prefix") value && addEmployeeFormData.append(key, value?.mobile?.prefix);
        else {
          value && addEmployeeFormData.append(key, value);
        }
      });
      Object.entries(form.getFieldsValue()).forEach(([key, value]) => {
        value && addEmployeeFormData.append(key, value);
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
        <Form.Item label={"Country"} name="countryId">
          <Select
            onChange={onChangeCountryId}
            showSearch
            filterOption={filterOption}
            placeholder={"Select"}>
            {CountryList.map((country) => (
              <Select.Option key={country.id} value={country.id}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="State"
          name="stateId"
          // rules={[
          //     {
          //         required: true,
          //         message: "Please select a state"

          //     },
          // ]}
        >
          <Select
            onChange={onChangeStateId}
            showSearch
            filterOption={filterOption}
            placeholder={"Select"}>
            {stateList.map((state) => (
              <Select.Option key={state.id} value={state.id}>
                {state.state_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"City"}
          name="cityId"
          // rules={[
          //     {
          //         required: true,
          //         message: "Please select a city"

          //     },
          // ]}
        >
          <Select showSearch filterOption={filterOption} placeholder={"Select"}>
            {cityList.map((city) => (
              <Select.Option key={city.id} value={city.id}>
                {city.city_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Street" name="street">
          <Input placeholder="Write here" />
        </Form.Item>
        <Form.Item label="Zip Code" name="zipCode">
          <Input placeholder="Write here" />
        </Form.Item>
      </Form>
      {current < stepsLength - 1 && (
        <div className="row" style={{ display: "flex", justifyContent: "end" }}>
          {/* <Button htmlType='submit' type="primary">
                        Next
                    </Button> */}
          <Button
            style={{
              width: 100,
            }}
            onClick={() => setIsAddNewEmpOpen(false)}>
            Cancel
          </Button>
          <Button
            style={{
              width: 100,
              marginLeft: "8px",
            }}
            onClick={prev}>
            Previous
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
            style={{
              width: 100,
            }}
            // htmlType='submit'
            onClick={form.submit}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
