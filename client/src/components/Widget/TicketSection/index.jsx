import { useState } from "react";
import { Col, Form, Input, Row, Tooltip, Typography, Upload, message } from "antd";

import { LoadingOutlined, PaperClipOutlined, PlusOutlined } from "@ant-design/icons";
import { LIST_IGNORE } from "antd/es/upload/Upload";
import { BackArrow, DeleteSVG, LeftArrowSVG } from "assets/jsx-svg";
import { axiosCatch } from "utils/axiosUtils";
import { useNavigate } from "react-router-dom";
import CustomerTicketService from "services/customerTicket.service";
import { useNotification } from "context/notificationContext";

export default function TicketSection({ setSelectedService }) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await CustomerTicketService.add({
        email: values.email,
        fullName: values.email.split("@")[0],
        title: values.title,
        content: values.description,
        companyId: 1,
      });
      openNotificationWithIcon("success", "Ticket submited successfully");

      setSelectedService(null);
      navigate(`/ticket/${res.data.data.link}`);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="widget-service-section">
      <div className="service-section-header"></div>
      <div className="service-section-main">
        <div
          style={{ width: "18px" }}
          className="clickable"
          onClick={() => setSelectedService(null)}>
          <BackArrow color="#000" />
        </div>

        <Row justify="center" style={{ textAlign: "center" }}>
          <Col xs={24}>
            <Typography.Text className="fw-500 fz-16">Submit ticket</Typography.Text>
          </Col>
          <Col xs={24}>
            <Typography.Text style={{ color: "#8E8E93" }} className="fz-10">
              Share your issue by providing details
            </Typography.Text>
          </Col>
        </Row>

        <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: "8px" }}>
          <Form.Item
            name="email"
            label="Enter Your E-mail"
            rules={[{ required: true, message: "Please Enter Email" }]}>
            <Input placeholder="ex: ahmed@gmail.com" />
          </Form.Item>

          <Form.Item
            name="title"
            label="Ticket Title"
            rules={[{ required: true, message: "Please Enter Ticket Title" }]}>
            <Input placeholder="Enter Here" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Ticket Description"
            rules={[{ required: true, message: "Please Enter Ticket Description" }]}>
            <Input.TextArea
              placeholder="Enter Description Here"
              style={{
                resize: "none",
              }}
            />
          </Form.Item>

          <Typography.Text>Attachment</Typography.Text>
          <Row justify="space-between" align="middle" wrap={false}>
            <Col>
              <Row justify="start" align="middle" gutter={[4, 4]} wrap={false}>
                <Col>
                  <Form.Item name="attachment" valuePropName="file">
                    <Upload
                      multiple={false}
                      maxCount={1}
                      name="file"
                      listType="picture-card"
                      showUploadList={false}
                      onChange={async (info) => {
                        console.log(info);
                        setFileName(info.file.name);
                      }}
                      beforeUpload={(file) => {
                        if (file.size > 4194304) {
                          message.error("File must be less than 4MB");
                          setFileName("");
                          return LIST_IGNORE;
                        }
                        return false;
                      }}
                      className="ticket-upload">
                      <PlusOutlined />
                    </Upload>
                  </Form.Item>
                </Col>
                {fileName && (
                  <Col flex={1}>
                    <Tooltip title={fileName}>
                      <Row align="middle" gutter={[4, 4]} wrap={false}>
                        <Col>
                          <PaperClipOutlined />{" "}
                        </Col>
                        <Col style={{ maxWidth: "100px" }}>
                          <Typography.Text ellipsis>{fileName}</Typography.Text>
                        </Col>
                        <Col>
                          <Row align="middle">
                            <DeleteSVG
                              style={{ width: "12px", height: "12px" }}
                              onClick={() => {
                                setFileName("");
                                form.setFieldValue("attachment", undefined);
                              }}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </Tooltip>
                  </Col>
                )}
              </Row>
            </Col>

            <Col>
              <Form.Item>
                <Row justify="end">
                  <button className="start-btn">
                    {loading ? <LoadingOutlined /> : <LeftArrowSVG style={{ rotate: "180deg" }} />}
                  </button>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
}
