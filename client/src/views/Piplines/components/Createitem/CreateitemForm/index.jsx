import { Form, Input, Typography } from "antd";
import { useState } from "react";
import "./styles.css";
import AddCancelButtons from "components/common/AddCancelButtons";
import ColorPicker from "components/common/ColorPicker";
import useAddStageItem from "services/Pipelines/Mutations/useAddStageItem";
import { useNotification } from "context/notificationContext";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
const CreateitemForm = ({ onClose, onAddStageItem, form, isAddPending = false }) => {
  const { openNotificationWithIcon } = useNotification();
  const query = useQueryClient();

  const [fadeColor, setFadeColor] = useState("#000000");
  form.setFieldValue("color", fadeColor);

  const onFinish = (values) => {
    onAddStageItem(values);
    //must call BE to add "values"
    // addStageItem(values);
  };

  return (
    <div>
      <div className="fz-20 fw-500 mb-1">Create Item Stage</div>
      <Form onFinish={onFinish} form={form} className="h-100" layout="vertical">
        <Form.Item label="Name" name="label">
          <Input />
        </Form.Item>
        <Form.Item name="color">
          <div className="color-create-item-form">
            <Typography.Text>Color</Typography.Text>
            <ColorPicker onChange={setFadeColor} />
          </div>
        </Form.Item>
        <AddCancelButtons
          addLoading={isAddPending}
          add={() => form.submit()}
          cancel={onClose}
          className="buttons-create-item"
        />
      </Form>
    </div>
  );
};
export default CreateitemForm;
