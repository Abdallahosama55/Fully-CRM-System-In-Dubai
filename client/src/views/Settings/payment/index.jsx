import React, { useState, useEffect } from "react";
import { Col, Row, Card, Modal, Tooltip, Typography } from "antd";
import StoreService from "services/store.service";
import PamentForm from "./pamentForm/pamentForm";
import { axiosCatch } from "utils/axiosUtils";
import PaymentTable from "./Table";

function Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const [listPaymentGatewayData, setListPaymentGatewayData] = useState([]);
  const [listPaymentGateway, setistPaymentGateway] = useState([]);
  const [listCompanyPaymentGatewayData, setListCompanyPaymentGatewayData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [id, setId] = useState("");
  const [refentsh, setRefentsh] = useState(false);

  const showModal = (data) => {
    setPaymentData(data);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setId("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getListPaymentGateway = async () => {
      setIsLoading(true);
      try {
        const res = await StoreService.listPaymentGateway();
        const resPaymentGateway = await StoreService.listCompanyPaymentGateway();
        setListCompanyPaymentGatewayData(resPaymentGateway.data.data);

        setistPaymentGateway(res.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        axiosCatch(error);
      }
    };
    getListPaymentGateway();
  }, [refentsh]);

  useEffect(() => {
    const propertyValues = new Set(
      listCompanyPaymentGatewayData.map((item) => item.paymntGatewayId),
    );

    const finleData = listPaymentGateway.filter((item) => !propertyValues.has(item.id));

    setListPaymentGatewayData(finleData);
    setIsLoading(false);
  }, [listCompanyPaymentGatewayData, listPaymentGateway]);

  return (
    <section className="body-content">
      {isLoading ? (
        <div>Loding...</div>
      ) : (
        <>
          {listPaymentGatewayData.length > 0 && (
            <Typography.Text className="fz-16 fw-600 ">List Payment Gateway</Typography.Text>
          )}
          <Row className="mt-1" gutter={[10, 10]}>
            {listPaymentGatewayData.map((listPayment, i) => (
              <Col key={i} span={6}>
                <Card onClick={() => showModal(listPayment)} className="clickable w-100">
                  {listPayment.name}
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      <PaymentTable
        listCompanyPaymentGatewayData={listCompanyPaymentGatewayData}
        setListCompanyPaymentGatewayData={setListCompanyPaymentGatewayData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setId={setId}
        showModal={showModal}
      />

      <Modal
        footer={null}
        title={paymentData.name}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <PamentForm
          listPayment={paymentData}
          setRefentsh={setRefentsh}
          handleCancel={handleCancel}
          id={id}
          setId={setId}
          setListCompanyPaymentGatewayData={setListCompanyPaymentGatewayData}
        />
      </Modal>
    </section>
  );
}

export default Payment;
