import { Button, Col, Dropdown, Popconfirm, Row, Typography, message } from "antd";
import { CloseSVG, EditSVG, EyeSVG, LinkSVG, MoreSVG } from "assets/jsx-svg";
import { useState } from "react";
import CallsAndMeetingsDetails from "../CallsAndMeetingsDetails";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { axiosCatch } from "utils/axiosUtils";
import BookedMeetingService from "services/bookedMeeting.service";
import CallsAndMeetingsAdd from "../CallsAndMeetingsAdd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotification } from "context/notificationContext";

export default function CallsAndMeetingsColumns({ setCallsCount, setCalls , DrawerAPI }) {
  const { openNotificationWithIcon } = useNotification();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const confirm = async (id) => {
    try {
      setDeleteLoading(id);

      await BookedMeetingService.deleteMeeting(id);
      setCallsCount((prev) => prev--);
      setCalls((prev) => prev.filter((call) => call.id !== id));
      openNotificationWithIcon("success", "Deleted sucessfully");
    } catch (err) {
      axiosCatch(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return [
    {
      title: "NO.",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (_, { key }) => <Typography.Text className="fw-500">#{key}</Typography.Text>,
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
      width: 120,
      render: (_, { date }) => (
        <Typography.Text>{dayjs(date).format("DD-MM-YYYY HH:mma")}</Typography.Text>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      ellipsis: true,
      width: 60,
      align: "center",
      render: (_, { toTime, fromTime }) => {
        let time = "";
        if (toTime && fromTime) {
          const ft = dayjs(`2000-01-01 ${fromTime}`);
          const tt = dayjs(`2000-01-01 ${toTime}`);
          const mins = tt.diff(ft, "minutes", true);
          const totalHours = parseInt(mins / 60);
          const totalMins = dayjs().minute(mins).$m;
          time = `${totalHours < 10 ? "0" : ""}${totalHours}:${
            totalMins < 10 ? "0" : ""
          }${totalMins}`;
        }

        return <Typography.Text>{time}</Typography.Text>;
      },
    },
    {
      title: "Call type",
      dataIndex: "type",
      key: "type",
      align: "center",
      ellipsis: true,
      width: 80,
      render: (_, { customerDimensionId }) => (
        <Typography.Text>{customerDimensionId ? "Metaverse" : "Call"}</Typography.Text>
      ),
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
      ellipsis: true,
      width: 170,
      render: (_, { invites }) => <Typography.Text>{invites?.join(",")}</Typography.Text>,
    },

    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      align: "center",
      width: 140,
      render: (_, { id, meetingLink }) => (
        <Row wrap={false} justify="center" align="middle" gutter={[6, 0]}>
          <Col>
            <Link to={meetingLink} target="_blank">
              <Button type="primary">Join</Button>
            </Link>
          </Col>
          <Col>
            <Popconfirm
              title="Delete the meet"
              description="Are you sure to delete this meet?"
              onConfirm={() => confirm(id)}
              okText="Yes"
              cancelText="No">
              <Button style={{ pointerEvents: deleteLoading === id && "none" }}>
                <Row align="middle" gutter={[4, 0]} wrap={false}>
                  <Col>
                    {deleteLoading === id ? (
                      <LoadingOutlined />
                    ) : (
                      <CloseSVG color="#FF0000" style={{ width: "10px", height: "10px" }} />
                    )}
                  </Col>
                  <Col>
                    <Typography.Text>Cancel</Typography.Text>
                  </Col>
                </Row>
              </Button>
            </Popconfirm>
          </Col>
          <Col>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <Row align="middle" gutter={[8, 0]} wrap={false}>
                        <Col>
                          <Row align="middle">
                            <EyeSVG />
                          </Row>
                        </Col>
                        <Col>
                          <Typography.Text>View Details</Typography.Text>
                        </Col>
                      </Row>
                    ),
                    key: "1",
                    onClick: () => {
                      DrawerAPI.open("40%");
                      DrawerAPI.setDrawerContent(<CallsAndMeetingsDetails id={id} DrawerAPI={DrawerAPI}/>);
                    },
                  },

                  {
                    label: (
                      <Row align="middle" gutter={[8, 0]} wrap={false}>
                        <Col>
                          <Row align="middle">
                            <EditSVG />
                          </Row>
                        </Col>
                        <Col>
                          <Typography.Text>Edit</Typography.Text>
                        </Col>
                      </Row>
                    ),
                    key: "2",
                    onClick: () => {
                      DrawerAPI.open("40%");
                      DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd id={id} DrawerAPI={DrawerAPI}/>);
                    },
                  },
                  {
                    label: (
                      <Row align="middle" gutter={[8, 0]} wrap={false}>
                        <Col>
                          <Row align="middle">
                            <LinkSVG />
                          </Row>
                        </Col>
                        <Col>
                          <Typography.Text>Copy Invitation URL</Typography.Text>
                        </Col>
                      </Row>
                    ),
                    key: "3",
                    onClick: () => {
                      navigator.clipboard.writeText(meetingLink);
                      message.success("Link Copied Successfully ✅");
                    },
                  },
                ],
              }}
              trigger={["click"]}
              placement="topRight">
              <div className="more-btn">
                <MoreSVG style={{ rotate: "90deg" }} />
              </div>
            </Dropdown>
          </Col>
        </Row>
      ),
    },
  ];
}
