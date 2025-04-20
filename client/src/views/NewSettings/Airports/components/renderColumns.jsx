import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import Actions from "./Actions";
import IsActive from "components/StatusComponent/IsActive";

export const renderColumns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "15%",
    sorter: (a, b) => b.name.localeCompare(a.name),
  },

  {
    title: "Country",
    dataIndex: "Country",
    width: "15%",
    render: (country) => {
      return country;
    },
  },
  {
    title: "state",
    dataIndex: "state",
    width: "15%",
    render: (_, record) => {
      return record?.state?.name ?? "-";
    },
  },
  {
    title: "City",
    dataIndex: "City",
    width: "15%",
    render: (city) => {
      return city;
    },
  },
  {
    title: "Code ",
    dataIndex: "id",
    width: "10%",
  },
  {
    hidden: false,
    title: "Status",
    dataIndex: "isActive",
    render: (status) => {
      return <IsActive isActive={status} />;
    },
    sorter: (a, b) => b.statusLabel.localeCompare(a.statusLabel),
    width: "8%",
  },

  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: "15%",
    render: (_, record) => {
      return (
        <Actions
          cityId={record?.city?.id}
          code={record.code}
          name={record.name}
          stateId={record.state?.id}
          status={record.isActive}
          countryId={record.country?.id}
          id={record.id}
        />
      );
    },
  },
];
