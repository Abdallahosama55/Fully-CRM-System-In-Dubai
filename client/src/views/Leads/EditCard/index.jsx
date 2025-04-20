import { Col, Form, Input, Row } from "antd";
import { useState } from "react";
import AddCancelButtons from "components/common/AddCancelButtons";
import ColorPicker from "components/common/ColorPicker";

import "./styles.css";
import { useNotification } from "context/notificationContext";
import useUpdateStageItem from "services/Pipelines/Mutations/useUpdateStageItem";
function Index({ cartsData, items, setItems }) {
  const { openNotificationWithIcon } = useNotification();

  const [form] = Form.useForm();

  const [fadeColor, setFadeColor] = useState(cartsData?.color);
  const { updateStageItem, isPending: isUpdateStageItemPending } = useUpdateStageItem({
    onError: (error) => {
      var { errors } = error?.response.data;
      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payloadId) => {
      openNotificationWithIcon("success", "Updated successfully");
    },
  });

  const onFinish = (values) => {
    setItems(
      items.map((item) => {
        if (item.id === cartsData.id) {
          return {
            ...item,
            isEdit: false,
            label: values.label,
            color: fadeColor,
          };
        } else {
          return { ...item };
        }
      }),
    );
    values = { ...values, color: fadeColor };
    //must call BE for edit card "values"
    var dataToUpdate = {
      id: cartsData.id,
      ...values,
    };
    updateStageItem(dataToUpdate);
  };

  const cancel = (e) => {
    e.preventDefault();
    const newItems = items.map((item) => {
      if (item.id === cartsData.id) {
        return { ...item, isEdit: false };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className="piplines-cart-form">
      <div className="fz-13">Item Name</div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={0} justify={"space-between"} align={"top"}>
          <Col span={18}>
            <Form.Item
              name={"label"}
              initialValue={cartsData?.label}
              rules={[{ required: true, message: "Please Enter the type" }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={4}>
            <ColorPicker value={fadeColor} onChange={setFadeColor} />
          </Col>
        </Row>
        <div className="mt-1">
          <AddCancelButtons
            add={() => form.submit()}
            cancel={cancel}
            addName={"Update"}
            className="buttons"
          />
        </div>
      </Form>
    </div>
  );
}

export default Index;
