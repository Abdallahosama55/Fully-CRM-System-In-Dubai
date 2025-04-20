import { Avatar, Dropdown, Row, Typography } from "antd";
import { CloseTicketSVG, MoreSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import { AntDesignOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    width: 80,
    align: "center",
    render: (_, { priority, id }) => (
      <Avatar size={32} icon={<AntDesignOutlined />} />
    ),
  },
  {
    title: "Customer name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Contact name",
    dataIndex: "contactname",
    key: "contactname",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: true,
    width: 250,
  },
  {
    title: "Create date",
    dataIndex: "createdate",
    key: "createdate",
    ellipsis: true,
    width: 200,
    render: (_, { data }) => <div>{dayjs(data).format("MMMM D,YYYY")}</div>,
  },

  {
    title: "Created by",
    dataIndex: "createdby",
    key: "createdby",
    ellipsis: true,
    width: 150,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    align: "center",
    width: 100,
    render: (_, { status, id }) => {
      let color = "";
      if (status === "OPEN") {
        color = "#0318D6";
      } else {
        color = "#F40055";
      }

      return (
        <Row justify="center" key={id}>
          <Typography.Text
            key={id}
            ellipsis
            style={{
              background: `${color}0F`,
              borderRadius: "8px",
              color: color,
              width: "76px",
              height: "30px",
            }}
            className="center-items"
          >
            {status}
          </Typography.Text>
        </Row>
      );
    },
  },

  {
    title: " ",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 90,
    render: (
      _,
      { link, id, employeeId, setReRenderWhenAssign, status, setStatus },
    ) => (
      <ActionsRender
        id={id}
        link={link}
        employeeId={employeeId}
        status={status}
        setStatus={setStatus}
        setReRenderWhenAssign={setReRenderWhenAssign}
      />
    ),
  },
];

const ActionsRender = ({ setStatus }) => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow
    >
      <MoreSVG style={{ rotate: "90deg" }} />
    </Dropdown>
  );
};

const prioritysColor = {
  HIGH: "#F40055",
  MEDIUM: "#F8B51D",
  LOW: "#5EAF2F",
};

export const dataSource = [
  {
    key: "1",
    avatar: <Avatar size={32} icon={<AntDesignOutlined />} />,
    name: "Mike",
    contactname: "Mike",
    email: "Paradisetravel@gmail.com",
    createdate: "2023-06-26T14:25:23.037Z",
    createdby: "Mike",
    status: "OPEN",
  },
];

const items = [
  {
    key: "1",
    label: (
      <div style={{ color: "red" }}>
        <CloseTicketSVG /> Deactivate
      </div>
    ),
  },
];
