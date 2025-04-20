import { useState, useEffect, useRef } from "react";
import Dragger from "antd/es/upload/Dragger";
import { Typography, message } from "antd";
// icons
import { GallerySVG2, TrashSVG, Upload } from "assets/jsx-svg";
// utils
import { getBase64 } from "utils/getBase64";
// images
import defaultAvatar from "assets/images/avatar.png";
// style
import "./styles.css";
const AvatarUpload = ({ value, onChange, setPreviewPicData, title }) => {
  const [previewPic, setPreviewPic] = useState(value || defaultAvatar);

  useEffect(() => {
    if (value) {
      setPreviewPic(value);
      setPreviewPicData(value);
    }
  }, [value]);

  const draggerProps = {
    name: "avatar",
    showUploadList: false,
    multiple: false,
    action: false,
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      onChange(info.fileList[0]);
      const { status } = info.file;
      setPreviewPic(await getBase64(info.fileList[0].originFileObj));
      setPreviewPicData(info.fileList[0].originFileObj);

      if (status === "done") {
        message.success(`${info.file.name} image uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} image upload failed.`);
      }
    },
    accept: "image/*",
    className: "avatar_image_dragger",
  };
  const handelDeleteImage = () => {
    setPreviewPicData(null);
    setPreviewPic(defaultAvatar);
  };
  const drafRef = useRef();
  return (
    <div style={{ display: "flex", columnGap: 15 }}>
      <div className="avatar_upload">
        <Dragger ref={drafRef} {...draggerProps}>
          <div className="image_preview_box">
            <img src={previewPic} alt="avatar" className="avatar_preview" />
            <div className="upload_overlay center-items">
              <Upload />
              <Typography.Text className="wc fz-12">Upload</Typography.Text>
            </div>
          </div>
        </Dragger>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "start",
        }}>
        <div style={{ color: "#030713", fontSize: 12, fontWeight: 500 }}>{title}</div>
        <div style={{ display: "flex", columnGap: 15 }}>
          <div
            style={{ cursor: "pointer", display: "flex", alignItems: "center", columnGap: 4 }}
            onClick={() => {
              drafRef.current?.upload.uploader.fileInput.click();
            }}>
            <GallerySVG2 />
            <div style={{ color: "#3A5EE3", fontSize: 11 }}>Upload</div>
          </div>
          <div
            style={{ cursor: "pointer", display: "flex", alignItems: "center", columnGap: 4 }}
            onClick={handelDeleteImage}>
            <TrashSVG color={"red"} />
            <div style={{ color: "#DB4F40", fontSize: 11 }}> Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
