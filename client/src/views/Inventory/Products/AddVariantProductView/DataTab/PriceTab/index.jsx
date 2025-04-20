import { Col, Form, Image, InputNumber, Modal, Row, Select } from "antd";
import userContext from "context/userContext";
import { useContext, useEffect, useState } from "react";
import StoreService from "services/store.service";
import { axiosCatch } from "utils/axiosUtils";
import Plus from "assets/images/IconlyLightOutlinePlus.png";
import AddTax from "views/Settings/AddTax";

export default function PriceTab({ priceCurrency }) {
  const { user } = useContext(userContext);
  const [taxes, setTaxes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getTax = async () => {
      try {
        const res = await StoreService.getlistTax();
        setTaxes(res.data.data);
      } catch (error) {
        axiosCatch(error);
      }
    };
    getTax();
  }, [refresh]);

  const toggleModal = (e) => {
    e?.preventDefault();
    setIsModalOpen((prev) => !prev);
  };

  return (
    <section className="general-form">
      {priceCurrency.map((price) => (
        <Form.Item
          key={price}
          name={`price${price}`}
          label={`Price ${price}`}
          rules={[
            {
              required: price === user.cuurencyCode,
              message: "Please enter product price",
            },
          ]}>
          <InputNumber className="w-100" placeholder="Enter product price" />
        </Form.Item>
      ))}

      <Form.Item className="links-categories-item" label="Tax Class">
        <Row className="w-100 links-categories" align="middle">
          <Col style={{ flex: 1 }}>
            <Form.Item name="taxId" noStyle>
              <Select placeholder="Select product tax class">
                {taxes.map((tax) => (
                  <Select.Option key={tax.id} value={tax.id}>
                    {tax.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <button
              className="add-ategory"
              onClick={(e) => {
                toggleModal(e);
              }}
              type="primary">
              <Row gutter={4}>
                <Col>
                  <Image preview={false} src={Plus} />
                </Col>
                <Col className="fz-12 ">Add Tax</Col>
              </Row>
            </button>
          </Col>
        </Row>
      </Form.Item>
      <Modal
        destroyOnClose={true}
        open={isModalOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={false}
        centered>
        <AddTax handleCancel={toggleModal} setRefresh={setRefresh} />
      </Modal>
    </section>
  );
}
