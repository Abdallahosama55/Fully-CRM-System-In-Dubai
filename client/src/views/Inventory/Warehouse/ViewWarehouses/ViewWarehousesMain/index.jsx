import { Col, Image, Row, Typography } from "antd";

import defaultImg from "assets/images/default_image.png";

export default function ViewWarehousesMain({ lang, warehouseInfo }) {
  const translatedWarehouseInfo = warehouseInfo.warehouseTranslations.find(
    (warehouseInfo) => warehouseInfo.languageCode === lang,
  );

  return (
    <section className="mt-1 view-Warehouse-info">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Warehouse Id
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text>{warehouseInfo.id}</Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Image</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <div className="view-Warehouse-img">
            <Image
              alt="Warehouse img"
              width={275}
              src={warehouseInfo.image || defaultImg}
            />
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Warehouse name
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedWarehouseInfo.name}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Warehouse description
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedWarehouseInfo.description}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Status</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {warehouseInfo.showStatus ? "Active" : "Draft"}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Sort Order</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>{warehouseInfo.sortOrder}</Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Products</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>421</Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Meta tag title
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedWarehouseInfo.metaTagTitle}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Meta tag description
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedWarehouseInfo.metaTagDescription}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Meta tag keywords
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedWarehouseInfo.metaTagKeywords}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Created at</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {warehouseInfo.createdAt.substring(0, 10)}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Updated at</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {warehouseInfo.createdAt.substring(0, 10)}
          </Typography.Text>
        </Col>
      </Row>
    </section>
  );
}
