import { Col, Dropdown, Image, Row, Typography, notification } from "antd";
import { DeleteSVG, DuplicateSVG, EditSVG, EyeSVG, MoreSVG } from "assets/jsx-svg";
import { useState, useContext } from "react";

import EditProduct from "../EditProduct/";
import ProductService from "services/product.service";

import "./styles.css";
import userContext from "context/userContext";
import { makeNewProduct } from "./utils";
import { useDrawer } from "hooks/useDrawer";

export const columns = [
  {
    hidden: false,
    title: "Logo",
    dataIndex: "logo",
    width: 200,
    render: (image) => (
      <>
        <Image
          preview={false}
          alt="product img"
          width={31}
          height={31}
          style={{ borderRadius: "4px" }}
          src={image}
        />
      </>
    ),
  },
  {
    hidden: false,
    title: "Name",
    dataIndex: "name",
    width: 200,
    sorter: (a, b) => b.name.localeCompare(a.name),
  },
  {
    hidden: false,
    title: "Description",
    dataIndex: "description",
    width: 200,
    ellipsis: true,
    sorter: (a, b) => b.description.localeCompare(a.description),
  },
  {
    hidden: false,
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Typography.Text className={`${status}-status status`}>{status}</Typography.Text>
    ),
    sorter: (a, b) => b.status.localeCompare(a.status),
    width: 100,
  },

  {
    hidden: false,
    title: "Price",
    dataIndex: "price",
    ellipsis: true,
    align: "center",
    render: (price) => <Price price={price} />,
    width: 100,
    sorter: (a, b) => a.price - b.price,
  },

  {
    hidden: false,
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 140,
    render: (action) => (
      <RowAction
        setProductsCount={action.setProductsCount}
        setProductsdata={action.setProductsdata}
        id={action.id}
        setRefresh={action.setRefresh}
        product={action.product}
        index={action.index}
      />
    ),
  },
];

function Price({ price }) {
  const { user } = useContext(userContext);
  return (
    <div>
      {user.symbol} {price}
    </div>
  );
}

function RowAction({ id, setRefresh, setProductsCount, setProductsdata, product, index }) {
  const DrawerAPI = useDrawer();

  const [isDeletionLoading, setIsDeletionLoading] = useState(false);
  const onClose = () => {
    DrawerAPI.close();
  };

  const deleteProduct = () => {
    setIsDeletionLoading(true);
    ProductService.ProductDelete(id).then(
      () => {
        setIsDeletionLoading(false);
        setProductsdata((products) => {
          return products.filter((product) => product.id !== id);
        });
        setProductsCount((prev) => prev - 1);
      },
      () => {
        setIsDeletionLoading(false);
        notification.error({ description: "Something wrong happend!" });
      },
    );
  };

  function removeNullProperties(obj) {
    const newObject = { ...obj };
    Object.keys(newObject).forEach((key) => {
      if (newObject[key] === null) {
        delete newObject[key];
      }
    });
    newObject.productTranslations.forEach((translation) => {
      Object.keys(translation).forEach((key) => {
        if (translation[key] === null) {
          delete translation[key];
        }
      });
      delete translation.productId;
      delete translation.id;
      delete translation.createdAt;
      delete translation.deletedAt;
      delete translation.updatedAt;
    });

    const productTranslations = {};
    newObject.productTranslations.forEach((translation) => {
      productTranslations[translation.languageCode] = translation;
    });

    return makeNewProduct(newObject);
  }

  const Duplicate = async () => {
    const { createdAt, updatedAt, id, companyId, ...other } = product;
    try {
      const res = await ProductService.addProduct(removeNullProperties(other));
      setProductsdata((prev) => {
        prev.splice(index + 1, 0, res.data.data.product);
        return [...prev];
      });
      setProductsCount((prev) => prev + 1);
      notification.success({ description: "duplicated successfully" });
    } catch (error) {
      notification.error({ description: "Something wrong happend!" });
    }
  };

  return (
    <Row wrap={false} justify="center" align="middle" gutter={[6, 0]}>
      {DrawerAPI.Render}
      <Col>
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <EyeSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text>View Details</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "1",
              },

              {
                label: (
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <EditSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text>Edit</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "2",
                onClick: () => {
                  DrawerAPI.open("70%");
                  DrawerAPI.handleSetDestroyOnClose(false);
                  DrawerAPI.setDrawerContent(
                    <EditProduct onClose={onClose} id={id} setRefresh={setRefresh} />,
                  );
                },
              },
              {
                label: (
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <DuplicateSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text>Duplicate</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "3",
                onClick: Duplicate,
              },
              {
                label: (
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <DeleteSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: "red" }}>Delete</Typography.Text>
                    </Col>
                  </Row>
                ),
                key: "4",
                onClick: deleteProduct,
              },
            ],
          }}
          trigger={["click"]}
          placement="topRight">
          <div className="more-btn">
            <MoreSVG style={{ rotate: "90deg" }} />
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
}
