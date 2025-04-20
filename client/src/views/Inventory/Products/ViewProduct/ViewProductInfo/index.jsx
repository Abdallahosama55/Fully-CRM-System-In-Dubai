import { Col, Image, Rate, Row, Typography } from 'antd';

import productImg from 'assets/images/default_image.png';

import './styles.css';

export default function ViewProductInfo() {
  return (
    <section className="view-product-info">
      <Row gutter={[18, 30]}>
        <Col xs={24} lg={5}>
          <div className="image-holder">
            <Row justify="center" align="middle">
              <Image
                preview={false}
                alt="product img"
                src={productImg}
                height="100%"
              />
            </Row>
          </div>
        </Col>
        <Col xs={24} lg={19}>
          <Row>
            <Typography.Text className="fz-32 fw-600">
              Product Name
            </Typography.Text>
          </Row>
          <Row
            align="middle"
            gutter={[4, 0]}
            wrap={false}
            style={{ marginTop: '1.1rem' }}
          >
            <Col>
              <Rate allowHalf disabled defaultValue={4.5} />
            </Col>
            <Col>(4.5)</Col>
          </Row>
          <Row gutter={[8, 8]} style={{ marginTop: '1.1rem' }}>
            <Col>
              <div className="info-box">
                <Row>
                  <Col xs={24}>
                    <Typography.Text className="fz-24 fw-600">
                      324
                    </Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text className="fz-18 fw-400 gc">
                      Reviews
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col>
              <div className="info-box">
                <Row>
                  <Col xs={24}>
                    <Typography.Text className="fz-24 fw-600">
                      9283
                    </Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text className="fz-18 fw-400 gc">
                      In Wishlist
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col>
              <div className="info-box">
                <Row>
                  <Col xs={24}>
                    <Typography.Text className="fz-24 fw-600">
                      1256
                    </Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text className="fz-18 fw-400 gc">
                      In Cart
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col>
              <div className="info-box">
                <Row>
                  <Col xs={24}>
                    <Typography.Text className="fz-24 fw-600">
                      1354
                    </Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text className="fz-18 fw-400 gc">
                      Times Sold
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col>
              <div className="info-box">
                <Row>
                  <Col xs={24}>
                    <Typography.Text className="fz-24 fw-600">
                      1523
                    </Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text className="fz-18 fw-400 gc">
                      Amount Sold
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col>
              <div className="info-box">
                <Row>
                  <Col xs={24}>
                    <Typography.Text className="fz-24 fw-600">
                      678
                    </Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text className="fz-18 fw-400 gc">
                      Discount Period
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}
