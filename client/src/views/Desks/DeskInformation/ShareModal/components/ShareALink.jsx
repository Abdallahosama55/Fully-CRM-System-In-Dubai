import { Button, Card, Col, Input, Row, Space, Typography, message } from "antd";
import "../styles.css";

const ShareALink = ({ deskId }) => {
  const meetingLink = `${window.location.origin}/web-widget/schedule-call${
    deskId ? "?desk_id=" + deskId : ""
  }`;

  const handleCopyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
    message.success("Link Copied Successfully");
  };

  return (
    <Row gutter={[0, 20]}>
      <Col xs={24}>
        <Card>
          <Space size="small" direction="vertical" className="w-100">
            <Typography className="fz-14 fw-500">Direct link</Typography>
            <Typography className="fz-14 description">
              Copy and paster your scheduling link
            </Typography>
            <div className="d-flex align-center" style={{ gap: 8 }}>
              <Input type="text" value={meetingLink} disabled style={{ flex: 1 }} />
              <Button onClick={handleCopyMeetingLink}>Copy</Button>
            </div>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default ShareALink;
