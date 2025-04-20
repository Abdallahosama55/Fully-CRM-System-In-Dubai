import { useEffect, useState } from "react";
import { Button, Modal, Form, Select } from "antd";
import { useNotification } from "context/notificationContext";
import "./editAddressStyle.css";
import WorkingTimesComponent from "../../Employees/AddNewEmployee/Components/WorkingTimesComponent";
import employeesService from "../../../../../services/Employees/Employees.service";

export default function EditWorkingHoursModal({
  form,
  JobLocations,
  JobTypes,
  isEditModalOpen,
  handleEditModalCancel,
  workingItems,
  employeeData,
  getEmployeeByIdRequest,
}) {
  const { openNotificationWithIcon } = useNotification();

  const [items, setItems] = useState([]);

  const onFinish = (values) => {
    console.log("values==>", values);
  };

  useEffect(() => {
    if (workingItems) {
      var parsedItems = workingItems;
      console.log("parsedItems==>", parsedItems);
      setItems(parsedItems);
    }
  }, [workingItems]);
  // const [fsorm]=Form.useForm()
  const editWorkingHoursModal = () => {
    var jobLocationId = form.getFieldValue("jobLocationId");
    var jobTypeId = form.getFieldValue("jobTypeId");
    const workingTimes = JSON.stringify(items);
    var objectToEdit = { jobLocationId, jobTypeId, workingTimes };
    editWorkingTimesEmployeeRequest(employeeData.id, objectToEdit);
  };
  const [isLoading, setIsloading] = useState(false);

  const editWorkingTimesEmployeeRequest = (id, data) => {
    setIsloading(true);
    employeesService
      .AddEditWorkingHours(id, data)
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
      width={800}
      title={null}
      open={isEditModalOpen}
      onCancel={handleEditModalCancel}
      footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem", fontSize: 15 }}>
        <span>Edit Employee Working Times </span>
      </h3>

      <Form
        className="edit-page"
        labelCol={{ span: 24 }} // Default label column width
        wrapperCol={{ span: 12 }} // Default wrapper (input) column width
        form={form}
        size="small"
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item label={"Job location"} name="jobLocationId">
          <Select allowClear placeholder="Select">
            {JobLocations.map((jobLocation) => (
              <Select.Option key={jobLocation.id} value={jobLocation.id}>
                {jobLocation.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={"Job type"} name="jobTypeId">
          <Select allowClear placeholder="Select">
            {JobTypes.map((jobType) => (
              <Select.Option key={jobType.id} value={jobType.id}>
                {jobType.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <WorkingTimesComponent items={items} setItems={setItems} />
      <Button
        loading={isLoading}
        size="small"
        onClick={editWorkingHoursModal}
        className="btn-add"
        style={{ width: "100%", marginTop: 15 }}>
        <span>Save</span>
      </Button>
    </Modal>
  );
}
