import { Form, Input, Modal } from "antd";
import { useNotification } from "context/notificationContext";
import UploadFile from "components/common/UploadFile";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useAddAttachments from "services/Desk/Mutations/useAddAttachments";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import userContext from "context/userContext";

const ModalUploadFile = ({ trigger, isSharedForSignature }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const { openNotificationWithIcon } = useNotification();
  const { user } = useContext(userContext);

  const { addAttachment, isPending } = useAddAttachments(id ?? user.employeeDeskId, {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.DESK_ATTACHMENTS, id ?? user.employeeDeskId], (prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            data: [...prev.data.data, data.data.data],
          },
        };
      });
      openNotificationWithIcon("success", "Uploaded file has been  successfully");
      setOpen(false);
    },
  });
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    console.log(e);
    form.submit();
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleSubmit = async (data) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("attachment", data?.file?.[0]?.originFileObj);
    form.append("sharedForSigniture", isSharedForSignature);

    await addAttachment(form);
  };
  return (
    <>
      {React.cloneElement(trigger, {
        onClick: showModal,
      })}
      <Modal
        title="Basic Modal"
        destroyOnClose
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: isPending }}
        cancelButtonProps={{ disabled: isPending }}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="File Name"
            rules={[
              {
                required: true,
              },
            ]}
            name="name"
            required>
            <Input placeholder="write file name here" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="file">
            <UploadFile maxCount={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUploadFile;
