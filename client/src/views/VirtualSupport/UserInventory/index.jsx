import { Col, Image, Row, Skeleton, Tooltip, Typography } from "antd";
import { ShoppingCartSVG } from "assets/jsx-svg";
import { useContext, useEffect, useState } from "react";

import ShopService from "services/shop.service";
import { axiosCatch } from "utils/axiosUtils";
import { AppstoreOutlined } from "@ant-design/icons";
import defualtImage from "assets/images/download.png";
import "./styles.css";
import CustomerCartService from "services/customerCart.service";
import userContext from "context/userContext";

export default function UserInventory() {
  const { user } = useContext(userContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await CustomerCartService.getCategories(user.companyId);
        setCategories(data.rows);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user.companyId]);

  useEffect(() => {
    (async () => {
      try {
        setProductLoading(true);
        const data = await CustomerCartService.getCompnayProducts({
          companyId: user.companyId,
          mainCategory: selectedCategory ? selectedCategory : "",
        });
        console.log("data", data);
        setProducts(data.rows);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setProductLoading(false);
      }
    })();
  }, [selectedCategory, user.companyId]);

  console.log("products", products);

  return (
    <>
      <Typography.Text className="fz-18 fw-500">Iventory</Typography.Text>
      <section style={{ marginTop: "24px" }}>
        <Row gutter={[0, 16]}>
          <Col xs={24}>
            <Row
              className="inventory-categories"
              wrap={false}
              style={{ overflowX: "auto", paddingBottom: "1rem" }}
              gutter={[8, 0]}>
              <Col onClick={() => setSelectedCategory("")} className="clickable">
                <Row gutter={[0, 4]}>
                  <Col xs={24}>
                    <Row justify="center">
                      <div
                        className="inventory-category"
                        style={{
                          background:
                            selectedCategory === ""
                              ? "linear-gradient(270deg, #8fcaf3 0%, #3a5ee3 100%)"
                              : "",
                        }}>
                        <AppstoreOutlined style={{ color: "#fff", fontSize: "30px" }} />
                      </div>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Row justify="center">
                      <Typography.Text ellipsis>All</Typography.Text>
                    </Row>
                  </Col>
                </Row>
              </Col>

              {loading &&
                [1, 2, 3, 4, 5, 6].map((item) => (
                  <Col key={item}>
                    <Skeleton.Avatar size="large" />
                  </Col>
                ))}

              {categories?.map((category) => (
                <Col
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="clickable"
                  style={{ maxWidth: "80px" }}>
                  <Row gutter={[0, 4]}>
                    <Col xs={24}>
                      <Row justify="center">
                        <div
                          className="inventory-category"
                          style={{
                            background:
                              selectedCategory === category.id
                                ? "linear-gradient(270deg, #8fcaf3 0%, #3a5ee3 100%)"
                                : "",
                          }}>
                          {category.image ? (
                            <Image
                              preview={false}
                              src={category.image}
                              alt="category"
                              style={{ borderRadius: "50%" }}
                              width={30}
                              height={30}
                            />
                          ) : (
                            <ShoppingCartSVG
                              color="#fff"
                              style={{ width: "24px", height: "24px" }}
                            />
                          )}
                        </div>
                      </Row>
                    </Col>
                    <Col xs={24}>
                      <Row justify="center">
                        <Typography.Text ellipsis>
                          {
                            category.categoryTranslations.find((lang) => lang.languageCode === "en")
                              ?.name
                          }
                        </Typography.Text>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>

            <Row className="inventory-section">
              {productLoading && (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              )}
              {products?.map((product) => (
                <Col xs={24} className="inventory-product" key={product.id}>
                  <Row justify="space-between" wrap={false} gutter={[8, 0]}>
                    <Col flex={1}>
                      <Row gutter={[8, 0]} wrap={false}>
                        <Col>
                          <div className="inventory-product-img">
                            <Image
                              // preview={false}
                              alt="productImage"
                              width={40}
                              height={40}
                              src={
                                product.productVariants[0]?.images?.length
                                  ? product.productVariants[0]?.images[0]
                                  : defualtImage
                              }
                            />
                          </div>
                        </Col>
                        <Col>
                          <Tooltip
                            title={
                              product.productTranslations.find((lang) => lang.languageCode === "en")
                                .name
                            }>
                            <Typography.Text ellipsis style={{ maxWidth: "100px" }}>
                              {
                                product.productTranslations.find(
                                  (lang) => lang.languageCode === "en",
                                ).name
                              }
                            </Typography.Text>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row justify="end" gutter={[0, 8]}>
                        <Col xs={24}>
                          <Row justify="end">
                            <Typography.Text className="fz-16 fw-500">
                              {window.location.hostname.match("airsenegal")
                                ? "XOF"
                                : window.location.hostname.match("misa")
                                ? "SAR"
                                : "AED"}{" "}
                              {product.productVariants[0].price}
                            </Typography.Text>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </section>
    </>
  );
}
