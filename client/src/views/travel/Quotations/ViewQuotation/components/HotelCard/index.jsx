import React, { useMemo, useState } from "react";
import { Button, Carousel, Col, Flex, message, Row, Tag, Tooltip, Typography } from "antd";
import RatingBadge from "components/common/RatingBadge";
import MapDrawer from "components/common/MapDrawer";
import Description from "components/common/Description";
// utils
import isValidJson from "utils/isValidJson";
// assets
import { BreakfastSVG, GoogleMapsSVG } from "assets/jsx-svg";
// style
import "./styles.css";
import dayjs from "dayjs";
import DeleteSVG from "assets/jsx-svg/Delete";
import useDeleteQuotationItem from "services/travel/quotation/Mutations/useDeleteQuotationItem";
const HotelCard = ({ data, onDeletItem = () => {}, isDeletable }) => {
  const [open, setOpen] = useState(false);
  console.log("data >> ", data);
  // MUTATUIONS
  const deleteQuotationItem = useDeleteQuotationItem({
    onSuccess: () => {
      message.success("Item deleted successfully");
      onDeletItem();
    },
    onError: (error) => {
      message?.error(error?.message || "something went wrong");
    },
  });

  const handelDelete = () => {
    deleteQuotationItem.mutate(data?.id);
  };

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

      {isDeletable && (
        <Tooltip title="Delete this item">
          <Button
            loading={deleteQuotationItem?.isPending}
            icon={<DeleteSVG color="currentColor" />}
            danger
            type="primary"
            className="table_action_button delete_quotation_item_button"
            onClick={handelDelete}
          />
        </Tooltip>
      )}

      <Row gutter={[16, 16]}>
        {/* Images Column */}
        <Col className="hotel_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel
            dots={false}
            className="hotel_images_carousel"
            arrows
            infinite={false}
            lazyLoad="true">
            {(() => {
              let images = data?.details?.hotelInfo?.images || data?.details?.hotelInfo?.Images;

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
        <Col xl={15} lg={14} md={18} xs={24}>
          <div className="hotel_card_view_quotation_info">
            <div>
              <p>
                <Flex align="center" justify="space-between" style={{ marginBottom: "0.5rem" }}>
                  <div>
                    <Typography.Text className="accomdation_name fz-18 fw-700" ellipsis level={4}>
                      {data?.details?.hotelInfo?.name || data?.details?.hotelInfo?.HotelName}
                    </Typography.Text>
                    {(data?.details?.hotelInfo?.rate || data?.details?.hotelInfo?.HotelRating) && (
                      <span className="rate_stars">
                        <RatingBadge
                          rate={Number(
                            data?.details?.hotelInfo?.rate || data?.details?.hotelInfo?.HotelRating,
                          )}
                        />
                      </span>
                    )}
                  </div>
                  <Tag color="purple">2 Rooms</Tag>
                </Flex>
              </p>
              {(data?.details?.hotelInfo?.location ||
                data?.details?.hotelInfo?.Address ||
                data?.details?.hotelInfo?.city) && (
                <Typography.Paragraph ellipsis className="gc fz-12 fw-400 location_info">
                  {data?.details?.hotelInfo?.location ||
                    data?.details?.hotelInfo?.Address ||
                    (isValidJson(data?.details?.hotelInfo?.city)
                      ? JSON.parse(data?.details?.hotelInfo?.city)?.city
                      : data?.details?.hotelInfo?.city)}
                </Typography.Paragraph>
              )}

              <p className="fz-12 fw-500">
                {data?.departureDate ? "Booking dates from" : "Booking date"} (
                {dayjs(data?.arrivalDate).format("DD, MMM YYYY")})
                {data?.departureDate &&
                  ` To (${dayjs(data?.departureDate).format("DD, MMM YYYY")})`}
              </p>
              {(data?.details?.hotelInfo?.description ||
                data?.details?.hotelInfo?.ShortDescription) && (
                <Description
                  readMoreInPopUp={true}
                  rows={4}
                  description={(() => {
                    if (isValidJson(data?.details?.hotelInfo?.description)) {
                      return JSON.parse(data?.details?.hotelInfo?.description)?.find(
                        (el) => el?.name === "english",
                      )?.value;
                    }

                    return (
                      data?.details?.hotelInfo?.description ||
                      data?.details?.hotelInfo?.ShortDescription
                    );
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
              {data?.details?.hotelInfo?.isBreakfastOffered && (
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
              $
              {data?.totalGroupPrice?.toFixed(2)?.toLocaleString() ||
                data?.price?.toFixed(2)?.toLocaleString()}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HotelCard;
