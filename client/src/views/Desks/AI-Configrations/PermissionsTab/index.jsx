import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  message,
  Row,
  Skeleton,
  Switch,
  Typography,
} from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useEditDeskAI from "services/Desk/Mutations/useEditDeskAI";

import "./styles.css";

export default function PermissionsTab({ deskQuery }) {
  const [form] = Form.useForm();
  const { id: idfromPath } = useParams();
  const queryClient = useQueryClient();

  const accessToInventory = Form.useWatch("aiAccessToInventory", form);
  const accessToTravelInventory = Form.useWatch("aiAccessToTravelInventory", form);
  const accessToPipeline = Form.useWatch("aiAccessToPipeline", form);
  const accessToCalendar = Form.useWatch("aiAccessToCalendar", form);
  const assignTasksToEmployees = Form.useWatch(
    "aiAssignTasksToEmployees",
    form
  );
  const sendEmailsToCustomers = Form.useWatch("aiSendEmailsToCustomers", form);

  // mutations
  const editDeskMutation = useEditDeskAI(idfromPath, {
    onSuccess: (_, variables) => {
      message.success("Ai permissions edited succesfully");
      queryClient.setQueryData(deskQuery.queryKey, (prev) => {
        prev.data.data = {
          ...prev.data.data,
          ...variables,
        };
        return {
          ...prev,
        };
      });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  useEffect(() => {
    if (deskQuery.data && deskQuery.isSuccess) {
      const formData = {
        aiAccessToInventory: deskQuery.data.aiAccessToInventory,
        aiAccessToTravelInventory: deskQuery.data.aiAccessToTravelInventory,
        aiAccessToPipeline: deskQuery.data.aiAccessToPipeline,
        aiAccessToCalendar: deskQuery.data.aiAccessToCalendar,
        aiAssignTasksToEmployees: deskQuery.data.aiAssignTasksToEmployees,
        aiSendEmailsToCustomers: deskQuery.data.aiSendEmailsToCustomers,
      };
      form.setFieldsValue(formData);
    }
  }, [deskQuery.data, deskQuery.isSuccess, form]);

  const onFinish = (values) => {
    editDeskMutation.mutate(values);
  };

  if (deskQuery.isLoading) {
    return <Skeleton active />;
  }
  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={[0, 24]} className="Permissions_tab_ai_form">
        <Col xs={24}>
          <Row align="middle">
            <Col xs={24} lg={10}>
              <Typography.Text className="fw-800">
                Access to Inventory
              </Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                Allow AI to view and manage inventory
              </Typography.Text>
            </Col>
            <Col xs={24} lg={14}>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Form.Item name="aiAccessToInventory" noStyle>
                    <Switch />
                  </Form.Item>
                </Col>
                <Col>
                  <Typography.Text className="fw-700">
                    {accessToInventory ? "ON" : "OFF"}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row align="middle">
             <Col xs={24} lg={10}>
              <Typography.Text className="fw-800">
                Access to Travel Inventory
              </Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                Allow AI to view and manage travel inventory
              </Typography.Text>
            </Col>
            <Col xs={24} lg={14}>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Form.Item name="aiAccessToTravelInventory" noStyle>
                    <Switch />
                  </Form.Item>
                </Col>
                <Col>
                  <Typography.Text className="fw-700">
                    {accessToTravelInventory ? "ON" : "OFF"}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row align="middle">
            <Col xs={24} lg={10}>
              <Typography.Text className="fw-800">
                Access to Pipeline
              </Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                Enable AI to monitor and update pipeline status
              </Typography.Text>
            </Col>
            <Col xs={24} lg={14}>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Form.Item name="aiAccessToPipeline" noStyle>
                    <Switch />
                  </Form.Item>
                </Col>
                <Col>
                  <Typography.Text className="fw-700">
                    {accessToPipeline ? "ON" : "OFF"}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row align="middle">
            <Col xs={24} lg={10}>
              <Typography.Text className="fw-800">
                Access to Calendar
              </Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                Grant AI access to view and manage calendar events
              </Typography.Text>
            </Col>
            <Col xs={24} lg={14}>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Form.Item name="aiAccessToCalendar" noStyle>
                    <Switch />
                  </Form.Item>
                </Col>
                <Col>
                  <Typography.Text className="fw-700">
                    {accessToCalendar ? "ON" : "OFF"}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row align="middle">
            <Col xs={24} lg={10}>
              <Typography.Text className="fw-800">
                Assign Tasks to Employees
              </Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                Permit AI to assign tasks to employees
              </Typography.Text>
            </Col>
            <Col xs={24} lg={14}>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Form.Item name="aiAssignTasksToEmployees" noStyle>
                    <Switch />
                  </Form.Item>
                </Col>
                <Col>
                  <Typography.Text className="fw-700">
                    {assignTasksToEmployees ? "ON" : "OFF"}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row align="middle">
            <Col xs={24} lg={10}>
              <Typography.Text className="fw-800">
                Send Emails to Customers
              </Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                Allow AI to compose and send emails to customers
              </Typography.Text>
            </Col>
            <Col xs={24} lg={14}>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Form.Item name="aiSendEmailsToCustomers" noStyle>
                    <Switch />
                  </Form.Item>
                </Col>
                <Col>
                  <Typography.Text className="fw-700">
                    {sendEmailsToCustomers ? "ON" : "OFF"}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row justify="end">
        <Button
          disabled={editDeskMutation.isPending}
          type="primary"
          htmlType="submit"
          style={{ width: "80px" }}
        >
          Save
        </Button>
      </Row>
    </Form>
  );
}
