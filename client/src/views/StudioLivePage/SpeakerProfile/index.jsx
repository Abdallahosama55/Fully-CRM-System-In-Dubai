import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  message,
  Row,
  Skeleton,
  Typography,
  Upload,
} from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { getBase64 } from "utils/getBase64";
import { CloseOutlined } from "@ant-design/icons";
import userContext from "context/userContext";
import { axiosCatch } from "utils/axiosUtils";
import useGetSpeakerProfile from "services/Events/Querys/useGetSpeakerProfile";
import useUpdateSpeakerProfile from "services/Events/Mutations/useUpdateSpeakerProfile";

import "./styles.css";
import useFileUpload from "services/FileUpload/Mutations/useFileUpload";

export default function SpeakerProfile({ setShowSpeakerProfile }) {
  const [form] = Form.useForm();
  const { user } = useContext(userContext);
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState();
  const { liveId: eventId } = useParams();

  const getSpeakerProfileQuery = useGetSpeakerProfile(eventId, 58, {
    enabled: !!58,
    select: (res) => res.data.data,
  });

  const updateSpeakerProfileMutation = useUpdateSpeakerProfile(eventId, 58, {
    onSuccess: (data) => {
      queryClient.setQueryData(getSpeakerProfileQuery.queryKey, (prev) => {
        prev.data.data = data.data.data;
        return { ...prev };
      });
      message.success("You'r profile has beed updated successfully");
    },
    onError: (err) => axiosCatch(err),
  });

  useEffect(() => {
    if (getSpeakerProfileQuery.isError) {
      axiosCatch(getSpeakerProfileQuery.error);
      setShowSpeakerProfile(false);
    }
    if (getSpeakerProfileQuery.isSuccess && getSpeakerProfileQuery.data) {
      form.setFieldsValue(getSpeakerProfileQuery.data);
      if (getSpeakerProfileQuery.data.socialMediaLinks) {
        Object.keys(getSpeakerProfileQuery.data.socialMediaLinks)?.map((socialMedia) => {
          form.setFieldValue(
            socialMedia.toLowerCase(),
            getSpeakerProfileQuery.data.socialMediaLinks[socialMedia],
          );
        });
      }
      setImageUrl(getSpeakerProfileQuery.data.image);
    }
  }, [
    form,
    getSpeakerProfileQuery.data,
    getSpeakerProfileQuery.error,
    getSpeakerProfileQuery.isError,
    getSpeakerProfileQuery.isSuccess,
    setShowSpeakerProfile,
  ]);

  const onFinish = (values) => {
    updateSpeakerProfileMutation.mutate({
      ...getSpeakerProfileQuery.data,
      ...values,
      image: imageUrl,
      eventSummaryContents: [values.eventSummaryContents],
      socialMediaLinks: {
        Facebook: values.facebook,
        Twitter: values.twitter,
        Linkedin: values.linkedin,
        Instagram: values.instagram,
        Youtube: values.youtube,
        Other: values.other,
      },
    });
  };

  const { mutate: uploadFile, isPending: uploadFileLoading } = useFileUpload({
    onSuccess: (data) => {
      setImageUrl(data.data.data);
      message.info("File uplaoded successfully");
    },
    onError: (err) => axiosCatch(err),
  });

  const props = {
    name: "file",
    multiple: false,
    action: false,
    maxCount: 1,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    async onChange(info) {
      const formData = new FormData();
      formData.append("file", info.fileList[0].originFileObj);
      uploadFile(formData);
    },
    accept: "image/*",
    height: 218,
    style: { background: "#27294205", border: imageUrl && "none" },
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

  if (getSpeakerProfileQuery.isLoading) {
    return (
      <div className="live-speaker-profile-form">
        <Skeleton />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            controlHeight: 30,
            borderRadius: 26,
          },
        },
      }}>
      <Form className="live-speaker-profile-form" onFinish={onFinish} form={form} layout="vertical">
        <Row gutter={[64, 32]} className="w-100" justify="space-between">
          <Col xs={24} xxl={3}>
            <Form.Item name="speakerImage">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                action={false}
                beforeUpload={() => {
                  return false;
                }}
                showUploadList={false}
                {...props}>
                {imageUrl ? (
                  <div
                    className="profile-image-holder"
                    style={{
                      background: `url(${imageUrl})`,
                    }}>
                    <div
                      className="profile-image-holder-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        form.setFieldValue("speakerImage", undefined);
                        setImageUrl(null);
                      }}>
                      <CloseOutlined />
                    </div>
                  </div>
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} xxl={7}>
            <Row gutter={[0, 16]}>
              <Col xs={24}>
                <Typography.Text className="fz-16 fw-600">Personal</Typography.Text>
                <Row gutter={[0, 8]} className="mt-1">
                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Title</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="title" noStyle>
                          <Input placeholder="Enter title" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Full Name</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="name" noStyle>
                          <Input placeholder="Enter full name" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={24}>
                <Typography.Text className="fz-16 fw-600">Professional</Typography.Text>
                <Row gutter={[0, 8]} className="mt-1">
                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Company</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="company" noStyle>
                          <Input placeholder="Enter company" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Job Title</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="jobTitle" noStyle>
                          <Input placeholder="Enter job title" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={24}>
                <Typography.Text className="fz-16 fw-600">Address</Typography.Text>
                <Row gutter={[0, 8]} className="mt-1">
                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>City</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="city" noStyle>
                          <Input placeholder="Enter city" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Country</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="country" noStyle>
                          <Input placeholder="Enter country" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={24}>
                <Typography.Text className="fz-16 fw-600">Communication</Typography.Text>
                <Row gutter={[0, 8]} className="mt-1">
                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Email</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="email" noStyle>
                          <Input placeholder="Enter email" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Mobile</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="mobile" noStyle>
                          <Input placeholder="Enter mobile" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Website</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="website" noStyle>
                          <Input placeholder="Enter website" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={24}>
                <Typography.Text className="fz-16 fw-600">Social Media</Typography.Text>
                <Row gutter={[0, 8]} className="mt-1">
                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Facebook</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="facebook" noStyle>
                          <Input placeholder="Enter facebook" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Twitter</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="twitter" noStyle>
                          <Input placeholder="Enter twitter" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Linkedin</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="linkedin" noStyle>
                          <Input placeholder="Enter linkedin" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Instagram</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="instagram" noStyle>
                          <Input placeholder="Enter instagram" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Youtube</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="youtube" noStyle>
                          <Input placeholder="Enter youtube" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24}>
                    <Row align="middle">
                      <Col xs={6}>
                        <Typography.Text>Other</Typography.Text>
                      </Col>
                      <Col xs={18}>
                        <Form.Item name="other" noStyle>
                          <Input placeholder="Enter other" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={24} xxl={7}>
            <Typography.Text className="fz-16 fw-600">Bio</Typography.Text>
            <Form.Item
              name="bio"
              className="h-100 full-height-bio"
              style={{ marginBlockStart: "0.5rem" }}>
              <Input.TextArea
                placeholder="Enter Bio"
                className="h-100"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xxl={7}>
            <Typography.Text className="fz-16 fw-600">
              Events I participate as speaker
            </Typography.Text>

            <Row className="event-speaker-participate">
              <Flex vertical>
                <Typography.Text className="fw-600">Event Name</Typography.Text>
                <Typography.Text italic>Sub Event Name</Typography.Text>
                <Typography.Text italic>Date</Typography.Text>
                <Typography.Text italic>From 00:00 AM to 00:00 PM</Typography.Text>
              </Flex>

              <Row gutter={[12, 12]} className="mt-1">
                <Col xs={6}>
                  <Typography.Text className="fw-600">Location</Typography.Text>
                </Col>
                <Col xs={18}>
                  <Typography.Text className="fw-600">Vindo Hall B</Typography.Text>
                </Col>
              </Row>

              <Row gutter={[12, 12]}>
                <Col xs={6}>
                  <Typography.Text className="fw-600">Link</Typography.Text>
                </Col>
                <Col xs={18}>
                  <NavLink
                    to="https://vindo.vindo.ai"
                    target="_blank"
                    style={{
                      wordBreak: "break-word",
                      paddingInlineEnd: "8px",
                    }}>
                    https://vindo.vindo.aihttps://vindo.vindo.aihttps://vindo.vindo.ai
                  </NavLink>
                </Col>
              </Row>

              <Row style={{ marginBlock: "1rem 0.5rem" }}>
                <Typography.Text className="fw-600">Content Summary</Typography.Text>
              </Row>

              <Form.Item
                name="eventSummaryContents"
                style={{ flex: 1 }}
                className="event-speaker-content-summary">
                <Input.TextArea
                  style={{ borderRadius: "8px" }}
                  placeholder="Please type the summary of the presentation here, this will be published to the audience"
                />
              </Form.Item>
            </Row>
          </Col>
        </Row>
        <Row justify="end" className="mt-1">
          <Flex gap={32}>
            <Button
              onClick={() => setShowSpeakerProfile(false)}
              style={{ borderRadius: "2rem", width: "100px" }}>
              Cancel
            </Button>
            <Button
              loading={uploadFileLoading || updateSpeakerProfileMutation.isPending}
              style={{ borderRadius: "2rem", width: "100px" }}
              type="primary"
              htmlType="submit">
              Save
            </Button>
          </Flex>
        </Row>
      </Form>
    </ConfigProvider>
  );
}
