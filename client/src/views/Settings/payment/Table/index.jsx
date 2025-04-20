import { Col, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { columns } from "./TableColumns";
import "./styles.css";

function PaymentTable({
  listCompanyPaymentGatewayData,
  setListCompanyPaymentGatewayData,
  isLoading,
  setIsLoading,
  setId,
  showModal,
}) {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const data = listCompanyPaymentGatewayData.map((PaymentGateway) => {
      return {
        key: PaymentGateway.id,
        name: PaymentGateway.name,
        actions: {
          paymntGatewayId: PaymentGateway.id,
          setListCompanyPaymentGatewayData: setListCompanyPaymentGatewayData,
          setIsLoading: setIsLoading,
          setId: setId,
          showModal: showModal,
          data: PaymentGateway.paymntGateway,
        },
      };
    });
    setTableData(data);
  }, [listCompanyPaymentGatewayData, setIsLoading, setId, setListCompanyPaymentGatewayData]);

  return (
    <>
      <section className="pt-1">
        <Row align="middle" justify="space-between" className="search-row" gutter={[12, 12]}>
          <Col className="tilte" span={24}>
            <Typography.Text className="fz-16 fw-600">
              Company Payment Gateway Table
            </Typography.Text>
          </Col>
        </Row>

        <div style={{ position: "relative" }}>
          <Table
            loading={isLoading}
            scroll={{ x: 700 }}
            style={{ marginTop: "32px" }}
            columns={columns}
            dataSource={tableData}
            pagination={{
              pageSize: 10,
              total: tableData.length,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
          />
          <Typography.Text className="table-bottom-info hide-sm">
            Total Payment Gateway : {tableData.length}
          </Typography.Text>
        </div>
      </section>
    </>
  );
}

export default PaymentTable;
