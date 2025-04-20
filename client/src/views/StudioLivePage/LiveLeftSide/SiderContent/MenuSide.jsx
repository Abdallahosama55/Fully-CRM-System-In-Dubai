import { useState } from "react";
import { Col, Dropdown, Row, Tooltip, Typography, message } from "antd";

import { CopySVG } from "assets/jsx-svg";

export default function MenuSide({ activeBtn, setActiveBtn, collapsed, liveData, menuItems }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  return (
    <Row gutter={[0, 22]}>
      {menuItems.map((item) => {
        if (item.key !== "chat") {
          return (
            <Dropdown
              open={open === item.key}
              onOpenChange={(p) => handleOpenChange(p ? item.key : false)}
              trigger={["click"]}
              key={item.key}
              {...{
                menu: {
                  items: [
                    {
                      key: 1,
                      label: (
                        <Row gutter={[12, 0]} justify="space-between" wrap={false}>
                          <Col>
                            <Typography.Text className="fw-500">Admin Stream Link</Typography.Text>
                          </Col>
                          <Col>
                            <Row gutter={[6, 0]} align="middle">
                              <Col>
                                <Row align="middle">
                                  <CopySVG width="12px" height="12px" />
                                </Row>
                              </Col>
                              <Col>
                                <Typography.Text
                                  className="fz-10 fw-500"
                                  style={{
                                    color: "#3a5ee3",
                                    lineHeight: "10px",
                                  }}>
                                  Copy
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ),
                      onClick: () => {
                        navigator.clipboard.writeText(liveData.adminLink);
                        message.success("Link Copied Successfully");
                      },
                    },

                    {
                      key: 3,
                      label: (
                        <Row gutter={[12, 0]} justify="space-between" wrap={false}>
                          <Col>
                            <Typography.Text className="fw-500">Metaverse link</Typography.Text>
                          </Col>
                          <Col>
                            <Row gutter={[6, 0]} align="middle">
                              <Col>
                                <Row align="middle">
                                  <CopySVG width="12px" height="12px" />
                                </Row>
                              </Col>
                              <Col>
                                <Typography.Text
                                  className="fz-10 fw-500"
                                  style={{
                                    color: "#3a5ee3",
                                    lineHeight: "10px",
                                  }}>
                                  Copy
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ),
                      onClick: () => {
                        const meetingIdParam = liveData.accessLevel === "INVITED_MEMBERS" ? `meetingId=${liveData.id}` : "";
                        const dropPointParam = liveData.audienceDimensionDropPoint ? `droppoint=${liveData.audienceDimensionDropPoint}` : "";

                        // Determine the correct query string based on available parameters
                        let queryString = "";

                        if (meetingIdParam && dropPointParam) {
                          queryString = `?${meetingIdParam}&${dropPointParam}`;
                        } else if (meetingIdParam || dropPointParam) {
                          queryString = `?${meetingIdParam || dropPointParam}`;
                        }
                        navigator.clipboard.writeText(
                          `${window.location.origin}/metaverse/${liveData.customerDimension.name}${queryString}`
                        );
                        message.success("Link Copied Successfully");
                      },
                    },
                  ],
                  onClick: () => {
                    setOpen(false);
                  },
                },
              }}>
              <Col xs={24}>
                <Row
                  wrap={false}
                  justify={collapsed ? "center" : "start"}
                  align="middle"
                  className={`menu-item ${activeBtn === "chat" && "active"} clickable`}
                  onClick={() => {
                    setActiveBtn(item.key);
                  }}>
                  <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                    <Tooltip title={collapsed && item.label} placement="right">
                      <Row align="middle">{item.icon}</Row>
                    </Tooltip>
                  </Col>
                  {!collapsed && <Col>{item.label}</Col>}
                </Row>
              </Col>
            </Dropdown>
          );
        }
      })}
    </Row>
  );
}
