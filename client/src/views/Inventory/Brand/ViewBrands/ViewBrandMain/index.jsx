import { Col, Image, Row, Typography } from "antd";

import defaultImg from "assets/images/default_image.png";

export default function ViewBrandMain({ lang, brandInfo }) {
  console.log(brandInfo);
  const translatedBrandInfo = brandInfo?.brandTranslations?.find(
    (brand) => brand.languageCode === lang,
  );

  return (
    <section className="mt-1 view-brand-info">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Brand Id</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text>{brandInfo.id}</Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Image</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <div className="view-brand-img">
            <Image
              alt="brand img"
              src={brandInfo.image || defaultImg}
              height={275}
            />
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Brand name</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedBrandInfo?.name}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Brand description
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedBrandInfo.description}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Status</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {brandInfo.showStatus ? "Active" : "Draft"}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Sort Order</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>{brandInfo.sortOrder}</Typography.Text>
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
            {translatedBrandInfo.metaTagTitle}
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
            {translatedBrandInfo.metaTagDescription}
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
            {translatedBrandInfo.metaTagKeywords}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Created at</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {brandInfo.createdAt.substring(0, 10)}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Updated at</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {brandInfo.createdAt.substring(0, 10)}
          </Typography.Text>
        </Col>
      </Row>
    </section>
  );
}
