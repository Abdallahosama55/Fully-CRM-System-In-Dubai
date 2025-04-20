import { CameraOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Typography } from "antd";
import defualtAvatar from "assets/images/defualtAvatar.png";
import { ClockSVG2 } from "assets/jsx-svg";
import { useMemo } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";

const BookingInformation = ({ deskInfo }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const textColor = queryParams.get("textColor") || "#272944";

  const duration = useMemo(() => {
    let times = "0h 0m";

    const minutes = deskInfo?.desk?.duration ?? 30;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      times = `${hours}h ${remainingMinutes}m`;
    } else if (hours > 0) {
      if (hours == 1) {
        times = `${hours} hour`;
      } else {
        times = `${hours} hours`;
      }
    } else {
      times = `${remainingMinutes} min`;
    }

    return times;
  }, [deskInfo]);

  return (
    <Row className="d-flex align-center w-100" gutter={[20, 20]}>
      <Col xs={24}>
        <Typography.Text className="topic-title">{deskInfo?.desk?.name}</Typography.Text>
      </Col>

      {deskInfo?.employee?.account && (
        <>
          <Col xs={3} className="d-flex flex-1 justify-center">
            <Avatar
              style={{ display: "flex", flex: "none" }}
              src={deskInfo?.employee?.account?.profileImage || defualtAvatar}
            />
          </Col>
          <Col xs={21}>
            <Typography>{deskInfo?.employee?.account?.fullName}</Typography>
          </Col>
        </>
      )}

      <Col xs={3} className="d-flex justify-center">
        <ClockSVG2 color={textColor} />
      </Col>
      <Col xs={21}>
        <Typography>{duration}</Typography>
      </Col>
      <Col xs={3} className="d-flex justify-center" style={{ display: "none" }}>
        <CameraOutlined style={{ fontSize: 16, color: textColor }} />
      </Col>
      <Col xs={21} style={{ display: "none" }}>
        <Typography>Web conferencing details provided upon confirmation</Typography>
      </Col>
      <Col
        xs={3}
        className="d-flex justify-center"
        style={{ display: !deskInfo?.desk?.description ? "none" : "inherit" }}>
        <InfoCircleOutlined style={{ fontSize: 16, color: textColor }} />
      </Col>
      <Col xs={21} style={{ display: !deskInfo?.desk?.description ? "none" : "inherit" }}>
        <Typography>{deskInfo?.desk?.description}</Typography>
      </Col>
    </Row>
  );
};

export default BookingInformation;
