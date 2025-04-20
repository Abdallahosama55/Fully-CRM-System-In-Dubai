import { Col, Image, Row, Typography } from "antd";

import defaultImg from "assets/images/default_image.png";

export default function ViewCategoriesMain({ lang, categoryInfo }) {
  const {
    createdAt,
    customerBusinessId,
    id: categoryId,
    image,
    newProductCategoryId,
    categoryTranslations,
    showStatus,
    sortOrder,
    updatedAt,
  } = categoryInfo;

  const translatedProductInfo = categoryTranslations.find(
    (i) => i.languageCode === lang,
  );

  return (
    <section className="mt-1 view-category-info">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Category Id
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text>{categoryId}</Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Image</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <div className="view-category-img">
            <Image alt="category img" src={image || defaultImg} />
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Category name
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedProductInfo.name}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">
            Category description
          </Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {translatedProductInfo.description}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Status</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {showStatus ? "Active" : "Draft"}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Sort Order</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>{sortOrder}</Typography.Text>
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
            {translatedProductInfo.metaTagTitle}
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
            {translatedProductInfo.metaTagDescription}
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
            {translatedProductInfo.metaTagKeywords}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Created at</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {createdAt.substring(0, 10)}
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={6}>
          <Typography.Text className="fz-18 fw-500">Updated at</Typography.Text>
        </Col>
        <Col xs={24} lg={14}>
          <Typography.Text ellipsis>
            {updatedAt.substring(0, 10)}
          </Typography.Text>
        </Col>
      </Row>
    </section>
  );
}
