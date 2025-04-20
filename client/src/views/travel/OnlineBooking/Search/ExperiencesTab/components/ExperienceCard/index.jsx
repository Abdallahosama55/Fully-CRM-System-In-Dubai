import React, { useState } from "react";
import { Button, Carousel, Col, Image, Row, Tooltip, Typography } from "antd";
import { GoogleMapsSVG } from "assets/jsx-svg";
import { Link } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { PASSENGER_PRICE_TYPE } from "constants/EXPERIENCE";
import SvgImage from "components/common/SvgImage";
// style
import "./styles.css";
import MapDrawer from "components/common/MapDrawer";

const ExperienceCard = ({ query, experience }) => {
  const [openMap, setOpenMap] = useState();
  return (
    <div className="experience_card_search w-100">
      <MapDrawer
        open={openMap}
        onClose={() => setOpenMap(false)}
        center={[experience?.lat, experience?.lng]}
        markerLocation={[experience?.lat, experience?.lng]}
      />

      <Row gutter={16}>
        <Col className="experience_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel
            loading="lazy"
            draggable
            dots={false}
            className="experience_images_carousel"
            arrows
            infinite={false}>
            {experience?.images?.map((el) => (
              <Image
                preview={false}
                loading="lazy"
                key={el.id}
                src={el?.url}
                alt="experience"
                className="experience_image"
              />
            ))}
          </Carousel>
        </Col>
        <Col xl={15} lg={14} md={18} xs={24}>
          <div className="experience_card_search_info">
            <div>
              <div className="experience_card_head_line space-between">
                <Typography.Text
                  className="experience_name fz-16 fw-700"
                  ellipsis={{
                    rows: 2,
                    expandable: false,
                  }}
                  level={4}>
                  {experience?.title}
                </Typography.Text>
                <div className="experience_card_theme_imgs">
                  {experience.productThemes.map((el) => (
                    <Tooltip key={el.id} title={el.name}>
                      <SvgImage className="experience_card_theme_img" svgContent={el.image} />
                    </Tooltip>
                  ))}
                </div>
              </div>
              <Typography.Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: false,
                }}
                className="fz-12 fw-400 gc"
                style={{ color: "#313342" }}>
                {experience?.location}
              </Typography.Paragraph>
            </div>
            <div className="google_map_link_box items-center">
              <a className="google_map_link fz-14 fw-600" onClick={() => setOpenMap(true)}>
                <GoogleMapsSVG /> View on map
              </a>
            </div>
            <div>
              <Typography.Paragraph
                ellipsis={{
                  rows: 3,
                  expandable: false,
                }}
                className="fz-12 fw-400 gc"
                style={{ color: "#313342" }}>
                {experience?.shortDescription}
              </Typography.Paragraph>
            </div>
          </div>
        </Col>
        <Col xl={4} lg={4} md={6} xs={24}>
          <div className="price_section">
            <p className="fz-18 fw-700" style={{ marginBottom: "0" }}>
              ${experience.finalPrice}
            </p>
            <p className="fz-14 fw-500">
              {experience.priceType === PASSENGER_PRICE_TYPE.PER_PERSON
                ? "Per person"
                : "Per booking"}
            </p>
            {experience.freeSeats && (
              <p className="fz-14 fw-500 rooms_left">{experience.freeSeats} Seats Left</p>
            )}
            <Link to={ROUTER_URLS.TRAVEL.EXPERIANCES.VIEW + experience?.bookingKey + query}>
              <Button
                size="small"
                type="primary"
                style={{ marginTop: experience.freeSeats ? "" : "8px", padding: "10px 30px" }}>
                Book
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExperienceCard;
