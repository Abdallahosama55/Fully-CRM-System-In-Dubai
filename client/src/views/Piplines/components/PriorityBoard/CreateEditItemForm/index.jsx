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
const CreateitemForm = ({ onClose, form, id }) => {
  const { openNotificationWithIcon } = useNotification();
  const query = useQueryClient();

  const { addPriorityItem, isAddPriorityPending } = useAddPriorityItem({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      onClose();
      form.resetFields();
      query.invalidateQueries({ queryKey: [QUERY_KEY.PIPELINES_PRIORITY_ITEMS] });

      openNotificationWithIcon("success", "Added successfully");
    },
  });
  const { updatePriorityItem, isUpdatePriorityPending } = useUpdatePriorityItem(id, {
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      onClose();
      form.resetFields();
      query.invalidateQueries({ queryKey: [QUERY_KEY.PIPELINES_PRIORITY_ITEMS] });

      openNotificationWithIcon("success", "Updated successfully");
    },
  });
  const [fadeColor, setFadeColor] = useState(id ? form.getFieldValue("color") : "#000");

  form.setFieldValue("color", fadeColor);

  const onFinish = (values) => {
    console.log("Success:", values);
    id ? updatePriorityItem(values) : addPriorityItem(values);
  };

  return (
    <div>
      <div className="fz-20 fw-500 mb-1">{id ? "Update" : "Create"} Item Priority</div>
      <Form onFinish={onFinish} form={form} className="h-100" layout="vertical">
        <Form.Item
          label="Name"
          name="label"
          rules={[
            {
              required: true,
              message: "Please Enter Enter Priority Name",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="color">
          <div className="color-create-item-form">
            <Typography.Text>Color</Typography.Text>
            <ColorPicker onChange={setFadeColor} value={fadeColor} />
          </div>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>
        <AddCancelButtons
          addName={id ? "Update" : "Add"}
          addLoading={isAddPriorityPending || isUpdatePriorityPending}
          add={() => form.submit()}
          cancel={onClose}
          className="buttons-create-item"
        />
      </Form>
    </div>
  );
};
export default CreateitemForm;
