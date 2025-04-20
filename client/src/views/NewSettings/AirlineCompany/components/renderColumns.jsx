import Badge from "components/common/Badge";
import Actions from "./Actions";
import IsActive from "components/StatusComponent/IsActive";

export const renderColumns = [
  {
    title: "NO.",
    dataIndex: "id",
    width: "5%",
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
    sorter: (a, b) => b.name.localeCompare(a.name),
  },
  {
    title: "Country ",
    dataIndex: "countryCode",
    width: "15%",
    render: (countryCode) => {
      if (!countryCode) return "";
      const countryNameGetter = new Intl.DisplayNames(["en"], { type: "region" });
      return countryNameGetter.of(countryCode);
    },
  },
  {
    hidden: false,
    title: "Status",
    dataIndex: "isActive",
    render: (status) => {
      return <Badge status={status ? "success" : "error"}>{status ? "Active" : "Inactive"}</Badge>;
    },
    sorter: (a, b) => b.statusLabel.localeCompare(a.statusLabel),
    width: "8%",
  },

  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: "10%",
    render: (_, record) => {
      return (
        <Actions
          name={record.name}
          status={record.isActive}
          countryId={record.country?.id}
          id={record.id}
        />
      );
    },
  },
];
