import React from "react";
import { message, Upload } from "antd";
import {
  FileImageTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  UploadOutlined,
} from "@ant-design/icons";

import "./styles.css";

const { Dragger } = Upload;
const defaultProps = {
  name: "file",
  multiple: false,
  action: false,
  beforeUpload: () => {
    return false;
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const UploadFile = ({ onChange, ...props }) => {
  return (
    <Dragger
      {...defaultProps}
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
      onChange={(info) => {
        const { status } = info.file;

        onChange(info.fileList);

        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
      className="custome-common-upload-file"
      {...props}>
      <p
        style={{
          marginBottom: "0px",
          color: "#030713",
        }}>
        <UploadOutlined /> Upload File
      </p>
      <p
        style={{
          font: `var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal)
            var(--unnamed-font-size-12) / 19px var(--unnamed-font-family-poppins)`,
          letterSpacing: "var(--unnamed-character-spacing-0-24)",
          color: "var(--gray-2)",

          font: "normal normal normal 12px/19px Poppins",
          letterSpacing: "0.24px",
          color: "#aeaeb2",
        }}>
        Or drag and drop
      </p>
    </Dragger>
  );
};

export default UploadFile;
