import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme, Form } from "antd";
import MainInfo from "../AddNewEmployee/Components/MainInfo";
import Address from "../AddNewEmployee/Components/Address";
import WorkingTimes from "../AddNewEmployee/Components/WorkingTimes";
import DepartementsService from "services/newSettings/departements.service";
import jobTitlesService from "services/newSettings/jobTitles.service";
import CountriesService from "services/newSettings/countries.service";
import RolesService from "services/newSettings/roles.service";
// import jobTitlesService from "services/newSettings/jobTitles.service";

export default function AddNewEmployee({ setIsAddNewEmpOpen }) {
  const [mainInfoForm] = Form.useForm();
  const [addressForm] = Form.useForm();

  const addEmployeeformData = new FormData();
  const [pageValues, setPageValues] = useState({});
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [departmentList, setDepartmentList] = useState([]);
  const [jobTitleList, setJobTitleList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [countryList, setCountryList] = useState([]);
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
        // setIsLoading(false);
        var countries = data?.data.map((item, index) => ({
          ...item,
        }));

        setCountryList(countries);
      })
      .catch((error) => {
        // setIsLoading(false);
        // var { errors } = error?.response.data;
        // openNotificationWithIcon("error", errors[0]);
      });
  };
  useEffect(() => {
    getAllDepartmentListRequest();
    getAllJobTitleListRequest();
    getAllCountryListRequest();
    getAllRoleListRequest();
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Main Information",
      // content: <MainInfo pageValues={pageValues} setPageValues={setPageValues} current={current} next={next} stepsLength={3} departmentList={departmentList} jobTitleList={jobTitleList} roleList={roleList} setIsAddNewEmpOpen={setIsAddNewEmpOpen} />,
    },
    {
      title: "Address",
      // content: <Address pageValues={pageValues} setPageValues={setPageValues} current={current} next={next} stepsLength={3} CountryList={countryList} prev={prev} setIsAddNewEmpOpen={setIsAddNewEmpOpen} />,
    },
    {
      title: "Working Hours",
      // content: <WorkingTimes prev={prev} setIsAddNewEmpOpen={setIsAddNewEmpOpen} pageValues={pageValues} setPageValues={setPageValues} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: "white",
    borderRadius: token.borderRadiusLG,
    // border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps size="small" current={current} items={items} />
      <div style={contentStyle}>
        <span style={{ display: current != 0 ? "none" : "" }}>
          <MainInfo
            form={mainInfoForm}
            current={current}
            next={next}
            stepsLength={3}
            departmentList={departmentList}
            jobTitleList={jobTitleList}
            roleList={roleList}
            setIsAddNewEmpOpen={setIsAddNewEmpOpen}
          />
        </span>
        <span style={{ display: current != 1 ? "none" : "" }}>
          <Address
            mianInfoForm={mainInfoForm}
            form={addressForm}
            current={current}
            next={next}
            stepsLength={3}
            CountryList={countryList}
            prev={prev}
            setIsAddNewEmpOpen={setIsAddNewEmpOpen}
          />
        </span>
        <span style={{ display: current != 2 ? "none" : "" }}>
          <WorkingTimes
            addresForm={addressForm}
            mianInfoForm={mainInfoForm}
            prev={prev}
            setIsAddNewEmpOpen={setIsAddNewEmpOpen}
          />
        </span>
      </div>
      <div
        style={{
          marginTop: 24,
        }}>
        {/* <Button style={{
                    margin: '0 8px',
                }} onClick={() => next()}>
                    Cancel
                </Button> */}

        {/* {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )} */}
      </div>
    </>
  );
}
