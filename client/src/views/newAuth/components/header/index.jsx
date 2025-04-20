import { Button, Image, Layout } from "antd";
import { Link } from "react-router-dom";
import vbooking_logos_and_tags from "../../../../assets/images/vbooking logos + tags.png";
import { useCompanyInfoContext } from "context/companyInfoContext";

import "./styles.css";

const { Header } = Layout;
const RegistrationHeader = () => {
  const { image } = useCompanyInfoContext();

  return (
    <Header className="registration-header">
      <Image src={image || vbooking_logos_and_tags} preview={false} height={48} />
      <div className="buttons">
        <Link style={{ lineHeight: "0" }} to="/registration">
          <Button shape="round" className="register-button">
            Register
          </Button>
        </Link>
        <Link style={{ lineHeight: "0" }} to="/vbooking-login">
          <Button shape="round" className="login-button">
            Login
          </Button>
        </Link>
      </div>
    </Header>
  );
};

export default RegistrationHeader;
