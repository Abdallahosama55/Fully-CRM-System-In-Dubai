import { Button, Form, Input, Modal } from "antd";
import useMetaverseFrameFolders from "services/meetings/useMetaverseFrameFolders";

export default function RenameFolderModal({ isOpen, folderId, onFolderRenamed, onCancel }) {
  const [form] = Form.useForm();
  const { renameFolder, isPendingRenameFolder } = useMetaverseFrameFolders();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleRenameFolder = (formData) => {
    renameFolder({ folderId, name: formData.name }).then(() => {
      onFolderRenamed(folderId, formData.name);
      handleCancel();
    });
  };

  return (
    <Modal
      centered={true}
      width={400}
      title={null}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        <span>Rename Folder</span>
      </h3>

      <Form requiredMark="optional" form={form} onFinish={handleRenameFolder} autoComplete="off">
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
            loading={isPendingRenameFolder}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
