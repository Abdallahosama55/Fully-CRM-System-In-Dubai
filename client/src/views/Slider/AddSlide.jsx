import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import { useNotification } from "context/notificationContext";
import { formatDefaultValues } from "./utils";
import { useEffect, useState } from "react";
import "./style.css";
import { CinemaSVG, EditSVG, ImagesSVG } from "assets/jsx-svg";
import useAddSlider from "services/Sliders/Mutations/useAddSlider";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import { useNavigate } from "react-router-dom";
import useUpdateSlider from "services/Sliders/Mutations/useUpdateSlider";
import axios from "axios";
import { API_BASE } from "services/config";

export default function AddSlide({ setAddSlideModal, setSliderData, defaultValues }) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = Form.useForm();
  const [previewPic, setPreviewPic] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const navigate = useNavigate();
  const { updateSlider, isPending: isLoadingUpdate } = useUpdateSlider({
    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SLIDERS] });
      openNotificationWithIcon("success", "Virtual Portal Updated Successfully ✅");
      setAddSlideModal(false);
    },
  });
  const { createSlider, isPending } = useAddSlider({
    onSuccess: (resp) => {
      navigate("edit/" + resp.data.data.id);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SLIDERS] });
      openNotificationWithIcon("success", "Virtual Portal Added Successfully ✅");
      setAddSlideModal(false);
    },
  });
  const [showComping, setShowComping] = useState(false);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("showUpcommingBtn", values.showComping);
      formData.append("media", values.media);
      formData.append("mediaType", values.mediaType);

      formData.append(
        "upCommingBtnProperties",
        JSON.stringify({
          BGColor: values.background,
          FGColor: values.fontColor,
          name: values?.compingUp ?? "Event",
        }),
      );
      if (values.mediaType === "VIDEO") {
        formData.append(
          "mediaSetting",
          JSON.stringify({
            muteAudio: values.muteAudio,
            autoPlay: values.autoPlay,
            isExternalVideoLink: values?.isExternalVideoLink,
          }),
        );
      }
      if (defaultValues) {
        await updateSlider({ id: defaultValues.id, formData });
      } else await createSlider(formData);
    } catch (axiosCatch) {
      console.log("", axiosCatch);
    }
  };

  const mediaType = Form.useWatch("mediaType", form);
  const media = Form.useWatch("media", form);
  const isExternalVideoLink = Form.useWatch("isExternalVideoLink", form);

  useEffect(() => {
    if (media) {
      setPreviewPic(media);
    }
  }, [media]);

  const handleChangeImageChange = (file) => {
    form.setFieldValue("media", file);
  };

  const getFileName = (previewPic) => {
    if (typeof previewPic === "string") {
      return previewPic?.split("/").pop();
    }
    return previewPic?.file?.name;
  };

  return (
    <Form
      initialValues={{
        showComping: true,
        fontColor: "#fff",
        compingUp: "Event",
        background: "#1677ff",
        mediaType: "IMAGE",
        media: "",
        isExternalVideoLink: false,
        muteAudio: false,
        autoPlay: false,
        ...formatDefaultValues(defaultValues),
      }}
      className="create-new-slider"
      form={form}
      onFinish={onFinish}
      layout="vertical">
      <Form.Item
        name="mediaType"
        label="Choose what you want to upload"
        rules={[
          {
            required: true,
          },
        ]}>
        <Radio.Group>
          <Radio value="IMAGE">
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ImagesSVG width={14} height={14} /> Photo
            </span>
          </Radio>
          <Radio value="VIDEO">
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CinemaSVG width={14} height={14} /> Video
            </span>
          </Radio>
        </Radio.Group>
      </Form.Item>
      {mediaType === "VIDEO" && (
        <Form.Item valuePropName="checked" name="isExternalVideoLink">
          <Checkbox>External Link</Checkbox>
        </Form.Item>
      )}
      {(mediaType === "IMAGE" || (mediaType === "VIDEO" && !isExternalVideoLink)) && (
        <Form.Item
          name="media"
          rules={[
            {
              required: true,
              message: "Please upload file",
            },
          ]}>
          <Upload.Dragger
            maxCount={1}
            action={API_BASE + "vindo/file-upload"}
            showUploadList={false}
            headers={{ Authorization: axios.defaults.headers.authorization }}
            accept={mediaType === "VIDEO" ? "video/*" : mediaType === "IMAGE" ? "image/*" : ""}
            onChange={(info) => {
              setIsLoadingImage(true);
              if (info.file.status === "done") {
                handleChangeImageChange(info?.file?.response?.data);
                setIsLoadingImage(false);
                message.success(`image uploaded successfully`);
              } else if (info.file.status === "error") {
                message.error(`image upload failed.`);
                setIsLoadingImage(false);
              }
            }}
            style={{
              background: "#F2F2F7",
              borderRadius: "14px",
              minHeight: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}>
            <Spin size="small" spinning={isLoadingImage}>
              {previewPic && mediaType === "IMAGE" && (
                <img
                  src={previewPic}
                  alt="preview image"
                  style={{
                    width: "100%",
                    maxHeight: 150,
                  }}
                />
              )}
              {previewPic && mediaType === "VIDEO" && (
                <span className="d-flex align-center justify-center flex-column">
                  <CinemaSVG width={44} height={44} />
                  <Typography.Text>{getFileName(previewPic)}</Typography.Text>
                </span>
              )}
              {!previewPic && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}>
                  <Typography.Text className="gc fz-12">
                    <span className="fz-14">+</span> Upload Media
                  </Typography.Text>
                </div>
              )}
            </Spin>
          </Upload.Dragger>
        </Form.Item>
      )}
      {mediaType === "VIDEO" && isExternalVideoLink && (
        <Form.Item name="media" label="Link" rules={[{ required: true }]}>
          <Input placeholder="Enter Here" />
        </Form.Item>
      )}
      {mediaType === "VIDEO" && (
        <Row>
          <Col xs={12}>
            <Form.Item valuePropName="checked" name="autoPlay">
              <Checkbox>Auto Play</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item valuePropName="checked" name="muteAudio">
              <Checkbox>Mute</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      )}
      <Form.Item name="name" label="Virtual Portal Name" rules={[{ required: true }]}>
        <Input placeholder="Enter Here" />
      </Form.Item>
      {!showComping && (
        <Flex justify="space-between">
          <Typography.Text className="comping-up-text">Comping up</Typography.Text>
          <div
            onClick={() => {
              setShowComping(true);
            }}
            className="rename">
            <EditSVG color="#3A5EE3" width={"10px"} height="9px"></EditSVG> Rename
          </div>
        </Flex>
      )}
      {showComping && (
        <Form.Item name="compingUp" label="Comping up" rules={[{ required: false }]}>
          <Input placeholder="Event" />
        </Form.Item>
      )}
      <Form.Item style={{ marginTop: "2px" }} labelAlign="left" name="showComping">
        <ShowField />
      </Form.Item>
      <Flex gap={8} align={"center"}>
        <Col>
          <Typography.Text className="inline-text ">Button Color</Typography.Text>
        </Col>
        <Col flex={1}>
          <Flex gap={8}>
            <Form.Item className="color-picker-form" style={{ margin: 0 }} name="background">
              <Picker
                disabledAlpha
                defaultFormat="hex"
                format="hex"
                showText={() => <span>Bg Color</span>}
              />
            </Form.Item>
            <Form.Item className="color-picker-form" style={{ margin: 0 }} name="fontColor">
              <Picker
                format="hex"
                defaultFormat="hex"
                disabledAlpha
                defaultValue="#1677ff"
                showText={() => <span>Font Color</span>}
              />
            </Form.Item>
          </Flex>
        </Col>
      </Flex>

      {/* <Form.Item name="dimensionId" label="Dimension" rules={[{ required: true }]}>
        <Select placeholder="Select Dimension">
          {dimensions.map((dimension) => (
            <Select.Option value={dimension.id} key={dimension.id}>
              <Row align="middle" wrap={false} gutter={[8, 0]}>
                <Col>
                  <Avatar preview={false} src={dimension.image} />
                </Col>
                <Col>
                  <Typography.Text>{dimension.name}</Typography.Text>
                </Col>
              </Row>
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}

      <Flex gap={8} style={{ marginTop: "18px" }}>
        <Button style={{ width: "100%" }} onClick={() => setAddSlideModal(false)}>
          Cancel
        </Button>
        <Button
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          loading={isPending || isLoadingUpdate}>
          Save
        </Button>
      </Flex>
    </Form>
  );
}
const ShowField = (props) => {
  return (
    <Row gutter={[20]}>
      <Col>
        <Typography.Text className="inline-text ">Show</Typography.Text>
      </Col>
      <Col flex={1}>
        <Radio.Group {...props} size="small" defaultValue={"yes"}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Col>
    </Row>
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
      showText={() => <span>Font Color</span>}
    />
  );
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
