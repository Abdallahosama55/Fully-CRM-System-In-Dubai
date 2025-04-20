import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import Delete from "assets/images/IconlyLightOutlineDelete.png";
import { CalenderBtnSVG } from "assets/jsx-svg";
import userContext from "context/userContext";
import { useContext, useEffect, useRef, useState } from "react";
import StoreService from "services/store.service";
import Plus from "assets/images/IconlyLightOutlinePlus.png";
import { axiosCatch } from "utils/axiosUtils";
import AddTax from "views/Settings/AddTax";

export default function PriceTab({ priceCurrency }) {
  const { user } = useContext(userContext);
  const SpecialAddBtnRef = useRef();
  const quantityAddBtnRef = useRef();
  const [specialPricePeriod, setSpecialPricePeriod] = useState(true);
  const [quantityPricePeriod, setQuantityPricePeriod] = useState(true);
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

      <Form.Item
        label={
          <Row align="middle" gutter={[8, 5]}>
            <Col span={24}>
              <Typography.Text>Special Price</Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text
                style={{ color: "#2f34da" }}
                onClick={() => setSpecialPricePeriod((prev) => !prev)}
                className="action-text clickable">
                {specialPricePeriod ? "Cancel Discount Period" : "Special Discount Period"}
              </Typography.Text>
            </Col>
          </Row>
        }>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item name="mainSpecialPrice" noStyle>
              <InputNumber className="w-100" min={0} placeholder="Enter product sale price" />
            </Form.Item>
          </Col>
          {specialPricePeriod && (
            <>
              <Col flex={1}>
                <Form.Item name="mainSpecialPriceDate" noStyle>
                  <DatePicker.RangePicker
                    suffixIcon={<CalenderBtnSVG />}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col className="btn-with-select">
                <Button
                  onClick={() => SpecialAddBtnRef.current.click()}
                  className="big-input-btn"
                  type="primary"
                  style={{ background: "#272942" }}>
                  + Add
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Form.Item>

      {specialPricePeriod && (
        <Form.List name="specialPrice">
          {(fields, { add, remove }) => (
            <>
              <Row style={{ display: "none" }}>
                <Button
                  ref={SpecialAddBtnRef}
                  type="primary"
                  onClick={() => {
                    add();
                  }}
                  className="add-btn">
                  + Add
                </Button>
              </Row>

              {fields.map(({ key, name }) => (
                <Row className="mb-1" key={key} gutter={[10, 10]}>
                  <Col flex={1}>
                    <Form.Item noStyle>
                      <Row gutter={[10, 10]}>
                        <Col span={24}>
                          <Form.Item name={[name, "specialPrice"]}>
                            <InputNumber
                              className="w-100"
                              min={0}
                              placeholder="Enter product sale price"
                            />
                          </Form.Item>
                        </Col>
                        <Col flex={1}>
                          <Form.Item name={[name, "specialPriceDate"]}>
                            <DatePicker.RangePicker
                              suffixIcon={<CalenderBtnSVG />}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                  <Button onClick={() => remove(name)} className="big-input-btn">
                    <Row align="middle" justify="center">
                      <Image src={Delete} preview={false} />
                    </Row>
                  </Button>
                </Row>
              ))}
            </>
          )}
        </Form.List>
      )}

      <Form.Item
        label={
          <Row align="middle" gutter={[8, 5]}>
            <Col span={24}>
              <Typography.Text>Quantity Price</Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text
                style={{ color: "#2f34da" }}
                onClick={() => setQuantityPricePeriod((prev) => !prev)}
                className="action-text clickable">
                {quantityPricePeriod ? "Cancel Quantity Period" : "Quantity Discount Period"}
              </Typography.Text>
            </Col>
          </Row>
        }>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item name="mainQuantity" noStyle>
              <InputNumber className="w-100" min={0} placeholder="Enter product Quantity" />
            </Form.Item>
          </Col>
          {quantityPricePeriod && (
            <>
              <Col flex={1}>
                <Form.Item name="mainQuantityPrice" noStyle>
                  <InputNumber className="w-100" min={0} placeholder="Enter product sale price" />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item name="mainQuantityPriceDate" noStyle>
                  <DatePicker.RangePicker
                    suffixIcon={<CalenderBtnSVG />}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col className="btn-with-select">
                <Button
                  onClick={() => quantityAddBtnRef.current.click()}
                  className="big-input-btn"
                  type="primary"
                  style={{ background: "#272942" }}>
                  + Add
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Form.Item>

      {quantityPricePeriod && (
        <Form.List name="quantityPrice">
          {(fields, { add, remove }) => (
            <>
              <Row style={{ display: "none" }}>
                <Button
                  ref={quantityAddBtnRef}
                  type="primary"
                  onClick={() => {
                    add();
                  }}
                  className="add-btn">
                  + Add
                </Button>
              </Row>

              {fields.map(({ key, name }) => (
                <Row key={key} wrap={false}>
                  <Col flex={1}>
                    <Form.Item noStyle>
                      <Row wrap={false}>
                        <Col flex={1}>
                          <Form.Item name={[name, "quantity"]}>
                            <InputNumber
                              style={{
                                borderRadius: quantityPricePeriod && "4px 0 0 4px",
                              }}
                              min={0}
                              placeholder="Enter product Quantity"
                            />
                          </Form.Item>
                        </Col>
                        <Col flex={1}>
                          <Form.Item name={[name, "quantityPrice"]}>
                            <InputNumber
                              style={{ borderRadius: 0 }}
                              min={0}
                              placeholder="Enter product sale price"
                            />
                          </Form.Item>
                        </Col>
                        <Col flex={1}>
                          <Form.Item name={[name, "quantityPriceDate"]}>
                            <DatePicker.RangePicker
                              // suffixIcon={<CalendarSVG />}
                              style={{ borderRadius: "0px", width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                  <Button onClick={() => remove(name)} className="big-input-btn">
                    <Row align="middle" justify="center">
                      {/* <DeleteSVG /> */}
                    </Row>
                  </Button>
                </Row>
              ))}
            </>
          )}
        </Form.List>
      )}
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
