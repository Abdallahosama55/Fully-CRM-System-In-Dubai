import { Col, DatePicker, Form, Image, Row, Typography, message } from "antd";
import { AddEmployees, DeleteTimeSVG, EditTimeSVG, TimeSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import React, { useState, Fragment } from "react";
import { diffStarTimeEndTime, filterWorkingHoursObject, separateDays } from "utils/WokingHours";
import defaultDim from "assets/images/house.png";
import { useNavigate } from "react-router-dom";
import EmployeeService from "services/Employee/employee.service";
import { axiosCatch } from "utils/axiosUtils";
import WorkingHours from "./WorkingHours";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { useNotification } from "context/notificationContext";

function Employees({ deskEmployess }) {
  const { openNotificationWithIcon } = useNotification();
  const [employeesinfo, setEmployeesinfo] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [addWorkingHoursLoading, setAddWorkingHoursLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  function calculateDuration(startTime, endTime) {
    const start = new Date(`01/01/2000 ${startTime}`);
    const end = new Date(`01/01/2000 ${endTime}`);
    const duration = (end - start) / 1000; // Duration in seconds
    const hours = Math.floor(duration / 3600); // Duration in hours
    const minutes = Math.floor((duration % 3600) / 60); // Duration in minutes

    return { hours, minutes };
  }
  function calculateTotalHours(schedule) {
    let totalHours = 0;

    for (const day in schedule) {
      const { startTime, endTime } = schedule[day];
      const { hours, minutes } = calculateDuration(startTime, endTime);
      totalHours += hours + minutes / 60;
    }

    return totalHours;
  }

  const goToAddEmployee = () => {
    navigate(ROUTER_URLS.EMPLOYEE.ADD);
  };
  // Wait API
  const onFinish = async (values) => {
    const filterdValues = filterWorkingHoursObject(values);
    const result = separateDays(filterdValues);
    if (result.length === 0) {
      openNotificationWithIcon("info", "You should add one day at least");
      return;
    }
    const formatObj = {};
    result.forEach((day) => {
      formatObj[day.day] = {
        startTime: day.startTime,
        endTime: day.endTime,
      };
    });
    try {
      setAddWorkingHoursLoading(true);
      //new Api for update
      const { id, deskId } = employeesinfo;
      // const res = await EmployeeService.addEditGeneralWorkingHours(
      //   employeesinfo,
      //   formatObj,
      // );
      message.success("Working Hours Added Successfully");
      setIsEdit(false);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setAddWorkingHoursLoading(false);
    }
  };
  // Wait API
  // const deleteDEskTime = () => {
  //   const { id, deskId } = employeesinfo;
  //   //delete time
  // };

  return (
    <div className="desk-information-employees">
      <Row justify="start" gutter={[32, 42]} className="rows-verses">
        {deskEmployess?.map((data, i) => (
          <Fragment key={i}>
            {data.employees.map((employ) => (
              <Col
                xs={24}
                sm={24}
                md={5}
                lg={5}
                style={{ opacity: "1", width: "268px" }}
                key={data.id}
                className={`${
                  employ.deskEmployee.employeeId === employeesinfo?.id && "border"
                } employees`}
                onClick={() =>
                  setEmployeesinfo({
                    id: employ.deskEmployee.employeeId,
                    deskId: employ.deskEmployee.deskId,
                  })
                }>
                <Row gutter={[10, 10]}>
                  <Col xs={24}>
                    <div className="main-col-card" style={{ position: "relative" }}>
                      <div className="image-holder shadow">
                        <Image
                          preview={false}
                          src={employ?.image || defaultDim}
                          alt="dimension"
                          width="76px"
                          height="76px"
                          className="explore-card-img"
                        />
                      </div>
                      <div style={{ height: "70px" }} className="image-text-holder ">
                        <Typography.Text className="explore-card-subtitle" ellipsis>
                          {employ?.fullName}
                        </Typography.Text>
                        <Typography.Text
                          style={{ color: "#8E8E93", fontSize: "12px" }}
                          className="explore-card-subtitle"
                          ellipsis>
                          {employ?.job || "Ux"}
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
          </Fragment>
        ))}
        <Col
          xs={24}
          sm={24}
          md={5}
          lg={5}
          className="add-employees"
          style={{ opacity: "1", width: "268px" }}>
          <Row gutter={[10, 10]}>
            <Col onClick={goToAddEmployee} xs={24}>
              <div className="main-col-card" style={{ position: "relative" }}>
                <AddEmployees width={40} height={40} />
                <div>Add Employee</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div>
        {deskEmployess[0]?.employees.map((emp, i) => {
          if (emp.deskEmployee.employeeId === employeesinfo?.id) {
            return (
              <Fragment key={i}>
                <div className="data-time">
                  <div className="fw-500 fs-14 capitalize">
                    {emp?.fullName} (Total:
                    {calculateTotalHours(emp.deskEmployee.workingHours)} Hrs)
                  </div>
                  <div className="icons">
                    <div className="edit-delete-time">
                      <EditTimeSVG onClick={() => setIsEdit(true)} />
                    </div>
                    <div className="edit-delete-time">
                      <DeleteTimeSVG />
                    </div>
                  </div>
                </div>
                {!isEdit ? (
                  <>
                    {emp.deskEmployee.workingHours
                      ? Object.entries(emp.deskEmployee.workingHours).map(([key, value], i) => (
                          <Row
                            key={key}
                            justify="space-between"
                            align="middle"
                            gutter={[12, 12]}
                            className="working-hours"
                            style={{
                              background: i % 2 === 1 ? "#F2F2F74D" : "#fff",
                            }}>
                            <Col xs={5}>
                              <Typography.Text>{key}</Typography.Text>
                            </Col>
                            <Col xs={15}>
                              <Row justify="space-between" align="middle">
                                <Col xs={2}>
                                  <div>
                                    <TimeSVG />
                                  </div>
                                </Col>
                                <Col xs={22}>
                                  <DatePicker.RangePicker
                                    showTime
                                    className="w-100 date-picker"
                                    suffixIcon={<></>}
                                    format="HH:mm A"
                                    value={[
                                      dayjs(value.startTime, "HH:mm"),
                                      dayjs(value.endTime, "HH:mm"),
                                    ]}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col xs={2}>
                              <Typography.Text>
                                {diffStarTimeEndTime(
                                  dayjs(value.startTime, "HH:mm"),
                                  dayjs(value.endTime, "HH:mm"),
                                )}{" "}
                                hrs
                              </Typography.Text>
                            </Col>
                          </Row>
                        ))
                      : `${emp?.fullName} has no working hours`}
                  </>
                ) : (
                  <Form form={form} layout="vertical" onFinish={onFinish}>
                    <WorkingHours
                      form={form}
                      employeeId={emp.deskEmployee.employeeId}
                      loading={addWorkingHoursLoading}
                      show={false}
                      workingHours={emp.deskEmployee.workingHours}
                      setIsEdit={setIsEdit}
                    />
                  </Form>
                )}
              </Fragment>
            );
          } else <></>;
        })}
      </div>
    </div>
  );
}

export default Employees;
