import React from "react";
import { Button, Modal, Select, Form } from "antd";
export default function DeleteMoveStageWarningModal({
  objToDelete,
  handleCancel,
  isWarningModalOpen,
  stageItems,
  deleteAndMoveStageItem,
  width = 400,
  isloading,
}) {
  const [form] = Form.useForm();
  const stagesList = stageItems
    .filter((item) => item.id != objToDelete?.id)
    .map((item) => ({
      value: item.id,
      label: item.label,
    }));

  const handleOk = (values) => {
    const objToDeleteAndMove = {
      stageIdToMoveTo: values?.stageIdToMoveTo,
      stageIdToRemove: objToDelete.id,
    };
    deleteAndMoveStageItem(objToDeleteAndMove);
  };
  return (
    <Modal
      destroyOnClose={true}
      centered={true}
      width={width}
      title={null}
      open={isWarningModalOpen}
      onCancel={handleCancel}
      footer={null}>
      <h3 style={{ textAlign: "center" }}>Warning</h3>
      <p style={{ marginTop: "1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          This stage have leads, please move the leads from this stage to another before delete.
        </div>
        <Form layout="vertical" form={form} onFinish={handleOk}>
          <Form.Item
            label={"Stage to move"}
            name="stageIdToMoveTo"
            rules={[{ required: true, message: "Please select a stage" }]}>
            <Select style={{ width: "100%" }} options={stagesList} />
          </Form.Item>
        </Form>
      </p>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "2rem" }}>
        <Button size="small" style={{ width: "48%" }} block onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          loading={isloading}
          size="small"
          style={{ width: "48%", backgroundColor: "#E81224", color: "#FFFFFF" }}
          danger
          onClick={form.submit}>
          Move and Delete
        </Button>
      </div>
    </Modal>
  );
}
