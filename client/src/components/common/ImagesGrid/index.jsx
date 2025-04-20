import { Carousel, Col, ConfigProvider, Image, Modal, Row } from "antd";
import { ArrowRightSVG, ImagesSVG2, LeftArrow2SVG } from "assets/jsx-svg";
// style
import "./styles.css";
import { useState } from "react";
const ImagesGrid = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="images_grid">
        {images.length >= 5 && (
          <Row gutter={[8, 8]} className="images_container">
            <Col span={12} style={{ height: "408px" }}>
              <Image src={images[0].link} alt={images[0].name} height={"100%"} />
            </Col>
            <Col span={12}>
              <Row gutter={[8, 8]} style={{ height: "100%" }}>
                <Col span={12}>
                  <Row gutter={[8, 8]}>
                    <Col style={{ height: "200px" }} span={24}>
                      <Image src={images[1].link} alt={images[1].name} height={"100%"} />
                    </Col>
                    <Col style={{ height: "200px" }} span={24}>
                      <Image src={images[2].link} alt={images[2].name} height={"100%"} />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={[8, 8]} style={{ height: "100%" }}>
                    <Col style={{ height: "200px" }} span={24}>
                      <Image src={images[3].link} alt={images[3].name} height={"100%"} />
                    </Col>
                    <Col style={{ height: "200px" }} span={24}>
                      <Image src={images[4].link} alt={images[4].name} height={"100%"} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {images.length > 5 && (
              <div className="more_images" onClick={() => setIsModalOpen(true)}>
                <ImagesSVG2 color="#fff" />{" "}
                <span className="fz-16 fw-500">{images.length - 5}+</span>
              </div>
            )}
            <Modal
              open={isModalOpen}
              footer={null}
              onCancel={() => setIsModalOpen(false)}
              centered
              width={"80dvw"}
              height={"85dvh"}
              className="show_more_modal">
              <Carousel
                arrows={true}
                autoplay={true}
                lazyLoad={true}
                dots={true}
                nextArrow={
                  <div>
                    <ArrowRightSVG color={"#3A5EE3"} />
                  </div>
                }
                prevArrow={
                  <div>
                    <LeftArrow2SVG color={"#3A5EE3"} />
                  </div>
                }>
                {images?.slice(5).map((image) => (
                  <img
                    key={image.name}
                    src={image.link}
                    alt={image.name}
                    className="image_in_show_more_modal"
                  />
                ))}
              </Carousel>
            </Modal>
          </Row>
        )}

        {images.length === 4 && (
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Row gutter={[8, 8]}>
                <Col style={{ height: "200px" }} span={24}>
                  <Image src={images[0].link} alt={images[0].name} height={"100%"} />
                </Col>
                <Col style={{ height: "200px" }} span={24}>
                  <Image src={images[1].link} alt={images[1].name} height={"100%"} />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row gutter={[8, 8]}>
                <Col style={{ height: "200px" }} span={24}>
                  <Image src={images[2].link} alt={images[2].name} height={"100%"} />
                </Col>
                <Col style={{ height: "200px" }} span={24}>
                  <Image src={images[3].link} alt={images[3].name} height={"100%"} />
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        {images.length === 3 && (
          <Row gutter={[8, 8]}>
            <Col span={12} style={{ height: "408px" }}>
              <Image src={images[0].link} alt={images[0].name} height={"100%"} />
            </Col>
            <Col span={12}>
              <Row gutter={[8, 8]}>
                <Col style={{ height: "200px" }} span={24}>
                  <Image src={images[1].link} alt={images[1].name} height={"100%"} />
                </Col>
                <Col style={{ height: "200px" }} span={24}>
                  <Image src={images[2].link} alt={images[2].name} height={"100%"} />
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        {images.length === 2 && (
          <Row gutter={[8, 8]}>
            <Col span={12} style={{ height: "408px" }}>
              <Image src={images[0].link} alt={images[0].name} height={"100%"} />
            </Col>
            <Col span={12} style={{ height: "408px" }}>
              <Image src={images[1].link} alt={images[1].name} height={"100%"} />
            </Col>
          </Row>
        )}

        {images.length === 1 && (
          <Row gutter={[8, 8]}>
            <Col span={24} style={{ height: "408px" }}>
              <Image src={images[0].link} alt={images[0].name} height={"100%"} />
            </Col>
          </Row>
        )}
      </div>
      <div className="image_carousel">
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                colorBgContainer: "rgb(0, 0, 0)",
              },
            },
          }}>
          <Carousel style={{ height: "250px" }}>
            {images.map((image) => (
              <img className="image_slide" key={image.name} src={image.link} alt={image.name} />
            ))}
          </Carousel>
        </ConfigProvider>
      </div>
    </>
  );
};

export default ImagesGrid;
