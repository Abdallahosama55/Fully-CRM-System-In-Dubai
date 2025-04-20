import React from "react";
// style
import "./styles.css";
import default_car_image from "assets/images/default_car_image.jpg";
import { Button, Flex, Image, Tooltip, Typography } from "antd";
import SvgImage from "components/common/SvgImage";
import { BagSVG, MoneySVG, TransferSVG, User2SVG } from "assets/jsx-svg";
import formatNumber from "utils/formatNumber";
import isValidSVG from "utils/isValidSVG";
import Description from "components/common/Description";
const TransferCard = ({
  data,
  isMultiple = false,
  isSelected = false,
  onSelect = () => {},
  onAdd = () => {},
}) => {
  return (
    <div className="transfer_serach_card" style={{ marginBottom: "0.5rem" }}>
      <div>
        <Image
          src={data?.vehicleImage || default_car_image}
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
          {data?.vehicleBrand} {data?.vehicleModel} ({data?.vehicleYear})
        </Typography.Paragraph>
        <Flex gap={10} wrap="wrap">
          <Typography.Paragraph
            className="xs_text_regular transfer_serach_card_info_with_icon"
            level={5}
            style={{ color: "var(--gray-600)" }}>
            {isValidSVG(data?.vehicleType?.icon) ? (
              <SvgImage
                svgContent={data?.vehicleType?.icon}
                className="transfer_serach_card_info_with_icon_svg_container"
              />
            ) : (
              <TransferSVG width={20} height={20} viewBox="0 0 24 24" />
            )}
            {data?.vehicleType}
          </Typography.Paragraph>
          {data?.maxPax && (
            <Typography.Paragraph
              className="xs_text_regular transfer_serach_card_info_with_icon"
              level={5}
              style={{ color: "var(--gray-600)" }}>
              <User2SVG />
              {data?.maxPax} Seats
            </Typography.Paragraph>
          )}
          {data?.maxBags && (
            <Typography.Paragraph
              className="xs_text_regular transfer_serach_card_info_with_icon"
              level={5}
              style={{ color: "var(--gray-600)" }}>
              <BagSVG />
              {data?.maxBags} Bags
            </Typography.Paragraph>
          )}
          <Typography.Paragraph
            className="xs_text_regular transfer_serach_card_info_with_icon"
            level={5}
            style={{ color: "var(--gray-600)" }}>
            <MoneySVG color={"#344054"} />
            Transfer Price: ${data?.price}
          </Typography.Paragraph>
        </Flex>
        {data?.description && <Description description={data?.description} rows={5}/>}
      </div>
      <div className="book_section">
        <Typography.Paragraph
          className="fz-18 fw-700"
          style={{ color: "#313343", marginBottom: "0rem" }}>
          ${formatNumber(data?.price || 0)}
        </Typography.Paragraph>
        <Button
          onClick={isMultiple ? onSelect : onAdd}
          size="small"
          type="primary"
          style={{ padding: "1rem" }}
          disabled={isMultiple ? isSelected : false}
          className="book_now_btn fz-12 fw-700">
          {isMultiple ? "Select" : "Add to Library"}
        </Button>
      </div>
    </div>
  );
};

export default TransferCard;
