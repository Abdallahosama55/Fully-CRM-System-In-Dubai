import { Form, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

const SelectCustomerModal = ({
  isOpen,
  close,
  participants,
  handleOk: handleOkParent = () => {},
}) => {
  const [form] = useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleOkParent(values.participantId);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <Modal title="Add To Cart" open={isOpen} onOk={handleOk} onCancel={close}>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Select Participant"
          name="participantId"
          rules={[{ required: true, message: "Select client" }]}>
          <Select
            optionLabelProp="label"
            // Customize dropdown items
            dropdownRender={(menu) => <div>{menu}</div>}
            options={participants.map((participant) => ({
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={participant?.profileImage}
                    alt={participant?.name}
                    style={{ width: 30, height: 30, borderRadius: "50%", marginRight: 8 }}
                  />
                  {participant?.name}
                </div>
              ),
              value: participant?.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SelectCustomerModal;
