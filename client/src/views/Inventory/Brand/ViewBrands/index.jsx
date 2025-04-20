import { Col, Image, Row, Spin, Tabs, Typography } from "antd";
import { EditSVG, EyeSVG, SAFlagSVG, USFlagSVG } from "assets/jsx-svg";
// import { PageNavigation } from "components";
import ViewBrandMain from "./ViewBrandMain";

// import { statusClass } from 'utils/getStatusClass';

import "./styles.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandsService from "services/brands.service";
import { useNotification } from "context/notificationContext";
// import BrandsTable from "../BrandsView/BrandsTable";

export default function ViewBrands() {
  const { openNotificationWithIcon } = useNotification();
  const { id } = useParams();

  const [brandInfo, setBrandInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    BrandsService.getBrandId(id).then(
      (res) => {
        console.log(res);
        setIsLoading(false);
        setBrandInfo(res.data.data);
      },
      () => {
        setIsLoading(false);
        openNotificationWithIcon("error", "Something wrong happend!");
      },
    );
  }, [id]);

  if (isLoading || !brandInfo) {
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  }

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
      render: (status) => (
        // <Typography.Text className={`${statusClass(status)}-status status`}>
        <Typography.Text className={`-status status`}>{status}</Typography.Text>
      ),
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

  return (
    <main>
      {/* <PageNavigation /> */}

      <section className="view-brands">
        <Row align="middle" justify="space-between" className="view-brands-header">
          <Col>
            <Typography.Text className="fz-24 fw-500">View Brand</Typography.Text>
          </Col>
        </Row>

        <Row className="view-brands-main">
          <Tabs className="inner-tab">
            <Tabs.TabPane
              tab={
                <Row align="middle" gutter={[4, 0]}>
                  <Col>
                    <Row align="middle">
                      <USFlagSVG />
                    </Row>
                  </Col>
                  <Col>English</Col>
                </Row>
              }
              key="1"
              forceRender={true}>
              <ViewBrandMain lang="en" brandInfo={brandInfo} />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <Row align="middle" gutter={[4, 0]}>
                  <Col>
                    <Row align="middle">
                      <SAFlagSVG />
                    </Row>
                  </Col>
                  <Col>Arabic</Col>
                </Row>
              }
              key="2"
              forceRender={true}>
              <ViewBrandMain lang="ar" brandInfo={brandInfo} />
            </Tabs.TabPane>
          </Tabs>
        </Row>
      </section>

      {/* <section className="view-brands">
        <Row
          align="middle"
          justify="space-between"
          className="view-brands-header"
        >
          <Col>
            <Typography.Text className="fz-24 fw-500">
              Brand Products
            </Typography.Text>
          </Col>
        </Row>

        <Row className="view-brands-main">
          <BrandsTable  showHeader={false} />
        </Row>
      </section> */}
    </main>
  );
}
