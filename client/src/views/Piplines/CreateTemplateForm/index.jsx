import { Form, Input, Typography } from "antd";
import { useState } from "react";
import "./styles.css";
import AddCancelButtons from "components/common/AddCancelButtons";
import ColorPicker from "components/common/ColorPicker";
import TextArea from "antd/es/input/TextArea";
import useAddPriorityItem from "services/Pipelines/Mutations/useAddPriorityItem";
import useUpdatePriorityItem from "services/Pipelines/Mutations/useUpdatePriorityItem";
import { useNotification } from "context/notificationContext";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import useAddPipelineTemplate from "services/pipelineTemplate/Mutations/useAddPipelineTemplate";
const CreateTemplateForm = ({ onClose, form }) => {
  const { openNotificationWithIcon } = useNotification();
  const query = useQueryClient();

  const { addPipelineTemplate, isPending: isPendingAddPipelineTemplate } = useAddPipelineTemplate({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      onClose();
      form.resetFields();
      query.invalidateQueries({ queryKey: [QUERY_KEY.PIPELINES_TEMPLATES] });

      openNotificationWithIcon("success", "Added successfully");
    },
  });

  const onFinish = (values) => {
    console.log("Success:", values);

    addPipelineTemplate(values);
  };

  return (
    <div>
      <div className="fz-20 fw-500 mb-1">Create New Template</div>
      <Form onFinish={onFinish} form={form} className="h-100" layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please Enter Enter Template Name",
            },
          ]}>
          <Input />
        </Form.Item>

        <AddCancelButtons
          addName={"Add"}
          addLoading={isPendingAddPipelineTemplate}
          add={() => form.submit()}
          cancel={onClose}
          className="buttons-create-item"
        />
      </Form>
    </div>
  );
};
export default CreateTemplateForm;
