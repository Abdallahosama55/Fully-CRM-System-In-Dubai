import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import { axiosCatch } from "utils/axiosUtils";
import { useDrawer } from "context/drawerContext";
import { useNotification } from "context/notificationContext";
import ColorPicker from "components/common/ColorPicker";
import useAddLabel from "services/newSettings/Mutations/useAddLabel";
import { QUERY_KEY } from "services/constants";
import useUpdateLabel from "services/newSettings/Mutations/useUpdateLabel";

const AddEditLabels = ({ labelData }) => {
  const { id, name, color } = labelData || {};
  const DrawerAPI = useDrawer();
  const [form] = Form.useForm();
  const query = useQueryClient();

  const [fadeColor, setFadeColor] = useState(color);
  const { openNotificationWithIcon } = useNotification();

  useEffect(() => {
    if (id) {
      form.setFieldsValue({ name });
      setFadeColor(color);
    }
  }, [id]);

  const { addLabel, isAddLabelPending } = useAddLabel({
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
    onSuccess: (data) => {
      query.setQueryData([QUERY_KEY.LABELS], (prev) => ({
        ...prev,
        data: {
          ...prev.data,
          data: [data.data.data, ...prev.data.data],
        },
      }));
      openNotificationWithIcon("success", "Added successfully");
      DrawerAPI.close();
    },
  });

  const { updateLabel, isUpdateLabelPending } = useUpdateLabel(id, {
    onSuccess: (data, payload) => {
      query.setQueryData([QUERY_KEY.LABELS], (prev) => ({
        ...prev,
        data: {
          ...prev.data,
          data: prev.data.data?.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        },
      }));
      openNotificationWithIcon("success", `Edited successfully`);
      DrawerAPI.close();
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });

  const onFinish = async (values) => {
    const data = {
      name: form.getFieldValue().name,
      color: fadeColor,
    };

    try {
      id ? await updateLabel(data) : await addLabel(data);
    } catch (err) {
      axiosCatch(err);
    }
  };

  return (
    <Row style={{ flexDirection: "column", minHeight: "100%" }} gutter={[0, 12]}>
      <Col flex={1}>
        <Row style={{ marginBottom: "12px" }}>
          <Typography.Title level={3}>{id ? `Edit ${name}` : "Add New Label"}</Typography.Title>
        </Row>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Label Name"
            name="name"
            rules={[{ required: true, message: "Please Enter Label Name" }]}>
            <Input placeholder="Write Here" />
          </Form.Item>

          <Row gutter={[8, 8]}>
            <Col span={4} style={{ display: "flex", alignItems: "center" }}>
              Label Color
            </Col>
            <Col span={12}>
              <ColorPicker onChange={setFadeColor} value={fadeColor} />
            </Col>
          </Row>
        </Form>
      </Col>
      <Col>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button
              type="ghost"
              onClick={() => {
                DrawerAPI.close();
              }}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              loading={isAddLabelPending || isUpdateLabelPending}
              onClick={() => form.submit()}
              type="primary"
              style={{ background: "#272942" }}>
              {id ? "Edit" : "Save"}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default AddEditLabels;
