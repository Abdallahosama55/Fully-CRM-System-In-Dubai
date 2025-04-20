import { Row, Col, Tooltip, Typography } from "antd";
import {
  CalendarSVG,
  CinemaSVG,
  ClockSVG,
  DocumentSVG,
  ImagesSVG,
  SoundWavesSVG,
  OverlaySVG,
} from "assets/jsx-svg";
import dayjs from "dayjs";

export default function MediaListItem({ media, setDragedMedia }) {
  const { createdAt, file, id, image, name, type } = media;

  const createdTime = dayjs(createdAt).format("HH:mm a");
  const createdDate = dayjs(createdAt).format("ddd DD, YYYY");

  const ICONS_MAP = {
    video: {
      icon: <CinemaSVG />,
      className: "video",
    },
    image: {
      icon: <ImagesSVG />,
      className: "image",
    },
    audio: {
      icon: <SoundWavesSVG />,
      className: "audio",
    },
    overlay: {
      icon: <OverlaySVG width={12} height={12} />,
      className: "overlay",
    },
  };

  const isImage = type == "image";
  const url = isImage ? `url(${file})` : image ? `url(${image})` : undefined;

  return (
    <Col key={id} xs={24}>
      <div
        draggable
        onDragStart={() => setDragedMedia(media)}
        onDragEnd={() => setDragedMedia(null)}>
        <Row className="media-list-item">
          <Col>
            <div
              className={`media-list-icon ${ICONS_MAP[type]?.className || "document"}`}
              style={{
                backgroundImage: url,
                backgroundSize: "covor",
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
              }}>
              {url ? null : ICONS_MAP[type]?.icon || <DocumentSVG />}
            </div>
          </Col>
          <Col flex={1} style={{ maxWidth: "70%" }}>
            <Row>
              <Col xs={24} style={{ marginBottom: 8 }}>
                <Tooltip title={name}>
                  <Typography.Text strong ellipsis>
                    {name}
                  </Typography.Text>
                </Tooltip>
              </Col>
              <Col xs={12}>
                <Typography.Text
                  style={{
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                  <ClockSVG />
                  {createdTime}
                </Typography.Text>
              </Col>
              <Col xs={12}>
                <Typography.Text
                  style={{
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                  <CalendarSVG />
                  {createdDate}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
