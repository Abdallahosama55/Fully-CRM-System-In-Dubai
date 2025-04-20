import { Form, Input } from "antd";
import React, { Fragment } from "react";

const ItemInformation = () => {
  return (
    <Fragment>
      <Form.Item required rules={[{ required: true }]} label="Title" name="title">
        <Input placeholder="write Title"></Input>
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input placeholder="write Description" />
      </Form.Item>
    </Fragment>
  );
};
export default ItemInformation;
