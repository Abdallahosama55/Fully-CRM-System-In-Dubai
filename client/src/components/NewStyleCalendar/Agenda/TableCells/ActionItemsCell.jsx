import { DeleteOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Row, Spin } from "antd";

import useDeleteMeeting from "services/meetings/Mutations/useDeleteMeeting";
import { useNotification } from "context/notificationContext";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import { MenuDotsSVG } from "assets/jsx-svg";
import CallsAndMeetingsDetails from "views/Collaboration/CallsAndMeetingsDetails";
import { useDrawer } from "hooks/useDrawer";

const ActionItemsCell = ({ record }) => {
  const { openNotificationWithIcon } = useNotification();
  const queryClient = useQueryClient();
  const DrawerAPI = useDrawer();
  const { deleteMeeting, isDeleteMeetingPending } = useDeleteMeeting(record.id, {
    onSuccess: (data, id) => {
      openNotificationWithIcon("success", `Deleted successfully`);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MEETINGS_CALENDAR] });
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}>
        {DrawerAPI.Render}
      <a href={record.meetingLink} target="_blank" rel="noopener noreferrer">
        <Button
          type="primary"
          style={{
            background: "#3A5EE3",
            color: "#fff",
            borderRadius: "8px",
            marginRight: "5px",
            opacity: record.meetingLink ? 1 : 0.5,
          }}
          size="small"
          disabled={!record.meetingLink}>
          join
        </Button>
      </a>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                DrawerAPI.setDrawerContent(
                  <CallsAndMeetingsDetails id={record?.id} setRefresh={() => {}} DrawerAPI={DrawerAPI}/>,
                );
                DrawerAPI.open("40%");
              }}
              key="1">
              <EyeOutlined />
              View
            </Menu.Item>
            <Menu.Item key="2" onClick={() => console.log("Option 2 clicked")}>
              <UserOutlined />
              Reassign
            </Menu.Item>
            <Menu.Item key="3" onClick={() => deleteMeeting()} style={{ color: "#E81224" }}>
              {isDeleteMeetingPending ? (
                <Row align="middle" justify="center">
                  <Spin size="small" />
                </Row>
              ) : (
                <>
                  <DeleteOutlined />
                  Delete
                </>
              )}
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}>
        <Button type="text" style={{ background: "#e9e9ed" }} size="small">
          <MenuDotsSVG height={20} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ActionItemsCell;
