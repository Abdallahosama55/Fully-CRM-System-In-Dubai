import React, { useMemo, useState } from "react";
// style
import "./styles.css";
import { Button, Carousel, Col, Row, Typography } from "antd";
import { BreakfastSVG, GoogleMapsSVG } from "assets/jsx-svg";
import { Link, useNavigate } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import RatingBadge from "components/common/RatingBadge";
import MapDrawer from "components/common/MapDrawer";
import isValidJson from "utils/isValidJson";
import Description from "components/common/Description";
const HotelCard = ({ data, queryString, isLocalBook }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Parse images
  const images = useMemo(() => {
    let images = [];
    if (isValidJson(data?.images)) {
      images = JSON.parse(data?.images);
    } else if (typeof data?.images === "string") {
      images = data?.images.split(",").map((link, index) => ({ key: index, link }));
    }
    return images;
  }, [data?.images]);
  return (
    <div className="hotel_card_search">
      {open && Number(data?.lat) && Number(data?.lng) && (
        <MapDrawer
          open={open}
          onClose={() => setOpen(false)}
          center={[Number(data?.lat), Number(data?.lng)]}
          markerLocation={[Number(data?.lat), Number(data?.lng)]}
        />
      )}
      <Row gutter={[16, 16]}>
        {/* Images Column */}
        <Col className="hotel_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel
            dots={false}
            className="hotel_images_carousel"
            arrows
            infinite={false}
            lazyLoad="progressive">
            {images?.map((el) => (
              <img key={el.key} src={el.link} alt="hotel" className="hotel_image" loading="lazy" />
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
                  <RatingBadge rate={Number(data?.rate)} />
                </span>
              </p>
              {data.location && (
                <Typography.Paragraph ellipsis className="gc fz-12 fw-400 location_info">
                  {data?.location}
                </Typography.Paragraph>
              )}
              {data?.description && (
                <Description
                  readMoreInPopUp={true}
                  rows={4}
                  description={
                    isValidJson(data.description)
                      ? JSON.parse(data.description)?.find((el) => el?.name === "english")?.value
                      : data.description
                  }
                />
              )}
            </div>

            {/* Google Map Link and Metaverse */}
            <div className="google_map_link_box">
              {data?.lat && data?.lng && (
                <a onClick={() => setOpen(true)} className="google_map_link fz-14 fw-600">
                  <GoogleMapsSVG /> View on map
                </a>
              )}
            </div>

            {/* Cancellation and Breakfast Info */}
            <p className="pensions">
              {data?.isBreakfastOffered && (
                <span className="fz-12 fw-400 info_line" style={{ color: "#6B7280 " }}>
                  <BreakfastSVG /> Breakfast available
                </span>
              )}
            </p>
          </div>
        </Col>

        {/* Price and Book Now Column */}
        <Col xl={4} lg={4} md={6} xs={24}>
          <div className="price_section">
            <p className="fz-18 fw-700">
              ${data.amount || (Array.isArray(data?.Rooms) && data?.Rooms[0]?.TotalFare)}
            </p>

            <Button
              onClick={() => {
                if (isLocalBook) {
                  navigate(
                    ROUTER_URLS.TRAVEL.ACCOMMODATION.VIEW + "BOOK_FROM_LOCAL" + `${queryString}`,
                    { state: { tboData: data } },
                  );
                } else {
                  navigate(
                    ROUTER_URLS.TRAVEL.ACCOMMODATION.VIEW +
                      (data?.HotelCode || data?.id) +
                      queryString,
                  );
                }
              }}
              size="small"
              style={{ padding: "10px 25px" }}
              type="primary"
              className="book_now_btn">
              Book
            </Button>
            {data.metaverse && data.metaverse.length > 0 && (
              <Link to={ROUTER_URLS.METAVERSE.INDEX + "/" + data.metaverse[0]}>
                <Button size="small" type="default" className="book_now_btn">
                  Metaverse
                </Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HotelCard;
