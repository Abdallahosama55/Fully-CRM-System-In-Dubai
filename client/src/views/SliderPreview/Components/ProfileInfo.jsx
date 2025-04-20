import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Flex, Typography } from "antd";
import LogoutSVG2 from "assets/jsx-svg/LogoutSVG2";
import Box from "components/Box";
import React from "react";
import { stringAvatar } from "utils/string";
const ProfileInfo = ({ image, fullName, handleLogout }) => {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "4px" }}>
        {!image ? (
          <Avatar size={56} {...stringAvatar(fullName ?? "")} />
        ) : (
          <Avatar size={56} src={image} />
        )}
        <div>
          <Typography.Text style={{ fontWeight: 500 }} ellipsis title={fullName}>
            {fullName}
          </Typography.Text>
        </div>
      </Box>{" "}
      <Divider style={{ marginTop: "10px", marginBottom: "6px" }}></Divider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px",
          paddingInline: "12px",
          cursor: "pointer",
          " :hover": {
            background: "#efefefc2",
          },
        }}>
        Logout
        <LogoutSVG2
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleLogout();
          }}></LogoutSVG2>
      </Box>
    </div>
  );
};

export default ProfileInfo;
