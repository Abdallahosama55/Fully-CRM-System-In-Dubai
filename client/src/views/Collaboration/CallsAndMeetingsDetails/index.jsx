import { Col, Row, Typography } from "antd";
import { EditSVG } from "assets/jsx-svg";

import house from "assets/images/house.png";
import noVerse from "assets/svgs/meetingBg.svg";
import { LoadingOutlined } from "@ant-design/icons";
import CallsAndMeetingsAdd from "../CallsAndMeetingsAdd";
import CallsAndMeetingsDetailsBody from "./CallsAndMeetingsDetailsBody";
import "./styles.css";
import useGetMeetingById from "services/meetings/Querys/useGetMeetingById";

export default function CallsAndMeetingsDetails({ id , DrawerAPI}) {

  const {
    data: callDetails,
    isPending: fetchLoading,
    isError,
  } = useGetMeetingById(id, {
    select: (data) => data.data.data,
  });

  if (fetchLoading) {
    return (
      <Row justify="center">
        <LoadingOutlined />
      </Row>
    );
  }
  if (isError) {
    return "Error";
  }
  return (
    <section className="calls-meetings-details">
      <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col>
          <Typography.Title level={4}>Meeting Details “#{callDetails.id}”</Typography.Title>
        </Col>
        <Col>
          <Row
            align="middle"
            gutter={[8, 0]}
            wrap={false}
            className="clickable"
            onClick={() => {
              DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd id={id} DrawerAPI={DrawerAPI} />);
              DrawerAPI.open("40%");
            }}>
            <Col>
              <Row align="middle">
                <EditSVG />
              </Row>
            </Col>
            <Col>
              <Typography.Text className="fw-500">EDIT</Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="meeting-details-main">
        {callDetails.dimensionId ? (
          <div
            className="meeting-details-header"
            style={{
              backgroundImage: `url(${callDetails.dimensionId ? callDetails.customerDimension?.image || house : noVerse
                })`,
              backgroundPosition: callDetails.dimensionId ? "center" : "0px -32px",
            }}>
            {callDetails.dimensionId && (
              <div className="meeting-details-header-verse">
                {callDetails.dimensionId ? callDetails?.customerDimension?.name : ""}
              </div>
            )}
          </div>
        ) : (
          <img
            style={{
              top: "-2px",
              height: "120px",
              objectFit: "cover",
              width: "100%",
              position: "relative",
            }}
            src={noVerse}></img>
        )}

        <CallsAndMeetingsDetailsBody callDetails={callDetails} setCallDetails={() => { }} id={id} />
      </div>
    </section>
  );
}
