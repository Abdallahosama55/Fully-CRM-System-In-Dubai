import { Col, Image, Input, Row, Tooltip, Typography } from "antd";

import "./styles.css";

export default function ViewProductOther({ productData }) {
  return (
    <>
      <Col xs={24}>
        <section className="view-product-section">
          <Row className="view-product-section-header">
            <Typography.Text className="fz-24 fw-600">
              Gallery | Images
            </Typography.Text>
          </Row>

          <div className="view-product-section-main">
            <Row style={{ overflowX: "auto" }} gutter={[30, 0]} wrap={false}>
              {productData.productVariants[0].images.map((img, index) => (
                <Col xs={5} key={index}>
                  <div className="image-holder">
                    <Row justify="center" align="middle">
                      <Image alt="product img" src={img} height="100%" />
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </Col>

      <Col xs={24}>
        <section className="view-product-section">
          <Row className="view-product-section-header">
            <Typography.Text className="fz-24 fw-600">
              Shipping Information
            </Typography.Text>
          </Row>

          <div className="view-product-section-main">
            <Row wrap={false} align="middle" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-20">
                  Shipping Class:
                </Typography.Text>
              </Col>
              <Col xs={18}>
                <div className="read-only-input">
                  <Tooltip title="Shipping Class">
                    <Typography.Text ellipsis className="fz-12">
                      {productData.shippingClass}
                    </Typography.Text>
                  </Tooltip>
                </div>
              </Col>
            </Row>

            <Row wrap={false} align="middle" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-20">Weight:</Typography.Text>
              </Col>
              <Col xs={18}>
                <Row className="read-only-input">
                  <Col flex={1}>
                    <Typography.Text className="fz-12">
                      {productData.productVariants[0].weight}
                    </Typography.Text>
                  </Col>
                  <Col xs={4} className="sec-input">
                    <Tooltip title="Weight Class">
                      <Typography.Text ellipsis className="fz-12 c-t">
                        {productData.weightClass}
                      </Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row wrap={false} align="middle" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-20">Height:</Typography.Text>
              </Col>
              <Col xs={18}>
                <Row className="read-only-input">
                  <Col flex={1}>
                    <Typography.Text className="fz-12">
                      {productData.productVariants[0].dimensions.split("x")[2]}
                    </Typography.Text>
                  </Col>
                  <Col xs={4} className="sec-input">
                    <Tooltip title="Height Class">
                      <Typography.Text ellipsis className="fz-12 c-t">
                        {productData.lengthClass}
                      </Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row wrap={false} align="middle" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-20">Length:</Typography.Text>
              </Col>
              <Col xs={18}>
                <Row className="read-only-input">
                  <Col flex={1}>
                    <Typography.Text className="fz-12">
                      {productData.productVariants[0].dimensions.split("x")[0]}
                    </Typography.Text>
                  </Col>
                  <Col xs={4} className="sec-input">
                    <Tooltip title="Length Class">
                      <Typography.Text ellipsis className="fz-12 c-t">
                        {productData.lengthClass}
                      </Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row wrap={false} align="middle" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-20">Width:</Typography.Text>
              </Col>
              <Col xs={18}>
                <Row className="read-only-input">
                  <Col flex={1}>
                    <Typography.Text className="fz-12">
                      {productData.productVariants[0].dimensions.split("x")[1]}
                    </Typography.Text>
                  </Col>
                  <Col xs={4} className="sec-input">
                    <Tooltip title="Width Class">
                      <Typography.Text ellipsis className="fz-12 c-t">
                        {productData.lengthClass}
                      </Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* <Row wrap={false} align="middle" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-20">
                  Production Time:
                </Typography.Text>
              </Col>
              <Col xs={18}>
                <Row className="read-only-input">
                  <Col flex={1}>
                    <Typography.Text ellipsis className="fz-12">
                      Production Time
                    </Typography.Text>
                  </Col>
                  <Col xs={4} className="sec-input">
                    <Tooltip title="min">
                      <Typography.Text ellipsis className="fz-12 c-t">
                        min
                      </Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row> */}
          </div>
        </section>
      </Col>

      <Col xs={24}>
        <section className="view-product-section">
          <Row className="view-product-section-header">
            <Typography.Text className="fz-24 fw-600">
              Product Short Description
            </Typography.Text>
          </Row>

          <div className="view-product-section-main">
            <Input.TextArea
              rows={8}
              readOnly
              value={
                productData.productTranslations.find(
                  (lang) => lang.languageCode === "en",
                ).shortDescription
              }
            />
          </div>
        </section>
      </Col>

      <Col xs={24}>
        <section className="view-product-section">
          <Row className="view-product-section-header">
            <Typography.Text className="fz-24 fw-600">
              Product Description
            </Typography.Text>
          </Row>

          <div className="view-product-section-main">
            <Input.TextArea
              rows={8}
              readOnly
              value={
                productData.productTranslations.find(
                  (lang) => lang.languageCode === "en",
                ).description
              }
            />
          </div>
        </section>
      </Col>
    </>
  );
}
