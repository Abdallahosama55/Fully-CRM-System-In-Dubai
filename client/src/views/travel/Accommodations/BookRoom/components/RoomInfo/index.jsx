import { Carousel, Col, Row, Typography } from "antd";
import { ArrowRightSVG, CancelSVG, LeftArrow2SVG, LocationSVG2, RateStarSVG } from "assets/jsx-svg";
import React, { useMemo } from "react";
// style
import "./styles.css";
import BedSVG2 from "assets/jsx-svg/BedSVG2";
import isValidJson from "utils/isValidJson";
import defualt_image from "assets/images/default_image.png";
import Description from "components/common/Description";
const RoomInfo = ({ tboAccomodationInfo, rooms, totalPrice, accommodation }) => {
  const roomImages = useMemo(() => {
    let images = [];
    if (Array.isArray(rooms)) {
      rooms?.forEach((room) => {
        if (isValidJson(room?.images)) {
          const parsedImages = JSON.parse(room?.images);
          if (typeof parsedImages[0] === "object") {
            images = [...images, ...parsedImages];
          } else if (typeof parsedImages[0] === "string") {
            parsedImages?.map((image) => {
              images.push({ link: image, name: "image" });
            });
          }
        }
      });
    }

    if (tboAccomodationInfo?.images) {
      tboAccomodationInfo?.images?.split(",").forEach((image) => {
        if (typeof image === "string") images.push({ link: image, name: "image" });
      });
    }

    if (accommodation?.images) {
      if (isValidJson(accommodation?.images)) {
        images = [...images, ...JSON.parse(accommodation?.images)];
      } else if (typeof accommodation?.images === "string") {
        accommodation?.images?.split(",").forEach((image) => {
          if (typeof image === "string") images.push({ link: image, name: "image" });
        });
      } else if (Array.isArray(accommodation?.images)) {
        accommodation?.images?.forEach((image) => {
          if (typeof image === "string") images.push({ link: image, name: "image" });
        });
      }
    }
    return images;
  }, [rooms, tboAccomodationInfo, accommodation]);

  return (
    <div className="room_info">
      <Row gutter={[16, 16]}>
        <Col md={12} xs={24}>
          <Carousel
            arrows
            lazyLoad="progressive"
            nextArrow={
              <div>
                <ArrowRightSVG color={"#3A5EE3"} />
              </div>
            }
            prevArrow={
              <div>
                <LeftArrow2SVG color={"#3A5EE3"} />
              </div>
            }
            infinite={true}>
            {(roomImages && roomImages.length > 0 ? roomImages : [{ link: defualt_image }]).map(
              (image) => (
                <img
                  className="room_card_image"
                  src={image.link}
                  alt={image.name}
                  key={image.name}
                  loading="lazy"
                />
              ),
            )}
          </Carousel>
        </Col>
        <Col md={12} xs={24}>
          <div className="info_body">
            <div className="accommodation_data">
              <div className="title">
                <Typography.Title level={2} className="fz-32 fw-700">
                  {accommodation?.name || tboAccomodationInfo?.name}
                </Typography.Title>
                <span className="rate_stars">
                  {[
                    ...new Array(accommodation?.rate || Number(tboAccomodationInfo?.rate) || 0),
                  ].map((el, index) => (
                    <RateStarSVG key={index} />
                  ))}
                </span>
              </div>
              <div className="info_with_icon location">
                <div>
                  <LocationSVG2 fill="#697281" />
                </div>
                <Typography.Text ellipsis>
                  {accommodation?.location
                    ? accommodation?.location
                    : isValidJson(accommodation?.city)
                    ? `${JSON.parse(accommodation?.city)?.city} , ${
                        JSON.parse(accommodation?.city)?.country
                      }`
                    : isValidJson(tboAccomodationInfo?.city)
                    ? `${JSON.parse(tboAccomodationInfo?.city)?.city} , ${
                        JSON.parse(tboAccomodationInfo?.city)?.country
                      }`
                    : ""}
                </Typography.Text>
              </div>
              {rooms?.map((room, index) => (
                <div key={index}>
                  <div className="info_with_icon mt-1">
                    <BedSVG2 />
                    <Typography.Text ellipsis>
                      {room?.name}
                      {/* {room.type && <>({room.type})</>} */}
                    </Typography.Text>
                  </div>
                </div>
              ))}
              {Array.isArray(accommodation?.cancellationPolicy) &&
                accommodation?.cancellationPolicy[0]?.name && (
                  <div className="info_with_icon mt-1">
                    <CancelSVG />
                    <Typography.Text ellipsis>
                      Cancellation Policy:{" "}
                      <span className="cancellation fw-600 fz-14">
                        {accommodation?.cancellationPolicy[0]?.name}
                      </span>
                    </Typography.Text>
                  </div>
                )}
              {(accommodation?.description || tboAccomodationInfo?.description) && (
                <Description
                  rows={5}
                  description={
                    tboAccomodationInfo?.description
                      ? tboAccomodationInfo?.description
                      : isValidJson(accommodation?.description)
                      ? JSON.parse(accommodation?.description)?.find((el) => el?.name === "english")
                          ?.value
                      : accommodation?.description
                  }
                />
              )}
            </div>
            <div className="info_body-price_section">
              <span className="gc fz-12 fw-400">total</span>
              <Typography.Text className="fz-18 fw-700" ellipsis>
                {totalPrice} {accommodation?.currencyCode || "USD"}
              </Typography.Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RoomInfo;
