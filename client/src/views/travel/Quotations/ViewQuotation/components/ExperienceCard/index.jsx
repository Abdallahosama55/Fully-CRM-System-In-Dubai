import React, { useState } from "react";
import { Button, Carousel, Col, Flex, message, Row, Tooltip, Typography } from "antd";
import { DeleteSVG, GoogleMapsSVG } from "assets/jsx-svg";
import { PASSENGER_PRICE_TYPE } from "constants/EXPERIENCE";
import SvgImage from "components/common/SvgImage";
import MapDrawer from "components/common/MapDrawer";
// style
import "./styles.css";
import dayjs from "dayjs";
import useAddToQuotation from "services/travel/quotation/Mutations/useAddToQuotation";
import { useParams } from "react-router-dom";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import useDeleteQuotationItem from "services/travel/quotation/Mutations/useDeleteQuotationItem";

const ExperienceCard = ({
  data,
  isDeletable,
  isAddItemCard,
  onViewSessionsClicked,
  onDeletItem,
  isBackToSearch,
  onBackToSearchClicked,
}) => {
  const [openMap, setOpenMap] = useState();
  const { id } = useParams();
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


  return (
    <div className="experience_card_view_quotation w-100">
      <MapDrawer
        open={openMap}
        onClose={() => setOpenMap(false)}
        center={[data?.details?.lat || data?.lat, data?.details?.lng || data?.lng]}
        markerLocation={[data?.details?.lat || data?.lat, data?.details?.lng || data?.lng]}
      />
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
      <Row gutter={16}>
        <Col className="experience_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel dots={false} className="experience_images_carousel" arrows infinite={false}>
            {!isAddItemCard &&
              data?.details?.images?.map((el) => (
                <img key={el.id} src={el?.url} alt="experience" className="experience_image" />
              ))}
            {isAddItemCard &&
              data?.images?.map((el) => (
                <img key={el.id} src={el?.url} alt="experience" className="experience_image" />
              ))}
          </Carousel>
        </Col>
        <Col xl={15} lg={14} md={18} xs={24}>
          <div className="experience_card_view_quotation_info">
            <div>
              <div className="experience_card_head_line space-between">
                <Typography.Text
                  className="experience_name fz-16 fw-700"
                  ellipsis={{
                    rows: 2,
                    expandable: false,
                  }}
                  level={4}>
                  {data?.name || data?.title}
                </Typography.Text>
                <div className="experience_card_theme_imgs">
                  {!isAddItemCard &&
                    data?.details?.productThemes?.map((el) => (
                      <Tooltip key={el.id} title={el.name}>
                        <SvgImage className="experience_card_theme_img" svgContent={el.image} />
                      </Tooltip>
                    ))}
                  {isAddItemCard &&
                    data?.productThemes?.map((el) => (
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
                {data?.details?.location || data?.location}
              </Typography.Paragraph>
              {!isAddItemCard && (
                <p className="fz-12 fw-500">
                  {data?.departureDate ? "Booking dates from" : "Booking date"} (
                  {dayjs(data?.arrivalDate).format("DD, MMM YYYY")})
                  {data?.departureDate &&
                    ` To (${dayjs(data?.departureDate).format("DD, MMM YYYY")})`}
                </p>
              )}
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
                {data?.details?.shortDescription || data?.shortDescription}
              </Typography.Paragraph>
            </div>
          </div>
        </Col>
        <Col xl={4} lg={4} md={6} xs={24}>
          <div className="price_section">
            <p className="fz-18 fw-700" style={{ marginBottom: "0" }}>
              ${data?.price || data?.finalPrice}
            </p>
            <p className="fz-14 fw-500">
              {data?.details?.priceType === PASSENGER_PRICE_TYPE.PER_PERSON ||
              data?.priceType === PASSENGER_PRICE_TYPE.PER_PERSON
                ? "Per person"
                : "Per booking"}
            </p>
            {data?.freeSeats && (
              <p className="fz-14 fw-500 rooms_left">{data?.freeSeats} Seats Left</p>
            )}
            {isAddItemCard && (
              <Button
                type="primary"
                size="small"
                style={isBackToSearch ? { width: "70px" } : {}}
                onClick={isBackToSearch ? onBackToSearchClicked : onViewSessionsClicked}>
                {isBackToSearch ? "Back" : "View Sessions"}
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExperienceCard;
