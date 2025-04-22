import {
  Checkbox,
  Col,
  ColorPicker,
  Flex,
  Form,
  Image,
  Radio,
  Row,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import IframeBGPNG from "assets/images/iframe_bg.png";
import { useState } from "react";
import "../styles.css";
import { useForm } from "antd/es/form/Form";
import Box from "components/Box";
import GradientColorPicker from "components/GradientColorPicker";
import { API_BASE } from "services/config";
import axios from "axios";
import useLazyEffect from "hooks/useLazyEffect";
import { useContextPageSettings } from "../ProviderPageSettings";
import Input from "antd/es/input/Input";

const BookingPageSettings = () => {
  const [form] = useForm();
  const { providerSettings, setSettings } = useContextPageSettings();
  const [loading, setLoading] = useState(false);
  const [iframeBG, setIframeBG] = useState(IframeBGPNG);
  const customValue = Form.useWatch((value) => value, form);
  const backgroundImage = Form.useWatch("backgroundImage", form);

  const onFinish = (data) => {
    if (data.frameColor) {
      data.frameColor = encodeURIComponent(data.frameColor);
    }
    if (data.backgroundColor) {
      data.backgroundColor = encodeURIComponent(data.backgroundColor);
    }
    if (data.linkColor) {
      data.linkColor = encodeURIComponent(data.linkColor);
    }
    if (data.textColor) {
      data.textColor = encodeURIComponent(data.textColor);
    }
    setSettings({ ...data, image: iframeBG });
  };

  useLazyEffect(() => {
    form.submit();
  }, [customValue]);

  return (
    <Form
      onFinish={onFinish}
      form={form}
      initialValues={{
        backgroundType: 1,
        backgroundImage: IframeBGPNG,
        backgroundColor: "transparent",
        frameColor:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)",
        textColor: "#272944",
        linkColor: "#55A17C",
        popUpText: "",
      }}>
      <Row gutter={[0, 20]}>
        <Col xs={24}>
          <Typography className="fz-14 fw-500">Booking Page Settings</Typography>
          <Typography className="fz-14 description mt-1">
            Customise the look of your booking page to fit into website.
          </Typography>
          <Form.Item className="mt-1" name="hidden" valuePropName="checked">
            <Checkbox.Group
              options={[{ label: "Hide Meeting Type Details", value: "true" }]}></Checkbox.Group>
          </Form.Item>
        </Col>
        <Box
          sx={{ padding: "16px", border: "1px solid #E3EFFF", borderRadius: "8px", width: "100%" }}>
          <Form.Item name="backgroundType">
            <Radio.Group style={{ width: "100%" }}>
              <Flex justify="space-between" align="center">
                <Radio value={1}>Background Image</Radio>
                <Form.Item name="backgroundImage">
                  <Input type="hidden" />
                </Form.Item>
                <Upload
                  action={API_BASE + "vindo/file-upload"}
                  accept="image/*"
                  showUploadList={false}
                  headers={{ Authorization: axios.defaults.headers.authorization }}
                  onChange={(info) => {
                    setLoading(true);
                    if (info.file.status === "done") {
                      setLoading(false);

                      form.setFieldValue(
                        "backgroundImage",
                        encodeURIComponent(info?.file?.response?.data),
                      );
                      message.success(`file uploaded successfully`);
                      setIframeBG(info?.file?.response?.data);
                    } else if (info.file.status === "error") {
                      setLoading(false);
                      message.error(`file upload failed.`);
                    }
                  }}>
                  <Spin size="small" spinning={loading}>
                    <Image
                      style={{
                        border: "1px dashed rgba(45, 95, 235, 0.25)",
                        padding: "2px",
                      }}
                      loading={"lazy"}
                      preview={false}
                      src={decodeURIComponent(backgroundImage || IframeBGPNG)}
                      height={40}
                    />
                  </Spin>
                </Upload>
              </Flex>

              <Flex justify="space-between" align="center">
                <Radio
                  className="desk-information-share-modal-booking-page-settings-radio"
                  value={2}>
                  Background Color
                </Radio>
                <Form.Item name="backgroundColor">
                  <GradientColorPicker />
                </Form.Item>
              </Flex>
            </Radio.Group>
          </Form.Item>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Flex justify="space-between" align="center">
            Frame Color
            <Form.Item name="frameColor">
              <GradientColorPicker />
            </Form.Item>
          </Flex>
          <Flex justify="space-between" align="center">
            Text Color
            <Form.Item name="textColor">
              <Picker style={{ minWidth: 140 }} showText />
            </Form.Item>
          </Flex>
          <Flex justify="space-between" align="center">
            Button & Link Color
            <Form.Item name="linkColor">
              <Picker style={{ minWidth: 140 }} showText />
            </Form.Item>
          </Flex>
          {providerSettings.embeddingType !== "InlineEmbed" && (
            <Flex justify="space-between" align="center">
              Popup Text
              <Form.Item name="popUpText" style={{ width: "50%" }}>
                <Input placeholder="Add popup text" />
              </Form.Item>
            </Flex>
          )}
        </Box>
      </Row>
    </Form>
  );
};
const Picker = (props) => {
  return (
    <ColorPicker
      {...props}
      format="hex"
      defaultFormat="hex"
      disabledAlpha
      defaultValue="#1677ff"
      onChange={(_, color) => props?.onChange(color)}
    />
  );
};
export default BookingPageSettings;
