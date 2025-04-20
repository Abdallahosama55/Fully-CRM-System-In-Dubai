import React, { useState } from "react";
// style
import "./styles.css";
import { Button, Carousel, Col, Row, Typography } from "antd";
import { BreakfastSVG, CheckSVG, GoogleMapsSVG } from "assets/jsx-svg";
import { Link } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import RatingBadge from "components/common/RatingBadge";
import MapDrawer from "components/common/MapDrawer";
import CLIENT_ROUTER_URLS from "constants/CLIENT_ROUTER_URLS";
const HotelCard = ({ data, queryString }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hotel_card_search">
      <MapDrawer
        open={open}
        onClose={() => setOpen(false)}
        center={[data?.lat, data?.lng]}
        markerLocation={[data?.lat, data?.lng]}
      />
      <Row gutter={[16, 16]}>
        {/* Images Column */}
        <Col className="hotel_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel dots={false} className="hotel_images_carousel" arrows infinite={false}>
            {JSON.parse(data?.images).map((el) => (
              <img
                key={el.key}
                src={el?.link}
                alt="hotel"
                className="hotel_image"
              />
            ))}
          </Carousel>
        </Col>

        {/* Info Column */}
        <Col xl={15} lg={14} md={18} xs={24}>
          <div className="hotel_card_search_info">
            <div>
              <p>
                <Typography.Text className="accomdation_name fz-18 fw-700" ellipsis level={4}>
                  {data?.name}
                </Typography.Text>
                <span className="rate_stars">
                  <RatingBadge rate={data?.rate} />
                </span>
              </p>
              <Typography.Paragraph
                ellipsis
                className="gc fz-12 fw-400 location_info"
              >
                {data?.location}
              </Typography.Paragraph>
            </div>

            {/* Google Map Link and Metaverse */}
            <div className="google_map_link_box">
              <a
                onClick={() => setOpen(true)}
                className="google_map_link fz-14 fw-600"
              >
                <GoogleMapsSVG /> View on map
              </a>
            </div>

            {/* Cancellation and Breakfast Info */}
            <p className="pensions">
              <span className="fz-12 fw-400 info_line">
                <CheckSVG color="#00AA34" /> Free cancellation available
              </span>
              {data?.isBreakfastOffered && (
                <span
                  className="fz-12 fw-400 info_line"
                  style={{ color: "#6B7280 " }}
                >
                  <BreakfastSVG /> Breakfast available
                </span>
              )}
            </p>
          </div>
        </Col>

        {/* Price and Book Now Column */}
        <Col xl={4} lg={4} md={6} xs={24}>
          <div className="price_section">
            <p className="fz-18 fw-700">${data.amount}</p>
            <Link to={CLIENT_ROUTER_URLS.BOOKING.VIEW_HOTEL + data?.id + queryString}>
              <Button size="small" style={{ padding: "10px 25px" }} type="primary" className="book_now_btn">
                Book
              </Button>
            </Link>
            {data.metaverse && data.metaverse.length > 0 &&
              <Link to={ROUTER_URLS.METAVERSE.INDEX + "/" + data.metaverse[0]}>
                <Button size="small" type="default" className="book_now_btn">
                  Metaverse
                </Button>
              </Link>
            }
          </div>
        </Col>
      </Row>
    </div>

  );
};

export default HotelCard;
