import { useEffect, useState } from "react";
import { Col, Image, Row, Typography, Tabs } from "antd";
import { useSearchParams } from "react-router-dom";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import SetPassword from "./SetPassword";
import VerificationCode from "./VerificationCode";
import NewPassword from "./NewPassword";
import SignupEmployee from "./SignupEmployee";
import LoginEmployee from "./LoginEmployee";
import useGetCompanyInfo from "services/companyInfo/Queries/useGetCompanyInfo";
// style
import "./style.css";
// images
import loginImg from "assets/images/login.jpg";
import Invitation from "./Invitation";
export default function LoginView({ active = "login" }) {
  const [activeTab, setActiveTab] = useState(active);
  const [searchParam] = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const companyInfoQuery = useGetCompanyInfo();
  useEffect(() => {
    if (searchParam.get("tab") === "setpassword") {
      setActiveTab("setpassword");
    } else if (searchParam.get("tab") === "verification") {
      setActiveTab("verification");
    }
  }, [searchParam]);

  return (
    <Row className="auth-view">
      <Col
        xs={0}
        lg={14}
        className="auth-view-image"
        style={{
          background: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></Col>
      <Col
        xs={24}
        lg={10}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          justifyContent: "center",
        }}
        className={`${activeTab === "1" || activeTab === "2" ? "" : "center-items"}`}>
        <div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Image
              style={{ maxWidth: "180px", objectFit: "contain" }}
              preview={false}
              src={companyInfoQuery?.data?.image}
              height={55}
              alt="logo"
              loading="lazy"
            />
          </div>

          {activeTab === "login" && (
            <Typography.Text className="fw-500">
              Login to {companyInfoQuery?.data?.name} Dashboard
            </Typography.Text>
          )}
          <div className="login-card" style={{ margin: "auto" }}>
            {(activeTab === "1" || activeTab === "2") && (
              <Tabs centered={true} activeKey={activeTab} onChange={(e) => setActiveTab(e)}>
                <Tabs.TabPane
                  tab={
                    <Typography.Text ellipsis className="fz-18">
                      SIGN IN
                    </Typography.Text>
                  }
                  // style={{ width: "fit-content" }}
                  key="1">
                  <LoginEmployee setActiveTab={setActiveTab} />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab={
                    <Typography.Text ellipsis className="fz-18">
                      SIGN UP
                    </Typography.Text>
                  }
                  // style={{ width: "fit-content" }}
                  key="2">
                  <SignupEmployee setActiveTab={setActiveTab} />
                </Tabs.TabPane>
              </Tabs>
            )}
            {activeTab === "login" && <Login setActiveTab={setActiveTab} />}

            {activeTab === "forgotPassword" && (
              <ForgotPassword setActiveTab={setActiveTab} setEmail={setEmail} />
            )}
            {activeTab === "join-company" && (
              <Invitation
                companyName={companyInfoQuery?.data?.name}
                setActiveTab={setActiveTab}
                setEmail={setEmail}
              />
            )}
            {activeTab === "setpassword" && (
              <SetPassword setActiveTab={setActiveTab} email={email} />
            )}
            {activeTab === "newPassword" && (
              <NewPassword setActiveTab={setActiveTab} code={code} email={email} />
            )}
            {activeTab === "verification" && (
              <VerificationCode setActiveTab={setActiveTab} email={email} setCode={setCode} />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}
