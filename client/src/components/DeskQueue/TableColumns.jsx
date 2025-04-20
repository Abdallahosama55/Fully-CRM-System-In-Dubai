import { Col, Dropdown, Row, Tooltip, Typography } from "antd";
import { CloseTicketSVG, EyeSVG, MoreSVG, PersonSVG, TicketSVG } from "assets/jsx-svg";
import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import ReassignMenu from "views/Desks/TicketingDesk/ReassignMenu";

export const columnsCustomer = [
  {
    title: "NO.",
    dataIndex: "Number",
    key: "Number",
    width: 80,
    align: "center",
    render: (_, { priority, ticketNumber, key }) => (
      <Row justify="start" align="middle">
        <Col xs={12}>
          <Row justify="start" align="middle">
            <Tooltip title={priority}>
              <TicketSVG color={prioritysColor[priority]} />
            </Tooltip>
          </Row>
        </Col>
        <Col xs={12}>
          <Typography.Text className="fw-500">#{key}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    title: "Employee",
    dataIndex: "employee",
    key: "employee",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Service Type",
    dataIndex: "ServiceType",
    key: "ServiceType",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Customer mail",
    dataIndex: "Customermail",
    key: "Customermail",
    ellipsis: true,
    width: 160,
  },

  {
    title: "Customer",
    dataIndex: "Customer",
    key: "Customer",
    ellipsis: true,
    width: 200,
  },

  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 150,
  },

  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 90,
    render: (_, { id }) => <ActionsRender id={id} />,
  },
];
export const columnsAll = [
  {
    title: "NO.",
    dataIndex: "Number",
    key: "Number",
    width: 80,
    align: "center",
    render: (_, { priority, ticketNumber, key }) => (
      <Row justify="start" align="middle">
        <Col xs={12}>
          <Row justify="start" align="middle">
            <Tooltip title={priority}>
              <TicketSVG color={prioritysColor[priority]} />
            </Tooltip>
          </Row>
        </Col>
        <Col xs={12}>
          <Typography.Text className="fw-500">#{key}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    title: "Employee",
    dataIndex: "employee",
    key: "employee",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Desk Name",
    dataIndex: "deskName",
    key: "deskName",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Service Type",
    dataIndex: "ServiceType",
    key: "ServiceType",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Customer mail",
    dataIndex: "Customermail",
    key: "Customermail",
    ellipsis: true,
    width: 160,
  },

  {
    title: "Customer",
    dataIndex: "Customer",
    key: "Customer",
    ellipsis: true,
    width: 200,
  },

  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 150,
  },

  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 90,
    render: (_, { id }) => <ActionsRender id={id} />,
  },
];

export const columnsMeetingDesk = [
  {
    title: "NO.",
    dataIndex: "Number",
    key: "Number",
    width: 80,
    align: "center",
    render: (_, { priority, ticketNumber, key }) => (
      <Row justify="start" align="middle">
        <Col xs={12}>
          <Row justify="start" align="middle">
            <Tooltip title={priority}>
              <TicketSVG color={prioritysColor[priority]} />
            </Tooltip>
          </Row>
        </Col>
        <Col xs={12}>
          <Typography.Text className="fw-500">#{key}</Typography.Text>
        </Col>
      </Row>
    ),
  },
  {
    title: "Desk name",
    dataIndex: "deskname",
    key: "deskname",
    ellipsis: true,
    width: 200,
  },
  {
    title: "Service Type",
    dataIndex: "ServiceType",
    key: "ServiceType",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Customer mail",
    dataIndex: "Customermail",
    key: "Customermail",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Customer",
    dataIndex: "Customer",
    key: "Customer",
    ellipsis: true,
    width: 200,
  },

  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 150,
  },

  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 90,
    render: (_, { id }) => <ActionsRender id={id} />,
  },
];

const ActionsRender = ({ id }) => {
  const actionBtn = useRef();
  const [openActions, setOpenActions] = useState(false);
  const [openReassignDrop, setOpenReassignDrop] = useState(false);

  const actionItems = [
    {
      label: (
        <Link to={`/desks/ticket-view/${id}`}>
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
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Dropdown trigger={["click"]} dropdownRender={() => <ReassignMenu />} placement="topRight">
          <Row align="middle" gutter={[8, 0]} wrap={false}>
            <Col>
              <Row align="middle">
                <PersonSVG />
              </Row>
            </Col>
            <Col>
              <Typography.Text style={{ color: "#1131da" }}>Reassign</Typography.Text>
            </Col>
          </Row>
        </Dropdown>
      ),
      key: "2",
    },
    {
      label: (
        <Row align="middle" gutter={[8, 0]} wrap={false}>
          <Col>
            <Row align="middle">
              <CloseTicketSVG />
            </Row>
          </Col>
          <Col>
            <Typography.Text style={{ color: "#f40055" }}>Close</Typography.Text>
          </Col>
        </Row>
      ),
      key: "3",
    },
  ];

  return (
    <Dropdown
      open={openActions}
      overlayClassName="ticketing-actions"
      menu={{ items: actionItems }}
      trigger={["click"]}
      placement="topRight"
      getPopupContainer={() => actionBtn.current}>
      <div ref={actionBtn} className="more-btn" onClick={() => setOpenActions(true)}>
        <MoreSVG style={{ rotate: "90deg" }} />
        {openActions && (
          <div
            className="ticketing-overlay"
            onClick={(e) => {
              e.stopPropagation();
              setOpenActions(false);
            }}
          />
        )}
      </div>
    </Dropdown>
  );
};

const prioritysColor = {
  HIGH: "#F40055",
  MEDIUM: "#F8B51D",
  LOW: "#5EAF2F",
};
