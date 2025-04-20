import { Button, Form, Input, Modal } from "antd";
import { PlusSVG } from "assets/jsx-svg";
import { useState } from "react";
import useMetaverseFrameFolders from "services/meetings/useMetaverseFrameFolders";

export default function CreateFolderModal({ currentSelectedFolder, onFolderCreated }) {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const { addFolder, isPendingAddFolder } = useMetaverseFrameFolders();

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCreateFolder = (formData) => {
    addFolder({ parentId: currentSelectedFolder?.id, name: formData.name }).then(({ data }) => {
      onFolderCreated(data?.data);
      handleCancel();
    });
  };

  return (
    <>
      <Button type="primary" size="small" className="fz-12" onClick={handleOpenModal}>
        <PlusSVG width={10} height={10} style={{ marginRight: 8 }} />
        Create Folder
      </Button>
      <Modal
        centered={true}
        width={400}
        title={null}
        open={isOpen}
        onCancel={handleCancel}
        footer={null}>
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span>Create Folder</span>
        </h3>

        <Form requiredMark="optional" form={form} onFinish={handleCreateFolder} autoComplete="off">
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="name"
            label={
              <span>
                Folder Name
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
            <Input placeholder="Folder Name" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
              loading={isPendingAddFolder}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
