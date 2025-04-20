import { Col, Row, Skeleton } from "antd";
import ViewProductTable from "./ViewProductTable";

import "./styles.css";
import ViewProductOther from "./ViewProductOther";
import { useState } from "react";
import { useEffect } from "react";
// import ProductsService from "services/product.service";
import { useParams } from "react-router-dom";
import { axiosCatch } from "utils/axiosUtils";

export default function ViewProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   ProductsService.getOne(id)
  //     .then(({ data }) => setProductData(data.data))
  //     .catch(axiosCatch)
  //     .finally(() => setLoading(false));
  // }, [id]);

  if (loading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    );
  }
  return (
    <main>
      <Row gutter={[20, 24]}>
        <Col xs={24} xxl={18}>
          <Row gutter={[0, 24]}>
            {productData.productVariants &&
              productData.productVariants.length > 0 && (
                <ViewProductOther productData={productData} />
              )}
            <Col xs={24}>
              <ViewProductTable productData={productData} />
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
}
