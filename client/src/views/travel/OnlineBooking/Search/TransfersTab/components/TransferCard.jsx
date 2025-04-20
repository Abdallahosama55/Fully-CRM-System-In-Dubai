import React from "react";
import { Button, Flex, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import default_car_image from "assets/images/default_car_image.jpg";
import { BagSVG, MoneySVG, TransferSVG, User2SVG } from "assets/jsx-svg";
import ROUTER_URLS from "constants/ROUTER_URLS";
import SvgImage from "components/common/SvgImage";
import isValidSVG from "utils/isValidSVG";
import Description from "components/common/Description";
// style
import "./styles.css";

const TransferCard = ({ transfer, searchInfo }) => {
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate(`${ROUTER_URLS.TRAVEL.TRANSFERS.BOOKING}`, {
      state: {
        transfer: transfer,
        searchInfo: searchInfo,
        departing: searchInfo?.departing?.format("YYYY-MM-DD HH:mm:ss.SSSZ"),
        returning: searchInfo?.returning?.format("YYYY-MM-DD HH:mm:ss.SSSZ"),
      },
    });
  };
  return (
    <div className="transfer_serach_card">
      <div>
        <Image
          src={transfer?.vehicleImage || default_car_image}
          width={"240px"}
          height={"180px"}
          className="transfer_serach_card_image"
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
          {transfer?.vehicleBrand} {transfer?.vehicleModel} ({transfer?.vehicleYear})
        </Typography.Paragraph>
        <Flex gap={10} wrap="wrap">
          <Typography.Paragraph
            className="xs_text_regular transfer_serach_card_info_with_icon"
            level={5}
            style={{ color: "var(--gray-600)" }}>
            {isValidSVG(transfer?.vehicleType?.icon) ? (
              <SvgImage
                svgContent={transfer?.vehicleType?.icon}
                className="transfer_serach_card_info_with_icon_svg_container"
              />
            ) : (
              <TransferSVG width={20} height={20} viewBox="0 0 24 24" />
            )}
            {transfer?.vehicleType}
          </Typography.Paragraph>
          {transfer?.maxPax && (
            <Typography.Paragraph
              className="xs_text_regular transfer_serach_card_info_with_icon"
              level={5}
              style={{ color: "var(--gray-600)" }}>
              <User2SVG />
              {transfer?.maxPax} Seats
            </Typography.Paragraph>
          )}
          {transfer?.maxBags && (
            <Typography.Paragraph
              className="xs_text_regular transfer_serach_card_info_with_icon"
              level={5}
              style={{ color: "var(--gray-600)" }}>
              <BagSVG />
              {transfer?.maxBags} Bags
            </Typography.Paragraph>
          )}
          <Typography.Paragraph
            className="xs_text_regular transfer_serach_card_info_with_icon"
            level={5}
            style={{ color: "var(--gray-600)" }}>
            <MoneySVG color={"#344054"} />
            Transfer Price: {transfer?.priceWithPricingModel} {transfer?.currencyCode}
          </Typography.Paragraph>
        </Flex>
        {transfer?.description && <Description description={transfer?.description} rows={5} />}
      </div>
      <div className="book_section">
        <Typography.Paragraph
          className="fz-18 fw-700"
          style={{ color: "#313343", marginBottom: "0rem" }}>
          {transfer?.priceWithPricingModel || 0} {transfer?.currencyCode}
        </Typography.Paragraph>
        <Button type={"primary"} className="w-100" onClick={handleBookClick}>
          Book
        </Button>
      </div>
    </div>
  );
};

export default TransferCard;
