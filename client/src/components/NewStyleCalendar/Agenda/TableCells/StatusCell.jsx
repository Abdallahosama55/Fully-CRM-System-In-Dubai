import { Dropdown, Menu, Row, Typography } from "antd";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";
import { useContext, useEffect, useState } from "react";
import useGetConstants from "services/Constants/Querys/useGetConstants";
import usePutMeetingStatus from "services/meetings/Mutations/usePutMeetingStatus";

const StatusCell = ({ record }) => {
  const { user } = useContext(userContext);
  const { openNotificationWithIcon } = useNotification();
  const [selectedStatus, setSelectedStatus] = useState({});

  const { meetingStatus } = useGetConstants({
    refetchOnMount: false,
    select: (data) => {
      return data.data.data;
    },
  });

  const { UpdateMeetingStatus } = usePutMeetingStatus({
    onSuccess: (_, payload) => {
      openNotificationWithIcon("success", `Updated successfully`);
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });

  const getStatus = () => {
    if (["Completed", "No Show"].includes(record?.actionStatus?.name)) {
      return record?.actionStatus;
    } else {
      const participantMeeting = record?.participantBookedMeetings.find(
        (participant) => participant?.employee && participant.employee.id === user.id,
      );
      return participantMeeting ? participantMeeting?.actionStatus : "";
    }
  };

  useEffect(() => {
    setSelectedStatus(getStatus());
  }, [record]);

  const handleChangeStatus = (status) => {
    setSelectedStatus(status);
    UpdateMeetingStatus({
      id: record?.id,
      status: status ?? null,
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu
          style={{
            border: "1px solid #E5E5EA",
            borderRadius: "12px",
            boxShadow: "3px 6px 16px #00000014",
          }}>
          {meetingStatus?.data?.map((status) => (
            <Menu.Item
              key={`${status?.id}`}
              onClick={() => handleChangeStatus(status)}
              style={{ color: status.color }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                {status?.name}
              </div>
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={["click"]}>
      <Row align="middle" gutter={[8, 0]} style={{ cursor: "pointer" }}>
        {selectedStatus?.id ? (
          <>
            <Typography.Text style={{ color: selectedStatus.color }}>
              {selectedStatus.name}
            </Typography.Text>
          </>
        ) : (
          <>--</>
        )}
      </Row>
    </Dropdown>
  );
};

export default StatusCell;
