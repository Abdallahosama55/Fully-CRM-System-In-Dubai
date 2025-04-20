import { UserOutlined } from "@ant-design/icons";
import { Form, Menu } from "antd";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import GuestForm from "./GuestForm";

const items = [
  {
    label: "Login",
    key: "login",
  },
  {
    label: "Sign Up",
    key: "signUp",
  },
  {
    label: "Guest",
    key: "guest",
    icon: <UserOutlined />,
  },
];

const MetaverseLoginView = ({ isLoading, onLogin, onVerify, onLoginAsGuest }) => {
  const [currentTab, setCurrentTab] = useState("login");
  const [isVerifing, setIsVerifing] = useState(false);

  const onChangeTab = (e) => {
    setCurrentTab(e.key);
  };

  return (
    <div>
      {!isVerifing && (
        <Menu
          className="login-tabs"
          onClick={onChangeTab}
          selectedKeys={[currentTab]}
          mode="horizontal"
          items={items}
        />
      )}
      {currentTab === "login" && <LoginForm isLoading={isLoading} onLogin={onLogin} />}
      {currentTab === "signUp" && (
        <SignUpForm onVerify={onVerify} isVerifing={isVerifing} setIsVerifing={setIsVerifing} />
      )}
      {currentTab === "guest" && <GuestForm isLoading={isLoading} onLogin={onLoginAsGuest} />}
    </div>
  );
};

export default MetaverseLoginView;
