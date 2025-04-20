import { Button, Form, Input, Modal } from "antd";

export default function AddEditModal({ form, onFinish, isOpen, onCancel, isEditAction }) {
  return (
    <Modal centered={true} width={400} title={null} open={isOpen} onCancel={onCancel} footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {isEditAction ? <span>Edit </span> : <span>Add New </span>}
        Category
      </h3>

      <Form requiredMark="optional" form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }} // Default wrapper (input) column width
          name="name"
          label={
            <span>
              Category
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
            },
            {
              type: "string",
              min: 2,
            },
          ]}>
          <Input placeholder="Category name" />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button size="small" style={{ width: "48%" }} block onClick={onCancel}>
              Cancel
            </Button>
            <span style={{ width: 5 }}></span>
            <Button size="small" htmlType="submit" className="btn-add" style={{ width: "48%" }}>
              {isEditAction ? <span>Edit</span> : <span>Add</span>}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
