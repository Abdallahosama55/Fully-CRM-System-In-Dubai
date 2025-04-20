import { Button } from "antd";
import Members from "./Members";
import Actions from "./Actions";

export const generateColumns = [
  {
    name: "No",
    title: "No .",
    key: "number",
    ellipsis: true,
    width: 70,
    onCell: (record) => ({
      style: {
        borderLeft: "4px solid " + record?.meetingColor,
      },
    }),
    render: (id, record, index) => {
      ++index;
      return index;
    },
  },
  {
    title: "Meeting name",
    dataIndex: "meeting",
    key: "meeting",
    ellipsis: true,
    width: 150,
    render: (id, record, index) => {
      return record?.meetingName;
    },
  },

  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 130,
  },
  {
    title: "Desk",
    dataIndex: "desk",
    key: "desk",
    ellipsis: true,
    width: 130,
  },
  {
    title: "Members",
    dataIndex: "Members",
    key: "Members",
    ellipsis: true,
    width: 130,
    render: (_, record) => {
      return (
        <Members customers={record?.customers ?? []} employees={record?.employees ?? []}></Members>
      );
    },
  },
  {
    title: " ",

    key: "actions",
    dataIndex: "actions",
    ellipsis: true,
    width: 100,
    align: "right",
    render: (_, record) => {
      return (
        <div>
          <Actions
            meetingType={record.meetingType}
            meetingId={record.meetingId}
            meetingLink={record.meetingLink}
            meetingLinkParams={record.meetingLinkParams}></Actions>
        </div>
      );
    },
  },
];
