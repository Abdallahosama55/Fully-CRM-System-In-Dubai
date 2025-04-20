import { useRef, useState } from "react";
import { Button, Col, DatePicker, Form, InputNumber, Row, Typography } from "antd";
import { CalenderBtnSVG } from "assets/jsx-svg";
import { DeleteSVG } from "assets/jsx-svg";

export default function PriceSection({ name, priceCurrency }) {
  const [specialPricePeriodOpen, setSpecialPricePeriodOpen] = useState(true);
  const [quantityPricePeriodOpen, setQuantityPricePeriodOpen] = useState(true);
  const SpecialAddBtnRef = useRef([]);
  const quantityAddBtnRef = useRef([]);

  return (
    <>
      {priceCurrency.map((price) => (
        <Form.Item key={price} name={[name, `price${price}`]} label={`Price ${price}`}>
          <InputNumber className="w-100" placeholder="Enter product price" />
        </Form.Item>
      ))}

      <Form.Item
        label={
          <Row align="middle" gutter={[8, 5]}>
            <Col span={24}>
              <Typography.Text>Special Price</Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text
                style={{ color: "#2f34da" }}
                onClick={() => setSpecialPricePeriodOpen((prev) => !prev)}
                className="action-text clickable">
                {specialPricePeriodOpen ? "Cancel Discount Period" : "Special Discount Period"}
              </Typography.Text>
            </Col>
          </Row>
        }>
        <Row wrap={false}>
          <Col flex={1}>
            <Form.Item name={[name, "mainSpecialPrice"]} noStyle>
              <InputNumber className="w-100" min={0} placeholder="Enter product sale price" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col flex={1}>
            {specialPricePeriodOpen && (
              <>
                <div className="mb-1"> Special Discount Period</div>
                <Row className="w-100" gutter={10}>
                  <Col flex={1}>
                    <Form.Item name={[name, "mainSpecialPriceDate"]} noStyle>
                      <DatePicker.RangePicker
                        // suffixIcon={<CalendarSVG />}
                        style={{
                          width: "100%",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col className="btn-with-select">
                    <Button
                      onClick={() => SpecialAddBtnRef.current[name].click()}
                      className="big-input-btn"
                      type="primary"
                      style={{ background: "#272942" }}>
                      + Add
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Form.Item>

      {specialPricePeriodOpen && (
        <Form.List name={[name, "specialPrice"]}>
          {(fields1, { add, remove }) => (
            <>
              <Row style={{ display: "none" }}>
                <Button
                  ref={(el) => (SpecialAddBtnRef.current[name] = el)}
                  type="primary"
                  onClick={() => {
                    add();
                  }}
                  className="add-btn">
                  + Add
                </Button>
              </Row>

              {fields1.map(({ key, name }) => (
                <Row key={key} wrap={false}>
                  <Col flex={1}>
                    <Form.Item noStyle>
                      <Row wrap={false}>
                        <Col flex={1}>
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
                              style={{
                                width: "100%",
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                  <Button onClick={() => remove(name)} className="big-input-btn">
                    <Row align="middle" justify="center">
                      <DeleteSVG />
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
                onClick={() => setQuantityPricePeriodOpen((prev) => !prev)}
                className="action-text clickable">
                {quantityPricePeriodOpen ? "Cancel Quantity Period" : "Quantity Discount Period"}
              </Typography.Text>
            </Col>
          </Row>
        }>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form.Item name={[name, "mainQuantity"]} noStyle>
              <InputNumber className="w-100" min={0} placeholder="Enter product Quantity" />
            </Form.Item>
          </Col>
          {quantityPricePeriodOpen && (
            <>
              <Col flex={1}>
                <Form.Item name={[name, "mainQuantityPrice"]} noStyle>
                  <InputNumber className="w-100" min={0} placeholder="Enter product sale price" />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item name={[name, "mainQuantityPriceDate"]} noStyle>
                  <DatePicker.RangePicker
                    suffixIcon={<CalenderBtnSVG />}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col className="btn-with-select">
                <Button
                  onClick={() => quantityAddBtnRef.current[name].click()}
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

      {quantityPricePeriodOpen && (
        <Form.List name={[name, "quantityPrice"]}>
          {(fields2, { add, remove }) => (
            <>
              <Row style={{ display: "none" }}>
                <Button
                  ref={(el) => (quantityAddBtnRef.current[name] = el)}
                  type="primary"
                  onClick={() => {
                    add();
                  }}
                  className="add-btn">
                  + Add
                </Button>
              </Row>

              {fields2.map(({ key, name }) => (
                <Row key={key} wrap={false}>
                  <Col flex={1}>
                    <Form.Item noStyle>
                      <Row wrap={false}>
                        <Col flex={1}>
                          <Form.Item name={[name, "quantity"]}>
                            <InputNumber
                              className="w-100"
                              style={{
                                width: "100%",
                              }}
                              min={0}
                              placeholder="Enter product Quantity"
                            />
                          </Form.Item>
                        </Col>
                        <Col flex={1}>
                          <Form.Item name={[name, "quantityPrice"]}>
                            <InputNumber
                              className="w-100"
                              min={0}
                              placeholder="Enter product sale price"
                            />
                          </Form.Item>
                        </Col>

                        <Col flex={1}>
                          <Form.Item name={[name, "quantityPriceDate"]}>
                            <DatePicker.RangePicker
                              suffixIcon={<CalenderBtnSVG />}
                              style={{
                                width: "100%",
                              }}
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
    </>
  );
}
