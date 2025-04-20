import { Form, Typography } from "antd";
import Box from "components/Box";
import { message, Upload } from "antd";
import {
  FileImageTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import Footer from "./Footer";
import { useImperativeHandle, useState } from "react";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: false,
  beforeUpload: () => {
    return false;
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const Attachments = ({ onClose, formRef, onSubmit, prev, isLoading, isCompany }) => {
  const [form] = Form.useForm();
  const [attachments, setAttachments] = useState([]);
  useImperativeHandle(formRef, () => ({
    valid: valid,
  }));
  const handleOnSave = (data) => {
    // const files = [];
    // attachments.forEach((element) => {
    //   files.push(element.originFileObj);
    // });
    onSubmit({ ...data });
  };
  const valid = async () => {
    await form.validateFields();
    return { ...form.getFieldValue() };
  };
  const onPrevious = async () => {
    await form.validateFields();
    // const files = [];
    // attachments.forEach((element) => {
    //   files.push(element.originFileObj);
    // });
    prev({ ...form.getFieldValue() });
  };

  return (
    <Box
      sx={{
        marginTop: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Form
        form={form}
        onFinish={handleOnSave}
        size={"small"}
        layout="vertical"
        labelAlign="left"
        colon={false}
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 23,
        }}>
        <Typography className="attachments-form-header">
          Upload All Attachments That You Need From {isCompany ? "Company" : "Contact"}
        </Typography>
        <Form.Item name="attachments" label="Attachments">
          <Dragger
            iconRender={(file) => {
              // Customize the rendering of the icon based on the file status

              if (file.type.includes("image/")) {
                return <FileImageTwoTone />;
              }
              if (file.type.includes("officedocument")) {
                return <FileWordTwoTone />;
              }
              if (file.type.includes("/pdf")) {
                return <FilePdfTwoTone></FilePdfTwoTone>;
              }
              return <UploadOutlined />;
            }}
            className="attachments-form-dragger"
            onChange={(info) => {
              const { status } = info.file;

              setAttachments(info.fileList);

              if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
            {...props}>
            <p
              style={{
                marginBottom: "0px",
                color: "#030713",
              }}>
              <UploadOutlined /> Upload File
            </p>
            <p className="attachments-form-dragger-ondrop">Or drag and drop</p>
          </Dragger>
        </Form.Item>
      </Form>
      <Footer
        onCancel={onClose}
        isLoading={isLoading}
        onPrevious={onPrevious}
        onSave={() => form.submit()}></Footer>
    </Box>
  );
};
export default Attachments;
