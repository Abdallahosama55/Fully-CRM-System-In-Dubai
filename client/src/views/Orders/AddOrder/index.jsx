import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Statistic,
  Table,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { DeleteSVG } from "assets/jsx-svg";
import checkFileds from "utils/checkFields";
import productImg from "assets/images/iphone.jpg";
import AddCancelButtons from "components/common/AddCancelButtons";
import { useDrawer } from "context/drawerContext";

import "./styles.css";

export default function AddOrderView() {
  const DrawerAPI = useDrawer();
  const [form] = useForm();
  const [discountType, setDiscountType] = useState();
  const [tableData, setTableData] = useState([]);

  const onFinish = (values) => {
    console.log(values, "values");
  };

  const add = () => {
    form.submit();
    DrawerAPI.close();
  };

  const selectAfter = (
    <Select className="discount-type" defaultValue="USD" onChange={(e) => setDiscountType(e)}>
      <Select.Option value="USD">$</Select.Option>
      <Select.Option value="PER">%</Select.Option>
    </Select>
  );

  const changeTableData = (selectData) => {
    setTableData(() => {
      return selectData.map((data, index) => {
        return {
          key: index,
          action: data,
          total: index,
          price: (index + 1) * 1231,
          tax: index,
          quantity: {
            quantity: index + 1 * 5,
            name: data,
          },
          name: data,
          image: {
            name: data,
            image: productImg,
          },
        };
      });
    });
  };

  const onDeleteRow = (name) => {
    setTableData((prev) => {
      return prev.filter((data) => data.name !== name);
    });
    const newData = form.getFieldValue("products").filter((data) => data !== name);
    form.setFieldValue("products", newData);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <Image
          alt={image.name}
          src={image.image}
          width={50}
          height={50}
          style={{ borderRadius: "4px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (quantity) => (
        // Todo when connect api name={[name, id]}
        <Form.Item name={quantity.name} noStyle>
          <InputNumber min={1} max={quantity.quantity} placeholder="Enter quantity" />
        </Form.Item>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      ellipsis: true,
      render: (price) => <Statistic prefix="$" value={price} />,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      ellipsis: true,
      render: (tax) => <Statistic prefix="$" value={tax} />,
    },
    {
      title: "Total",
      dataIndex: "total",
      ellipsis: true,
      render: (total) => <Statistic prefix="$" value={total} />,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action) => (
        <Row align="middle" gutter={[8, 0]} wrap={false}>
          <Col>
            <DeleteSVG onClick={() => onDeleteRow(action)} className="clickable" />
          </Col>
        </Row>
      ),
      width: 120,
    },
  ];

  return (
    <section>
      <main className="add-orders">
        <Row align="middle" justify="space-between" className="add-orders-header mb-1">
          <Col>
            <Typography.Text className="fz-20 fw-500">Add Order</Typography.Text>
          </Col>
        </Row>
      
        <Form form={form} layout="vertical" onFinish={onFinish} className="w-100">
          <section className="general-form">
            <Row gutter={20}>
              <Col xs={24} lg={12}>
                <Form.Item name="firstName" label="First Name">
                  <Input placeholder="Enter Customer First Name" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="lastName" label="Last Name">
                  <Input placeholder="Enter Customer Last Mame" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xs={24} lg={12}>
                <Form.Item name="email" label="Customer Email">
                  <Input type="email" placeholder="Enter Customer Email" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="phone" label="Customer Phone Number">
                  <Input placeholder="Enter Customer Phone" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xs={24} lg={12}>
                <Form.Item name="country" label="Country">
                  <Select
                    showSearch
                    placeholder="Select Country"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="city" label="City / State">
                  <Select
                    showSearch
                    placeholder="Select City / State"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="streetAddress" label="Street Address">
              <Input placeholder="Enter Your Street Address" />
            </Form.Item>

            <Row gutter={20}>
              <Col xs={24} lg={12}>
                <Form.Item name="buildingDetails" label="Building Details">
                  <Input placeholder="Enter Building Details" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="postcode" label="Postcode / ZIP">
                  <Input placeholder="Enter Postcode / ZIP" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xs={24} lg={12}>
                <Form.Item name="shipmentAgent" label="Assign Delivery / Shipment Agent ">
                  <Select
                    placeholder="Select Shipment Agent"
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="metodPayment" label="Metod Payment">
                  <Select
                    placeholder="Select Metod Payment"
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xs={24} lg={12}>
                <Form.Item name="deliveryStatus" label="Delivery Status">
                  <Select
                    placeholder="Select Delivery Status"
                    options={[
                      {
                        value: "pending",
                        label: "pending",
                      },
                      {
                        value: "confirmed",
                        label: "confirmed",
                      },
                      {
                        value: "pickedUp",
                        label: "picked up",
                      },
                      {
                        value: "onTheWay",
                        label: "on the way",
                      },
                      {
                        value: "delivered",
                        label: "delivered",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="discount" label="Discount">
                  <Select
                    showSearch
                    placeholder="Select Discount"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="discountAmount" label="Discount Amount">
              <InputNumber
                addonAfter={selectAfter}
                placeholder="Enter Discount Amount"
                className="w-100"
                min={0}
                max={discountType === "PER" ? 100 : Infinity}
              />
            </Form.Item>

            <Form.Item name="products" label="Products">
              <Select
                onChange={(e) => changeTableData(e)}
                mode="multiple"
                popupClassName="custom-select"
                placeholder="Select Product"
                showSearch
                filterOption={(input, option) =>
                  (option?.name ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  {
                    label: (
                      <Row align="middle" gutter={[16, 0]}>
                        <Col>
                          <Image
                            preview={false}
                            alt="productName"
                            src={productImg}
                            width={32}
                            height={32}
                          />
                        </Col>
                        <Col>Iphone 3</Col>
                      </Row>
                    ),
                    options: [
                      {
                        name: "Red Iphone",
                        value: "redIphone",
                        label: (
                          <Row align="middle" gutter={[16, 0]}>
                            <Col>
                              <Image
                                preview={false}
                                alt="productName"
                                src={productImg}
                                width={32}
                                height={32}
                              />
                            </Col>
                            <Col>Red Iphone</Col>
                          </Row>
                        ),
                      },
                      {
                        name: "Green Iphone",
                        value: "greenIphone",
                        label: (
                          <Row align="middle" gutter={[16, 0]}>
                            <Col>
                              <Image
                                preview={false}
                                alt="productName"
                                src={productImg}
                                width={32}
                                height={32}
                              />
                            </Col>
                            <Col>Green Iphone</Col>
                          </Row>
                        ),
                      },
                      {
                        name: "Blue Iphone",
                        value: "blueIphone",
                        label: (
                          <Row align="middle" gutter={[16, 0]}>
                            <Col>
                              <Image
                                preview={false}
                                alt="productName"
                                src={productImg}
                                width={32}
                                height={32}
                              />
                            </Col>
                            <Col>Blue Iphone</Col>
                          </Row>
                        ),
                      },
                    ],
                  },
                  {
                    name: "Xiaomi",
                    value: "xiaomi",
                    label: (
                      <Row align="middle" gutter={[16, 0]}>
                        <Col>
                          <Image
                            preview={false}
                            alt="productName"
                            src={productImg}
                            width={32}
                            height={32}
                          />
                        </Col>
                        <Col>Xiaomi</Col>
                      </Row>
                    ),
                  },
                  {
                    label: (
                      <Row align="middle" gutter={[16, 0]}>
                        <Col>
                          <Image
                            preview={false}
                            alt="productName"
                            src={productImg}
                            width={32}
                            height={32}
                          />
                        </Col>
                        <Col>Samsung 2</Col>
                      </Row>
                    ),
                    options: [
                      {
                        name: "Red Samsung",
                        value: "redSamsung",
                        label: (
                          <Row align="middle" gutter={[16, 0]}>
                            <Col>
                              <Image
                                preview={false}
                                alt="productName"
                                src={productImg}
                                width={32}
                                height={32}
                              />
                            </Col>
                            <Col>Red Samsung</Col>
                          </Row>
                        ),
                      },
                      {
                        name: "Blue Samsung",
                        value: "blueSamsung",
                        label: (
                          <Row align="middle" gutter={[16, 0]}>
                            <Col>
                              <Image
                                preview={false}
                                alt="productName"
                                src={productImg}
                                width={32}
                                height={32}
                              />
                            </Col>
                            <Col>Blue Samsung</Col>
                          </Row>
                        ),
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>

            {tableData.length > 0 ? (
              <div style={{ margin: "2rem 0" }}>
                <Table
                  scroll={{ x: 900 }}
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                />
                <div className="table-price">
                  <Row gutter={[16, 0]} align="middle">
                    <Col xs={12}>
                      <Typography.Text className="fz-18 fw-500">Subtotal</Typography.Text>
                    </Col>
                    <Col xs={12}>
                      <Row justify="center">
                        <Statistic prefix="$" value={12000} />
                      </Row>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]} align="middle">
                    <Col xs={12}>
                      <Typography.Text className="fz-18 fw-500">Tax</Typography.Text>
                    </Col>
                    <Col xs={12}>
                      <Row justify="center">
                        <Statistic prefix="$" value={12000} />
                      </Row>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]} align="middle">
                    <Col xs={12}>
                      <Typography.Text className="fz-18 fw-500">Shipping</Typography.Text>
                    </Col>
                    <Col xs={12}>
                      <Row justify="center">
                        <Statistic prefix="$" value={12000} />
                      </Row>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]} align="middle">
                    <Col xs={12}>
                      <Typography.Text className="fz-18 fw-500">Discount</Typography.Text>
                    </Col>
                    <Col xs={12}>
                      <Row justify="center">
                        <Statistic prefix="$" value={12000} />
                      </Row>
                    </Col>
                  </Row>

                  <Row gutter={[16, 0]} align="middle">
                    <Col xs={12}>
                      <Typography.Text className="fz-18 fw-700">Total</Typography.Text>
                    </Col>
                    <Col xs={12}>
                      <Row justify="center">
                        <Statistic prefix="$" value={12000} />
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            ) : null}

            <Form.Item name="orderNote" label="Order Note">
              <Input.TextArea rows={6} placeholder="Enter Your Order Note" />
            </Form.Item>

            <Form.Item>
              <AddCancelButtons cancel={DrawerAPI.close} add={add} addName="Finish" />
            </Form.Item>
          </section>
        </Form>
      </main>
    </section>
  );
}
