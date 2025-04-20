import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Card, message, Typography, Flex, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import useAddCommunity from "services/Community/Mutations/useAddCommunity";
import { getBase64 } from "utils/getBase64";

import "./styles.css";
import { axiosCatch } from "utils/axiosUtils";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useEditCommunity from "services/Community/Mutations/useEditCommunity";
import useGetCommunityById from "services/Community/Querys/useGetCommunityById";
import LoadingPage from "components/common/LoadingPage";

export default function AddEditCommunity({ isEdit = false }) {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState();
  const [bannerUrl, setBannerUrl] = useState();
  const navigate = useNavigate();
  const { communityId } = useParams();

  const getCommunityByIdQuery = useGetCommunityById(communityId, {
    select: (res) => res.data.data,
    enabled: !!communityId,
  });

  useEffect(() => {
    if (getCommunityByIdQuery.isSuccess) {
      form.setFieldsValue(getCommunityByIdQuery.data);
      getCommunityByIdQuery.data.tags &&
        form.setFieldValue("tags", getCommunityByIdQuery.data.tags.split(","));
      getCommunityByIdQuery.data.keywords &&
        form.setFieldValue("keywords", getCommunityByIdQuery.data.keywords.split(","));
      getCommunityByIdQuery.data.interests &&
        form.setFieldValue("interests", getCommunityByIdQuery.data.interests.split(","));
      getCommunityByIdQuery.data.logo && setLogoUrl(getCommunityByIdQuery.data.logo);
      getCommunityByIdQuery.data.banner && setBannerUrl(getCommunityByIdQuery.data.banner);
    }
    if (getCommunityByIdQuery.isError) {
      axiosCatch(getCommunityByIdQuery.error);
    }
  }, [
    form,
    getCommunityByIdQuery.data,
    getCommunityByIdQuery.error,
    getCommunityByIdQuery.isError,
    getCommunityByIdQuery.isSuccess,
  ]);

  const { mutate: addCommunity, isPending } = useAddCommunity({
    onSuccess: (data) => {
      navigate(`/community/${data.data.data.id}`);
      message.success("Community added successfully");
    },
    onError: (err) => axiosCatch(err),
  });

  const { mutate: editCommunity, isPending: isEditPending } = useEditCommunity(communityId, {
    onSuccess: () => {
      navigate(`/community/${communityId}`);
      message.success("Community edited successfully");
    },
    onError: (err) => axiosCatch(err),
  });

  if (isEdit) {
    form.setFieldsValue();
  }

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("decription", values.decription);
    formData.append("tags", values.tags);
    formData.append("interests", values.interests);
    formData.append("keywords", values.keywords);
    values.logo.fileList && formData.append("logo", values.logo.fileList[0].originFileObj);
    values.banner.fileList && formData.append("banner", values.banner.fileList[0].originFileObj);
    if (!logoUrl) {
      formData.append("logo", undefined);
    }
    if (!bannerUrl) {
      formData.append("banner", undefined);
    }
    if (isEdit) {
      editCommunity(formData);
    } else {
      addCommunity(formData);
    }
  };

  const logoProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    async onChange(info) {
      console.log("info", info);
      setLogoUrl(await getBase64(info.fileList[0].originFileObj));
    },
    accept: "image/*",
    height: 218,
    style: { background: "#27294205", border: logoUrl && "none" },
  };

  const bannerProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      console.log("file", file);
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    async onChange(info) {
      setBannerUrl(await getBase64(info.fileList[0].originFileObj));
    },
    accept: "image/*",
    height: 218,
    style: { background: "#27294205", border: logoUrl && "none" },
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button">
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </button>
  );

  if (getCommunityByIdQuery.isLoading) {
    return <LoadingPage />;
  }

  if (communityId && !getCommunityByIdQuery?.data) {
    return <>There's no community with this id</>;
  }

  return (
    <div className="add-edit-community-form-container">
      <Flex justify="space-between" gap={16} align="center">
        <Typography.Text className="fz-26 fw-700">
          {isEdit ? "Edit" : "Add"} {isEdit && getCommunityByIdQuery.data.name} Community
        </Typography.Text>

        <NavLink to={-1}>
          <Button type="dashed">Back</Button>
        </NavLink>
      </Flex>
      <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false} className="mt-1">
        <Card title="Logo & Banner" bordered={false}>
          <Typography.Text>logo</Typography.Text>
          <Flex justify="center">
            <Form.Item
              name="logo"
              rules={[
                {
                  required: true,
                  message: "Please upload logo",
                },
              ]}>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                action={false}
                beforeUpload={() => {
                  return false;
                }}
                showUploadList={false}
                {...logoProps}>
                {logoUrl ? (
                  <div
                    className="add-edit-community-image-holder"
                    style={{
                      background: `url(${logoUrl})`,
                    }}>
                    <div
                      className="add-edit-community-image-holder-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        form.setFieldValue("logo", undefined);
                        setLogoUrl(null);
                      }}>
                      <CloseOutlined />
                    </div>
                  </div>
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Flex>

          <Form.Item
            label="Banner"
            name="banner"
            rules={[
              {
                required: true,
                message: "Please upload banner",
              },
            ]}>
            <Upload
              name="banner"
              listType="picture-card"
              className="community-banner-upload"
              action={false}
              beforeUpload={() => {
                return false;
              }}
              showUploadList={false}
              {...bannerProps}>
              {bannerUrl ? (
                <div
                  className="add-edit-community-image-holder"
                  style={{
                    background: `url(${bannerUrl})`,
                  }}>
                  <div
                    className="add-edit-community-image-holder-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      form.setFieldValue("banner", undefined);
                      setBannerUrl(null);
                    }}>
                    <CloseOutlined />
                  </div>
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Card>
        <Card title="Community Info" bordered={false}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter community name",
              },
            ]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Flex vertical gap={2}>
            <Typography.Text>HeadLine</Typography.Text>
            <Typography.Text className="fz-12 gc">
              Briefly describe your current role or status
            </Typography.Text>
          </Flex>
          <Form.Item
            name="headline"
            rules={[
              {
                required: true,
                message: "Please enter community headline",
              },
            ]}>
            <Input placeholder="Enter your headline" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="decription"
            rules={[
              {
                required: true,
                message: "Please enter community description",
              },
            ]}>
            <Input.TextArea rows={6} placeholder="Enter your description" />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select mode="tags" placeholder="Type then press enter" />
          </Form.Item>
          <Form.Item label="Interests" name="interests">
            <Select mode="tags" placeholder="Type then press enter" />
          </Form.Item>
          <Form.Item label="Keywords" name="keywords">
            <Select mode="tags" placeholder="Type then press enter" />
          </Form.Item>
        </Card>

        <Button
          type="primary"
          htmlType="submit"
          className="submit-button"
          loading={isPending || isEditPending}>
          {isEdit ? "Edit" : "Add"}
        </Button>
      </Form>
    </div>
  );
}
