import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useParams } from "react-router-dom";

import { EditSVG } from "assets/jsx-svg";
import AddEditMainInfoModal from "./Components/AddEditMainInfoModal";
import EditAddressModal from "./Components/EditAddressModal";
import EditWorkingHoursModal from "./Components/EditWorkingHoursModal";
import dayjs from "dayjs";
import { Form, Switch, Row, Col } from "antd";
import { useNotification } from "context/notificationContext";
import UserSolidSVG from "../../../../assets/jsx-svg/UserSolidSVG";

import employeeService from "services/Employees/Employees.service";
import DepartementsService from "services/newSettings/departements.service";
import jobTitlesService from "services/newSettings/jobTitles.service";
import CountriesService from "services/newSettings/countries.service";
import RolesService from "services/newSettings/roles.service";
import constantsService from "services/Employees/Constants.service";

function WorkingTimeComp({ dayName, daySlips, isChecked }) {
  return (
    <div
      style={{
        color: !isChecked ? "gray" : "",
        backgroundColor: !isChecked ? "#e7e7e7" : "",
        width: 110,
        padding: "12px 0px",
        borderRadius: 12,
        border: "1px solid #E5E5EA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "3rem",
      }}>
      <h6>{dayName}</h6>
      {isChecked &&
        daySlips.map((item) => (
          <div key={item.slipId}>
            <hr style={{ margin: "7px 0px", border: "1px solid #c9c9cd", width: "95%" }}></hr>
            <div style={{ color: "gray" }}>
              <span>{item.startTime}</span> to <span>{item.endTime}</span>
            </div>
            <div style={{ fontWeight: "bold", textAlign: "center" }}>{item.noHours} hrs</div>
          </div>
        ))}
    </div>
  );
}

function ViewEmployeeLabelResult({ label, result }) {
  return (
    <>
      <Col sm={6} md={6}>
        <h4 style={{ fontWeight: 600, fontSize: 13 }}>{label}</h4>
      </Col>
      <Col sm={18} md={18} style={{ marginBottom: "1rem" }}>
        <p style={{ fontSize: 13 }}>{result}</p>
      </Col>
    </>
  );
}

export default function ViewEmployee() {
  const [roleIds, setroleIds] = useState([]);

  const { employeeId } = useParams();
  const [editMainInfoform] = Form.useForm();
  const [ediWorkingTimesform] = Form.useForm();
  const [editAddressform] = Form.useForm();
  const [isEditMainInfoModalOpen, seIsEditMainInfoModalOpen] = useState(false);
  const [isEditAddressModalOpen, seIsEditAddressModalOpen] = useState(false);
  const [isEditWorkingHoursModalOpen, setEditWorkingHoursModalOpen] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [jobTitleList, setJobTitleList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [JobLocations, setJobLocations] = useState([]);
  const [JobTypes, setJobTypes] = useState([]);

  //////////////

  const handleEditMainInfoModal = () => {
    editMainInfoform.setFieldsValue({
      timeZone: employeeData?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      employeeID: employeeData?.employeeID,
      fullName: employeeData?.fullName,
      departmentId: employeeData?.departmentId,
      jobTitleId: employeeData?.jobTitleId,
      employeeRoles: roleIds,
      isEmployeeDefaultDeskActive: employeeData?.isEmployeeDefaultDeskActive,

      startDate: employeeData?.startDate && dayjs(employeeData?.startDate, "YYYY-MM-DD"),
      mobile: {
        mobile: employeeData?.mobile,
        prefix: employeeData?.prefix,
      },
      email: employeeData?.email,
      gender: employeeData?.gender,
    });

    seIsEditMainInfoModalOpen(true);
  };

  const handleEditMainInfoModalCancel = () => {
    seIsEditMainInfoModalOpen(false);
  };
  //////
  const handleEditAddressModal = () => {
    editAddressform.setFieldsValue({
      countryId: employeeData?.countryId,
      stateId: employeeData?.stateId,
      cityId: employeeData?.cityId,
      street: employeeData?.street,
      zipCode: employeeData?.zipCode,
    });
    seIsEditAddressModalOpen(true);
  };

  const handleEditAddressModalCancel = () => {
    seIsEditAddressModalOpen(false);
    editAddressform.resetFields();
  };

  useEffect(() => {
    getEmployeeByIdRequest(employeeId);
  }, [employeeId]);
  const [employeeData, setEmployeeData] = useState();
  const [employeeRolesStr, setEmployeeRolesStr] = useState("");
  const [employeeGenderStr, setEmployeeGenderStr] = useState("");
  const DefaultStartTime = "07:00";
  const DefaultEndTime = "10:00";
  const Days_FO = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function getTimeDifference(startTime, endTime) {
    var d1 = new Date("March 13, 08 " + startTime);
    var d2 = new Date("March 13, 08 " + endTime);
    var d3 = new Date(d2 - d1);

    var hour = (d3.getHours() - 2).toString();
    var minute = d3.getMinutes().toString();

    if (hour.length === 1) {
      hour = "0" + hour;
    }
    if (minute.length === 1) {
      minute = "0" + minute;
    }
    var noOfHours = hour + ":" + minute;
    // return endTimeNo - startTimeNo;
    noOfHours = noOfHours.includes("-") ? "Non" : noOfHours;
    if (d3.getHours() - 2 == 0 && d3.getMinutes() < 30) noOfHours = "Non";
    return noOfHours;
  }

  const difaultWorkingHours = [
    {
      id: 1,
      isChecked: false,
      dayName: Days_FO[0],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },

        {
          slipId: 2,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 2,
      isChecked: false,
      dayName: Days_FO[1],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 3,
      isChecked: false,
      dayName: Days_FO[2],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 4,
      isChecked: false,
      dayName: Days_FO[3],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 5,
      isChecked: false,
      dayName: Days_FO[4],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 6,
      isChecked: false,
      dayName: Days_FO[5],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
    {
      id: 7,
      isChecked: false,
      dayName: Days_FO[6],
      daySlips: [
        {
          slipId: 1,
          startTime: DefaultStartTime,
          endTime: DefaultEndTime,
          noHours: getTimeDifference(DefaultStartTime, DefaultEndTime),
        },
      ],
    },
  ];

  const getAllRoleListRequest = () => {
    RolesService.getActiveAll()
      .then(({ data }) => {
        // setIsLoading(false);
        var roles = data?.data.map((item) => ({
          ...item,
        }));

        setRoleList(roles);
      })
      .catch((error) => {
        // setIsLoading(false);
        var { errors } = error?.response.data;
        // openNotificationWithIcon("error", errors[0]);
      });
  };

  const getAllJobTitleListRequest = () => {
    jobTitlesService
      .getAllActive()
      .then(({ data }) => {
        var jobTitls = data?.data.map((item) => ({
          ...item,
        }));
        setJobTitleList(jobTitls);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        // openNotificationWithIcon("error", errors[0]);
      });
  };

  const getAllDepartmentListRequest = () => {
    DepartementsService.getAll()
      .then(({ data }) => {
        // setIsLoading(false);
        var departements = data?.data.map((item, index) => ({
          ...item,
        }));

        setDepartmentList(departements);
      })
      .catch((error) => {
        // setIsLoading(false);
        var { errors } = error?.response.data;
        // openNotificationWithIcon("error", errors[0]);
      });
  };

  const getAllCountryListRequest = () => {
    CountriesService.getAll()
      .then(({ data }) => {
        var countries = data?.data.map((item, index) => ({
          ...item,
        }));

        setCountryList(countries);
      })
      .catch((error) => {});
  };
  const getAllJobTypesRequest = () => {
    constantsService
      .getJobTypes()
      .then(({ data }) => {
        // setIsLoading(false);
        var JobTypes = data?.data.map((item) => ({
          ...item,
        }));

        setJobTypes(JobTypes);
      })
      .catch((error) => {});
  };
  const getAllJobLocationsRequest = () => {
    constantsService
      .getJobLocations()
      .then(({ data }) => {
        var jobLocations = data?.data.map((item) => ({
          ...item,
        }));

        setJobLocations(jobLocations);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getAllDepartmentListRequest();
    getAllJobTitleListRequest();
    getAllCountryListRequest();
    getAllRoleListRequest();
    getAllJobLocationsRequest();
    getAllJobTypesRequest();
  }, []);

  const [workingTimes, setWorkingTimes] = useState(difaultWorkingHours);
  const getEmployeeByIdRequest = (employeeId) => {
    employeeService
      .getById(employeeId)
      .then(({ data }) => {
        setEmployeeData(data.data);
        setSwitchStatus(data.data?.isActive);
        var rolesStr = "";
        var roleIds = [];
        data?.data?.roles.map((item) => {
          rolesStr += "," + item?.name;
          roleIds.push(item.id);
        });
        setroleIds(roleIds);
        setEmployeeRolesStr(rolesStr.slice(1));
        data.data?.gender && setEmployeeGenderStr(data.data?.gender == "M" ? "Male" : "Female");

        var parsedItems = data.data?.generalWorkingHours;

        setWorkingTimes(parsedItems);
        calculateTotalTime(parsedItems.filter((item) => item.isChecked));
      })
      .catch((error) => {
        var { errors } = error?.response.data;
      });
  };

  const handleEditWorkingHoursModal = () => {
    ediWorkingTimesform.setFieldsValue({
      jobLocationId: employeeData?.jobLocationId,
      jobTypeId: employeeData?.jobTypeId,
    });
    setEditWorkingHoursModalOpen(true);
  };

  const handleEditWorkingHoursModalCancel = () => {
    setEditWorkingHoursModalOpen(false);
    ediWorkingTimesform.resetFields();
  };
  const [totalHours, setTotalHours] = useState("");
  const calculateTotalTime = (timesList) => {
    // Calculate total noHours
    const totalNoMinutes = timesList.reduce((total, day) => {
      // Sum the noHours for each day
      const dayTotalMinutes = day.daySlips.reduce((daySum, slip) => {
        // Convert "HH:mm" to total minutes
        const [hours, minutes] = slip.noHours.split(":");
        return daySum + parseInt(hours) * 60 + parseInt(minutes);
      }, 0);

      // Add the dayTotalMinutes to the overall total
      return total + dayTotalMinutes;
    }, 0);

    // Manual formatting without using new Date
    const hours = Math.floor(totalNoMinutes / 60);
    const minutes = totalNoMinutes % 60;
    const totalNoHours = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    setTotalHours(totalNoHours);
  };
  const { openNotificationWithIcon } = useNotification();

  const [switchStatus, setSwitchStatus] = useState(employeeData?.isActive);
  const employeeToggleActivateRequest = (id, status) => {
    // setIsLoading(true);
    employeeService
      .toggleActivate(id, status)
      .then(({ data }) => {
        setSwitchStatus(status);
        openNotificationWithIcon("success", status ? "Activated" : "Deactivated");
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const onSwitchChanged = (employeeId, isChecked) => {
    employeeToggleActivateRequest(employeeId, isChecked);
  };
  return (
    <div>
      <EditWorkingHoursModal
        form={ediWorkingTimesform}
        JobLocations={JobLocations}
        JobTypes={JobTypes}
        handleEditModalCancel={handleEditWorkingHoursModalCancel}
        isEditModalOpen={isEditWorkingHoursModalOpen}
        workingItems={employeeData?.generalWorkingHours}
        employeeData={employeeData}
        getEmployeeByIdRequest={getEmployeeByIdRequest}
      />
      <AddEditMainInfoModal
        form={editMainInfoform}
        jobTitleList={jobTitleList}
        departmentList={departmentList}
        roleList={roleList}
        handleEditModalCancel={handleEditMainInfoModalCancel}
        isEditModalOpen={isEditMainInfoModalOpen}
        employeeData={employeeData}
        getEmployeeByIdRequest={getEmployeeByIdRequest}
      />
      <EditAddressModal
        stateId={employeeData?.stateId}
        CountryId={employeeData?.countryId}
        form={editAddressform}
        CountryList={countryList}
        handleEditModalCancel={handleEditAddressModalCancel}
        isEditModalOpen={isEditAddressModalOpen}
        employeeData={employeeData}
        getEmployeeByIdRequest={getEmployeeByIdRequest}
      />
      <div className="img-section">
        <div>
          {employeeData?.profileImage ? (
            <img src={employeeData?.profileImage} />
          ) : (
            <UserSolidSVG style={{ height: 80 }} />
          )}
        </div>
        <div style={{ marginLeft: 15 }}>
          <h6 style={{ fontSize: 15 }}>
            {employeeData?.fullName}
            <span style={{ margin: "0px 10px", color: "green" }}>
              <Switch
                size="small"
                checked={switchStatus}
                onChange={(e) => onSwitchChanged(employeeId, e)}
              />
            </span>
            {/* <span onClick={handleEditImageModal} style={{ margin: '0px 10px', cursor: 'pointer' }} title='Edit'>
                            <EditSVG />
                        </span> */}
          </h6>
          <p>{employeeData?.jobPosition?.title || ""}</p>
        </div>
      </div>
      <hr style={{ margin: "25px 0px", border: "1px solid #c9c9cd" }}></hr>
      <Row>
        <Col style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: 17,
              }}>
              Employee Info
            </h6>
            <span
              style={{ margin: "0px 10px", cursor: "pointer" }}
              title="Edit"
              onClick={handleEditMainInfoModal}>
              <EditSVG />
            </span>
          </div>
        </Col>
        <ViewEmployeeLabelResult label={"Id Number"} result={employeeData?.employeeID || "-"} />

        <ViewEmployeeLabelResult label={"Roles"} result={employeeRolesStr || "-"} />
        <ViewEmployeeLabelResult
          label={"Department"}
          result={employeeData?.department?.name || "-"}
        />
        <ViewEmployeeLabelResult
          label={"Start Date"}
          result={employeeData?.startDate ? employeeData?.startDate?.split("T")[0] : "-"}
        />
        <ViewEmployeeLabelResult
          label={"Schedule Desk"}
          result={employeeData?.isEmployeeDefaultDeskActive ? "Active" : "Not Active"}
        />
        <ViewEmployeeLabelResult
          label={"Phone NO."}
          result={
            employeeData?.mobile && employeeData?.mobile != "undefined"
              ? employeeData?.prefix + "-" + employeeData?.mobile
              : "-"
          }
        />
        <ViewEmployeeLabelResult label={"Email"} result={employeeData?.email || "-"} />
        <ViewEmployeeLabelResult
          label={"Job Title"}
          result={employeeData?.jobPosition?.title || ""}
        />
        <ViewEmployeeLabelResult label={"Gender"} result={employeeGenderStr || "-"} />
        <hr style={{ margin: "10px 0 20px 0px", border: "1px solid #c9c9cd" }}></hr>
        <Col style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6
              style={{
                fontWeight: "bold",
                marginBottom: "20px ",
                fontSize: 17,
              }}>
              Address
            </h6>
            <span
              style={{ margin: "0px 10px", cursor: "pointer" }}
              title="Edit"
              onClick={handleEditAddressModal}>
              <EditSVG />
            </span>
          </div>
        </Col>

        <ViewEmployeeLabelResult
          label={"Country"}
          result={employeeData?.countryLocation?.name || "-"}
        />
        <ViewEmployeeLabelResult
          label={"State"}
          result={employeeData?.stateLocation?.name || "-"}
        />
        <ViewEmployeeLabelResult label={"City"} result={employeeData?.cityLocation?.name || "-"} />
        <ViewEmployeeLabelResult label={"Street"} result={employeeData?.street || "-"} />
        <ViewEmployeeLabelResult label={"Zip Code"} result={employeeData?.zipCode || "-"} />
      </Row>
      <hr style={{ margin: "10px 0 20px 0px", border: "1px solid #c9c9cd" }}></hr>
      <Col style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6
            style={{
              fontWeight: "bold",
              marginBottom: "20px ",
              fontSize: 17,
            }}>
            Working Times
          </h6>
          <span
            style={{ margin: "0px 10px", cursor: "pointer" }}
            title="Edit"
            onClick={handleEditWorkingHoursModal}>
            <EditSVG />
          </span>
        </div>
      </Col>
      <Row>
        <ViewEmployeeLabelResult label={"Job type"} result={employeeData?.jobType?.name || "-"} />
        <ViewEmployeeLabelResult
          label={"Job location"}
          result={employeeData?.jobLocation?.name || "-"}
        />
      </Row>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "3rem" }}>
        {workingTimes?.map((item) => (
          <WorkingTimeComp
            key={item.id}
            dayName={item.dayName}
            isChecked={item.isChecked}
            daySlips={item.daySlips}
          />
        ))}
        <div
          style={{
            width: 110,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <div
            style={{
              textAlign: "center",
              padding: "16px 20px",
              backgroundColor: "blue",
              color: "white",
              fontSize: 12,
              width: "100%",
              borderRadius: 10,
            }}>
            Total hours
          </div>
          <div
            style={{
              border: "1px solid",
              marginTop: 10,
              textAlign: "center",
              padding: "10px 20px",
              backgroundColor: "white",
              color: "blue",
              fontSize: 12,
              width: "100%",
              borderRadius: 10,
            }}>
            {totalHours} hours
          </div>
        </div>
      </div>
    </div>
  );
}
