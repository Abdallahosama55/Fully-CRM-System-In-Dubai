import React, { useState, useRef, useEffect } from "react";
import { Modal, Typography } from "antd";

const Description = ({ description, style = {}, rows = 7, readMoreInPopUp = false, ...props }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (paragraph) {
      const { clientHeight, scrollHeight } = paragraph;
      if (scrollHeight > clientHeight) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    }
  }, [description]);

  return (
    <>
      {readMoreInPopUp && isReadMore && (
        <Modal footer={null} open={isReadMore} onCancel={() => setIsReadMore(false)}>
          <div dangerouslySetInnerHTML={{ __html: description }} style={style} />
        </Modal>
      )}
      {description && (
        <div className="mt-1 description">
          <Typography.Paragraph
            style={{ margin: "unset" }}
            ellipsis={
              readMoreInPopUp
                ? {
                    rows: rows,
                    expandable: false,
                  }
                : !isReadMore
                ? {
                    rows: rows,
                    expandable: false,
                  }
                : readMoreInPopUp
            }
            ref={paragraphRef}
            {...props}>
            <div dangerouslySetInnerHTML={{ __html: description }} style={style} />
          </Typography.Paragraph>
          {isOverflow && (
            <span
              style={{ color: "#3A5EE3", cursor: "pointer" }}
              onClick={() => setIsReadMore((prev) => !prev)}>
              {isReadMore ? "Read less" : "Read more"}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Description;
