import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosCatch } from "utils/axiosUtils";
import EmployeeService from "services/Employee/employee.service";
import EditEmployeeHeader from "./components/EditEmployeeHeader";
import { Col, Form, Row } from "antd";
import ContactInfo from "./components/ContactInfo";
// import CustomButton from 'components/common/Button';
import Address from "./components/Address";
// style
import "./styles.css";
import dayjs from "dayjs";
import AddCancelButtons from "components/common/AddCancelButtons";
import useRerender from "hooks/useRerender";
import userContext from "context/userContext";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotification } from "context/notificationContext";
import { setDefaultTimeZone } from "utils/time";
import useGetLookup from "services/newSettings/Query/useGetLookup";

const EMPLOYEE_NAV_LINKS = {
  CONTACT_INFO: "CONTACT_INFO",
  ADDRESS: "ADDRESS",
  WORKING_TIMES: "WORKING_TIMES",
};

const mapEmployeeData = (employeeData) => {
  // !TEMP: SOME DATA PLACED MANUAL UNTIL BACKEND IS FIXED (job_title ,cover_image)
  return {
    firstName: employeeData?.fullName.split(" ")[0],
    lastName: employeeData?.fullName.split(" ")[1],
    jobTitleId: employeeData?.jobTitleId,
    cover_image: employeeData?.cover_image || "https://picsum.photos/1000/250",
    avatar: employeeData?.profileImage,
    timeZone: employeeData?.timeZone,
    contact: {
      phone: employeeData?.mobile && {
        mobile: employeeData?.mobile,
        prefix: employeeData.prefix,
      },
      email: employeeData?.email,
      gender: employeeData?.gender,
    },
    address: {
      countryId: employeeData?.countryId,
      cityId: employeeData?.cityId,
      street: employeeData?.street,
      stateId: employeeData?.stateId,
      zip_code: employeeData?.zipCode,
    },
    desks: getDesksObject(employeeData?.desks ?? []),
  };
};

const getDesksObject = (desks) => {
  const desksObject = {};
  desks?.forEach((desk) => {
    desksObject[desk.id] = {
      time_zone: desk.time_zone || "Pacific Time",
      monday: desk.deskEmployee.workingHours["Monday"]
        ? {
            time: [
              dayjs(desk.deskEmployee.workingHours["Monday"].startTime, "HH:mm"),
              dayjs(desk.deskEmployee.workingHours["Monday"].endTime, "HH:mm"),
            ],
            isActive: true,
          }
        : { isActive: false },
      tuesday: desk.deskEmployee.workingHours["Tuesday"]
        ? {
            time: [
              dayjs(desk.deskEmployee.workingHours["Tuesday"].startTime, "HH:mm"),
              dayjs(desk.deskEmployee.workingHours["Tuesday"].endTime, "HH:mm"),
            ],
            isActive: true,
          }
        : { isActive: false },
      wednesday: desk.deskEmployee.workingHours["Wednesday"]
        ? {
            time: [
              dayjs(desk.deskEmployee.workingHours["Wednesday"].startTime, "HH:mm"),
              dayjs(desk.deskEmployee.workingHours["Wednesday"].endTime, "HH:mm"),
            ],
            isActive: true,
          }
        : { isActive: false },
      thursday: desk.deskEmployee.workingHours["Thursday"]
        ? {
            time: [
              dayjs(desk.deskEmployee.workingHours["Thursday"].startTime, "HH:mm"),
              dayjs(desk.deskEmployee.workingHours["Thursday"].endTime, "HH:mm"),
            ],
            isActive: true,
          }
        : { isActive: false },
      friday: desk.deskEmployee.workingHours["Friday"]
        ? {
            time: [
              dayjs(desk.deskEmployee.workingHours["Friday"].startTime, "HH:mm"),
              dayjs(desk.deskEmployee.workingHours["Friday"].endTime, "HH:mm"),
            ],
            isActive: true,
          }
        : { isActive: false },
      saturday: desk.deskEmployee.workingHours["Saturday"]
        ? {
            time: [
              dayjs(desk.deskEmployee.workingHours["Saturday"].startTime, "HH:mm"),
              dayjs(desk.deskEmployee.workingHours["Saturday"].endTime, "HH:mm"),
            ],
            isActive: true,
          }
        : { isActive: false },
      sunday: desk.deskEmployee.workingHours["Sunday"]
        ? {
            time: [
              dayjs(desk.deskEmployee.workingHours["Sunday"].startTime, "HH:mm"),
              dayjs(desk.deskEmployee.workingHours["Sunday"].endTime, "HH:mm"),
            ],
            isActive: true,
          }
        : { isActive: false },
    };
  });

  return desksObject;
};

const EditEmployee = () => {
  const { openNotificationWithIcon } = useNotification();

  const { user, setUser } = useContext(userContext);
  const id = user?.id;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [addEditLoading, setAddEditLoading] = useState(false);
  const [activePage, setActivePage] = useState(EMPLOYEE_NAV_LINKS.CONTACT_INFO);
  const [form] = Form.useForm();
  const countryId = Form.useWatch(["address", "countryId"], form);
  const statesId = Form.useWatch(["address", "stateId"], form);
  const [employeeDataBeforeEdit, setEmployeeDataBeforeEdit] = useState({});

  const rerender = useRerender();

  useEffect(() => {
    if (user.id) {
      (async () => {
        setIsLoading(true);
        try {
          const employeeData = mapEmployeeData(user);
          form.setFieldsValue(employeeData);

          form.setFieldValue("fullName", user.fullName);
          setEmployeeDataBeforeEdit(employeeData);
        } catch (err) {
          axiosCatch(err);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, []);

  const onFinish = async (values) => {
    console.log("print image", values.avatar);

    // TODO: API CALL TO EDIT EMPLOYEE PROFILE
    const formData = new FormData();
    formData.append("timeZone", values.timeZone);
    formData.append("fullName", values.fullName);
    formData.append("jobTitleId", values.jobTitleId ?? "");
    formData.append("email", values.contact?.email);
    formData.append("gender", values.contact?.gender ?? "");
    formData.append("mobile", values.contact?.phone?.mobile);
    formData.append("prefix", values.contact?.phone?.prefix ?? "");
    formData.append("street", values.address?.street ?? "");
    values.address?.countryId && formData.append("countryId", values.address?.countryId);
    values.address?.stateId && formData.append("stateId", values.address?.stateId);
    values.address?.cityId && formData.append("cityId", values.address?.cityId);
    formData.append("zipCode", values.address?.zip_code ?? "");
    formData.append("image", values.avatar?.originFileObj || values.avatar);

    if (id) {
      try {
        if (employeeDataBeforeEdit.contact?.phone?.mobile === values.contact?.phone?.mobile) {
          formData.delete("mobile");
        }
        setAddEditLoading(true);
        const res = await EmployeeService.editV2(id, formData);
        openNotificationWithIcon("success", `${values.fullName} Employee Edited Successfully`);

        const data = res.data.data;
        setUser((prev) => ({
          ...prev,
          fullName: values.fullName,
          profileImage: data?.profileImage,
        }));
      } catch (err) {
        axiosCatch(err);
      } finally {
        setAddEditLoading(false);
      }
    } else {
      try {
        setAddEditLoading(true);
        await EmployeeService.add(formData);
        openNotificationWithIcon("success", `${values.fullName} Employee Added Successfully`);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setAddEditLoading(false);
      }
    }
  };

  const back = () => {
    if (id) {
      form.setFieldsValue(employeeDataBeforeEdit);
      rerender();
    } else {
      form.resetFields();
    }
    navigate("/profile");
  };

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
    <Form className="employee_edit_paper" form={form} layout="vertical" onFinish={onFinish}>
      <EditEmployeeHeader />

      <div className="employee_edit_content">
        <div className="employee_edit_nav">
          <button
            type="button"
            className={`employee_nav_link fz-14 
            ${activePage === EMPLOYEE_NAV_LINKS.CONTACT_INFO ? "active" : "gc"}`}
            onClick={() => {
              setActivePage(EMPLOYEE_NAV_LINKS.CONTACT_INFO);
            }}>
            Contact Info
          </button>
          <button
            type="button"
            className={`employee_nav_link fz-14 ${
              activePage === EMPLOYEE_NAV_LINKS.ADDRESS ? "active" : "gc"
            }`}
            onClick={() => {
              setActivePage(EMPLOYEE_NAV_LINKS.ADDRESS);
            }}>
            Address
          </button>
          {/* {id && (
            <button
              className={`employee_nav_link fz-14 ${
                activePage === EMPLOYEE_NAV_LINKS.WORKING_TIMES
                  ? "active"
                  : "gc"
              }`}
              onClick={() => {
                setActivePage(EMPLOYEE_NAV_LINKS.WORKING_TIMES);
              }}
            >
              Desks & Working Times
            </button>
          )} */}
        </div>
        <div
          style={{
            display: activePage !== EMPLOYEE_NAV_LINKS.CONTACT_INFO && "none",
          }}>
          <ContactInfo />
        </div>
        <div
          style={{
            display: activePage !== EMPLOYEE_NAV_LINKS.ADDRESS && "none",
          }}>
          <Address form={form} countryId={countryId} statesId={statesId} />
        </div>

        <div className="form_buttons">
          <AddCancelButtons
            addName="Save"
            cancel={back}
            addLoading={addEditLoading}
            add={() => form.submit()}
          />
        </div>
      </div>
    </Form>
  );
};

export default EditEmployee;
