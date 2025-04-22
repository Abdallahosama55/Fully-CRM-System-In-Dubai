import React from "react";
import UploadInput from "../UploadInput";
import { Col, Flex, Image, Row, Dropdown } from "antd";
import { MenuDotsSVG } from "assets/jsx-svg";
// style
import "./styles.css";
const UploadImagesListInput = ({
  value = [],
  fullWidth = false,
  onChange,
  withCoverSelect,
  ...props
}) => {
  return (
    <Row gutter={[12, 12]}>
      <Col md={fullWidth ? 24 : 10} xs={24}>
        <UploadInput
          insideImageListInput={true}
          fullWidth={fullWidth}
          withListContainer={false}
          withImagePreview={false}
          {...props}
          onChange={(newImage) => {
            if (withCoverSelect) {
              onChange(
                Array.isArray(value) ? [newImage, ...value] : [{ ...newImage, isCover: true }],
              );
            } else {
              onChange(Array.isArray(value) ? [newImage, ...value] : [newImage]);
            }
          }}
        />
      </Col>
      <Col md={fullWidth ? 24 : 14} xs={24}>
        {Array.isArray(value) && (
          <Flex wrap={"wrap"} gap={8}>
            {value.map((item, index) => (
              <div key={index} className="image_preview_card">
                <div
                  className={"image_menu_container"}
                  style={
                    withCoverSelect
                      ? {}
                      : { background: "#FFF", borderRadius: "4px", padding: "0.5rem 0" }
                  }>
                  <Dropdown
                    menu={{
                      items: withCoverSelect
                        ? [
                            {
                              label: "Make as cover",
                              onClick: () => {
                                const newImages = value?.map((img, i) => {
                                  if (i === index) {
                                    return { ...img, isCover: true };
                                  } else {
                                    return { ...img, isCover: false };
                                  }
                                });
                                onChange(newImages);
                              },
                              key: "0",
                            },
                            {
                              label: "Delete",
                              onClick: () => {
                                if (withCoverSelect && item?.isCover) {
                                  onChange(
                                    value
                                      ?.filter((_, i) => i !== index)
                                      ?.map((img, i) => {
                                        if (i === 0) {
                                          return { ...img, isCover: true };
                                        } else {
                                          return { ...img, isCover: false };
                                        }
                                      }),
                                  );
                                } else {
                                  onChange(value?.filter((_, i) => i !== index));
                                }
                              },
                              key: "1",
                            },
                          ]
                        : [
                            {
                              label: "Delete",
                              onClick: () => onChange(value?.filter((_, i) => i !== index)),
                              key: "1",
                            },
                          ],
                    }}
                    trigger={["click"]}>
                    <MenuDotsSVG fill={withCoverSelect ? "#fff" : "#000"} />
                  </Dropdown>
                </div>
                {withCoverSelect && (
                  <div className="cover_container">
                    <span className="sm_text_medium fw-700">{item?.isCover ? "Cover" : ""}</span>
                  </div>
                )}
                <Image src={item?.link} width={100} height={100} className="image-preview" />
              </div>
            ))}
          </Flex>
        )}
      </Col>
    </Row>
  );
};

export default UploadImagesListInput;
