import React, { useState } from "react";
// style
import "./styles.css";
import { Button, Carousel, Col, Row, Tooltip, Typography } from "antd";
import { BreakfastSVG, CheckSVG, GoogleMapsSVG } from "assets/jsx-svg";
import RatingBadge from "components/common/RatingBadge";
import MapDrawer from "components/common/MapDrawer";
import isValidJson from "utils/isValidJson";
import default_image from "assets/images/default_image.png";

const HotelCard = ({
  data,
  isMultiple = false,
  isSelected,
  onSelect = () => {},
  onAdd = () => {},
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="hotel_card_search">
      {data?.lat && data?.lng && (
        <MapDrawer
          open={open}
          onClose={() => setOpen(false)}
          center={[data?.lat, data?.lng]}
          markerLocation={[data?.lat, data?.lng]}
        />
      )}
      <Row gutter={[16, 16]}>
        {/* Images Column */}
        <Col className="hotel_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel dots={false} className="hotel_images_carousel" arrows infinite={false}>
            {isValidJson(data?.images) ||
            Array?.isArray(JSON.parse(data?.images)) ||
            JSON.parse(data?.images)?.length === 0 ? (
              JSON.parse(data?.images).map((el) => (
                <img key={el?.key} src={el?.link} alt="hotel" className="hotel_image" />
              ))
            ) : (
              <img src={default_image} alt="hotel" className="hotel_image" />
            )}
          </Carousel>
        </Col>

        {/* Info Column */}
        <Col xl={15} lg={14} md={18} xs={24}>
          <div className="hotel_card_search_info">
            <div>
              <Typography.Text className="accomdation_name fz-18 fw-700" ellipsis level={4}>
                {data?.accommodationName}
              </Typography.Text>
              <p>
                <Typography.Text className="accomdation_name fz-14 fw-500" ellipsis level={5}>
                  {data?.name} {data?.type && `( ${data?.type} )`}
                </Typography.Text>
                <span className="rate_stars">
                  <RatingBadge rate={data?.rate} />
                </span>
              </p>
              <Typography.Paragraph ellipsis className="gc fz-12 fw-400 location_info">
                {data?.location}
              </Typography.Paragraph>
            </div>

            {/* Google Map Link and Metaverse */}
            <div className="google_map_link_box">
              <a onClick={() => setOpen(true)} className="google_map_link fz-14 fw-600">
                <GoogleMapsSVG /> View on map
              </a>
            </div>

            {/* Cancellation and Breakfast Info */}
            <p className="pensions">
              <span className="fz-12 fw-400 info_line">
                <CheckSVG color="#00AA34" /> Free cancellation available
              </span>
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
              ${data?.rates[Math.floor(Math.random() * 2)]?.amountWithPromotion}
            </p>
            <Button
              onClick={() => {
                if (Array.isArray(data?.rates) && data?.rates?.length > 0) {
                  if (isMultiple) {
                    onSelect({
                      ...data,
                      rates: data?.rates.map((rate, index) => {
                        return {
                          ...rate,
                          isDefaultPension: index === 0,
                        };
                      }),
                    });
                  } else {
                    onAdd({
                      ...data,
                      rates: data?.rates.map((rate, index) => {
                        return {
                          ...rate,
                          isDefaultPension: index === 0,
                        };
                      }),
                    });
                  }
                }
              }}
              size="small"
              type="primary"
              style={{ padding: "1rem" }}
              disabled={isMultiple ? isSelected : false}
              className="book_now_btn fz-12 fw-700">
              {isMultiple ? "Select" : "Add to Library"}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HotelCard;
