import { Col, Row, Typography } from "antd";
import Chat from "views/StudioLivePage/LiveLeftSide/Chat";

import "./styles.css";

export default function SpeakersContent() {
  return (
    <Row gutter={[16, 0]} className="speakers-content">
      <Col xs={12}>
        <Chat fromContent />
      </Col>
      <Col xs={12}>
        <div className="speaker-drive-panel">
          <Typography.Text className="fz-18 fw-600">Drive</Typography.Text>
        </div>
      </Col>
    </Row>
  );
}
