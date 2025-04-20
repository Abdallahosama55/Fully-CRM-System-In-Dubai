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
import "../styles.css";
import SelectLookups from "components/SelectLookups";
import useCompanyInfoMutation from "services/newSettings/Mutations/useCompanyInfoMutation";
import { useQueryClient } from "@tanstack/react-query";

const CompanyAddress = ({ data, queryKey }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const { editAddress, isPendingEditAddress } = useCompanyInfoMutation();
  const queryClient = useQueryClient();

  const onFinish = (values) => {
    editAddress({ id: data?.id, data: values })
      .then(() => {
        message.success("Company address updated Successfully");
        queryClient.invalidateQueries({ queryKey });
        setIsEditMode(false);
      })
      .catch(() => {
        message.error("Failed to update company address");
      });
  };

  const countryId = Form.useWatch("countryId", form);

  const handleToggleEditMode = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditMode(false);
  };

  const items = [
    {
      key: "1",
      label: "Country",
      children: isEditMode ? (
        <Form.Item name="countryId" className="w-100" initialValue={data?.country?.id}>
          <SelectLookups showSearch placeholder="Select country" type={"countries"} />
        </Form.Item>
      ) : (
        data?.country?.name || "-"
      ),
    },
    {
      key: "2",
      label: "State",
      children: isEditMode ? (
        <Form.Item name="stateId" className="w-100" initialValue={data?.state?.id}>
          <SelectLookups
            showSearch
            id={countryId}
            disabled={!countryId}
            placeholder="Select state"
            type={"states"}
          />
        </Form.Item>
      ) : (
        data?.state?.name || "-"
      ),
    },
    {
      key: "3",
      label: "Street",
      children: isEditMode ? (
        <Form.Item name="street" className="w-100">
          <Input defaultValue={data?.street} placeholder="Street" />
        </Form.Item>
      ) : (
        data?.street || "-"
      ),
    },
    {
      key: "4",
      label: "Zip Code",
      span: 2,
      children: isEditMode ? (
        <Form.Item name="zipCode" className="w-100">
          <Input defaultValue={data?.zipCode} placeholder="Zip Code" />
        </Form.Item>
      ) : (
        data?.zipCode || "-"
      ),
    },
    {
      key: "5",
      label: "Address",
      children: isEditMode ? (
        <Form.Item name="address" className="w-100">
          <Input defaultValue={data?.address} placeholder="Address" />
        </Form.Item>
      ) : (
        data?.address || "-"
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
                    loading={isPendingEditAddress}>
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

export default CompanyAddress;
