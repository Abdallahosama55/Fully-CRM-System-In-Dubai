import { AntDesignOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Collapse, Divider, Row, Select, Typography } from "antd";
import {
  DateSVG,
  MenuDotsSVG,
  NextEmailSVG,
  PrevEmailSVG,
  UsersThreeRegularSVG,
} from "assets/jsx-svg";
import dayjs from "dayjs";
import { useState } from "react";
import Attachments from "../../AttachmentsAndQuestions/Attachments";
import EmailEditor from "../email-editor";
import useGetEmails from "services/CustomerLeadBoard/Querys/useGetEmails";
const EmailComponent = ({ subject, body, from, to, creatingDate }) => {
  return (
    <div className="collapse">
      <Collapse expandIconPosition="end" defaultActiveKey={["1"]}>
        <Collapse.Panel
          header={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}>
              <div style={{ fontSize: "12px", display: "flex", gap: "7px" }}>
                <div>
                  <Typography.Text style={{ fontSize: "12px" }}>{subject}</Typography.Text>
                  <br />
                  {/* <Typography.Text
                style={{ fontSize: "10px", color: "#AEAEB2" }}
              >
                by Esther Howsrd
              </Typography.Text> */}
                </div>
              </div>
              <div style={{ fontSize: "10px", display: "flex", gap: "7px" }}>
                <div>
                  <DateSVG color="#000" />
                </div>
                <div>{creatingDate}</div>
                <div>
                  <MenuDotsSVG />
                </div>
              </div>
            </div>
          }
          key="1">
          <div className="email-des">
            <Row align={"middle"} justify="space-between" className="email-header">
              <Col span={5}>
                <Row align={"middle"}>
                  <Col span={7}>
                    <Avatar size={26} icon={<AntDesignOutlined />} />
                  </Col>
                  <Col span={17}>
                    <div style={{ fontSize: "12px" }}>{from}</div>
                    <div style={{ fontSize: "10px", color: "#AEAEB2" }}>to {to}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={10}>
                <Row justify={"end"} align={"middle"} style={{ gap: 10 }}>
                  <div>
                    <PrevEmailSVG />
                  </div>
                  <div>
                    <NextEmailSVG />
                  </div>
                </Row>
              </Col>
            </Row>
            <div className="email-body">
              <div className="fw-500" style={{ color: "#000" }}>
                Hi there
              </div>
              <div style={{ color: "#AEAEB2", fontSize: "12px" }}>{body}</div>
              <div style={{ marginTop: "18px" }}>
                <Row>
                  <Col span={10}>
                    <Attachments showAttachments={false} />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
function Emails() {
  const { data: emailsData, isPending } = useGetEmails();
  const emails = [
    {
      subject: "Your Invoices",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt",
      from: "omar",
      to: "hassan",
      creatingDate: "today,12:00pm",
    },
  ];
  const [newEmail, setNewEmail] = useState(false);
  return (
    <div className="calls emails">
      <Row align="middle" style={{ marginTop: "24px" }} justify="space-between" gutter={[12, 12]}>
        <Col span={8}>
          <Select
            className="general-table-select"
            style={{ width: "100%" }}
            defaultValue="newest"
            options={[
              {
                value: "newest",
                label: (
                  <Typography.Text className="fz-12">
                    <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                    <span style={{ color: "#AEAEB2" }}>All employees</span>
                  </Typography.Text>
                ),
              },
            ]}
          />
        </Col>
        <Col span={6}>
          <Select
            className="general-table-select"
            style={{ width: "100%" }}
            defaultValue="newest"
            options={[
              {
                value: "newest",
                label: (
                  <Typography.Text className="fz-12">
                    Sort by: <span className="fw-600">Newest</span>
                  </Typography.Text>
                ),
              },
            ]}
          />
        </Col>
        <Col span={6} offset={4}>
          <Button
            style={{ background: "#3A5EE3", color: "#fff", width: "100%" }}
            onClick={() => setNewEmail(true)}>
            <Row align="middle" justify={"center"} gutter={[8, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <PlusSquareOutlined />
                </Row>
              </Col>
              <Col>New mail</Col>
            </Row>
          </Button>
        </Col>
      </Row>
      <div>
        <div className="fw-500" style={{ paddingTop: "24px", paddingBottom: "16px" }}>
          June 24, 2023
        </div>
        <div>
          {emails.map((item) => (
            <EmailComponent {...item} />
          ))}
          <div className="collapse">
            <Collapse expandIconPosition="end" defaultActiveKey={["1"]}>
              <Collapse.Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "8px",
                    }}>
                    <div style={{ fontSize: "12px", display: "flex", gap: "7px" }}>
                      <div>
                        <Typography.Text style={{ fontSize: "12px" }}>
                          Your Invoices
                        </Typography.Text>
                        <br />
                        <Typography.Text style={{ fontSize: "10px", color: "#AEAEB2" }}>
                          by Esther Howsrd
                        </Typography.Text>
                      </div>
                    </div>
                    <div style={{ fontSize: "10px", display: "flex", gap: "7px" }}>
                      <div>
                        <DateSVG color="#000" />
                      </div>
                      <div>Today, 12:00 PM</div>
                      <div>
                        <MenuDotsSVG />
                      </div>
                    </div>
                  </div>
                }
                key="1">
                <div className="email-des">
                  <Row align={"middle"} justify="space-between" className="email-header">
                    <Col span={5}>
                      <Row align={"middle"}>
                        <Col span={7}>
                          <Avatar size={26} icon={<AntDesignOutlined />} />
                        </Col>
                        <Col span={17}>
                          <div style={{ fontSize: "12px" }}>Anas Umar</div>
                          <div style={{ fontSize: "10px", color: "#AEAEB2" }}>
                            to Rina T. Nichols
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10}>
                      <Row justify={"space-between"} align={"middle"}>
                        <div style={{ fontSize: "10px", color: "#AEAEB2" }}>
                          {`${dayjs().format("MMMM DD, YYYY")} at ${dayjs().format("hh:mm A")}`}
                        </div>
                        <Divider style={{ height: "2.3em", margin: "0 22px" }} type="vertical" />
                        <div>
                          <PrevEmailSVG />
                        </div>
                        <div>
                          <NextEmailSVG />
                        </div>
                      </Row>
                    </Col>
                  </Row>
                  <div className="email-body">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco
                    </div>
                    <div>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu
                    </div>
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </div>
      {newEmail && <EmailEditor setNewEmail={setNewEmail} />}
    </div>
  );
}

export default Emails;
