import { Col, Dropdown, Image, Modal, Row, Tooltip, Typography } from "antd";
import { DeleteSVG, DownloadSVG, FullscreenSVG, MoreSVG } from "assets/jsx-svg";
import { useState } from "react";
import { filesExtentionsImg } from "utils/filesExtentionsImg";

export default function TicketFile({
  attachment = false,
  file = false,
  fileDelete,
}) {
  const [openPreview, setOpenPreview] = useState(false);

  const items = [
    {
      key: "2",
      label: (
        <Row align="middle" gutter={[6, 0]}>
          <Col>
            <Row align="middle">
              <FullscreenSVG
                color="#000"
                style={{ width: "14px", height: "14px" }}
              />
            </Row>
          </Col>
          <Col>
            <Typography.Text>Preview</Typography.Text>
          </Col>
        </Row>
      ),
      onClick: () => setOpenPreview(true),
    },
    {
      key: "1",
      label: (
        <Row align="middle" gutter={[6, 0]}>
          <Col>
            <DownloadSVG />
          </Col>
          <Col>
            <Typography.Text>Download</Typography.Text>
          </Col>
        </Row>
      ),
      onClick: () => window.open(attachment),
    },
  ];

  if (file) {
    return (
      <div className="relpay-attachment">
        <Row align="middle" justify="space-between" gutter={[6, 0]}>
          <Col>
            <Row
              align="middle"
              justify="space-between"
              gutter={[4, 0]}
              wrap={false}
            >
              <Col>
                <Image
                  width={24}
                  height={24}
                  alt={file.name}
                  src={filesExtentionsImg(file.type)}
                  preview={false}
                />
              </Col>
              <Col>
                <Tooltip title={file.name}>
                  <Typography.Text ellipsis style={{ maxWidth: "120px" }}>
                    {file.name}
                  </Typography.Text>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row align="middle">
              <DeleteSVG
                color="#f00"
                className="clickable"
                onClick={() => fileDelete(file.name)}
              />
            </Row>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className="relpay-attachment">
        <Row align="middle" justify="space-between" gutter={[4, 0]}>
          <Col>
            <Row
              align="middle"
              justify="space-between"
              gutter={[4, 0]}
              wrap={false}
            >
              <Col>
                <Image
                  width={24}
                  height={24}
                  alt={attachment}
                  src={filesExtentionsImg(
                    `bla/${
                      attachment.split(".")[attachment.split(".").length - 1]
                    }`,
                  )}
                  preview={false}
                />
              </Col>
              <Col>
                <Tooltip
                  title={
                    attachment.split("/")[attachment.split("/").length - 1]
                  }
                >
                  <Typography.Text ellipsis style={{ maxWidth: "120px" }}>
                    {attachment.split("/")[attachment.split("/").length - 1]}
                  </Typography.Text>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row align="middle">
              {["jpg", "jpeg", "png", "webp"].includes(
                attachment.split(".")[attachment.split(".").length - 1],
              ) ? (
                <>
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    overlayStyle={{ padding: "0px" }}
                    openClassName="files-more-options"
                    trigger={["click"]}
                  >
                    <div className="clickable">
                      <MoreSVG
                        style={{
                          width: "12px",
                          height: "12px",
                          rotate: "90deg",
                        }}
                      />
                    </div>
                  </Dropdown>

                  <Modal
                    footer={false}
                    title=""
                    open={openPreview}
                    onCancel={() => setOpenPreview(false)}
                    centered
                  >
                    <Row justify="center" align="middle">
                      <Image
                        src={attachment}
                        alt={attachment}
                        preview={false}
                        style={{ maxHeight: "50vh" }}
                      />
                    </Row>
                  </Modal>
                </>
              ) : (
                <DownloadSVG
                  className="clickable"
                  onClick={() => window.open(attachment)}
                />
              )}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
