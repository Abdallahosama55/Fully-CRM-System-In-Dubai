import { useEffect, useState } from "react";
import { Switch, Input, Col, Row, Button, Form, DatePicker, Select, ConfigProvider } from "antd";
import AddNewEmployee from "./AddNewEmployee/AddNewEmployee";
import FilterEmployeesSVG from "../../../../assets/jsx-svg/FilterEmployeesSVG";
import AddNewEmployeeSVG from "../../../../assets/jsx-svg/AddNewEmployeeSVG";
import UserSolidSVG from "../../../../assets/jsx-svg/UserSolidSVG";
import employeesService from "../../../../services/Employees/Employees.service";
import jobTitlesService from "../../../../services/newSettings/jobTitles.service";
import constantsService from "../../../../services/Employees/Constants.service";
import { useNotification } from "context/notificationContext";
import { useNavigate } from "react-router-dom";
import InvitationModal from "./AddNewEmployee/Components/InvitationModal";
import DepartementsService from "services/newSettings/departements.service";
import CountriesService from "services/newSettings/countries.service";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.css";

const EmployeeCard = ({
  brandAndjobColor,
  profileImage,
  fullName,
  jobTitle,
  isActive,
  employeeId,
}) => {
  const { openNotificationWithIcon } = useNotification();
  const [switchStatus, setSwitchStatus] = useState(isActive);
  const navigate = useNavigate();

  const employeeToggleActivateRequest = (id, status) => {
    employeesService
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
  var jobTitleShortCutArray = jobTitle?.split(" ");

  var firstChar = jobTitleShortCutArray?.length > 0 && jobTitleShortCutArray[0][0];
  var secondChar = jobTitleShortCutArray?.length > 1 && jobTitleShortCutArray[1][0];

  const jobTitleShortCut = jobTitle ? firstChar || "" + secondChar || "" : "-";
  return (
    <div className="employee-card">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/view-employee/" + employeeId)}
        className="employee-img">
        {profileImage ? <img src={profileImage} /> : <UserSolidSVG />}
      </div>
      <h3
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/view-employee/" + employeeId)}
        className="employee-name">
        {fullName}
      </h3>
      <h3 className="employee-job-title" style={{ color: brandAndjobColor }}>
        {jobTitle || "-"}
      </h3>
      <div className="employee-jobTitleShortCut" style={{ backgroundColor: brandAndjobColor }}>
        <div style={{ textTransform: "uppercase" }}>{jobTitleShortCut}</div>
        <div className="triangle"></div>
      </div>
      <div className="employee-activation">
        <Switch
          size="small"
          checked={switchStatus}
          onChange={(e) => onSwitchChanged(employeeId, e)}
        />
      </div>
    </div>
  );
};
const AddNewEmployeeCard = ({ setIsAddNewEmpOpen }) => {
  return (
    <div className="add-new-employee-card">
      <AddNewEmployeeSVG />
      <div className="add-btn" onClick={setIsAddNewEmpOpen}>
        Add New Employee
      </div>
    </div>
  );
};

export default function Employees() {
  const { openNotificationWithIcon } = useNotification();

  const { RangePicker } = DatePicker;

  const [employeeList, setEmployeeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [jobTitles, SetJobTitles] = useState([]);
  const [jobTypes, SetJobTypes] = useState([]);
  const [jobLocations, SetJobLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // getEmployeeRequest();
    getEmployeeSearchRequest({ status: "active" });
    getJobTitleRequest();
    getJobTypeRequest();
    getJobLocationRequest();
  }, []);

  const getJobTitleRequest = () => {
    jobTitlesService
      .getAllActive()
      .then(({ data }) => {
        var jobTitls = data?.data.map((item) => ({
          ...item,
        }));
        SetJobTitles(jobTitls);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const getJobTypeRequest = () => {
    constantsService
      .getJobTypes()
      .then(({ data }) => {
        var JobTypes = data?.data.map((item) => ({
          ...item,
        }));
        SetJobTypes(JobTypes);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const getJobLocationRequest = () => {
    constantsService
      .getJobLocations()
      .then(({ data }) => {
        var JobLocations = data?.data.map((item) => ({
          ...item,
        }));
        SetJobLocations(JobLocations);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  const clearFilter = () => {
    form.resetFields();
  };
  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["work_date"];
    var values = {
      // fullName:fieldsValue.fullName,
      employeeID: fieldsValue.idNumber,

      email: fieldsValue.email,
      jobTitleId: fieldsValue.jobTitleId,
      jobLocation: fieldsValue.jobLocationId,
      jobType: fieldsValue.jobTypeId,

      startDate: rangeValue && rangeValue[0].format("YYYY-MM-DD"),
      endDate: rangeValue && rangeValue[1].format("YYYY-MM-DD"),
      status: fieldsValue.status,
    };

    getEmployeeSearchRequest(values);
  };
  const getEmployeeSearchRequest = (values) => {
    setIsLoading(true);
    employeesService
      .getAllSearch(values)
      .then(({ data }) => {
        setIsLoading(false);

        setEmployeeList(
          data.data.data.map((item) => ({
            ...item,
            jobTitle: item.jobPosition?.title,

            jobTitleColor: item.jobPosition?.color,
          })),
        );
      })
      .catch((error) => {
        setIsLoading(false);

        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const getEmployeeSearchNameRequest = (values) => {
    setIsLoading(true);

    employeesService
      .getAllSearch({ generalSearchValue: values.fullName })
      .then(({ data }) => {
        setIsLoading(false);

        setEmployeeList(
          data.data.data.map((item) => ({
            ...item,
            jobTitle: item.jobPosition?.title,
            jobTitleColor: item.jobPosition?.color,
          })),
        );
      })
      .catch((error) => {
        setIsLoading(false);

        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  let searchTimeout;
  const onChangeEmployeeName = (name) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      getEmployeeSearchNameRequest({
        fullName: name,
      });
    }, 500);
  };

  const [isAddNewEmpOpen, setIsAddNewEmpOpen] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [jobTitleList, setJobTitleList] = useState([]);
  const [countryList, setCountryList] = useState([]);
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
      });
  };

  const getAllDepartmentListRequest = () => {
    DepartementsService.getAll()
      .then(({ data }) => {
        var departements = data?.data.map((item, index) => ({
          ...item,
        }));

        setDepartmentList(departements);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
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
  useEffect(() => {
    getAllJobTitleListRequest();
    getAllDepartmentListRequest();
    getAllCountryListRequest();
  }, []);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const handleInviteModalCancel = () => {
    setIsInviteModalOpen(false);
  };

  // if (isLoading)
  //   return (
  //     <div
  //       style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
  //       <LoadingOutlined />
  //     </div>
  //   );
  return isAddNewEmpOpen ? (
    <AddNewEmployee setIsAddNewEmpOpen={setIsAddNewEmpOpen} />
  ) : (
    <div>
      <InvitationModal
        countryList={countryList}
        departmentList={departmentList}
        jobTitleList={jobTitleList}
        handleEditModalCancel={handleInviteModalCancel}
        isEditModalOpen={isInviteModalOpen}
      />
      <Row
        align="middle"
        justify="space-between"
        className="search-row"
        gutter={[12, 12]}
        style={{ marginBottom: 20 }}>
        <Col xs={24} sm={24} md={4} lg={4}>
          <Input
            allowClear
            style={{ marginLeft: 10 }}
            size="small"
            className="general-table-search"
            placeholder="Search employees"
            onChange={(e) => onChangeEmployeeName(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Row justify="end" align="middle" gutter={[16, 16]}>
            <Col className="search-input-col">
              <Row
                style={{ borderRadius: "10px" }}
                align="middle"
                justify="end"
                gutter={[10, 10]}
                wrap={false}>
                <Col style={{ paddingLeft: 0 }}>
                  <Button
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                    size="small">
                    <FilterEmployeesSVG style={{ marginRight: "5px" }} />
                    {open ? (
                      <span style={{ padding: "0px 2px" }}>Hide </span>
                    ) : (
                      <span style={{ padding: "0px 2px" }}>Add </span>
                    )}
                    Filter
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button
                style={{ background: "#272942", color: "#fff" }}
                size="small"
                onClick={() => setIsInviteModalOpen(true)}>
                + Invite
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {open && (
        <div>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  itemMarginBottom: 0,
                },
              },
            }}>
            <Form
              requiredMark={false}
              colon={false}
              form={form}
              onFinish={onFinish}
              autoComplete="off">
              <Row gutter={[16, 0]} style={{ marginLeft: 0, marginBottom: 10 }}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    labelCol={{ span: 24 }} // Default label column width
                    wrapperCol={{ span: 24 }}
                    label="Id number"
                    name="idNumber">
                    <Input allowClear={true} size="small" placeholder="Write here" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    labelCol={{ span: 24 }} // Default label column width
                    wrapperCol={{ span: 24 }}
                    label="Email"
                    name="email">
                    <Input allowClear={true} size="small" placeholder="Write here" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    labelCol={{ span: 24 }} // Default label column width
                    wrapperCol={{ span: 24 }}
                    label={<span>Job title</span>}
                    name="jobTitleId">
                    <Select
                      allowClear={true}
                      size="small"
                      showSearch
                      filterOption={filterOption}
                      placeholder="Select">
                      {jobTitles.map((JobTitle) => (
                        <Select.Option key={JobTitle.id} value={JobTitle.id}>
                          {JobTitle.title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    labelCol={{ span: 24 }} // Default label column width
                    wrapperCol={{ span: 24 }}
                    label={<span>Job location</span>}
                    name="jobLocationId">
                    <Select allowClear={true} size="small" showSearch placeholder="Select">
                      {jobLocations.map((JobLocation) => (
                        <Select.Option key={JobLocation.id} value={JobLocation.id}>
                          {JobLocation.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    labelCol={{ span: 24 }} // Default label column width
                    wrapperCol={{ span: 24 }}
                    label={<span>Job types</span>}
                    name="jobTypeId">
                    <Select
                      allowClear={true}
                      size="small"
                      showSearch
                      filterOption={filterOption}
                      placeholder="Select">
                      {jobTypes.map((JobType) => (
                        <Select.Option key={JobType.id} value={JobType.id}>
                          {JobType.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    required={false}
                    labelCol={{ span: 24 }} // Default label column width
                    wrapperCol={{ span: 24 }}
                    name="work_date"
                    label="Work Date">
                    <RangePicker allowClear={true} size="small" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item
                    required={false}
                    labelCol={{ span: 24 }} // Default label column width
                    wrapperCol={{ span: 24 }}
                    name="status"
                    label="Status">
                    <Select
                      allowClear={true}
                      size="small"
                      placeholder="Select"
                      defaultValue={"active"}>
                      <Select.Option key={1} value={"active"}>
                        Active
                      </Select.Option>
                      <Select.Option key={0} value={"inactive"}>
                        Inactive
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} style={{ display: "flex", alignItems: "end" }}>
                  <div style={{ width: "100%" }}>
                    <Form.Item>
                      <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Button size="small" style={{ width: "48%" }} block onClick={clearFilter}>
                          Clear Filters
                        </Button>
                        <span style={{ width: 5 }}></span>
                        <Button
                          size="small"
                          htmlType="submit"
                          className="btn-search"
                          style={{ width: "48%" }}>
                          <span>Search</span>
                        </Button>
                      </div>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </ConfigProvider>
        </div>
      )}

      <div className="employee-cards">
        {isLoading ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <LoadingOutlined />
          </div>
        ) : (
          <>
            <AddNewEmployeeCard setIsAddNewEmpOpen={() => setIsAddNewEmpOpen(true)} />
            {employeeList.map((item) => {
              console.log("item.profileImage", item);
              return (
                <EmployeeCard
                  key={item.id}
                  employeeId={item.id}
                  brandAndjobColor={item.jobTitleColor || "#CB8400"}
                  profileImage={item.profileImage}
                  jobTitle={item.jobTitle}
                  fullName={item.fullName}
                  isActive={item.isActive}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
