import React, { useMemo, useState } from "react";
import { Button, Carousel, Col, Row, Tooltip, Typography } from "antd";
import RatingBadge from "components/common/RatingBadge";
import MapDrawer from "components/common/MapDrawer";
import Description from "components/common/Description";
// utils
import isValidJson from "utils/isValidJson";
// assets
import { BreakfastSVG, ChevronLeftSVG, GoogleMapsSVG } from "assets/jsx-svg";
// style
import "./styles.css";
const ViewRoomsHotelCard = ({
  data,
  onBackToSearchClicked = () => {},
  isAddItemCard,
  onAddViewRoomsClicked,
}) => {
  const [open, setOpen] = useState(false);
  // MUTATUIONS
  const latLng = useMemo(() => {
    if (data?.details?.lat && data?.details?.lng) {
      return [Number(data?.details?.lat), Number(data?.details?.lng)];
    }

    if (data?.lat && data?.lng) {
      return [Number(data?.lat), Number(data?.lng)];
    }

    if (data?.details?.Map && Array.isArray(data?.details?.Map?.split("|"))) {
      return [Number(data?.details?.Map?.split("|")[0]), Number(data?.details?.Map?.split("|")[1])];
    }

    if (data?.Map && Array.isArray(data?.Map?.split("|"))) {
      return [Number(data?.details?.Map?.split("|")[0]), Number(data?.details?.Map?.split("|")[1])];
    }

    return undefined;
  }, [data?.Map, data?.details?.Map, data?.lat, data?.lng, data?.details?.lat, data?.details?.lng]);

  return (
    <div className="hotel_card_view_quotation">
      {open && latLng && (
        <MapDrawer
          open={open}
          onClose={() => setOpen(false)}
          center={latLng}
          markerLocation={latLng}
        />
      )}
      <Row gutter={[16, 16]}>
        {/* Images Column */}
        <Col className="hotel_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel dots={false} className="hotel_images_carousel" arrows infinite={false}>
            {(() => {
              let images = data?.images || data?.images;

              return isValidJson(images) ? (
                JSON.parse(images).map((el) => (
                  <img
                    key={el.key}
                    src={el?.link}
                    alt="hotel"
                    className="hotel_image"
                    loading="lazy"
                  />
                ))
              ) : typeof images === "string" ? (
                images
                  ?.split(",")
                  .map((el) => (
                    <img key={el} loading="lazy" src={el} alt="hotel" className="hotel_image" />
                  ))
              ) : (
                <></>
              );
            })()}
          </Carousel>
        </Col>

        {/* Info Column */}
        <Col
          xl={isAddItemCard ? 15 : 19}
          lg={isAddItemCard ? 14 : 18}
          md={isAddItemCard ? 18 : 24}
          xs={24}>
          <div className="hotel_card_view_quotation_info">
            <div>
              <p>
                <Typography.Text className="accomdation_name fz-18 fw-700" ellipsis level={4}>
                  {data?.name}
                </Typography.Text>
                <span className="rate_stars">
                  <RatingBadge
                    rate={Number(
                      data?.details?.rate ||
                        data?.rate ||
                        data?.details?.HotelRating ||
                        data?.HotelRating,
                    )}
                  />
                </span>
              </p>
              {(data?.details?.location ||
                data?.location ||
                data?.details?.Address ||
                data?.Address ||
                data?.city) && (
                <Typography.Paragraph ellipsis className="gc fz-12 fw-400 location_info">
                  {data?.details?.location ||
                    data?.location ||
                    data?.details?.Address ||
                    data?.Address ||
                    (isValidJson(data?.city) ? JSON.parse(data?.city)?.city : data?.city)}
                </Typography.Paragraph>
              )}
              {(data?.description || data?.ShortDescription) && (
                <Description
                  readMoreInPopUp={true}
                  rows={4}
                  description={(() => {
                    if (isValidJson(data?.description)) {
                      return JSON.parse(data?.description)?.find((el) => el?.name === "english")
                        ?.value;
                    }

                    return data?.description || data?.ShortDescription;
                  })()}
                />
              )}
            </div>

            {/* Google Map Link and Metaverse */}
            <div className="google_map_link_box">
              {latLng && (
                <a onClick={() => setOpen(true)} className="google_map_link fz-14 fw-600">
                  <GoogleMapsSVG /> View on map
                </a>
              )}
            </div>

            {/* Cancellation and Breakfast Info */}
            <p className="pensions">
              {(data?.details?.isBreakfastOffered || data?.isBreakfastOffered) && (
                <span className="fz-12 fw-400 info_line" style={{ color: "#6B7280 " }}>
                  <BreakfastSVG /> Breakfast available
                </span>
              )}
            </p>
          </div>
        </Col>
        {isAddItemCard ? (
          <Col xl={4} lg={4} md={6} xs={24}>
            <div className="price_section">
              <p className="fz-18 fw-700">
                $
                {data?.price ||
                  data?.amount ||
                  (Array.isArray(data?.Rooms) &&
                    data?.Rooms?.length > 0 &&
                    data?.Rooms[0]?.TotalFare)}
              </p>
              <Button type="primary" size="small" onClick={onAddViewRoomsClicked}>
                View Rooms
              </Button>
            </div>
          </Col>
        ) : (
          <Tooltip title={"Go Back"}>
            <Button
              type="primary"
              className="back_to_search_button"
              size="small"
              onClick={onBackToSearchClicked}
              icon={<ChevronLeftSVG />}
            />
          </Tooltip>
        )}
      </Row>
    </div>
  );
};

export default ViewRoomsHotelCard;
