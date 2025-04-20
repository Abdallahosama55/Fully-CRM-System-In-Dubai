import React from "react";
import { Button, Modal, Form, Input, Switch } from "antd";
export default function AddSourceModal({
  form,
  onFinish,
  isAddSourceModalOpen,
  handleAddSourceModalCancel,
  addIsPending,
}) {
  return (
    <Modal
      destroyOnClose={true}
      centered={true}
      width={400}
      title={null}
      open={isAddSourceModalOpen}
      onCancel={handleAddSourceModalCancel}
      footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <span>Add New Source</span>
      </h3>

      <Form
        layout="vertical"
        requiredMark="optional"
        form={form}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          name="name"
          label={
            <span>
              Source name
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
            },
            {
              type: "string",
              min: 3,
            },
          ]}>
          <Input placeholder="Source name" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              size="small"
              style={{ width: "48%" }}
              block
              onClick={handleAddSourceModalCancel}>
              Cancel
            </Button>
            <span style={{ width: 5 }}></span>
            <Button
              loading={addIsPending}
              size="small"
              htmlType="submit"
              className="btn-add"
              style={{ width: "48%" }}>
              Add
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
