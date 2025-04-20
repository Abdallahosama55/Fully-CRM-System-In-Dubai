import { useEffect, useRef, useState, useContext } from "react";
import { Button, Col, Row, Statistic, Table, Typography } from "antd";
import { PrintSVG } from "assets/jsx-svg";
import ViewOrderMain from "./ViewOrderMain";

import "./styles.css";
import { useReactToPrint } from "react-to-print";
import Invoice from "views/InvoicePage";
import { useParams } from "react-router-dom";
import { useNotification } from "context/notificationContext";
import StoreService from "services/store.service";
import { columns } from "./datdTable";
import userContext from "context/userContext";

export default function ViewOrders() {
  const { openNotificationWithIcon } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [orderdata, setOrderData] = useState(null);
  const [dataTable, setDataTable] = useState([]);

  const { id } = useParams();
  const { user } = useContext(userContext);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    setIsLoading(true);

    try {
      const getOrder = async () => {
        const res = await StoreService.getOrderbyid(id);
        setOrderData(res.data.data);
      };
      getOrder();

      setIsLoading(false);
    } catch (error) {
      openNotificationWithIcon("error", "Something wrong happened!");
      setIsLoading(false);
    }
  }, [id, openNotificationWithIcon]);

  useEffect(() => {
    if (orderdata) {
      setDataTable(() => {
        return orderdata.orderDetails.map((data) => ({
          key: data.id,
          // action: i,
          total: data.price * data?.quantity,
          price: data.price,
          tax: data?.tax,
          quantity: data?.quantity,
          name: data?.product?.productTranslations?.filter(
            (translations) => translations.languageCode === user.languageCode,
          )[0].name,
          image: data.productVariant?.images && data.productVariant?.images[0],
        }));
      });
    }
  }, [orderdata, user.languageCode]);
  return (
    <main>
      <section
        className="view-orders body-content warehouse"
        style={{ height: "auto", borderRadius: "12px" }}>
        <Row align="middle" justify="space-between" className="view-orders-header">
          <Col>
            <Typography.Text className="fz-16 fw-500">Order Table</Typography.Text>
          </Col>

          <Col>
            <Button onClick={handlePrint}>
              <Row align="middle">
                <PrintSVG />
              </Row>
            </Button>
          </Col>
        </Row>

        <Row className="view-orders-main">
          <ViewOrderMain orderdata={orderdata} />
        </Row>
      </section>

      <section>
        <div className="view-orders-table">
          <Row align="middle" justify="space-between" className="view-orders-header">
            <Col>
              <Typography.Text className="fz-24 fw-500">Brand Prodcuts</Typography.Text>
            </Col>
          </Row>

          <Row className="view-orders-main ">
            <Table
              style={{ width: "100%" }}
              scroll={{ x: 700 }}
              columns={columns}
              loading={isLoading}
              dataSource={dataTable}
              pagination={false}
            />
          </Row>
        </div>
        <div className=" body-content warehouse" style={{ borderRadius: "0px 0px 12px 12px" }}>
          <Row
            justify="space-between"
            style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}
            align="middle">
            <Col xs={12}>
              <Typography.Text className="fz-14">Subtotal</Typography.Text>
            </Col>
            <Col>
              <Row justify="center">
                <Statistic prefix={user.symbol} value={orderdata?.totalPrice} />
              </Row>
            </Col>
          </Row>

          <Row
            justify="space-between"
            style={{ background: "#fff", padding: "18px", borderRadius: "8px" }}
            align="middle">
            <Col xs={12}>
              <Typography.Text className="fz-14">Tax</Typography.Text>
            </Col>
            <Col>
              <Row justify="center">
                <Statistic prefix={user.symbol} value={0} />
              </Row>
            </Col>
          </Row>

          <Row
            justify="space-between"
            style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}
            align="middle">
            <Col xs={12}>
              <Typography.Text className="fz-14">Shipping</Typography.Text>
            </Col>
            <Col>
              <Row justify="center">
                <Statistic prefix={user.symbol} value={0} />
              </Row>
            </Col>
          </Row>

          <Row
            justify="space-between"
            style={{ background: "#fff", padding: "18px", borderRadius: "8px" }}
            align="middle">
            <Col xs={12}>
              <Typography.Text className="fz-14">Discount</Typography.Text>
            </Col>
            <Col>
              <Row justify="center">
                <Statistic prefix={user.symbol} value={0} />
              </Row>
            </Col>
          </Row>

          <Row
            justify="space-between"
            style={{ background: "#FBFBFD", padding: "18px", borderRadius: "8px" }}
            align="middle">
            <Col xs={12}>
              <Typography.Text className="fz-18 fw-700">Total</Typography.Text>
            </Col>
            <Col>
              <Row justify="center">
                <Statistic prefix={user.symbol} value={orderdata?.totalPrice} />
              </Row>
            </Col>
          </Row>
        </div>
      </section>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <Invoice orderdata={orderdata} />
        </div>
      </div>
    </main>
  );
}
