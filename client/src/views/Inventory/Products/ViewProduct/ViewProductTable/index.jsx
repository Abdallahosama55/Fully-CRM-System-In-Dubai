import { Image, Row, Table, Typography } from "antd";

import default_image from "assets/images/logo.png";
import { useState } from "react";
import { useEffect } from "react";

const columns = [
  {
    title: "Variant",
    dataIndex: "variant",
    ellipsis: true,
  },

  {
    title: "Price",
    dataIndex: "price",
    ellipsis: true,
    render: (price) => <Typography.Text>${price}</Typography.Text>,
  },
  {
    title: "Qty",
    dataIndex: "qty",
    ellipsis: true,
  },
  {
    title: "SKU",
    dataIndex: "sku",
    ellipsis: true,
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <Image
        alt="product img"
        width={50}
        height={50}
        style={{ borderRadius: "4px" }}
        src={image}
      />
    ),
  },
];

export default function ViewProductTable({ productData }) {
  const [tableData, setTableData] = useState([]);
  console.log(tableData);

  useEffect(() => {
    productData.productVariants?.forEach((variant) => {
      setTableData((prev) => [
        ...prev,
        {
          key: variant.id,
          variant: variant.title,
          price: variant.price,
          image: variant.images.length > 0 ? variant.images[0] : default_image,
          qty: variant.quantity,
          sku: variant.SKU,
        },
      ]);
    });
  }, [productData]);

  return (
    <section className="view-product-section">
      <Row className="view-product-section-header">
        <Typography.Text className="fz-24 fw-600">
          Product Price, Stock
        </Typography.Text>
      </Row>

      <div className="view-product-section-main">
        <Table
          scroll={{ x: 700, y: 800 }}
          dataSource={tableData}
          columns={columns}
          pagination={false}
        />
      </div>
    </section>
  );
}
