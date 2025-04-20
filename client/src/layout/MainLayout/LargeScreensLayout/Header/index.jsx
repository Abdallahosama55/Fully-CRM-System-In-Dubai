import { Avatar, Breadcrumb, Col, Dropdown, Flex, Input, Row, Tooltip, Typography } from "antd";

import WhatsappSVG from "assets/jsx-svg/WhatsappSVG";
import React from "react";
import formatNumber from "utils/formatNumber";
import { useUserContext } from "context/userContext";
import useLogout from "services/auth/Mutations/useLogout";
import { Link, useNavigate } from "react-router-dom";
// style
import "./styles.css";
import { stringAvatar } from "utils/string";
import usePageTitle from "hooks/usePageTitle";
import SearchSVG from "assets/jsx-svg/SearchSVG";
import WalletSVG from "assets/jsx-svg/WalletSVG";
import Support2SVG from "assets/jsx-svg/Support2SVG";
import NotificationOutlinedSVG from "assets/jsx-svg/NotificationOutlinedSVG";
import DateSVG from "assets/jsx-svg/DateSVG";
import User2SVG from "assets/jsx-svg/User2SVG";
import LogoutSVG3 from "assets/jsx-svg/LogoutSVG3";
import DownSvg from "assets/jsx-svg/DownSvg";
import { ChevronDownSVG } from "assets/jsx-svg";
import ROUTER_URLS from "constants/ROUTER_URLS";
const Header = () => {
  const { user } = useUserContext();
  const logout = useLogout();
  const navigate = useNavigate();
  const { pageTitle } = usePageTitle();
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ width: "100%" }}
      className="main_layout_large_screens_header">
      <p
        style={{ color: " var(--font-link)", fontSize: "1rem" }}
        className="fw-600 ">
        {pageTitle || "Home"}
      </p>
      <Flex align="center" gap={8}>
        <Input
          className="search_input"
          size="small"
          type="search"
          placeholder="Search booking, customers "
          prefix={<SearchSVG />}
        />
        <Tooltip title={"Messages"}>
          <div className="header_small_card xs_text_medium">
            <WhatsappSVG fill={"#667085"} width="17" height="16" />
            <p>{formatNumber(23345)}</p>
          </div>
        </Tooltip>
        {user?.agentWallet && (
          <Tooltip title={"Wallet"}>
            <div
              className="header_small_card xs_text_medium"
              onClick={() => navigate(ROUTER_URLS.FINANCE.ACCOUNTING.PRICING_MODULE)}>
              <WalletSVG color={"#667085"} width="17" height="16" />
              <p>
                <span style={{ color: "#000" }}>{user?.agentWallet?.currenvy} </span>
                {user?.agentWallet?.balance?.toFixed(2)}
              </p>
            </div>
          </Tooltip>
        )}
        <Tooltip title={"Support"}>
          <div className="header_small_card xs_text_medium">
            <Support2SVG width="17" height="16" />
          </div>
        </Tooltip>
        <Tooltip title={"Notifications"}>
          <div className="header_small_card xs_text_medium">
            <NotificationOutlinedSVG />
          </div>
        </Tooltip>
        <Tooltip title={"Callender"}>
          <Link to={"/collaboration/meeting"}>
            <div className="header_small_card xs_text_medium">
              <DateSVG color={"#667085"} width="17" height="16" />
            </div>
          </Link>
        </Tooltip>
        <Flex justify="flex-end" style={{ flexGrow: 1 }}>
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  onClick: () => navigate(`/profile`),
                  label: (
                    <div style={{ display: "flex", alignItems: "center", columnGap: 12 }}>
                      <User2SVG /> Profile
                    </div>
                  ),
                },
                {
                  key: 2,
                  label: (
                    <div style={{ display: "flex", alignItems: "center", columnGap: 12 }}>
                      <LogoutSVG3 /> Logout
                    </div>
                  ),
                  onClick: () => logout.mutate(),
                },
              ],
            }}
            trigger={["click"]}>
            <Flex gap={4} align="center" className="header_small_card">
              <Avatar
                src={user.profileImage}
                size={25}
                {...(user.profileImage ? {} : { ...stringAvatar(user?.fullName) })}
              />
              <ChevronDownSVG />
            </Flex>
          </Dropdown>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
