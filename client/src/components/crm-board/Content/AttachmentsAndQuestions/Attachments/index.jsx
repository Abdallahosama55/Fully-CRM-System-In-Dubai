import React from "react";
import "./styles.css";
import { Button } from "antd";
import { useState } from "react";
import "./styles.css";

// icons
import pdfIcon from "../../../../../assets/images/pdf.png";
import imageIcon from "../../../../../assets/images/jpg.png";
import docIcon from "../../../../../assets/images/doc.png";
const Attachments = ({ showAttachments = true }) => {
  const [attachments, setAttachments] = useState([
    {
      name: "File_1.pdf",
      id: "pdf",
    },
    {
      name: "File_2.png",
      id: "png",
    },
    {
      name: "File_3.doc",
      id: "doc",
    },
  ]);

  const getIcon = (name) => {
    const ext = name.split(".")[name.split(".").length - 1];
    switch (ext) {
      case "pdf":
        return pdfIcon;
      case "png":
        return imageIcon;
      case "jpg":
        return imageIcon;
      case "gif":
        return imageIcon;
      case "doc":
        return docIcon;
      case "docs":
        return docIcon;
    }
  };
  return (
    <div className="attachments">
      {showAttachments && (
        <div className="head">
          <p className="fz-14">Attachments</p>
          <Button type="text" size="small" className="prim_btn">
            + Add New
          </Button>
        </div>
      )}

      <div className="body">
        {attachments.map((item) => {
          return (
            <div className="file_card" key={item.id}>
              <img src={getIcon(item.name)} className="file_icon" alt="" />
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Attachments;
