import { LoadingOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React, { useEffect, useState } from "react";
import ProductsService from "services/product.service";
import EditVariantProductView from "./EditVariantProductView";
import EditProductView from "./EditProductView";
import { axiosCatch } from "utils/axiosUtils";

function EditProduct({ id, onClose, setRefresh }) {
  const [productData, setProductData] = useState({});
  const [options, setOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    ProductsService.getProductId(id)
      .then(({ data }) => setProductData(data.data))
      .catch((err) => axiosCatch(err));
  }, [id]);

  console.log({ productData });
  useEffect(() => {
    if (productData.id) {
      if (productData.options === "") {
        setOptions(false);
      } else {
        setOptions(true);
      }
    }
    setIsLoading(false);
  }, [productData.id, productData.options]);

  return (
    <>
      {isLoading ? (
        <Row justify="center" align="middle" style={{ height: "80px" }}>
          <LoadingOutlined />
        </Row>
      ) : (
        <>
          {options ? (
            <EditVariantProductView
              id={id}
              onClose={onClose}
              productData={productData}
              setRefresh={setRefresh}
              setProductData={setProductData}
            />
          ) : (
            <EditProductView
              id={id}
              onClose={onClose}
              productData={productData}
              setRefresh={setRefresh}
              setProductData={setProductData}
            />
          )}
        </>
      )}
    </>
  );
}

export default EditProduct;
