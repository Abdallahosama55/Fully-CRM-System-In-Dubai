import React from "react";
import { Button, Flex, Image, message, Tooltip, Typography } from "antd";
import SvgImage from "components/common/SvgImage";
import Description from "components/common/Description";
// utils
import isValidSVG from "utils/isValidSVG";
// assets
import default_car_image from "assets/images/default_car_image.jpg";
import { BagSVG, DeleteSVG, MoneySVG, TransferSVG, User2SVG } from "assets/jsx-svg";
// style
import "./styles.css";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useAddToQuotation from "services/travel/quotation/Mutations/useAddToQuotation";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import useDeleteQuotationItem from "services/travel/quotation/Mutations/useDeleteQuotationItem";
const TransferCard = ({
  data,
  isDeletable,
  isAddItemCard = false,
  onAddItem,
  arrivalDate,
  departureDate = undefined,
  paxes,
  search,
  onDeletItem,
}) => {
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

  const addToQuotation = useAddToQuotation(
    {
      onSuccess: () => {
        message.success("Item added to trip");
        onAddItem();
      },
      onError: (error) => {
        message?.error(error?.message || "something went wrong");
      },
    },
    { enabled: isAddItemCard },
  );

  const handelDelete = () => {
    deleteQuotationItem.mutate(data?.id);
  };

  const onAddClick = () => {
    addToQuotation.mutate({
      qutationId: id,
      item: {
        type: QUOTATION_ITEM_TYPES.TRANSFER,
        id: data?.id,
        name: `${data?.vehicleBrand} ${data?.vehicleModel} From ${search?.from?.name} To ${search.to.name}`,
        bookingKey: JSON.stringify({
          type: search?.type,
        }),
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        price: data?.priceWithPricingModel,
        ...paxes,
      },
    });
  };

  return (
    <div className="transfer_view_quotation_card" style={{ marginBottom: "1rem" }}>
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
      <div>
        <Image
          src={data?.vehicleImage || data?.details?.vehicle?.image || default_car_image}
          width={"240px"}
          height={"180px"}
          className="transfer_view_quotation_card_image"
          alt="transfer image"
          onError={(e) => {
            e.target.src = default_car_image;
          }}
        />
      </div>
      <div>
        <Typography.Paragraph
          className="lg_text_bold"
          level={5}
          style={{ color: "var(--gray-700)", marginBottom: "1rem" }}>
          {data?.name ||
            `${data?.vehicleBrand} ${data?.vehicleModel ?? ""} ${` (${data?.vehicleYear})` ?? ""}`}
        </Typography.Paragraph>
        <Flex gap={10} wrap="wrap">
          <Typography.Paragraph
            className="xs_text_regular transfer_view_quotation_card_info_with_icon"
            level={5}
            style={{ color: "var(--gray-600)" }}>
            {isValidSVG(data?.details?.vehicle?.vehicleType?.icon) ? (
              <SvgImage
                svgContent={data?.details?.vehicle?.vehicleType?.icon}
                className="transfer_view_quotation_card_info_with_icon_svg_container"
              />
            ) : (
              <TransferSVG width={20} height={20} viewBox="0 0 24 24" />
            )}
            {data?.details?.vehicle?.vehicleType || data?.vehicleType}
          </Typography.Paragraph>
          {(data?.details?.vehicle?.maxPax || data?.maxPax) && (
            <Typography.Paragraph
              className="xs_text_regular transfer_view_quotation_card_info_with_icon"
              level={5}
              style={{ color: "var(--gray-600)" }}>
              <User2SVG />
              {data?.details?.vehicle?.maxPax || data?.maxPax} Seats
            </Typography.Paragraph>
          )}
          {(data?.details?.vehicle?.maxBags || data?.maxBags) && (
            <Typography.Paragraph
              className="xs_text_regular transfer_view_quotation_card_info_with_icon"
              level={5}
              style={{ color: "var(--gray-600)" }}>
              <BagSVG />
              {data?.details?.vehicle?.maxBags || data?.maxBags} Bags
            </Typography.Paragraph>
          )}
          <Typography.Paragraph
            className="xs_text_regular transfer_view_quotation_card_info_with_icon"
            level={5}
            style={{ color: "var(--gray-600)" }}>
            <MoneySVG color={"#344054"} />
            Transfer Price: ${data?.priceWithPricingModel || data?.price}
          </Typography.Paragraph>
        </Flex>
        {!isAddItemCard && (
          <p className="fz-12 fw-500">
            {data?.departureDate ? "Booking dates from" : "Booking date"} (
            {dayjs(data?.arrivalDate).format("DD, MMM YYYY")})
            {data?.departureDate && ` To (${dayjs(data?.departureDate).format("DD, MMM YYYY")})`}
          </p>
        )}
        {(data?.details?.vehicle?.description || data?.description) && (
          <Description
            description={data?.details?.vehicle?.description || data?.description}
            rows={5}
          />
        )}
      </div>
      <div className="price_section">
        <Typography.Paragraph
          className="fz-18 fw-700"
          style={{ color: "#313343", marginBottom: "0rem" }}>
          ${data?.priceWithPricingModel || data?.price || 0}
        </Typography.Paragraph>
        {isAddItemCard && (
          <Button
            type="primary"
            size="small"
            onClick={onAddClick}
            loading={addToQuotation.isLoading}>
            Add To Trip
          </Button>
        )}
      </div>
    </div>
  );
};

export default TransferCard;
