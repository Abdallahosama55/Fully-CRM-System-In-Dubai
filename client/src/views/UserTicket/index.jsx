import { Col, Image, Row } from "antd";
import TicketView from "views/HelpDesk/TicketView";

import logo from "assets/svgs/LogoSVG.svg";
import "./styles.css";

export default function UserTicket() {
  return (
    <Row className="user-tickit-view">
      <Col xs={24}>
        <Row justify="center" className="logo-image">
          <Image src={logo} preview={false} width={99} height={40} />
        </Row>
      </Col>
      <TicketView fromUser={true} />
    </Row>
  );
}
