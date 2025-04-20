import userContext from "context/userContext";
import { useCallback, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MetaverseView from "./MetaverseView";
import { Avatar, Button, Col, ConfigProvider, Form, Input, Row, notification } from "antd";

import joinBg from "assets/images/startMeetBg.png";
import defualtAvatar from "assets/images/defualtAvatar.png";
import AuthService from "services/auth.service";
import axios from "axios";

export default function MetaversePage() {
  const [form] = Form.useForm();
  const { user, setUser } = useContext(userContext);
  const [interacted, setInteracted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token && token !== "null") {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );

      console.log(JSON.parse(jsonPayload));

      setUser({ ...JSON.parse(jsonPayload), isGuest: true });
    }
  }, [searchParams]);

  const onSignAsGuestFinish = useCallback(async (values) => {
    setLoading(true);
    try {
      const {
        data: { data: user },
      } = await AuthService.loginAsGuest({
        username: values.userEmail,
      });
      localStorage.setItem("vverse-token", user.customerPortalAccessToken);
      setInteracted(true);
      setUser({ ...user, isGuest: true });
      axios.defaults.headers.authorization = user.customerPortalAccessToken;
      
    } catch (err) {
      setUser(null);
      if (err.response.status === 409) {
        notification.info({
          message: "User already exist, login to enter the dimension",
        });
        setInteracted(false);
      }
      if (err.response.status === 400) {
        notification.warning({
          message: "please, enter a valid Email",
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  if (!interacted && !user) {
    return (
      <main className="join-meet" style={{ background: `url(${joinBg})` }}>
        <div className="meet-blur">
          <div className="join-meet-main">
            <Row gutter={[0, 16]}>
              <Col xs={24}>
                <Row justify="center">
                  <Avatar src={defualtAvatar} className="join-meet-img" />
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
                        label="Enter Your Username"
                        className="w-100"
                        style={{ padding: "0 1rem" }}
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Your Username",
                          },
                        ]}>
                        <Input
                          style={{ background: "transparent" }}
                          placeholder="Enter Here"
                          type="text"
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
                          }}
                          loading={loading}>
                          Join Metaverse
                        </Button>
                      </Row>
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </Col>
            </Row>
          </div>
        </div>
      </main>
    );
  } else if (user) {
    return <MetaverseView />;
  }
}
