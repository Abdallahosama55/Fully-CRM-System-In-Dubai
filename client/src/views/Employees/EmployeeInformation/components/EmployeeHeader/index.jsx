import React, { useContext, useState } from "react";
import { Avatar, Button, Typography } from "antd";

// styles
import "./styles.css";
import { EditCustomerTitleSVG, EditTimeSVG, RefreshSVG } from "assets/jsx-svg";
import { Link, useNavigate } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import userContext from "context/userContext";
import newColorFind from "utils/randomColor";
import ChagngePasswordModal from "views/Employees/EditEmployee/components/ChagngePasswordModal";
const EmployeeHeader = ({ email, fullName, job_title, cover_image, avatar, id }) => {
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  return (
    <div className="employee_header">
      <ChagngePasswordModal
        isModalOpen={isChangePasswordModalOpen}
        handleModalCancel={() => setIsChangePasswordModalOpen(false)}
      />
      <img src={cover_image} alt={fullName} className="cover_image" />
      <div className="employee_header_content">
        <Avatar
          size={140}
          src={avatar}
          className="employee_avatar"
          icon={<div>{fullName?.slice(0, 2)}</div>}
          style={{
            backgroundColor: !avatar && `${newColorFind(id)}`,
          }}
        />
        <div className="info">
          <Typography.Title level={4} className="fz-20">
            {fullName}
          </Typography.Title>
          <p style={{ fontSize: 14, color: "#030713" }}> {email}</p>
          <Typography.Text className="fz-14 gc">{job_title}</Typography.Text>
        </div>
        {/* {user.id === +id && (
          <Link className="edit center-items" to={ROUTER_URLS.EMPLOYEE.EDIT + id}>
            <EditTimeSVG />
          </Link>
        )} */}
        <div style={{ display: "flex", columnGap: 5, justifyContent: "end" }}>
          <Button
            title="Edit Profile"
            onClick={() => {
              navigate(ROUTER_URLS.EMPLOYEE.EDIT + id);
            }}
            icon={<EditCustomerTitleSVG />}
            style={{
              background: "#52546426",
              color: "#313342",
              display: "flex",
              alignItems: "center",
            }}>
            Edit Profile
          </Button>
          <Button
            title="Change Password"
            onClick={() => setIsChangePasswordModalOpen(true)}
            icon={<RefreshSVG width={16} height={16} color="#FFFFFF" style={{ fontSize: 25 }} />}
            style={{
              background: "#525466",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
            }}>
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
