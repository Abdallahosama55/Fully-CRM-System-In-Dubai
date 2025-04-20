import { Upload, message } from "antd";
import React, { useState } from "react";
import { TRAVEL_API_URL } from "services/travel/config";
// style
import "./styles.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Delete2SVG } from "assets/jsx-svg";
const UploadImage = ({
  value,
  onChange,
  className = "",
  style = {},
  isDelete = false,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setIsLoading(true);
      return;
    }

    if (info.file.status === "done") {
      setIsLoading(false);
      onChange(info.file.response.data);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG images!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt5M;
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );
  console.log("value", value);
  return (
    <div className={className} style={{ position: "relative" }}>
      <Upload
        style={style}
        name="image"
        value={value}
        listType="picture-card"
        className="image-uploader"
        showUploadList={false}
        action={TRAVEL_API_URL + "common/add-image"}
        beforeUpload={beforeUpload}
        {...rest}
        onChange={handleChange}>
        {value ? (
          <>
            <img
              src={value}
              alt="upload"
              className="preveou-image"
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          </>
        ) : (
          uploadButton
        )}
      </Upload>
      {isDelete && value && (
        <div onClick={() => onChange()} style={{ marginTop: "4PX" }}>
          <Delete2SVG className="clickable" color="Red" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
