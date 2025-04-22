import { Col, Flex, message, Row, Upload } from "antd";
import { UploadCloudSVG } from "assets/jsx-svg";
import React, { useEffect, useState } from "react";

const UploadInput = ({
  value,
  onChange: onValueChange,
  name,
  action,
  maxImageSize = 5,
  maxWidth,
  maxHeight,
  maxText = "100px x 100px",
  uploadText,
  formatsText,
  insideImageListInput = false,
  setUploadingState = () => {},
  withImagePreview = true,
  withListContainer = true,
  fullWidth = false,
  imagePreviwSize = "125px",
}) => {
  const [image, setImage] = useState(value);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (value) {
      setImage(value);
      setFileList(
        value?.link && value?.id && value?.name
          ? [{ uid: value.id, name: value.name, url: value.link }]
          : [],
      ); // Initialize file list if image exists
    }
  }, [value]);

  useEffect(() => {
    if (!isFirstTime) {
      onValueChange(image);
    } else {
      setIsFirstTime(false);
    }
  }, [image]);

  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList];

    // Limit file list to one image
    newFileList = newFileList.slice(-1);
    setFileList(newFileList); // Update the file list with the latest file

    const { status } = info.file;
    if (status === "uploading") {
      setIsUploading(true);
      setUploadingState(true);
    } else {
      setIsUploading(false);
      setUploadingState(false);
      if (status === "done") {
        console.log(info.file.response);
        setImage({
          id: info?.file?.uid,
          name: info?.file?.response?.data?.imageName || info?.file?.uid,
          link: info?.file?.response?.data?.imageUrl || info?.file?.response?.uploadedFiles?.image,
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLtMaxSize = file.size / 1024 / 1024 < maxImageSize;
    if (!isLtMaxSize) {
      message.error(`Image must be smaller than ${maxImageSize}MB!`);
      return false;
    }

    // Check the dimensions of the image before allowing the upload
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const { width, height } = img;

          if ((maxWidth && maxHeight && width > maxWidth) || height > maxHeight) {
            message.error(`Image must be smaller than ${maxWidth}px by ${maxHeight}px!`);
            reject(false); // Reject the upload if the dimensions are too large
          } else {
            resolve(true); // Allow the upload if the dimensions are within the limit
          }
        };
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="image_input">
      <Upload.Dragger
        disabled={isUploading}
        beforeUpload={beforeUpload}
        fileList={fileList} // Controlled file list
        itemRender={(item) => {
          if (!withListContainer) {
            return <></>;
          }

          return image?.link && !isUploading && withImagePreview ? (
            <img
              src={image?.link}
              style={{
                borderRadius: "1rem",
                objectFit: "cover",
                marginTop: "0.5rem",
                width: imagePreviwSize,
                height: imagePreviwSize,
              }}
              alt={"preview"}
            />
          ) : (
            item
          );
        }}
        headers={{
          authorization: localStorage.getItem("vindo-token") || "",
        }}
        name={name}
        action={action}
        onChange={handleUploadChange}
        onRemove={() => {
          setFileList([]); // Clear file list on removal
          setImage(null); // Clear image on removal
        }}>
        <Row gutter={[12, 12]}>
          {!fullWidth && (
            <Col md={4} xs={24} className="center-items">
              <UploadCloudSVG />
            </Col>
          )}
          <Col md={fullWidth ? 24 : 20} xs={24} className="center-items">
            <div className="center-items" style={{ flexDirection: "column" }}>
              <p className="fz-14 fw-400" style={{ color: "#647187" }}>
                {fullWidth && (
                  <Flex align="center" justify="center" style={{ margin: "2rem" }}>
                    <UploadCloudSVG />
                  </Flex>
                )}
                <span style={{ color: "#3538CD" }} className="fw-500">
                  {uploadText
                    ? uploadText
                    : value && !insideImageListInput
                    ? "Click to replace image"
                    : "Click to upload"}
                </span>{" "}
                {!uploadText && "or drag and drop"}
              </p>
              <p className="fz-12 fw-400" style={{ color: "#647187" }}>
                {formatsText ? formatsText : `SVG, PNG, JPG or GIF (max. ${maxText})`}
              </p>
            </div>
          </Col>
        </Row>
      </Upload.Dragger>
    </div>
  );
};

export default UploadInput;
