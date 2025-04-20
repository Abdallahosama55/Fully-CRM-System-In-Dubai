import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  ConfigProvider,
  Descriptions,
  Form,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import { useState } from "react";
import useCompanyInfoMutation from "services/newSettings/Mutations/useCompanyInfoMutation";
import "../styles.css";

const CompanyContactInfo = ({ data, queryKey }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const { editContactInfo, isPendingEditContactInfo } = useCompanyInfoMutation();
  const queryClient = useQueryClient();

  const onFinish = (values) => {
    editContactInfo({ id: data?.id, data: values })
      .then(() => {
        message.success("Company contact info updated Successfully");
        queryClient.invalidateQueries({ queryKey });
        setIsEditMode(false);
      })
      .catch(() => {
        message.error("Failed to update company contact info");
      });
  };

  const handleToggleEditMode = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditMode(false);
  };

  const items = [
    {
      key: "3",
      label: "Phone No.",
      children: isEditMode ? (
        <Form.Item name="mobile" className="w-100">
          <Input defaultValue={data?.mobile} placeholder="Phone No." />
        </Form.Item>
      ) : (
        data?.mobile || "-"
      ),
    },
    {
      key: "4",
      label: "Cellular",
      span: 2,
      children: isEditMode ? (
        <Form.Item name="cellular" className="w-100">
          <Input defaultValue={data?.cellular} placeholder="Cellular" />
        </Form.Item>
      ) : (
        data?.cellular || "-"
      ),
    },
    {
      key: "5",
      label: "Fax",
      children: isEditMode ? (
        <Form.Item name="fax" className="w-100">
          <Input defaultValue={data?.fax} placeholder="Fax" />
        </Form.Item>
      ) : (
        data?.fax || "-"
      ),
    },
  ];

  return (
    <Form className="company-info-setting" onFinish={onFinish} layout="vertical" form={form}>
      <Card bordered={false} className="info-card">
        <ConfigProvider
          theme={{
            components: {
              Descriptions: {
                itemPaddingBottom: 12,
              },
            },
          }}>
          <Descriptions
            column={2}
            layout="vertical"
            items={items}
            extra={
              isEditMode ? (
                <Space>
                  <Button size="small" type="default" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    htmlType="submit"
                    loading={isPendingEditContactInfo}>
                    Save
                  </Button>
                </Space>
              ) : (
                <Typography.Link onClick={handleToggleEditMode}>Edit</Typography.Link>
              )
            }
          />
        </ConfigProvider>
      </Card>
    </Form>
  );
};

export default CompanyContactInfo;
