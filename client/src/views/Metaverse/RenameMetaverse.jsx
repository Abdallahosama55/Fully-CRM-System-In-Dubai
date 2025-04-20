import { Button, Form, Input, Row, notification } from "antd";
import { useState } from "react";
import DimensionsService from "services/dimensions.service";
import { axiosCatch } from "utils/axiosUtils";

export default function RenameMetaverse({
  renameModal,
  setRenameModal,
  setDimensions,
}) {
  const [form] = Form.useForm();
  const [editLoading, setEditLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setEditLoading(true);
      const res = await DimensionsService.renameDimension(renameModal.id, {
        name: values.name,
      });
      const data = res.data.data;
      setDimensions((prev) => {
        const dimIndex = prev.findIndex((dim) => dim.id === renameModal.id);
        let newDim = [...prev];
        newDim[dimIndex].name = data.name;
        return newDim;
      });
      notification.success({ message: "Dimension Renamed Successfully ✅" });
    } catch (err) {
      axiosCatch(err);
    } finally {
      setEditLoading(false);
      setRenameModal({ open: false });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Dimension Name"
        rules={[{ required: true, message: "Please Enter Dimension Name" }]}
        initialValue={renameModal.name}
      >
        <Input placeholder="Enter Here" />
      </Form.Item>

      <Form.Item>
        <Row justify="end">
          <Button type="primary" htmlType="submit" loading={editLoading}>
            Done
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}
