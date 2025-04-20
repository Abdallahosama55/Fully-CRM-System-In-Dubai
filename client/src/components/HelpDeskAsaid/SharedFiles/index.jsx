import { Col, Image, Row, Tooltip, Typography } from "antd";

import png from "assets/images/png.png";
import pdf from "assets/images/pdf.png";
import doc from "assets/images/doc.png";
import xls from "assets/images/xls.png";
import zip from "assets/images/zip.png";
import jpg from "assets/images/jpg.png";
import fileImg from "assets/images/file.png";

import "./styles.css";
import { ArrowDownSVG, DownloadSVG } from "assets/jsx-svg";

export default function SharedFiles({
  setActiveBtn,
  sharedFiles = [],
  ticketView = false,
}) {
  return (
    <section className="shared-files">
      <Row
        wrap={false}
        align="middle"
        gutter={[8, 0]}
        style={{ width: "fit-content" }}
        className="clickable"
        onClick={() => setActiveBtn("tools")}
      >
        {!ticketView && (
          <>
            <Col>
              <Row align="middle">
                <ArrowDownSVG color="#8E8E93" style={{ rotate: "-90deg" }} />
              </Row>
            </Col>
            <Col>
              <Typography.Text className="gc">Back</Typography.Text>
            </Col>
          </>
        )}
      </Row>
      {!ticketView ? (
        <Row style={{ marginTop: "24px" }} gutter={[0, 24]}>
          <Col xs={24}>
            <Typography.Text className="fz-16 fw-500">
              Files shared by host:
            </Typography.Text>
          </Col>
        </Row>
      ) : (
        <Row gutter={[0, 24]}>
          <Col xs={24}>
            <Typography.Text className="fz-16 fw-500">
              Uploaded Files:
            </Typography.Text>
          </Col>
        </Row>
      )}

      <Row
        gutter={[0, 8]}
        className="mt-1"
        style={{ maxHeight: "750px", overflowY: "auto" }}
      >
        {sharedFiles?.map((file) => (
          <Col key={file.id} xs={24} style={{ userSelect: "none" }}>
            <Row
              justify="space-between"
              align="middle"
              wrap={false}
              className="file-uploaded"
            >
              <Col>
                <Row align="middle" wrap={false} gutter={[16, 0]}>
                  <Col>
                    <Image
                      width={32}
                      height={32}
                      alt={file.name}
                      src={filesExtentionsImg(file.type)}
                      preview={false}
                    />
                  </Col>
                  <Col style={{ maxWidth: "100px" }}>
                    <Tooltip title={file.name}>
                      <Typography.Text ellipsis>{file.name}</Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>

              <Col className="clickable" onClick={() => window.open(file.url)}>
                <Row align="middle" wrap={false} gutter={[8, 0]}>
                  <Col>
                    {!ticketView ? (
                      <Typography.Text>Download</Typography.Text>
                    ) : (
                      <DownloadSVG />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </section>
  );
}

const filesExtentionsImg = (fileType) => {
  const extension = fileType.split("/")[1];

  let imageSrc;
  switch (extension) {
    case "png":
      imageSrc = png;
      break;
    case "pdf":
      imageSrc = pdf;
      break;
    case "doc":
    case "docx":
      imageSrc = doc;
      break;
    case "xls":
    case "xlsx":
      imageSrc = xls;
      break;
    case "zip":
      imageSrc = zip;
      break;
    case "jpg":
    case "jpeg":
      imageSrc = jpg;
      break;
    default:
      imageSrc = fileImg;
  }

  return imageSrc;
};
