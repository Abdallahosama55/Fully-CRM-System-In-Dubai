import "./style.css";
import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import UploadFile from "components/common/UploadFile";
import useAddCustomerTicket from "services/CustomerTicket/Mutations/useAddCustomerTicket";
import TicketConfirm from "./TicketConfirm";
import { Link } from "react-router-dom";
const Ticket = () => {
  const [form] = useForm();

  const { createCustomerTicket, isPending, data } = useAddCustomerTicket({});
  const Submit = (values) => {
    const formData = new FormData();

    (values?.attachments || []).forEach((file, index) => {
      formData.append(index, file.originFileObj);
    });
    formData.append("email", values.email);
    formData.append("fullName", values.email.split("@")[0]);
    formData.append("title", values.title);
    formData.append("content", values.description);
    createCustomerTicket(formData);
  };
  return (
    <section className="web-widget-ticket">
      {data?.data?.data ? (
        <TicketConfirm link={data?.data?.data?.link} />
      ) : (
        <Row justify="center">
          <Col className="container" xs={{ span: 24 }} sm={{ span: 16 }} xxl={{ span: 12 }}>
            <Row className="mb-1">
              <Col>
                <Typography.Text className="fw-500 fz-16 mb-1">Add Ticket Details</Typography.Text>
              </Col>
            </Row>
            <Form
              onFinish={Submit}
              form={form}
              layout={"horizontal"}
              labelAlign="left"
              colon={false}>
              <Row gutter={[12]} style={{ alignItems: "center" }} align={"center"}>
                <Col xs={24} md={5}>
                  <Typography.Text>
                    Email <span className="required">*</span>
                  </Typography.Text>
                </Col>
                <Col flex={1}>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name="email">
                    <Input type="email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row align={"center"} style={{ alignItems: "center" }} gutter={[12]}>
                <Col xs={24} md={5}>
                  <Typography.Text>
                    Title <span className="required">*</span>
                  </Typography.Text>
                </Col>
                <Col flex={1}>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name="title">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={24} md={5}>
                  <Typography.Text style={{ marginTop: "4px" }}>
                    Description <span className="required">*</span>
                  </Typography.Text>
                </Col>
                <Col flex={1}>
                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: "Please Enter Ticket Description" }]}>
                    <Input.TextArea
                      placeholder="Enter Description Here"
                      style={{
                        resize: "none",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col xs={24} md={5}>
                  <Typography.Text style={{ marginTop: "4px" }}>Attachments</Typography.Text>
                </Col>
                <Col flex={1}>
                  <div>
                    <Form.Item name="attachments">
                      <UploadFile></UploadFile>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Flex justify="right" className="mt-1">
                <Flex gap={8}>
                  <Link to={".."}>
                    <Button>Cancel</Button>
                  </Link>
                  <Button loading={isPending} type="primary" htmlType="submit">
                    Submit
                  </Button>{" "}
                </Flex>
              </Flex>
            </Form>
          </Col>
        </Row>
      )}
    </section>
  );
};

export default Ticket;
