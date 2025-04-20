import { useEffect, useState } from "react";
import { Col, Image, Row, Typography } from "antd";

import EducationImg from "assets/images/Education.png";
import BusinessImg from "assets/images/Business.png";
import FunImg from "assets/images/Fun.png";
import { LeftArrowSVG } from "assets/jsx-svg";
import defaultDim from "assets/images/house.png";

import "./styles.css";
import { axiosCatch } from "utils/axiosUtils";
import MetaverseService from "services/metaverse.service";

const categoriesImages = {
  Education: EducationImg,
  Business: BusinessImg,
  Fun: FunImg,
};

export default function Holomeet({ SystemMessage }) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await MetaverseService.getHoloCategory();
        setCategory(res.data.data.rows);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <section className="holo-meet">
      {!selectedCategory && (
        <Typography.Text className="fz-18 fw-500 ">Holomeet</Typography.Text>
      )}
      {selectedCategory && (
        <div className="clickable" onClick={() => setSelectedCategory(null)}>
          <Row wrap={false} gutter={[6, 0]} align="middle">
            <Col>
              <Row align="middle">
                <LeftArrowSVG
                  color="#8E8E93"
                  style={{ width: "14px", height: "14px" }}
                />
              </Row>
            </Col>
            <Col>
              <Typography.Text style={{ color: "#8E8E93" }}>
                Back
              </Typography.Text>
            </Col>
          </Row>
        </div>
      )}
      <div
        className={selectedCategory ? "" : "center-items"}
        style={{
          height: "90%",
          marginTop: selectedCategory ? "2rem" : "1rem",
        }}
      >
        <Row gutter={[0, 32]}>
          {!selectedCategory && (
            <Col xs={24}>
              <Row justify="center">
                <Typography.Text className="fz-16 fw-500 ">
                  Select Category
                </Typography.Text>
              </Row>
            </Col>
          )}
          <Col xs={24}>
            <Row gutter={[16, 16]}>
              {!loading &&
                category &&
                category.map((category) => (
                  <Col
                    xs={selectedCategory ? 8 : 24}
                    xl={selectedCategory && 12}
                    xxl={selectedCategory ? 8 : 24}
                    key={category.id}
                  >
                    <div
                      className="holo-meet-category"
                      style={{
                        outline:
                          selectedCategory === category.id &&
                          "1px solid #AEAEB2",
                        padding: selectedCategory && "1rem",
                      }}
                      onClick={() => {
                        setSelectedCategory(category.id);
                      }}
                    >
                      <Row gutter={[0, 12]}>
                        <Col xs={24}>
                          <Row justify="center">
                            <Image
                              preview={false}
                              alt={category.name}
                              src={categoriesImages[category.name]}
                              height={40}
                            />
                          </Row>
                        </Col>
                        <Col xs={24}>
                          <Row justify="center">
                            <Typography.Text
                              className="fz-16"
                              ellipsis
                              title={category.name}
                            >
                              {category.name}
                            </Typography.Text>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                ))}
            </Row>

            {selectedCategory && (
              <HolomeetRooms
                category={selectedCategory}
                SystemMessage={SystemMessage}
              />
            )}
          </Col>
        </Row>
      </div>
    </section>
  );
}

const HolomeetRooms = ({ category, SystemMessage }) => {
  const [metaverse, setMetaverse] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await MetaverseService.getHoloDimensionByCategory(category);
        setMetaverse(res.data.data.rows);
      } catch (err) {
        axiosCatch(err);
      }
    })();
  }, [category]);
  return (
    <div className="holo-meet-room-main">
      <Row gutter={[16, 16]}>
        {metaverse &&
          metaverse.map((room, index) => (
            <Col xs={24} key={index}>
              <div
                className="holo-meet-room clickable"
                onClick={() => SystemMessage.setHolomeet(room.id)}
              >
                <Row gutter={[0, 8]}>
                  <Col xs={24}>
                    <div
                      className="holo-meet-img"
                      style={{
                        background: room.image
                          ? `url(${room.image})`
                          : `url(${defaultDim})`,
                      }}
                    />
                  </Col>
                  <Col xs={24}>
                    <Row gutter={[0, 4]}>
                      {room.customerDimensionTranslations.find(
                        (lang) => lang.languageCode === "en",
                      ).name !== "undefined" ? (
                        <Col xs={24}>
                          <Typography.Text className="fz-16 fw-500">
                            {
                              room.customerDimensionTranslations.find(
                                (lang) => lang.languageCode === "en",
                              ).name
                            }
                          </Typography.Text>
                        </Col>
                      ) : null}
                      {room.customerDimensionTranslations.find(
                        (lang) => lang.languageCode === "en",
                      ).description !== "undefined" ? (
                        <Col xs={24}>
                          <Typography.Paragraph
                            className="fz-12"
                            ellipsis={{ rows: 2 }}
                          >
                            {
                              room.customerDimensionTranslations.find(
                                (lang) => lang.languageCode === "en",
                              ).description
                            }
                          </Typography.Paragraph>
                        </Col>
                      ) : null}
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};
