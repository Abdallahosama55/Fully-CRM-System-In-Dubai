import { Button, Col, Row, Tooltip, Typography } from "antd";
import { TicketSVG } from "assets/jsx-svg";

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 80,
    align: "center",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Date & Time From",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 160,
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    ellipsis: true,
    width: 160,
  },

  {
    title: "Employees",
    dataIndex: "employees",
    key: "employees",
    ellipsis: true,
    width: 200,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    align: "center",
    width: 100,
    render: (_, { status, key }) => {
      let color = "";
      if (status === "ongoing") {
        color = "#5EAF2F";
      } else if (status === "Upcoming") {
        color = "#3A5EE3";
      } else {
        color = "#F40055";
      }

      return (
        <Row justify="center" key={key}>
          <div
            style={{
              background: `${color}0F`,
              borderRadius: "8px",
              width: "90px",
              height: "30px",
            }}
            className="center-items"
          >
            <Tooltip title={status}>
              <Typography.Text style={{ color: color }} ellipsis>
                {status}
              </Typography.Text>
            </Tooltip>
          </div>
        </Row>
      );
    },
  },
];
