import React, { useEffect, useState } from "react";
import { TimePicker, Button, Form, Select } from "antd";
import dayjs from "dayjs";
import DeleteSVG from "../../../../../../assets/jsx-svg/Delete";
import AddSVG from "../../../../../../assets/jsx-svg/Add";
import { v4 as uuidv4 } from "uuid";
import { useNotification } from "context/notificationContext";
import employeeService from "services/Employees/Employees.service";
import constantsService from "services/Employees/Constants.service";
import WorkingTimesComponent from "./WorkingTimesComponent";
import { useNavigate } from "react-router-dom";

export default function WorkingTimes({ mianInfoForm, addresForm, prev, setIsAddNewEmpOpen }) {
  const [workingTimesForm] = Form.useForm();
  const navigate = useNavigate();

  const [jobTypes, setJobTypes] = useState([]);
  const [jobLocations, setJobLocations] = useState([]);
  const getJobTypesRequest = (data) => {
    constantsService
      .getJobTypes(data)
      .then(({ data }) => {
        var JobTypes = data?.data.map((item) => ({
          ...item,
        }));

        setJobTypes(JobTypes);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const getJobLocationsRequest = (data) => {
    constantsService
      .getJobLocations(data)
      .then(({ data }) => {
        var JobLocations = data?.data.map((item) => ({
          ...item,
        }));

        setJobLocations(JobLocations);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  useEffect(() => {
    getJobTypesRequest();
    getJobLocationsRequest();
  }, []);
  const { openNotificationWithIcon } = useNotification();

  const [items, setItems] = useState([]);

  function hasOverlap(intervals) {
    for (let i = 0; i < intervals.length - 1; i++) {
      for (let j = i + 1; j < intervals.length; j++) {
        const interval1 = intervals[i];
        const interval2 = intervals[j];

        const start1 = new Date(`1970-01-01T${interval1.startTime}:00`);
        const end1 = new Date(`1970-01-01T${interval1.endTime}:00`);

        const start2 = new Date(`1970-01-01T${interval2.startTime}:00`);
        const end2 = new Date(`1970-01-01T${interval2.endTime}:00`);

        // Check for overlap
        if (start1 < end2 && end1 > start2) {
          return true; // Overlapping intervals found
        }
      }
    }

    return false; // No overlapping intervals
  }
  const [overlappedItem, setOverlappedItem] = useState(null);
  const checkOverlapping = (items) => {
    // debugger;
    for (let i = 0; i < items.length; i++) {
      if (hasOverlap(items[i].daySlips)) {
        return items[i];
      } // Overlapping intervals found
    }

    return null;
  };

  const isOverLappingWorkingTimes = () => {
    var overlapedItem = checkOverlapping(items.filter((e) => e.isChecked));
    console.log("checkOverlapping(items.filter((e) => e.isChecked))");
    setOverlappedItem(overlapedItem);
    if (overlapedItem) {
      openNotificationWithIcon("error", `Please solve conflict on day:"${overlapedItem.dayName}"`);

      return true;
    }
    return false;
  };
  const AddEmployee = () => {
    const addEmployeeFormData = new FormData();
    if (isOverLappingWorkingTimes()) {
      return false;
    }

    addEmployeeFormData.append("mobile", mianInfoForm.getFieldsValue()?.prefix?.mobile?.mobile);
    // Loop through key-value pairs
    Object.entries(mianInfoForm.getFieldsValue()).forEach(([key, value]) => {
      // if (key != "employeeRoles") {
      if (key == "startDate") value && addEmployeeFormData.append(key, value.format("YYYY-MM-DD"));
      else if (key == "prefix") value && addEmployeeFormData.append(key, value?.mobile?.prefix);
      else {
        value && addEmployeeFormData.append(key, value);
      }
      // }
    });
    Object.entries(addresForm.getFieldsValue()).forEach(([key, value]) => {
      value && addEmployeeFormData.append(key, value);
    });
    Object.entries(workingTimesForm.getFieldsValue()).forEach(([key, value]) => {
      value && addEmployeeFormData.append(key, value);
    });

    // addEmployeeFormData.append("employeeRoles", 1);
    // addEmployeeFormData.append("employeeRoles", 2);

    addEmployeeFormData.append("workingTimes", JSON.stringify(items));

    // var addEmployee
    // if (!isOverLappingWorkingTimes()) {
    //     console.log("items=>", items.filter((e) => e.isChecked));
    // }
    // addEmployeeformData.append("workingTimes", items);
    AddEmployeeRequest(addEmployeeFormData);
  };
  const [isLoading, setIsloading] = useState(false);
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
        // onFinish={onFinish}
        form={workingTimesForm}
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
        <Form.Item label={"Job location"} name="jobLocationId">
          <Select
            allowClear
            placeholder="Select"
            // onChange={onChangeCountryId}

            // filterOption={filterOption}
          >
            {jobLocations.map((jobLocation) => (
              <Select.Option key={jobLocation.id} value={jobLocation.id}>
                {jobLocation.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={"Job type"} name="jobTypeId">
          <Select
            allowClear
            // onChange={onChangeCountryId}
            placeholder="Select"
            // filterOption={filterOption}
          >
            {jobTypes.map((jobType) => (
              <Select.Option key={jobType.id} value={jobType.id}>
                {jobType.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <WorkingTimesComponent items={items} setItems={setItems} />
      <div className="row" style={{ display: "flex", justifyContent: "end" }}>
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
            margin: "0 8px",
          }}
          onClick={prev}>
          Previous
        </Button>
        <Button
          loading={isLoading}
          style={{
            width: 100,
          }}
          type="primary"
          onClick={AddEmployee}>
          Save
        </Button>
      </div>
    </div>
  );
}
