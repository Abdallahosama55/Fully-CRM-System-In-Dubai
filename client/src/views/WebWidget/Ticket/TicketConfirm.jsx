import { Col, Row, Tooltip, Typography, message } from "antd";
import { CopySVG, LinkSVG, SuccessSVG } from "assets/jsx-svg";

export default function TicketConfirm({ link }) {
  return (
    <Row justify={"center"}>
      <Col
        xs={22}
        sm={24}
        md={18}
        lg={12}
        style={{ border: "1.5px solid #2729420F", borderRadius: 12, padding: 20 }}>
        <Row style={{ textAlign: "center", rowGap: 10 }}>
          <Col xs={24}>
            <SuccessSVG />
          </Col>
          <Col xs={24}>
            <Typography.Text className="fw-700 fz-20">Successful !</Typography.Text>
          </Col>
          <Col xs={24}>
            <Typography.Text className="fw-400 fz-16 ">
              Congrats, you have been submit a ticket successfully
            </Typography.Text>
          </Col>
          <Col xs={24}>
            <div
              style={{
                background: "linear-gradient(135deg, #C5E8FA 0%, #D8CFF7 100%)",
                padding: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}>
              <div>
                <div className="mb-1">
                  <Typography.Text>
                    We have sent a message to you’re email address so you can track you’re ticket
                    easily.
                  </Typography.Text>
                </div>
                <Row
                  gutter={[12, 6]}
                  align="middle"
                  justify="center"
                  style={{ marginBlockEnd: "12px" }}>
                  <Col className="clickable">
                    <Tooltip
                      title={
                        <div>
                          {link}
                          <div
                            style={{ color: "white", cursor: "pointer" }}
                            onClick={async () => {
                              await navigator.clipboard.writeText(link);
                              message.info("ticket Link Copied");
                            }}>
                            <span style={{ marginInline: 5 }}>
                              <CopySVG fill="white" />
                            </span>
                            Copy link
                          </div>{" "}
                        </div>
                      }>
                      <div
                        onClick={async () => {
                          window.open(link, "_blank", "noopener,noreferer");
                        }}
                        style={{
                          borderRadius: 12,
                          color: "#ffffff",
                          background: "linear-gradient(223.59deg, #3A5EE3 10.38%, #8FCAF3 117.99%)",
                          padding: "7px 20px",
                        }}>
                        <span style={{ marginRight: 7 }}>
                          <LinkSVG color="#fff" style={{ width: "14px", height: "14px" }} />
                        </span>
                        <Typography.Text className="fw-700 fz-14 " style={{ color: "#fff" }}>
                          Click here
                        </Typography.Text>
                      </div>
                    </Tooltip>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
