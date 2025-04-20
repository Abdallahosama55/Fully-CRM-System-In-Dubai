import React, { useState } from "react";
import { Input, Upload, Typography, message } from "antd";
import UploadFormsSvg from "assets/jsx-svg/uploadFormsSvg";

const { Text } = Typography;

const FileuploadTypes = ({
  questionText,
  fileValue = null,
  onQuestionTextChange,
  onFileChange,
}) => {
  const [fileList, setFileList] = useState(fileValue ? [fileValue] : []);

  const beforeUpload = (file) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File must be smaller than 5MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Only pass the file object if it exists
    onFileChange(newFileList.length > 0 ? newFileList[0] : null);
  };

  const handleRemove = () => {
    setFileList([]);
    onFileChange(null);
  };

  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        border: "1px solid #D0D5DD",
        margin: "0 auto",
      }}>
      <Text strong style={{ display: "block", marginBottom: "8px" }}>
        Question
      </Text>
      <Input
        placeholder="Please upload your picture"
        value={questionText}
        onChange={(e) => onQuestionTextChange(e.target.value)}
        style={{ marginBottom: "24px", fontSize: "13px" }}
      />

      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
        <Upload
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onRemove={handleRemove}
          maxCount={1}
          accept=".png,.jpg,.jpeg,.pdf">
          <div
            style={{
              borderRadius: 12,
              padding: "20px 40px",
              cursor: "pointer",
              gap: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}>
            <UploadFormsSvg />
            <Text style={{ fontWeight: 700, color: "#2D6ADB", display: "block" }}>
              {fileList.length > 0 ? fileList[0].name : "Choose file"}
            </Text>
            <div style={{ fontSize: 12, color: "#667085" }}>
              {fileList.length > 0 ? "Click to change" : "Size limit: 5MB"}
            </div>
          </div>
        </Upload>
      </div>
    </div>
  );
};

export default FileuploadTypes;
