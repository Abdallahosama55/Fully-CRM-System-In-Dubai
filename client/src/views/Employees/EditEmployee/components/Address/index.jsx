import React from "react";
import { Col, Form, Input, Row, Select } from "antd";
// styles
import "./styles.css";
import SelectLookups from "components/SelectLookups";

const defaultValues = {
  street: "",
  city: "",
  state: "",
  country: "",
  zip_code: "",
};
const Address = ({ form, countryId, statesId }) => {
  console.log("countryId-->", countryId);
  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Form.Item label="Street" name={["address", "street"]}>
          <Input placeholder="Enter Street" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Country" name={["address", "countryId"]}>
          <SelectLookups
            onChange={(value) => {
              form?.setFieldValue(["address", "stateId"], undefined);
              form?.setFieldValue(["address", "cityId"], undefined);
            }}
            showSearch
            placeholder="Select country"
            type={"countries"}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item initialValue={defaultValues.state} label="State" name={["address", "stateId"]}>
          <SelectLookups
            showSearch
            onChange={(value) => {
              form?.setFieldValue(["address", "cityId"], undefined);
            }}
            id={countryId}
            disabled={!countryId}
            placeholder="Select states"
            type={"states"}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="City" name={["address", "cityId"]}>
          <SelectLookups
            showSearch
            id={statesId}
            disabled={!statesId}
            placeholder="Select City"
            type={"cites"}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Zip Code"
          name={["address", "zip_code"]}
          initialValue={defaultValues.zip_code}>
          <Input placeholder="Enter Zip Code" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Address;
