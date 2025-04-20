import LabelCell from "./TableCells/LabelCell";
import ParticipantsCell from "./TableCells/ParticipantsCell";
import TimeCell from "./TableCells/TimeCell";
import ActionItemsCell from "./TableCells/ActionItemsCell";
import StatusCell from "./TableCells/StatusCell";
import { Typography } from "antd";
import dayjs from "dayjs";
import Members from "components/common/Members";

function formatDateTime(date) {
  const today = dayjs();
  const inputDate = dayjs(date).tz(localStorage.getItem("time-zone"));

  if (inputDate.isSame(today, "day")) {
    return inputDate.format("HH:mm:ss");
  } else {
    return inputDate.format("YYYY-MM-DD HH:mm:ss");
  }
}

export const renderColumns = (onChangeLabel) => [
  {
    title: "NO.",
    dataIndex: "index",
    width: "5%",
    onCell: (record, index) => ({
      style: {
        borderLeft: "4px solid " + record?.meetingColor,
      },
    }),
    render: (_, record, index) => {
      return <div>#{index + 1}</div>;
    },
  },
  {
    title: "Label",
    dataIndex: "label",
    width: "15%",
    render: (_, record) => <LabelCell onChangeLabel={onChangeLabel} record={record} />,
  },
  {
    title: "Title",
    dataIndex: "title",
    width: "10%",
    render: (_, record, index) => {
      return (
        <Typography.Text style={{ fontSize: "12px" }} ellipsis>
          {record?.title}
        </Typography.Text>
      );
    },
  },
  {
    title: "Participants",
    dataIndex: "participantBookedMeetings",
    width: "20%",
    render: (participantBookedMeetings) => (
      <Members
        customers={
          participantBookedMeetings
            ?.filter((people) => !!people?.customer)
            ?.map((people) => {
              return {
                fullName: people?.customer?.account?.fullName,
                id: people?.customer?.account?.id,
                email: people?.customer?.account?.email,
                profileImage: people?.customer?.account?.profileImage,
              };
            }) ?? []
        }
        employees={
          participantBookedMeetings
            ?.filter((item) => !!item.employee)
            ?.map((employee) => ({
              fullName: employee?.employee?.account?.fullName,
              id: employee?.employee?.account?.id,
              email: employee?.employee?.account?.email,
            })) ?? []
        }
      />
    ),
  },
  {
    title: "Schedule type",
    dataIndex: "meetingType",
    width: "15%",
    render: (meetingType) => {
      return MeetingTypeLabel?.[meetingType] ?? "-";
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    width: "15%",
    render: (_, record) => formatDateTime(record.date),
  },
  {
    title: "Time",
    dataIndex: "date",
    width: "15%",
    render: (_, record) => <TimeCell record={record} />,
  },
  {
    title: "Desk",
    dataIndex: "desk",
    width: "10%",
    render: (desk) => {
      return desk?.name ?? "-";
    },
  },
  {
    title: "Creator",
    dataIndex: "createdBy",
    width: "10%",
    render: (createdBy) => {
      return createdBy ?? "-";
    },
  },
  {
    title: "Status",
    dataIndex: "color",
    width: "20%",
    render: (_, record) => <StatusCell record={record} />,
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "",
    align: "center",
    width: "20px",
    render: (_, record) => <ActionItemsCell record={record} />,
  },
];
const MeetingTypeLabel = {
  VINDO_MEETING_CALL: "Meeting Call",
  VINDO_METAVERSE_CALL: "Metaverse Meeting",
  CUSTOM_LINK: "Custom Link",
};
