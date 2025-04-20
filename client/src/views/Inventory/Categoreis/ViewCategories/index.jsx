import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Image, Row, Spin, Tabs, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import productImg from "assets/images/defualtAvatar.png";
import { EditSVG, EyeSVG, SAFlagSVG, USFlagSVG } from "assets/jsx-svg";

import CategoriesService from "services/category.service";
import { useNotification } from "context/notificationContext";
import ViewCategoriesMain from "./ViewCategoriesMain";

import "./styles.css";

export default function ViewCategories() {
  const { openNotificationWithIcon } = useNotification();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState();

  useEffect(() => {
    setIsLoading(true);
    CategoriesService.getCategoryId(id).then(
      (res) => {
        setIsLoading(false);
        setCategoryInfo(res.data.data);
      },
      () => {
        setIsLoading(false);
        openNotificationWithIcon("error", "Something wrong happend!");
      },
    );
  }, [id]);

  if (isLoading) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }

  console.log(categoryInfo);

  const columns = [
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
    {
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Typography.Text className={`status status`}>{status}</Typography.Text>,
      ellipsis: true,
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      ellipsis: true,
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Price",
      dataIndex: "price",
      ellipsis: true,
      render: (price) => <Typography.Text>${price}</Typography.Text>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action) => (
        <Row align="middle" gutter={[16, 0]} wrap={false}>
          <Col>
            <EyeSVG className="clickable" />
          </Col>
          <Col>
            <EditSVG className="clickable" />
          </Col>
        </Row>
      ),
    },
  ];
  let data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      action: i,
      name: `Iphone ${i}`,
      price: 322.12,
      description: `product description ${i}`,
      image: productImg,
      status:
        i === 0
          ? "Active"
          : i === 1
          ? "Pending"
          : i === 2
          ? "Confirmed"
          : i === 3
          ? "Picked Up"
          : i === 4
          ? "On The Way"
          : i === 5
          ? "Delivered"
          : "Cancel",
      category: "Washing & Cleaning",
    });
  }

  if (isLoading || !categoryInfo) {
    return (
      <Row justify="center">
        <LoadingOutlined />
      </Row>
    );
  }

  return (
    <main>
      {/* <PageNavigation /> */}

      <section className="view-categories">
        <Row align="middle" justify="space-between" className="view-categories-header">
          <Col>
            <Typography.Text className="fz-24 fw-500">View Category</Typography.Text>
          </Col>
        </Row>

        <Row className="view-categories-main">
          <Tabs
            className="inner-tab"
            items={[
              {
                key: "1",
                label: (
                  <Row align="middle" gutter={[4, 0]}>
                    <Col>
                      <Row align="middle">
                        <USFlagSVG />
                      </Row>
                    </Col>
                    <Col>English</Col>
                  </Row>
                ),
                children: <ViewCategoriesMain lang="en" categoryInfo={categoryInfo} />,
                forceRender: true,
              },
              {
                key: "2",
                label: (
                  <Row align="middle" gutter={[4, 0]}>
                    <Col>
                      <Row align="middle">
                        <SAFlagSVG />
                      </Row>
                    </Col>
                    <Col>Arabic</Col>
                  </Row>
                ),
                children: <ViewCategoriesMain lang="ar" categoryInfo={categoryInfo} />,
                forceRender: true,
              },
            ]}
          />
        </Row>
      </section>

      <section className="view-categories">
        <Row align="middle" justify="space-between" className="view-categories-header">
          <Col>
            <Typography.Text className="fz-24 fw-500">Category Prodcuts</Typography.Text>
          </Col>
        </Row>

        {/* <Row className="view-categories-main">
          <CategoriesTable showHeader={false} />
        </Row> */}
      </section>
    </main>
  );
}
