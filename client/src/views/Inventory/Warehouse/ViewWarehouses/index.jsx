import { Col, Image, Row, Spin, Table, Tabs, Typography } from "antd";
import { EditSVG, EyeSVG, SAFlagSVG, USFlagSVG } from "assets/jsx-svg";
// import { PageNavigation } from "components";
import ViewWarehousesMain from "./ViewWarehousesMain";

// import { statusClass } from 'utils/getStatusClass';

import productImg from "assets/images/defualtAvatar.png";

import "./styles.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WarehousesService from "services/warehouses.service";
import { useNotification } from "context/notificationContext";
// import WarehousesTable from '../WarehousesView/WarehousesTable';

export default function ViewWarehouses() {
  const { openNotificationWithIcon } = useNotification();
  const { id } = useParams();

  const [warehouseInfo, setWarehouseInfo] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    WarehousesService.getWarehouseId(id).then(
      (res) => {
        setIsLoading(false);
        console.log(res);
        setWarehouseInfo(res.data.data);
      },
      () => {
        setIsLoading(false);
        openNotificationWithIcon("error", "Error", "Something wrong happened!");
      },
    );
  }, [id]);

  if (isLoading || !warehouseInfo) {
    return (
      <Row justify="center">
        <Spin spin />
      </Row>
    );
  }

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

  return (
    <main>
      {/* <PageNavigation /> */}

      <section className="view-Warehouses">
        <Row align="middle" justify="space-between" className="view-Warehouses-header">
          <Col>
            <Typography.Text className="fz-24 fw-500">View Warehouse</Typography.Text>
          </Col>
        </Row>

        <Row className="view-Warehouses-main">
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
              <ViewWarehousesMain lang="en" warehouseInfo={warehouseInfo} />
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
              <ViewWarehousesMain lang="ar" warehouseInfo={warehouseInfo} />
            </Tabs.TabPane>
          </Tabs>
        </Row>
      </section>

      {/* <section className="view-Warehouses">
        <Row
          align="middle"
          justify="space-between"
          className="view-Warehouses-header"
        >
          <Col>
            <Typography.Text className="fz-24 fw-500">
              Warehouse Products
            </Typography.Text>
          </Col>
        </Row>

        <Row className="view-Warehouses-main">
          <WarehousesTable showHeader={false} />
        </Row>
      </section> */}
    </main>
  );
}
