import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

import EmployeeService from "services/Employee/employee.service";

import { axiosCatch } from "utils/axiosUtils";
import EmployeeHeader from "./components/EmployeeHeader";
// styles
import "./styles.css";
import ContactInfo from "./components/ContactInfo";
import AddressInfo from "./components/AddressInfo";
import DesksAndWorkingTimes from "./components/DesksAndWorkingTimes";
import { LoadingOutlined } from "@ant-design/icons";
import useGetLookup from "services/newSettings/Query/useGetLookup";
import userContext from "context/userContext";

const EMPLOYEE_NAV_LINKS = {
  CONTACT_INFO: "CONTACT_INFO",
  ADDRESS: "ADDRESS",
  WORKING_TIMES: "WORKING_TIMES",
};

const mapEmployeeData = (employeeData) => {
  // !TEMP: SOME DATA PLACED MANUAL UNTIL BACKEND IS FIXED (job_title ,cover_image)
  return {
    fullName: employeeData.fullName,
    job_title: employeeData.job_title,
    cover_image: employeeData.cover_image || "https://picsum.photos/1000/250",
    avatar: employeeData.profileImage,
    contact: {
      mobile: employeeData?.mobile,
      countryCode: employeeData?.prefix,
      mail: employeeData?.email,
      gender: employeeData?.gender === "M" ? "Male" : "Female",
    },
    address: {
      country: employeeData?.countryLocation?.name,
      city: employeeData?.cityLocation?.name,
      street: employeeData?.street,
      state: employeeData?.stateLocation?.name,
      zip_code: employeeData?.zipCode,
    },
    desks: (employeeData?.desks || []).map((desk) => {
      return {
        id: desk.id,
        name: desk.name,
        image: desk.image,
        working_hours: desk.deskEmployee.workingHours,
      };
    }),
  };
};

export default function EmployeeInformation() {
  const { user } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [activePage, setActivePage] = useState(EMPLOYEE_NAV_LINKS.CONTACT_INFO);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        setEmployeeData(mapEmployeeData(user));
      } catch (err) {
        axiosCatch(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  if (isLoading) {
    return (
      <Row justify="center" align="middle" style={{ height: "80vh" }}>
        <Col>
          <LoadingOutlined />
        </Col>
      </Row>
    );
  }

  return (
    <section className="employee_info">
      <EmployeeHeader
        fullName={employeeData.fullName}
        avatar={employeeData.avatar}
        cover_image={employeeData.cover_image}
        job_title={employeeData.job_title}
        email={employeeData?.contact?.mail}
        id={user.id}
      />

      <div className="employee_info_content">
        <div className="employee_info_nav">
          <button
            className={`employee_nav_link fz-14 
            ${activePage === EMPLOYEE_NAV_LINKS.CONTACT_INFO ? "active" : "gc"}`}
            onClick={() => {
              setActivePage(EMPLOYEE_NAV_LINKS.CONTACT_INFO);
            }}>
            Contact Info
          </button>
          <button
            className={`employee_nav_link fz-14 ${
              activePage === EMPLOYEE_NAV_LINKS.ADDRESS ? "active" : "gc"
            }`}
            onClick={() => {
              setActivePage(EMPLOYEE_NAV_LINKS.ADDRESS);
            }}>
            Address
          </button>
          {/* <button
            className={`employee_nav_link fz-14 ${activePage === EMPLOYEE_NAV_LINKS.WORKING_TIMES ? "active" : "gc"}`}
            onClick={() => { setActivePage(EMPLOYEE_NAV_LINKS.WORKING_TIMES) }}>
            Desks & Working Times
          </button> */}
        </div>
        {activePage === EMPLOYEE_NAV_LINKS.CONTACT_INFO && (
          <ContactInfo {...employeeData.contact} />
        )}
        {activePage === EMPLOYEE_NAV_LINKS.ADDRESS && <AddressInfo {...employeeData.address} />}
        {/* {activePage === EMPLOYEE_NAV_LINKS.WORKING_TIMES && <DesksAndWorkingTimes desks={employeeData.desks} />} */}
      </div>
    </section>
  );
}
