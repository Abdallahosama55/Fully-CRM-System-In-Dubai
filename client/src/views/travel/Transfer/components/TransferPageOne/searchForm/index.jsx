import React, { useState } from "react";
import { Button, Col, Empty, Form, InputNumber, Row, Select, Space, Spin } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { PlusSVG } from "assets/jsx-svg";

import AddTransfer from "../AddTransfer";

import "./style.css";
import { useAirportsAccommodationList } from "services/travel/dashboard";
import { useDebounce } from "hooks/useDebounce";

const SearchForm = ({ DrawerAPI, setData, SearchAirportHotelTransfer }) => {
  const [form] = useForm();
  const pickupPoint = useWatch("pickupPoint", form);
  const [name, setName] = useState("");

  const debounce = useDebounce(name, 1000);

  const airportsAccommodationList = useAirportsAccommodationList(
    {
      page: 1,
      size: 5000,
      type: pickupPoint !== "ALL" ? pickupPoint : undefined,
      name: debounce,
    },
    {
      enabled: !!pickupPoint,
    },
  );

  const onFinish = (values) => {
    const data = {
      ...values,
      pickupPoint: values.pickupLocation && JSON.parse(values.pickupLocation).type,
      pickupLocation: values.pickupLocation && JSON.parse(values.pickupLocation).id,
    };

    SearchAirportHotelTransfer.mutate(data);
  };

  return (
    <Form onFinish={onFinish} className="transfer-page-one-form" layout="horizontal" form={form}>
      <Row gutter={[40, 16]}>
        <Col span={12}>
          <Form.Item name="pickupPoint" label="pickup Point">
            <Select
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              options={[
                { label: "All", value: "ALL" },
                { label: "Accomodation", value: "ACCOMODATION" },
                { label: "Airport", value: "AIRPORT" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="pickupLocation" label="From">
            <Select
              allowClear
              showSearch
              loading={airportsAccommodationList.isLoading}
              notFoundContent={
                airportsAccommodationList.isPending ? (
                  <Space style={{ display: "flex", justifyContent: "center" }}>
                    <Spin size="small" />
                  </Space>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
              }
              style={{
                width: "100%",
              }}
              onSearch={(value) => {
                setName(value);
              }}
              placeholder="Please select"
              options={airportsAccommodationList?.data?.rows?.map((item) => ({
                label: item.name,
                value: JSON.stringify(item),
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[40, 16]}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Form.Item label="Price" name="price">
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align="middle" justify="space-between">
        <Col span={4}>
          <Form.Item>
            <Button className="w-100" type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              icon={<PlusSVG />}
              className="w-100"
              type="primary"
              onClick={() => {
                DrawerAPI.open("50%");
                DrawerAPI.setDrawerContent(
                  <AddTransfer
                    DrawerAPI={DrawerAPI}
                    setData={setData}
                    SearchAirportHotelTransfer={SearchAirportHotelTransfer}
                  />,
                );
              }}>
              Add
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
