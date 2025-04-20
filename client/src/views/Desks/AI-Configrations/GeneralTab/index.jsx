import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useEditDeskAI from "services/Desk/Mutations/useEditDeskAI";
import aiconfigrationIMG from "assets/images/ai-configration.png";
import useUpdateDesk from "services/Desk/Mutations/useUpdateDesk";

import "./styles.css";

export default function GeneralTab({ deskQuery }) {
  const { id: idfromPath } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const aiBehaviorRef = useRef();

  // mutations
  const editDeskMutation = useEditDeskAI(idfromPath, {
    onSuccess: (_, variables) => {
      message.success("Ai info edited succesfully");
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

  const { updateDesk, isPending } = useUpdateDesk({
    onSuccess: (data) => {
      queryClient.setQueryData(deskQuery.queryKey, (prev) => {
        prev.data.data = {
          ...prev.data.data,
          aiAgent: !prev.data.data.aiAgent,
        };
        return { ...prev };
      });
      message(data.data.message);
    },
  });

  const insertText = (textToInsert) => {
    const textarea = aiBehaviorRef.current.resizableTextArea.textArea;
    const textareaValue =
      aiBehaviorRef.current.resizableTextArea.textArea.value;
    const start = textarea.selectionStart; // Get the current cursor position
    const end = textarea.selectionEnd; // Get the current cursor position

    // Insert text at the cursor position
    const newText =
      textareaValue.slice(0, start) + textToInsert + textareaValue.slice(end);

    form.setFieldValue("aiBehavior", newText); // Update the textarea content
    textarea.setSelectionRange(
      start + textToInsert.length,
      start + textToInsert.length
    ); // Set the cursor position after the inserted text
    textarea.focus(); // Focus back on the textarea
  };

  useEffect(() => {
    if (deskQuery.data && deskQuery.isSuccess) {
      const formData = {
        aiName: deskQuery.data.aiName,
        aiDescrption: deskQuery.data.aiDescrption,
        aiBehavior: deskQuery.data.aiBehavior,
      };
      form.setFieldsValue(formData);
    }
  }, [deskQuery.data, deskQuery.isSuccess, form]);

  const onFinish = (values) => {
    editDeskMutation.mutate(values);
  };

  if (deskQuery.isLoading && deskQuery) {
    return <Skeleton active />;
  }

  return (
    <>
      <div className="general_tab_ai_active">
        <Row gutter={[24, 24]} align="middle">
          <Col>
            <Image preview={false} src={aiconfigrationIMG} />
          </Col>
          <Col flex={1}>
            <Row gutter={[0, 12]}>
              <Col xs={24}>
                <Typography.Text
                  className="fw-800"
                  style={{
                    color: deskQuery.data.aiAgent ? "#348138" : "#D9534F",
                  }}
                >
                  AI Desk {deskQuery.data.aiAgent ? "Activated" : "Deactivated"}
                </Typography.Text>
              </Col>
              <Col xs={24}>
                <Typography.Text className="fz-12" style={{ color: "#555" }}>
                  {`Your AI Desk is currently ${
                    deskQuery.data.aiAgent ? "active" : "deactive"
                  }, Click ${
                    deskQuery.data.aiAgent ? "'Deactivate'" : "'Activate'"
                  } to ${
                    deskQuery.data.aiAgent ? "disable" : "enable"
                  } AI features.`}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              type="primary"
              style={{
                background: deskQuery.data.aiAgent ? "#D9534F" : "#348138",
                padding: "10px 24px",
                borderRadius: "8px",
              }}
              loading={isPending}
              onClick={() =>
                updateDesk({
                  deskId: deskQuery.data.id,
                  aiAgent: !deskQuery.data.aiAgent,
                })
              }
            >
              {deskQuery.data.aiAgent ? "Deactivate" : "Activate"}
            </Button>
          </Col>
        </Row>
      </div>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[0, 24]} className="general_tab_ai_form">
          <Col xs={24}>
            <Row>
              <Col xs={24} lg={8}>
                <Typography.Text className="fw-800">AI Name</Typography.Text>
                <br />
                <Typography.Text className="fz-12" style={{ color: "#555" }}>
                  The name of your assistant
                </Typography.Text>
              </Col>
              <Col xs={24} lg={16}>
                <Form.Item name="aiName">
                  <Input placeholder="Enter AI Name" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24}>
            <Row>
              <Col xs={24} lg={8}>
                <Typography.Text className="fw-800">
                  AI Description
                </Typography.Text>
                <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
                <br />
                <Typography.Text className="fz-12" style={{ color: "#555" }}>
                  {"A brief overview of the AI's role and capabilities"}
                </Typography.Text>
              </Col>
              <Col xs={24} lg={16}>
                <Form.Item name="aiDescrption">
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter a brief description of the AI's role and capabilities"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24}>
            <Row>
              <Col xs={24} lg={8}>
                <Typography.Text className="fw-800">
                  AI Behavior
                </Typography.Text>
                <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
                <br />
                <Typography.Text className="fz-12" style={{ color: "#555" }}>
                  Define how the AI interacts with users
                </Typography.Text>
              </Col>
              <Col xs={24} lg={16}>
                <Typography.Text className="fw-600 fz-14">
                  Available System Commands:
                </Typography.Text>
                <Row gutter={[8, 8]} style={{ marginBlockStart: "4px" }}>
                  {[
                    { value: "{{addToCart}}", label: "Add to cart" },
                    { value: "{{deleteFromCart}}", label: "Delete from cart" },
                    { value: "{{confirmOrder}}", label: "Confirm order" },
                    { value: "{{pay}}", label: "Pay" },
                    { value: "{{showImage}}", label: "Show image" },
                  ].map((systemCommand) => (
                    <Col key={systemCommand.value}>
                      <div
                        onClick={() => {
                          insertText(systemCommand.value);
                        }}
                        className="ai-behavior-system-command fz-12"
                      >
                        {systemCommand.label}
                      </div>
                    </Col>
                  ))}
                </Row>
                <Form.Item name="aiBehavior" className="mt-1">
                  <Input.TextArea
                    ref={aiBehaviorRef}
                    rows={4}
                    placeholder="Describe the AI's behavior and interaction style"
                  />
                </Form.Item>
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
    </>
  );
}
