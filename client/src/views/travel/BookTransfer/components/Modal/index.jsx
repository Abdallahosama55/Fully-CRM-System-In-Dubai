import { Form, Input, Modal } from "antd";

const TransferModal = ({ isAddClientModalOpen, setIsAddClientModalOpen, form }) => {
  const [formModal] = Form.useForm();
  return (
    <Modal
      title="Add New Client"
      open={isAddClientModalOpen}
      onCancel={() => setIsAddClientModalOpen(false)}
      onOk={() => {
        form.setFieldsValue({
          holderEmail: formModal.getFieldsValue().email,
          holderName: formModal.getFieldsValue().fullName,
          clientAccountId: formModal.getFieldsValue().fullName,
        });
        setIsAddClientModalOpen(false);
      }}>
      <Form form={formModal} layout="vertical">
        <Form.Item
          name="fullName"
          label="Name"
          style={{ marginBottom: 8 }}
          rules={[{ required: true, message: "Please input the client's name!" }]}>
          <Input placeholder="Enter client's name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject("Enter client email");
                }
                // Regular expression for validating email format
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(value)) {
                  return Promise.reject("Enter a valid email");
                }

                return Promise.resolve();
              },
            },
          ]}>
          <Input placeholder="Enter client's email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransferModal;
