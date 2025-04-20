import { Button, Flex, message, Skeleton, Tooltip } from "antd";
import React from "react";
import vbooking_logo from "assets/images/vbooking_logo.png";
import { EmailsSVG, FileDownloadSVG24, LinkSVG, PrintSVG24 } from "assets/jsx-svg";
const Header = ({ title = "", logo, isLoading = false, handlePrint = () => {} }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ padding: "1rem 0", borderBottom: "1px solid var(--vbooking-b700)" }}>
      <Flex align="center" gap={16}>
        {isLoading ? (
          <Skeleton.Node style={{ width: "150px", height: "70px" }} />
        ) : (
          <img src={logo || vbooking_logo} alt={"logo"} width={150} />
        )}
        <p
          className="fz-20 fw-700"
          style={{
            lineHeight: "18px",
            color: "var(--vbooking-b700)",
            textTransform: "uppercase",
          }}>
          {title}
        </p>
      </Flex>
      <Flex align="center" gap={8}>
        <Tooltip title={"Copy link"}>
          <Button
            icon={<LinkSVG />}
            style={{ width: "34px", height: "34px", padding: "10px" }}
            onClick={() => {
              navigator.clipboard
                .writeText(window.top.location.href)
                .then(() => {
                  message.success("Link copied to clipboard");
                })
                .catch((error) => {
                  message.error("Failed to copy the link");
                  console.error("Copy error:", error);
                });
            }}
          />
        </Tooltip>
        <Tooltip title={"Resend email"}>
          <Button
            icon={<EmailsSVG color={"#667085"} />}
            style={{ width: "34px", height: "34px", padding: "10px" }}
          />
        </Tooltip>
        <Tooltip title={"Print"}>
          <Button
            onClick={handlePrint}
            disabled={isLoading}
            icon={<PrintSVG24 color={"#667085"} />}
            style={{ width: "34px", height: "34px", padding: "10px" }}
          />
        </Tooltip>
        <Tooltip title={"Download"}>
          <Button
            icon={<FileDownloadSVG24 />}
            style={{ width: "34px", height: "34px", padding: "10px" }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Header;
