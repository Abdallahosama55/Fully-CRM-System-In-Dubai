import { useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Descriptions,
  Form,
  Input,
  Select,
  Space,
  Spin,
  Switch,
  Typography,
  Upload,
  message,
} from "antd";
import { ArrowDownSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import { useState } from "react";
import useCompanyInfoMutation from "services/newSettings/Mutations/useCompanyInfoMutation";
import "../styles.css";
import { API_BASE } from "services/config";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const CompanyInfo = ({ data, queryKey }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [iconInfo, setIconInfo] = useState({ loading: false, imgUrl: "" });

  const [form] = Form.useForm();
  const { editMainInfo, isPendingEditMainInfo } = useCompanyInfoMutation();
  const queryClient = useQueryClient();

  const onFinish = (values) => {
    localStorage.setItem("isOfflineMetaverse", values.isOfflineMetaverse);
    editMainInfo({ id: data?.id, data: values })
      .then(() => {
        message.success("Company information updated Successfully");
        queryClient.invalidateQueries({ queryKey });
        setIsEditMode(false);
      })
      .catch(() => {
        message.error("Failed to update company information");
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
      key: "1",
      label: "ID",
      children: isEditMode ? (
        <Form.Item name="idNumber" initialValue={data?.idNumber} className="w-100">
          <Input defaultValue={data?.idNumber} placeholder="Company ID" />
        </Form.Item>
      ) : (
        data?.idNumber || "-"
      ),
    },
    {
      key: "2",
      label: "Organisation Email",
      children: isEditMode ? (
        <Form.Item
          name="email"
          initialValue={data?.email}
          className="w-100"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
          ]}>
          <Input defaultValue={data?.email} placeholder="Email" type="email" />
        </Form.Item>
      ) : (
        data?.email || "-"
      ),
    },
    {
      key: "3",
      label: "Organisation Type",
      children: isEditMode ? (
        <Form.Item name="sectorType" initialValue={data?.sectorType} className="w-100">
          <Select
            defaultValue={data?.sectorType}
            placeholder="Organisation Type"
            suffixIcon={<ArrowDownSVG />}>
            <Select.Option value="Health">Health</Select.Option>
            <Select.Option value="Education">Education</Select.Option>
            <Select.Option value="Real estate">Real estate</Select.Option>
            <Select.Option value="Tourism and travel">Tourism and travel</Select.Option>
          </Select>
        </Form.Item>
      ) : (
        data?.sectorType || "-"
      ),
    },
    {
      key: "4",
      label: "Agreement Starting Date",
      span: 2,
      children: data?.agreementStartingDate
        ? dayjs(data?.agreementStartingDate).format("DD MMM YYYY")
        : "-",
    },
    {
      key: "5",
      label: "Agreement Period",
      children: data?.agreementPeriod || "-",
    },
    {
      key: "6",
      label: "Agreement Ending Date",
      children: data?.agreementEndingDate || "-",
    },
    {
      key: "7",
      label: "Use Offline Metaverse",
      children: isEditMode ? (
        <Form.Item
          valuePropName="checked"
          initialValue={localStorage.getItem("isOfflineMetaverse") === "true" ? true : false}
          className="w-100"
          name="isOfflineMetaverse"
          labelAlign="left">
          <Switch />
        </Form.Item>
      ) : (
        <></>
      ),
    },
    {
      key: "8",
      label: "Description",
      children: isEditMode ? (
        <Form.Item initialValue={data?.description} className="w-100" name="description">
          <Input.TextArea rows={4} placeholder="write descrption here" />
        </Form.Item>
      ) : (
        <>{data?.description || "-"}</>
      ),
    },
    {
      key: "9",
      label: "meta icon",
      children: isEditMode ? (
        <Form.Item initialValue={data?.metaIcon} className="w-100" name="metaIcon">
          <Upload
            action={API_BASE + "vindo/file-upload"}
            accept="image/*"
            showUploadList={false}
            headers={{ Authorization: axios.defaults.headers.authorization }}
            onChange={(info) => {
              if (info.file.status === "uploading") {
                setIconInfo((prev) => ({
                  ...prev,
                  loading: true,
                }));
                return;
              }

              if (info.file.status === "done") {
                form.setFieldValue("metaIcon", info?.file?.response?.data);
                setIconInfo((prev) => ({
                  ...prev,
                  loading: false,
                  imgUrl: info?.file?.response?.data,
                }));
                message.success(`image uploaded successfully`);
              } else if (info.file.status === "error") {
                message.error(`image upload failed.`);
                setIconInfo((prev) => ({ ...prev, loading: false }));
              }
            }}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            <div
              style={{
                display: "flex",
                "justify-content": "center",
                " margin-top": "10px",
              }}>
              {iconInfo.loading ? (
                <Spin />
              ) : (
                <>
                  {data?.metaIcon && (
                    <Avatar shape="square" size={72} src={iconInfo.imgUrl || data?.metaIcon} />
                  )}
                </>
              )}
            </div>
          </Upload>
        </Form.Item>
      ) : (
        <>{data?.metaIcon ? <Avatar shape="square" size={50} src={data?.metaIcon} /> : <>-</>}</>
      ),
    },
    {
      key: "10",
      label: "meta short description",
      children: isEditMode ? (
        <Form.Item
          initialValue={data?.metaShortDescription}
          className="w-100"
          name="metaShortDescription">
          <Input.TextArea rows={4} placeholder="write meta short description here" />
        </Form.Item>
      ) : (
        <>{data?.metaShortDescription || <>-</>}</>
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
                    loading={isPendingEditMainInfo}>
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

export default CompanyInfo;
