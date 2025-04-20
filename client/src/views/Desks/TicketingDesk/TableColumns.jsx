import { Col, Dropdown, Row, Tooltip, Typography } from "antd";
import { CloseTicketSVG, EyeSVG, MoreSVG, PersonSVG, TicketSVG } from "assets/jsx-svg";
import { useContext, useRef, useState } from "react";
import ReassignMenu from "./ReassignMenu";
import { Link } from "react-router-dom";
import { axiosCatch } from "utils/axiosUtils";
import TicketService from "services/ticket.service";
import TooltipTicket from "components/Tooltip";
import { updateFirebaseTicketDate } from "utils/firebase.utils";
import userContext from "context/userContext";

export const columns = [
  {
    title: "Ticket NO.",
    dataIndex: "ticketNumber",
    key: "ticketNumber",
    width: 100,
    align: "center",
    render: (_, { priority, id }) => (
      <Row justify="start" align="middle">
        <Col xs={12}>
          <Row justify="start" align="middle">
            <Tooltip title={priority}>
              <TicketSVG color={prioritysColor[priority]} />
            </Tooltip>
          </Row>
        </Col>
        <Col xs={12}>
          <Tooltip title={id}>
            <Typography.Text ellipsis className="fw-500">
              #{id}
            </Typography.Text>
          </Tooltip>
        </Col>
      </Row>
    ),
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Ticket title",
    dataIndex: "ticketTitle",
    key: "ticketTitle",
    ellipsis: true,
    width: 160,
  },

  {
    title: "Ticket description",
    dataIndex: "ticketDescription",
    key: "ticketDescription",
    ellipsis: true,
    width: 200,
    render: (_, { ticketDescription }) => {
      const { description } = ticketDescription;
      return (
        <TooltipTicket titleData={ticketDescription}>
          <span>{description}</span>
        </TooltipTicket>
      );
    },
  },

  {
    title: "Assigned to",
    dataIndex: "assignedTo",
    key: "assignedTo",
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
          <div
            style={{
              background: `${color}0F`,
              borderRadius: "8px",
              width: "90px",
              height: "30px",
            }}
            className="center-items">
            <Tooltip title={status}>
              <Typography.Text style={{ color: color }} key={id} ellipsis>
                {status}
              </Typography.Text>
            </Tooltip>
          </div>
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
    render: (_, { link, id, employeeId, setReRenderWhenAssign, status, setStatus }) => (
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

const ActionsRender = ({ id, link, setReRenderWhenAssign, status, setStatus }) => {
  const actionBtn = useRef();
  const [openActions, setOpenActions] = useState(false);
  const [clickLoading, setClickLoading] = useState(false);
  const { user } = useContext(userContext);

  const onEmployeeSelect = async (employeeId) => {
    try {
      setClickLoading(true);

      await TicketService.reassignTicket({ employeeId }, id);
      await updateFirebaseTicketDate(id, user.companyId, `company-${Date.now()}`);
      setReRenderWhenAssign((prev) => (prev += 1));
    } catch (err) {
      axiosCatch(err);
    } finally {
      setClickLoading(false);
    }
  };
  const CloseTicket = async () => {
    if (status !== "CLOSED") {
      try {
        await TicketService.updateStatus({ status: "CLOSED" }, id);
        await updateFirebaseTicketDate(id, user.companyId, `company-${Date.now()}`);
        setStatus((prev) => !prev);
        setClickLoading(false);
      } catch (err) {
        axiosCatch(err);
      }
      setClickLoading(true);
    }
  };

  const actionItems = [
    {
      label: (
        <Link to={`/desks/ticket-view/${link.split("/")[link.split("/").length - 1]}`}>
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
        <Dropdown
          trigger={["click"]}
          dropdownRender={() => (
            <ReassignMenu
              onEmployeeSelect={onEmployeeSelect}
              clickLoading={clickLoading}
              noFilterMyself
            />
          )}
          placement="topRight">
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
        <Row onClick={CloseTicket} align="middle" gutter={[8, 0]} wrap={false}>
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
      overlayClassName="ticketing-actions"
      menu={{ items: actionItems }}
      trigger={["click"]}
      placement="bottomRight">
      <div ref={actionBtn} className="more-btn">
        <MoreSVG style={{ rotate: "90deg" }} />
      </div>
    </Dropdown>
  );
};

const prioritysColor = {
  HIGH: "#F40055",
  MEDIUM: "#F8B51D",
  LOW: "#5EAF2F",
};
