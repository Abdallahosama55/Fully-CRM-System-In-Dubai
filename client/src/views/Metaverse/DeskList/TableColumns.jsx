import { Typography } from "antd";
import { EditSVG } from "assets/jsx-svg";

export default function CallsAndMeetingsColumns() {
  return [
    {
      title: "Desk Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name }) => (
        <Typography.Text className="fw-500">{name}</Typography.Text>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      align: "center",
      render: (_, { id }) => <EditSVG />,
    },
  ];
}
