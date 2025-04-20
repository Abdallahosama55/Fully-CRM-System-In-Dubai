import { Col, Form, Input, Row, Select, Spin } from "antd";
import React, { useEffect } from "react";
import useGetPriceModelPrice from "services/pricingModule/Queries/useGetPriceModelPrice";

const EditPricing = ({ form, isLoading, officeId, buyerGroupId, id, inventoryType, currency }) => {
  const oldPrice = useGetPriceModelPrice(
    { supplierId: id, buyerGroupId, inventoryType },
    { enabled: !!id },
  );

  useEffect(() => {
    if (officeId) {
      form.setFieldValue("officeId", officeId);
    }

    if (buyerGroupId) {
      form.setFieldValue("buyerGroupId", buyerGroupId);
    }

    if (buyerGroupId) {
      form.setFieldValue("id", id);
    }
  }, [form, officeId, buyerGroupId, id]);

  useEffect(() => {
    if (oldPrice?.data) {
      form.setFieldsValue({ ...oldPrice.data });
    }
  }, [form, oldPrice.data, id]);

  if (isLoading || oldPrice.isLoading) {
    return (
      <div className="center-items" style={{ height: "300px" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className="mb-1">
      <Form form={form} layout="vertical">
        <Form.Item hidden name={"officeId"} initialValue={officeId} />
        <Form.Item hidden name={"buyerGroupId"} initialValue={buyerGroupId} />
        <Form.Item hidden name={"id"} initialValue={id} />
        <Form.Item hidden name={"supplierId"} initialValue={id} />
        <Form.Item hidden name={"inventoryType"} initialValue={inventoryType} />

        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              label="Percent"
              name="percent"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("Percent is required");
                    }
                    if (value && Number(value) < 0) {
                      return Promise.reject("Percent must be greater than 0");
                    }
                    if (value && Number(value) > 100) {
                      return Promise.reject("Percent must less than 100");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <Input
                type={"number"}
                suffix={
                  <span style={{ color: "#444CE7" }} className="fz-12 fw-700">
                    %
                  </span>
                }
                min={0}
                max={100}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Amount is required" }]}>
              <Input
                type={"number"}
                suffix={
                  <span style={{ color: "#444CE7" }} className="fz-12 fw-700">
                    {currency}
                  </span>
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Select Type"
              name="type"
              rules={[{ required: true, message: "type is required" }]}>
              <Select
                options={[
                  { label: "per person", value: "per person" },
                  { label: "per booking", value: "per booking" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditPricing;
