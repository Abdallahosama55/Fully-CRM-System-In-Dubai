import { Col, Row, Tooltip, Typography } from 'antd';
import './styles.css';

export default function ViewProductAsider() {
  return (
    <Row gutter={[0, 24]}>
      <Col xs={24}>
        <section className="asider-info">
          <Row wrap={false} align="bottom" gutter={[8, 0]}>
            <Col flex={1}>
              <Typography.Text className="fz-16">status:</Typography.Text>
            </Col>
            <Col xs={7}>
              <Tooltip title="Active">
                <Typography.Text ellipsis className="fz-12">
                  Active
                </Typography.Text>
              </Tooltip>
            </Col>
          </Row>

          <Row wrap={false} align="bottom" gutter={[8, 0]}>
            <Col flex={1}>
              <Typography.Text className="fz-16">
                Brand | Manufacturer:
              </Typography.Text>
            </Col>
            <Col xs={7}>
              <Tooltip title="China">
                <Typography.Text ellipsis className="fz-12">
                  China
                </Typography.Text>
              </Tooltip>
            </Col>
          </Row>

          <Row wrap={false} align="bottom" gutter={[8, 0]}>
            <Col flex={1}>
              <Typography.Text className="fz-16">Category:</Typography.Text>
            </Col>
            <Col xs={7}>
              <Tooltip title="Mobiles Laptops">
                <Typography.Text ellipsis className="fz-12">
                  Mobiles Laptops
                </Typography.Text>
              </Tooltip>
            </Col>
          </Row>

          <Row wrap={false} align="bottom" gutter={[8, 0]}>
            <Col flex={1}>
              <Typography.Text className="fz-16">Tags:</Typography.Text>
            </Col>
            <Col xs={7}>
              <Tooltip title="Hot New Nice">
                <Typography.Text ellipsis className="fz-12">
                  Hot New Nice
                </Typography.Text>
              </Tooltip>
            </Col>
          </Row>

          <Row wrap={false} align="bottom" gutter={[8, 0]}>
            <Col flex={1}>
              <Typography.Text className="fz-16">Quantity:</Typography.Text>
            </Col>
            <Col xs={7}>
              <Tooltip title="421">
                <Typography.Text ellipsis className="fz-12">
                  421
                </Typography.Text>
              </Tooltip>
            </Col>
          </Row>

          <Row wrap={false} align="bottom" gutter={[8, 0]}>
            <Col flex={1}>
              <Typography.Text className="fz-16">
                Minimum Purchase Qty:
              </Typography.Text>
            </Col>
            <Col xs={7}>
              <Tooltip title="2">
                <Typography.Text ellipsis className="fz-12">
                  2
                </Typography.Text>
              </Tooltip>
            </Col>
          </Row>
        </section>
      </Col>
      <Col xs={24}>
        <section className="view-product-section">
          <Row className="view-product-section-header">
            <Typography.Text className="fz-24 fw-600">
              VAT & Tax
            </Typography.Text>
          </Row>

          <div className="view-product-section-main">
            <Row wrap={false} align="bottom" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-16">VAT:</Typography.Text>
              </Col>
              <Col xs={7}>
                <Tooltip title="30%">
                  <Typography.Text ellipsis className="fz-12">
                    30%
                  </Typography.Text>
                </Tooltip>
              </Col>
            </Row>

            <Row wrap={false} align="bottom" gutter={[8, 0]}>
              <Col flex={1}>
                <Typography.Text className="fz-16">Tax:</Typography.Text>
              </Col>
              <Col xs={7}>
                <Tooltip title="20%">
                  <Typography.Text ellipsis className="fz-12">
                    20%
                  </Typography.Text>
                </Tooltip>
              </Col>
            </Row>
          </div>
        </section>
      </Col>
    </Row>
  );
}
