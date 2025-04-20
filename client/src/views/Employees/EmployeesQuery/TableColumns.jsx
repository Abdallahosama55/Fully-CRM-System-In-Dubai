import { Avatar, Col, Row, Dropdown, Typography } from "antd";
import { EditSVG, EyeSVG, MoreSVG } from "assets/jsx-svg";
import { Link } from "react-router-dom";
import "./styles.css";

export const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    width: 80,
    render: (_, { userImage, employeeName, status }) => (
      <div className="employee-avatar">
        <div
          className="employee-avatar-status"
          style={{ backgroundColor: status[0] === "Active" ? "#5EAF2F" : "#D1D1D6" }}
        />
        <Avatar
          size={38}
          style={{ backgroundColor: "#0318D626", color: "#0318D699" }}
          src={userImage}>
          {!userImage &&
            `${employeeName
              .split(" ")
              .map((i) => i.charAt(0))
              .join("")
              .toUpperCase()}`}
        </Avatar>
      </div>
    ),
  },
  {
    title: "Employee Name",
    dataIndex: "employeeName",
    key: "employeeName",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: true,
    width: 180,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
    width: 160,
  },
  {
    title: "Desks",
    dataIndex: "desks",
    key: "desks",
    ellipsis: true,
    width: 170,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    width: 110,
    align: "center",
    render: (_, { status, key }) => (
      <>
        {status.map((tag) => {
          let color = "";
          if (tag === "Active") {
            color = "#0318D6";
          } else {
            color = "#F40055";
          }
          return (
            <Row justify="center" key={key}>
              <Typography.Text
                key={key}
                ellipsis
                style={{
                  background: `${color}0F`,
                  borderRadius: "8px",
                  color: color,
                  width: "76px",
                  height: "30px",
                }}
                className="center-items">
                {tag}
              </Typography.Text>
            </Row>
          );
        })}
      </>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 90,
    render: (_, { key, toggleGeneralWorkingModal }) => (
      <RowAction id={key} toggleGeneralWorkingModal={toggleGeneralWorkingModal} />
    ),
  },
];

function RowAction({ id, toggleGeneralWorkingModal }) {
  return (
    <Row wrap={false} justify="center" align="middle" gutter={[6, 0]}>
      <Col>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link to={`/employee/${id}`}>
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
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <EditSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text>Edit</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "2",
                onClick: () => toggleGeneralWorkingModal(),
              },
            ],
          }}
          trigger={["click"]}
          placement="topRight">
          <div className="more-query-btn">
            <MoreSVG style={{ rotate: "90deg" }} />
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
}
