import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Switch, Select } from "antd";
import statesService from "services/newSettings/states.service";
import citiesService from "services/newSettings/cities.service";
import { useNotification } from "context/notificationContext";
import "./editAddressStyle.css";
import employeesService from "../../../../../services/Employees/Employees.service";

export default function EditAddressModal({
  form,
  CountryList,
  isEditModalOpen,
  handleEditModalCancel,
  CountryId,
  stateId,
  employeeData,
  getEmployeeByIdRequest,
}) {
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  // const [editAddressform] = Form.useForm();

  const { openNotificationWithIcon } = useNotification();
  useEffect(() => {
    CountryId && getStatesByCountryIdRequest(CountryId);
    stateId && getCitesByStateIdRequest(stateId);
  }, [CountryId, stateId]);
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
    // form.setFieldsValue({
    //     stateId: undefined, // Set the value to undefined or null to clear the selection
    // });
    getStatesByCountryIdRequest(CountryId);
  };
  const onChangeStateId = (StateId) => {
    form.setFieldsValue({
      cityId: undefined, // Set the value to undefined or null to clear the selection
    });
    getCitesByStateIdRequest(StateId);
  };
  const editAddressEmployeeFormData = new FormData();

  const onFinish = (values) => {
    console.log("values==>", values);
    Object.entries(values).forEach(([key, value]) => {
      value && editAddressEmployeeFormData.append(key, value);
    });
    editAddressEmployeeRequest(employeeData.id, editAddressEmployeeFormData);
  };

  const [isLoading, setIsloading] = useState(false);

  const editAddressEmployeeRequest = (id, data) => {
    setIsloading(true);
    employeesService
      .editAddreeInfo(id, data)
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
      <h3 style={{ textAlign: "center", marginBottom: "1rem", fontSize: 15 }}>
        <span>Edit Address </span>
      </h3>

      <Form
        className="edit-page"
        labelCol={{ span: 24 }} // Default label column width
        wrapperCol={{ span: 24 }} // Default wrapper (input) column width
        // requiredMark="optional"
        form={form}
        size="small"
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item label="Country" name="countryId">
          <Select onChange={onChangeCountryId} showSearch filterOption={filterOption}>
            {CountryList.map((country) => (
              <Select.Option key={country.id} value={country.id}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={<span>State</span>} name="stateId">
          <Select allowClear onChange={onChangeStateId} showSearch filterOption={filterOption}>
            {stateList.map((state) => (
              <Select.Option key={state.id} value={state.id}>
                {state.state_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={<span>City</span>} name="cityId">
          <Select allowClear showSearch filterOption={filterOption}>
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
        <Form.Item>
          <Button
            loading={isLoading}
            size="small"
            htmlType="submit"
            className="btn-add"
            style={{ width: "100%", marginTop: 15 }}>
            <span>Save</span>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
