import { Button, Col, Row, Typography, message } from "antd";
import DoneImage from "assets/images/done_success.png";
import "./styles.css";

export default function BookingSuccess({ bookingData }) {
  const handleCopyMeetingLink = async () => {
    await navigator.clipboard.writeText(bookingData.link);
    message.info("Link successfully copied");
  };

  return (
    <Row className="flex-column" gutter={[0, 24]}>
      <Col xs={24} className="d-flex justify-center">
        <img src={DoneImage} width={240} />
      </Col>
      <Col xs={24} className="d-flex align-center flex-column">
        <Typography className="fz-14">
          Thank you for scheduling your call with us! We appreciate
        </Typography>
        <Typography>your time and look forward to speaking with you.</Typography>
      </Col>
      <Col xs={24} className="d-flex align-center flex-column">
        <Typography.Link style={{ border: "1px dashed lightblue", padding: 10 }}>
          {bookingData.link}
        </Typography.Link>
      </Col>
      <Col xs={24}>
        <Button type="primary" className="w-100" onClick={handleCopyMeetingLink}>
          Copy Meeting Link
        </Button>
      </Col>
    </Row>
  );
}
