import { EllipsisOutlined, PhoneOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Dropdown, Flex, Popover, Timeline, Tooltip, Typography } from "antd";
import { NoteSVG, TasksSVG } from "assets/jsx-svg";

import Box from "components/Box";
import PriorityLabel from "components/PriorityLabel";
import dayjs from "dayjs";
import { useGetSuspenseCustomerActivity } from "services/CustomerActivity/Querys/useGetCustomerActivity";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import CallsAndMeetingsDetails from "views/Collaboration/CallsAndMeetingsDetails";
import NoDataToShowComponent from "../NewStyleComponents/NavigationPages/Components/NoDataToShowComponent";
import { useDrawer } from "hooks/useDrawer";
const icons = (type) => {
  switch (type) {
    case "CALL":
      return (
        <PhoneOutlined size={34} style={{ fontSize: "20px", padding: "4px", color: "#667085" }} />
      );
    case "BOOKED":
      return (
        <TeamOutlined
          size={34}
          style={{ fontSize: "20px", padding: "4px", color: "#667085" }}></TeamOutlined>
      );
    case "TASK":
      return <TasksSVG fill="#030713"></TasksSVG>;
  }
};
const ActivityTimeLine = ({ customerId, leadId }) => {
  const DrawerAPI = useDrawer();
  const { data } = useGetSuspenseCustomerActivity(
    { customerId, dealId: leadId, limit: 100 },
    { select: (data) => data.data.data },
  );
  const handleEditMeeting = (id) => {
    DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd id={id} DrawerAPI={DrawerAPI}/>);
    DrawerAPI.open("40%");
  };
  const handleInfoMeeting = (id) => {
    DrawerAPI.setDrawerContent(<CallsAndMeetingsDetails id={id} DrawerAPI={DrawerAPI}/>);
    DrawerAPI.open("40%");
  };
  if (data?.count === 0) {
    return <NoDataToShowComponent></NoDataToShowComponent>;
  }
  return (
    <Box
      sx={{
        padding: "12px",
        "& .ant-card-extra": {},
        "& .ant-timeline-item-head-custom": {
          padding: "1px",
          borderRadius: "25px",
          border: "1px solid #EFEFF1",
        },
        "& .ant-timeline-item-content": {
          marginInlineStart: "40px",
        },
      }}>
      {DrawerAPI.Render}
      <Timeline
        items={data.rows.map((item) => {
          return {
            dot: icons(item.type),

            children: (
              <Card
                extra={
                  <Dropdown
                    forceRender={false}
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: "Edit",
                          onClick: () => handleEditMeeting(item.id),
                        },
                        {
                          key: "2",
                          label: "Info",
                          onClick: () => handleInfoMeeting(item.id),
                        },
                      ],
                    }}
                    trigger={["click"]}>
                    <Box sx={{ cursor: "pointer" }}>
                      <EllipsisOutlined />
                    </Box>
                  </Dropdown>
                }
                title={
                  <Box
                    sx={{
                      fontSize: "14px",
                      display: "flex",
                      paddingBottom: "8px",
                      paddingTop: "6px",
                      flexDirection: "column",
                      gap: 4,
                    }}>
                    {item.title}
                    <Box
                      sx={{
                        fontSize: "12px",
                        display: "flex",
                        fontWeight: 400,
                        gap: 4,
                        justifyContent: "space-between",
                      }}>
                      <Flex gap={8} align="center">
                        {item?.priority && <PriorityLabel type={item?.priority}></PriorityLabel>}
                        <Box sx={{ color: "#007D3D", fontWeight: 500 }}>
                          {dayjs(item.date).tz(localStorage.getItem("time-zone")).format("MMM DD")}
                        </Box>
                      </Flex>
                      <Flex gap={2}>
                        {item.participantBookedMeetings
                          .filter((item) => !!item.customerId)
                          .map((part, index, list) => {
                            if (index > 1) {
                              if (list.length - 1 === index) {
                                return (
                                  <Popover
                                    key={index}
                                    content={list.map((pp, index) => {
                                      if (index > 1) {
                                        return (
                                          <div key={pp.id}>
                                            <Typography.Text
                                              style={{
                                                fontWeight: 400,
                                                fontSize: "12px",
                                              }}
                                              ellipsis>
                                              {pp?.customer?.account?.fullName ?? pp.customerId}{" "}
                                              {pp?.deal ? "(" + pp.deal?.title + ")" : ""}
                                            </Typography.Text>
                                          </div>
                                        );
                                      }
                                    })}
                                    title="Participants"
                                    trigger="click">
                                    <div
                                      style={{
                                        color: "#2d5feb",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                      }}>
                                      {"+" + index}
                                    </div>
                                  </Popover>
                                );
                              }
                              return <></>;
                            }
                            return (
                              <Tooltip
                                key={part.id}
                                trigger={["hover"]}
                                title={
                                  <>
                                    {part?.customerId}{" "}
                                    {part?.deal ? "(" + part?.deal?.title + ")" : ""}{" "}
                                  </>
                                }>
                                <Typography.Text
                                  key={part.id}
                                  style={{ fontWeight: 400, fontSize: "12px" }}
                                  ellipsis>
                                  {part?.customer?.account?.fullName ?? part.customerId}{" "}
                                  {part?.deal ? "(" + part?.deal?.title + ")" : ""}{" "}
                                  {index < 1 && list.length > 1 ? "," : ""}
                                </Typography.Text>
                              </Tooltip>
                            );
                          })}
                      </Flex>
                    </Box>
                  </Box>
                }
                className={`view-customer-activity-comp-time-line ${!item.description ? "hide-card-body" : ""
                  }`}>
                <Flex gap={8} align="center">
                  <NoteSVG></NoteSVG>
                  {item.description}
                </Flex>
              </Card>
            ),
          };
        })}
      />{" "}
    </Box>
  );
};

export default ActivityTimeLine;
