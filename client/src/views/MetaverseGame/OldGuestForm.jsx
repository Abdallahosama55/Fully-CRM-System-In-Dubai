import { Avatar, Button, Col, ConfigProvider, Form, Image, Input, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import joinAvatar from "assets/images/JoinMeetingAvatar.png";
import UserSolidSVG from "assets/jsx-svg/UserSolidSVG";
import Logo from "components/common/Logo";

const OldGuestForm = ({ eventData, loading, eventBtnStatus, onSignAsGuestFinish }) => {
  const [form] = Form.useForm();
  return (
    <Row gutter={[0, 16]}>
      <Row
        style={{
          width: "100%",
          borderBottom: "1px solid #E8E8F0",
          padding: "0px 0px 20px 0px",
          marginBottom: "8px",
        }}>
        <Col xs={12} lg={12}>
          <Logo />
        </Col>

        <Col xs={12} lg={12} style={{ display: "flex", justifyContent: "end" }}>
          <CloseOutlined style={{ cursor: "pointer" }} onClick={() => window.history.back()} />
        </Col>
      </Row>

      <Col xs={24}>
        <Row justify="center">
          <Avatar
            src={eventData?.customerDimension?.image || joinAvatar}
            className="join-meet-img"
          />
        </Row>
      </Col>

      <Col xs={24}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#fff",
              colorPrimaryText: "#fff",
              borderRadius: "14px",
              colorBorder: "#fff",
              colorText: "#fff",
              colorTextPlaceholder: "#fff",
            },
          }}>
          <Form
            form={form}
            onFinish={onSignAsGuestFinish}
            layout="vertical"
            requiredMark={false}
            className="join-meet-form">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                columnGap: "6px",
                flexDirection: "column",
              }}>
              <Form.Item
                name="userEmail"
                label="Enter Your Email"
                className="w-100"
                style={{ padding: "0 1rem" }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Your Email",
                  },
                ]}>
                <Input
                  style={{
                    background: "transparent",
                    border: "1px solid #E8E8F0",
                    color: "black",
                  }}
                  placeholder="Enter Here"
                  type="email"
                  className="enter-name"
                  suffix={<UserSolidSVG width={10} />}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Row justify="center">
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{
                    background: "#3A5EE3",
                    paddingInline: "1.5rem",
                    minWidth: "150px",
                  }}
                  loading={loading}>
                  {eventData ? eventBtnStatus : "Join Metaverse"}
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Col>
    </Row>
  );
};

export default OldGuestForm;
