import { Image, Row } from "antd";
import successIcon from "assets/success-icon.gif";

const SuccessIcon = (props) => {
  return (
    <Row
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        backgroundColor: "white",
      }}
      className="center-items">
      <Image preview={false} src={successIcon} />
      <div hidden={!props.msg}>
         <h1>{props.msg}</h1>
      </div>
    </Row>
  );
};

export default SuccessIcon;
