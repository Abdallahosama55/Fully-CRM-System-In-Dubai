import React, { useState } from "react";
import { Button, Carousel, Col, Row, Tooltip, Typography } from "antd";
import { GoogleMapsSVG } from "assets/jsx-svg";
import { PASSENGER_PRICE_TYPE } from "constants/EXPERIENCE";
import SvgImage from "components/common/SvgImage";
import MapDrawer from "components/common/MapDrawer";
import default_image from "assets/images/default_image.png";
// style
import "./styles.css";
import Description from "components/common/Description";

const ExperienceCard = ({
  data,
  isMultiple = false,
  isSelected,
  onSelect = () => {},
  onAdd = () => {},
}) => {
  const [openMap, setOpenMap] = useState();
  return (
    <div className="experience_card_search w-100">
      {data?.lat && data?.lng && (
        <MapDrawer
          open={openMap}
          onClose={() => setOpenMap(false)}
          center={[data?.lat, data?.lng]}
          markerLocation={[data?.lat, data?.lng]}
        />
      )}

      <Row gutter={16}>
        <Col className="experience_images_column" xl={5} lg={6} md={24} xs={24}>
          <Carousel dots={false} className="experience_images_carousel" arrows infinite={false}>
            {Array.isArray(data?.images) && data?.images?.length > 0 ? (
              data?.images?.map((el) => (
                <img key={el.id} src={el?.url} alt="experience" className="experience_image" />
              ))
            ) : (
              <img src={default_image} alt="experience" className="experience_image" />
            )}
          </Carousel>
        </Col>
        <Col xl={15} lg={14} md={18} xs={24}>
          <div className="experience_card_search_info">
            <div>
              <div className="experience_card_head_line space-between">
                <Typography.Text
                  className="experience_name fz-16 fw-700"
                  ellipsis={{
                    rows: 2,
                    expandable: false,
                  }}
                  level={4}>
                  {data?.title}
                </Typography.Text>
                <div className="experience_card_theme_imgs">
                  {data.productThemes.map((el) => (
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
                {data?.location}
              </Typography.Paragraph>
            </div>
            <div className="google_map_link_box items-center">
              <a className="google_map_link fz-14 fw-600" onClick={() => setOpenMap(true)}>
                <GoogleMapsSVG /> View on map
              </a>
            </div>
            <div>
              <Description
                description={data?.shortDescription}
                className="fz-12 fw-400 gc"
                style={{ color: "#313342" }}
              />
            </div>
          </div>
        </Col>
        <Col xl={4} lg={4} md={6} xs={24}>
          <div className="price_section">
            <p className="fz-18 fw-700" style={{ marginBottom: "0" }}>
              ${data.finalPrice}
            </p>
            <p className="fz-14 fw-500">
              {data.priceType === PASSENGER_PRICE_TYPE.PER_PERSON ? "Per person" : "Per booking"}
            </p>
            <Button
              onClick={isMultiple ? onSelect : onAdd}
              size="small"
              type="primary"
              style={{ padding: "1rem" }}
              disabled={isMultiple ? isSelected : false}
              className="fz-12 fw-700">
              {isMultiple ? "Select" : "Add to Library"}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ExperienceCard;
