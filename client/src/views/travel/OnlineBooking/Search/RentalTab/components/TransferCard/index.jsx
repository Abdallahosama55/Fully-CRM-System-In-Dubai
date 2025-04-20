import React from 'react'
// style
import './styles.css'
import default_car_image from "assets/images/default_car_image.jpg"
import { Button, Image, Typography } from 'antd'
import SvgImage from 'components/common/SvgImage'
import { BagSVG, MoneySVG, TransferSVG, User2SVG } from 'assets/jsx-svg'
import formatNumber from 'utils/formatNumber'
import { useNavigate } from 'react-router-dom'
import ROUTER_URLS from 'constants/ROUTER_URLS'
import dayjs from 'dayjs'
import isValidSVG from 'utils/isValidSVG'
const TransferCard = ({ transfer, searchInfo }) => {
  const navigate = useNavigate();
  console.log(transfer, "transfer")
  const handleBookClick = () => {
    navigate(`${ROUTER_URLS.TRAVEL.TRANSFERS.BOOK}${transfer?.id}`, {
      state: {
        ...searchInfo,
        distance: transfer?.distance,
        duration: transfer?.duration,
        finalPrice: transfer?.finalPrice,
        date: dayjs(searchInfo?.date).format("DD-MM-YYYY"),
        time: dayjs(searchInfo?.time).format("hh:mm A")
      }
    });
  };
  return (
    <div className='transfer_serach_card'>
      <div>
        <Image
          src={transfer?.image || default_car_image}
          width={"240px"}
          height={"180px"}
          className='transfer_serach_card_image'
          alt="transfer image"
          onError={(e) => {
            e.target.src = default_car_image
          }}
        />
      </div>
      <div>
        <Typography.Paragraph className="lg_text_bold" level={5} style={{ color: "var(--gray-700)", marginBottom: "1rem" }}>{transfer?.vehicleBrand?.name} {transfer?.vehicleModel?.name}{transfer?.vehicleModel?.year ? " - " + transfer?.vehicleModel?.year : ""}</Typography.Paragraph>
        <Typography.Paragraph className="xs_text_regular transfer_serach_card_info_with_icon" level={5} style={{ color: "var(--gray-600)" }}>
          {isValidSVG(transfer?.vehicleType?.icon) ? <SvgImage svgContent={transfer?.vehicleType?.icon} className="transfer_serach_card_info_with_icon_svg_container" /> : <TransferSVG width={20} height={20} viewBox="0 0 24 24" />}
          {transfer?.vehicleType?.name}
        </Typography.Paragraph>
        <Typography.Paragraph className="xs_text_regular transfer_serach_card_info_with_icon" level={5} style={{ color: "var(--gray-600)" }}>
          <User2SVG />
          {transfer?.maxPax} Seats
        </Typography.Paragraph>
        <Typography.Paragraph className="xs_text_regular transfer_serach_card_info_with_icon" level={5} style={{ color: "var(--gray-600)" }}>
          <BagSVG />
          {transfer?.maxBags} Bags
        </Typography.Paragraph>
        <Typography.Paragraph className="xs_text_regular transfer_serach_card_info_with_icon" level={5} style={{ color: "var(--gray-600)" }}>
          <MoneySVG color={"#344054"} />
          Initial Price: ${formatNumber(transfer?.initialPrice)}   ,Per Per Kilo:$ {formatNumber(transfer?.distanePricePerKilo)}
        </Typography.Paragraph>
      </div>
      <div className='book_section'>
        <Typography.Paragraph className='fz-18 fw-700' style={{ color: "#313343", marginBottom: "0rem" }}>${formatNumber(transfer?.finalPrice || 0)}</Typography.Paragraph>
        <Button type={"primary"} className='w-100' onClick={handleBookClick}>
          Book
        </Button>
      </div>
    </div>
  )
}

export default TransferCard