import React, { useState } from "react";
import pdfIcon from "assets/images/pdf.png";
import imageIcon from "assets/images/jpg.png";
import docIcon from "assets/images/doc.png";
import dayjs from "dayjs";
import { DeleteSVG, TimeSVG } from "assets/jsx-svg";
import { Button, Card, Typography } from "antd";
const getIcon = (name) => {
  const ext = name.split(".")[name.split(".").length - 1];
  console.log("ext", ext);
  switch (ext) {
    case "pdf":
      return pdfIcon;
    case "png":
      return imageIcon;
    case "jpg":
    case "jpeg":
      return imageIcon;
    case "gif":
      return imageIcon;
    case "doc":
    case "docx":
    case "docs":
      return docIcon;

    default:
      return "";
  }
};
const showLink = (link) => {
  const ext = link.split(".")[link.split(".").length - 1];

  switch (ext) {
    case "png":
    case "jpg":
    case "jpeg":
      return link;

    default:
      return "https://aem.dropbox.com/cms/content/dam/dropbox/dmep/assets/articles/30_What-is-a-zip-file_Hero.jpg";
  }
};
const FileCard = ({ name, link, createdAt, id, onDelete }) => {
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const handleDownloadFile = () => {
    const linkFile = document.createElement("a");
    linkFile.href = link;
    document.body.appendChild(linkFile);
    linkFile.click();
    document.body.removeChild(linkFile);
  };
  const handleDeleteFile = async () => {
    try {
      if (typeof onDelete === "function") {
        setLoadingDelete(true);
        await onDelete(id);
      }
    } finally {
      setLoadingDelete(false);
    }
    return;
  };
  return (
    <Card
      extra={
        <Button
          loading={isLoadingDelete}
          onClick={handleDeleteFile}
          size="small"
          shape="circle"
          type="link">
          {!isLoadingDelete && <DeleteSVG color="black"></DeleteSVG>}
        </Button>
      }
      className="desks-desks-file-file-card"
      cover={<img alt="example" src={showLink(link)} />}
      title={
        <div
          style={{
            display: "flex",
          }}>
          <img
            src={getIcon(link)}
            style={{
              height: "40px",
              height: "40px",
              objectFit: "contain",
            }}
            alt={link}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            <Typography.Text
              onClick={handleDownloadFile}
              ellipsis
              title={name}
              style={{
                cursor: "pointer",
                color: "#202020",
                fontSize: "14px",
                lineHeight: "21px",
                fontWeight: "500",
              }}>
              {name}
            </Typography.Text>
            <label
              style={{
                color: "#8e8e93",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "18px",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}>
              <TimeSVG color="#8e8e93" width={11} height={11}></TimeSVG>
              {dayjs(createdAt).format("DD MMM YYYY")}
            </label>
          </div>
        </div>
      }></Card>
  );
};

export default FileCard;
