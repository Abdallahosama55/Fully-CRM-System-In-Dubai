import { Button, Form, Input, Row, notification } from "antd";
import { useState } from "react";
import DimensionDeskService from "services/dimension-desk.service";
import { axiosCatch } from "utils/axiosUtils";
import DesksList from "./DeskList";

export default function AddDesk({ id, setVerseModalOpen }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await DimensionDeskService.add({
        name: values.name,
        companyDimensionId: id,
      });
      notification.success({ message: "Desk Added Successfully" });
      setVerseModalOpen({
        open: true,
        render: (
          <DesksList
            setVerseModalOpen={setVerseModalOpen}
            companyDimensionId={id}
          />
        ),
      });
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     if (id) {
  //       (async () => {
  //         const res = await DimensionDeskService.add({ name, companyDimensionId })
  //       })();
  //     }
  //   }, [id]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Desk Name"
        name="name"
        rules={[{ required: true, message: "Please Enter Desk Name" }]}
      >
        <Input placeholder="Enter Desk Name" />
      </Form.Item>

      <Form.Item>
        <Row justify="end">
          <Button htmlType="submit" type="primary" loading={loading}>
            Done
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}
