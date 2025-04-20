import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  ColorPicker,
  Form,
  message,
  Row,
  Select,
  Skeleton,
  Slider,
  Typography,
} from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useEditDeskAI from "services/Desk/Mutations/useEditDeskAI";
import { CheckMarkSVG, ColorPickerSVG2, DropdownSVG } from "assets/jsx-svg";

import "./styles.css";

export default function VoiceTab({ deskQuery }) {
  const [form] = Form.useForm();
  const [selectedColorSchema, setSelectedColorSchema] = useState(null);
  const [color, setColor] = useState("");
  const { id: idfromPath } = useParams();
  const queryClient = useQueryClient();

  const bgColor = useMemo(() => (typeof color === "string" ? color : color.toHexString()), [color]);

  // mutations
  const editDeskMutation = useEditDeskAI(idfromPath, {
    onSuccess: (_, variables) => {
      message.success("Ai voice info edited succesfully");
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

  const colorSchemas = useMemo(
    () => [
      {
        id: 1,
        color:
          "transparent linear-gradient(120deg, #FF9A9E 0%, #FAD0C4 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 2,
        color:
          "transparent linear-gradient(120deg, #A18CD1 0%, #FBC2EB 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 3,
        color:
          "transparent linear-gradient(120deg, #FF8177 0%, #B12A5B 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 4,
        color:
          "transparent linear-gradient(120deg, #F6D365 0%, #FDA085 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 5,
        color:
          "transparent linear-gradient(120deg, #84FAB0 0%, #8FD3F4 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 6,
        color:
          "transparent linear-gradient(120deg, #F093FB 0%, #F5576C 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 7,
        color:
          "transparent linear-gradient(120deg, #667EEA 0%, #764BA2 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 8,
        color:
          "transparent linear-gradient(120deg, #E4AFCB 0%, #E2C58B 30%, #C2CE9C 64%, #7EDBDC 100%) 0% 0% no-repeat padding-box",
      },
      {
        id: 9,
        color:
          "transparent linear-gradient(120deg, #6A85B6 0%, #BAC8E0 100%) 0% 0% no-repeat padding-box",
      },
    ],
    [],
  );

  useEffect(() => {
    if (deskQuery.data && deskQuery.isSuccess) {
      const formData = {
        aiVoiceType: deskQuery.data.aiVoiceType || undefined,
        aiStability: deskQuery.data.aiStability,
        aiSimilarity: deskQuery.data.aiSimilarity,
        aiStyleExaggeration: deskQuery.data.aiStyleExaggeration,
        aiLanguage: deskQuery.data.aiLanguage || "en",
      };

      if (deskQuery.data.aiColorScheme) {
        const foundColor = colorSchemas.find(
          (color) => color.color === deskQuery.data.aiColorScheme,
        );
        if (foundColor) {
          setSelectedColorSchema(foundColor.id);
        } else {
          setColor(deskQuery.data.aiColorScheme);
        }
      }
      form.setFieldsValue(formData);
    }
  }, [colorSchemas, deskQuery.data, deskQuery.isSuccess, form]);

  const onFinish = (values) => {
    const foundColor = colorSchemas.find((color) => color.id === selectedColorSchema);
    editDeskMutation.mutate({
      ...values,
      aiColorScheme: foundColor ? foundColor.color : bgColor,
    });
  };

  if (deskQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={[0, 24]} className="voice_tab_ai_form">
        <Col xs={24}>
          <Row>
            <Col xs={24} lg={8}>
              <Typography.Text className="fw-800">Ai Language</Typography.Text>
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                {"Select the language of the AI"}
              </Typography.Text>
            </Col>
            <Col xs={24} lg={16}>
              <Form.Item name="aiLanguage" initialValue={"en"}>
                <Select
                  suffixIcon={<DropdownSVG />}
                  options={[
                    {
                      value: "en",
                      label: (
                        <Row align="middle" gutter={[6, 0]} wrap={false}>
                          <Col>
                            <div className="voice_tab_ai_form_select_gradiant" />
                          </Col>
                          <Col className="fw-500">English</Col>
                        </Row>
                      ),
                    },
                    {
                      value: "ar",
                      label: (
                        <Row align="middle" gutter={[6, 0]} wrap={false}>
                          <Col>
                            <div className="voice_tab_ai_form_select_gradiant" />
                          </Col>
                          <Col className="fw-500">Arabic</Col>
                        </Row>
                      ),
                    },
                    {
                      value: "fr",
                      label: (
                        <Row align="middle" gutter={[6, 0]} wrap={false}>
                          <Col>
                            <div className="voice_tab_ai_form_select_gradiant" />
                          </Col>
                          <Col className="fw-500">French</Col>
                        </Row>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row>
            <Col xs={24} lg={8}>
              <Typography.Text className="fw-800">Voice Type</Typography.Text>
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                {"Select the gender of the AI's voice"}
              </Typography.Text>
            </Col>
            <Col xs={24} lg={16}>
              <Form.Item name="aiVoiceType" initialValue={1}>
                <Select
                  suffixIcon={<DropdownSVG />}
                  options={voiceTypes.map((voice) => ({
                    value: voice.id,
                    label: (
                      <Row align="middle" gutter={[6, 0]} wrap={false}>
                        <Col>
                          <div className="voice_tab_ai_form_select_gradiant" />
                        </Col>
                        <Col className="fw-500">{voice.name}</Col>
                      </Row>
                    ),
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row>
            <Col xs={24} lg={8}>
              <Typography.Text className="fw-800">Stability</Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                {"Control the consistency of the AI's voice"}
              </Typography.Text>
            </Col>
            <Col xs={24} lg={16}>
              <Row gutter={[12, 0]} wrap={false} align="middle">
                <Col flex={1}>
                  <Form.Item name="aiStability" noStyle>
                    <Slider min={0} max={1} step={0.01} />
                  </Form.Item>
                </Col>
                <Col>
                  <div className="voice_tab_ai_form_voice_degree">Stable</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row>
            <Col xs={24} lg={8}>
              <Typography.Text className="fw-800">Similarity</Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                {"Adjust how closely the AI's voice matches the selected tone"}
              </Typography.Text>
            </Col>
            <Col xs={24} lg={16}>
              <Row gutter={[12, 0]} wrap={false} align="middle">
                <Col flex={1}>
                  <Form.Item name="aiSimilarity" noStyle>
                    <Slider min={0} max={1} step={0.01} />
                  </Form.Item>
                </Col>
                <Col>
                  <div className="voice_tab_ai_form_voice_degree">Low</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row>
            <Col xs={24} lg={8}>
              <Typography.Text className="fw-800">Style Exaggeration</Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                {"Adjust the expressiveness of the AI's voice"}
              </Typography.Text>
            </Col>
            <Col xs={24} lg={16}>
              <Row gutter={[12, 0]} wrap={false} align="middle">
                <Col flex={1}>
                  <Form.Item name="aiStyleExaggeration" noStyle>
                    <Slider min={0} max={1} step={0.01} />
                  </Form.Item>
                </Col>
                <Col>
                  <div className="voice_tab_ai_form_voice_degree">None</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row>
            <Col xs={24} lg={8}>
              <Typography.Text className="fw-800">Color Scheme</Typography.Text>
              <QuestionCircleOutlined style={{ marginInlineStart: "6px" }} />
              <br />
              <Typography.Text className="fz-12" style={{ color: "#555" }}>
                {"Pick a color scheme for your AI's appearance"}
              </Typography.Text>
            </Col>
            <Col xs={24} lg={16}>
              <Row gutter={[12, 0]} wrap={false} align="middle">
                <Col flex={1}>
                  <Row gutter={[8, 8]}>
                    {colorSchemas.map((color) => (
                      <Col key={color.id}>
                        <div
                          onClick={() => {
                            setColor("");
                            setSelectedColorSchema(color.id);
                          }}
                          className="voice_tab_ai_form_color_schema"
                          style={{ background: color.color }}>
                          {selectedColorSchema === color.id ? <CheckMarkSVG /> : null}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col>
                  <ColorPicker
                    value={color}
                    onChange={(e) => {
                      setSelectedColorSchema(null);
                      setColor(e);
                    }}>
                    <Button
                      className="voice_tab_ai_form_color_picker"
                      style={{
                        color: bgColor || "",
                        borderColor: bgColor || "",
                      }}>
                      <Row align="middle" gutter={[6, 0]} wrap={false}>
                        <Col>
                          <Row align="middle">
                            <ColorPickerSVG2 color={bgColor} />
                          </Row>
                        </Col>
                        <Col>Select Color</Col>
                      </Row>
                    </Button>
                  </ColorPicker>
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
          style={{ width: "80px" }}>
          Save
        </Button>
      </Row>
    </Form>
  );
}

const voiceTypes = [
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Sarah",
  },
  {
    id: "FGY2WhTYpPnrIDTdsKH5",
    name: "Laura",
  },
  {
    id: "IKne3meq5aSn9XLyUdCD",
    name: "Charlie",
  },
  {
    id: "JBFqnCBsd6RMkjVDRZzb",
    name: "George",
  },
  {
    id: "N2lVS1w4EtoT3dr4eOWO",
    name: "Callum",
  },
  {
    id: "TX3LPaxmHKxFdv7VOQHJ",
    name: "Liam",
  },
  {
    id: "XB0fDUnXU5powFXDhCwa",
    name: "Charlotte",
  },
  {
    id: "Xb7hH8MSUJpSbSDYk0k2",
    name: "Alice",
  },
  {
    id: "XrExE9yKIg1WjnnlVkGX",
    name: "Matilda",
  },
  {
    id: "bIHbv24MWmeRgasZH58o",
    name: "Will",
  },
  {
    id: "cgSgspJ2msm6clMCkdW9",
    name: "Jessica",
  },
  {
    id: "cjVigY5qzO86Huf0OWal",
    name: "Eric",
  },
  {
    id: "iP95p4xoKVk53GoZ742B",
    name: "Chris",
  },
  {
    id: "nPczCjzI2devNBz1zQrb",
    name: "Brian",
  },
  {
    id: "onwK4e9ZLuTAKqWW03F9",
    name: "Daniel",
  },
  {
    id: "pFZP5JQG7iQjIQuC4Bku",
    name: "Lily",
  },
  {
    id: "pqHfZKP75CvOlQylNhV4",
    name: "Bill",
  },
];
