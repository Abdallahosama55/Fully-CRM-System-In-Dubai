import React from "react";
import { Carousel, Col, Flex, Row, Typography } from "antd";
import { ArrowRightSVG, EarthSVG, LeftArrow2SVG } from "assets/jsx-svg";
import Description from "components/common/Description";
import Badge from "components/common/Badge";
import { PACKAGE_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
import {
  ExperiencesSVG,
  FlightSVG,
  HotelSVG,
  TransferSVG,
} from "assets/jsx-svg/PackagesItemsTypesIcons";
// style
import "./styles.css";
const PackageInfo = ({ images, mainServices, destinations, description, finalPrice }) => {
  return (
    <div className="package_info">
      <Row gutter={[16, 16]}>
        <Col md={12} xs={24}>
          <Carousel
            arrows
            nextArrow={
              <div>
                <ArrowRightSVG color={"#3A5EE3"} />
              </div>
            }
            prevArrow={
              <div>
                <LeftArrow2SVG color={"#3A5EE3"} />
              </div>
            }
            infinite={true}>
            {images &&
              images.length > 0 &&
              images?.map((image) => (
                <img
                  className="package_card_image"
                  src={image?.link}
                  alt={image?.name}
                  key={image?.id}
                  loading="lazy"
                />
              ))}
          </Carousel>
        </Col>
        <Col md={12} xs={24}>
          <div className="info_body">
            <Flex gap={8}>
              <Typography.Paragraph
                className="fz-16 fw-400"
                style={{ color: "var(--gray-500)", marginBottom: "0rem" }}>
                Cities covered
              </Typography.Paragraph>
              <Flex align="center" gap={4}>
                {destinations?.map((el) => (
                  <Badge key={el} icon={<EarthSVG />} backGroundColor={"#EDF4FF"} color={"#3538CD"}>
                    {el}
                  </Badge>
                ))}
              </Flex>
            </Flex>
            <Description description={description} rows={6} />
            <Flex align={"center"} gap={8} wrap={"wrap"}>
              {mainServices?.map((el) => {
                switch (el.type) {
                  case PACKAGE_ITEMS_TYPES.ACCOMODATION:
                    return (
                      <Badge
                        icon={<HotelSVG />}
                        largeIcon={true}
                        key={el?.name}
                        color={"#CA2800"}
                        backGroundColor={"#FFF5ED"}>
                        {el.name}
                      </Badge>
                    );
                  case PACKAGE_ITEMS_TYPES.TRANSFER:
                    return (
                      <Badge
                        icon={<TransferSVG />}
                        largeIcon={true}
                        key={el?.name}
                        color={"#027A48"}
                        backGroundColor={"#E8FEF2"}>
                        {el.name}
                      </Badge>
                    );
                  case PACKAGE_ITEMS_TYPES.FLIGHT:
                    return (
                      <Badge
                        icon={<FlightSVG />}
                        largeIcon={true}
                        key={el?.name}
                        color={"#175CD3"}
                        backGroundColor={"#EDF8FF"}>
                        {el.name}
                      </Badge>
                    );
                  case PACKAGE_ITEMS_TYPES.EXPERIENCE:
                    return (
                      <Badge
                        icon={<ExperiencesSVG />}
                        largeIcon={true}
                        key={el?.name}
                        color={"#5925DC"}
                        backGroundColor={"#F4F3FF"}>
                        {el.name}
                      </Badge>
                    );
                  default:
                    return (
                      <Badge key={el.type} status="primary">
                        {el.name}
                      </Badge>
                    );
                }
              })}
            </Flex>
            <Flex align="center" justify="flex-end" gap={4}>
              <p className="xs_text_regular" style={{ color: "var(--font-secondary)" }}>
                Price
              </p>
              <p
                className="xs_display_semibold"
                style={{ color: "var(--font-link)" }}>
                $ {finalPrice}
              </p>
            </Flex>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PackageInfo;
