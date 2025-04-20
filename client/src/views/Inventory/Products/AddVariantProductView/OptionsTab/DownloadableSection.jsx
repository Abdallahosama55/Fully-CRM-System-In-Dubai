import {
  Button,
  Col,
  Form,
  Image,
  InputNumber,
  message,
  Row,
  Typography,
  Upload,
} from "antd";
import { UploadSVG } from "assets/jsx-svg";
import { useRef, useState } from "react";
import Infinity from "assets/images/Infinity.png";
import Delete from "assets/images/IconlyLightOutlineDelete.png";

export default function DownloadableSection({ form, name }) {
  const addDownloadableBtnRef = useRef([]);
  const [downloadLimit, setDownloadLimit] = useState(false);
  const [downloadExpiry, setDownloadExpiry] = useState(false);
  const [firstFileName, setFirstFileName] = useState("");
  const [restFilesName, setRestFilesName] = useState([]);

  const beforUploadFile = (file) => {
    if (file.size < 2097152) {
      return file;
    } else {
      message.error("File must be less than 2MB");
      return Upload.LIST_IGNORE;
    }
  };

  const changeUploadFiles = (files, id) => {
    setRestFilesName((prev) => {
      if (prev) {
        let copiedPrev = [...prev];
        let prevObjectIndex = copiedPrev.findIndex((item) => item.id === id);
        if (prevObjectIndex === -1) {
          copiedPrev.push({ id: id, name: files.file.name });
        } else {
          copiedPrev[prevObjectIndex].name = files.file.name;
        }

        return copiedPrev;
      } else return { id: id, name: files.file.name };
    });
  };

  const getFileName = (key) => {
    let file = restFilesName.find((file) => file.id === key);
    if (file) {
      return file.name;
    } else {
      return "No File";
    }
  };

  return (
    <>
      <Form.Item noStyle>
        <Row className="upload-input">
          <Col flex={1}>
            <Form.Item
              name={[name, "firstDownloadableFiles"]}
              label="Downloadable Files"
            >
              <Upload
                beforeUpload={beforUploadFile}
                maxCount={1}
                action={false}
                showUploadList={false}
                onChange={(file) => setFirstFileName(file.file.name)}
              >
                <span className="upload-click"></span>
                <span className="file-name">
                  <Typography.Text>
                    {firstFileName || "No File"}
                  </Typography.Text>
                </span>
                <div className="upload-icon">
                  <UploadSVG />
                </div>
              </Upload>
            </Form.Item>
            {firstFileName !== "" ? (
              <div
                className="delete-photo"
                onClick={() => {
                  form.setFieldValue(
                    [name, "firstDownloadableFiles"],
                    undefined,
                  );
                  setFirstFileName("");
                }}
              >
                <Image src={Delete} preview={false} />
              </div>
            ) : null}
          </Col>
          <Col className="btn-with-select">
            <Button
              onClick={() => addDownloadableBtnRef.current[name].click()}
              type="primary"
              className="add-btn"
              style={{ background: "#272942" }}
            >
              + Add
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.List name={[name, "downloadableFiles"]}>
        {(fields3, { add, remove }) => (
          <>
            <Row style={{ display: "none" }} className="btn-with-select">
              <Button
                ref={(el) => (addDownloadableBtnRef.current[name] = el)}
                type="primary"
                onClick={() => {
                  add();
                }}
                className="add-btn"
                style={{ background: "#272942" }}
              >
                + Add
              </Button>
            </Row>

            {fields3.map(({ key, name }) => (
              <Row key={key} wrap={false}>
                <Col flex={1}>
                  <Form.Item noStyle>
                    <Form.Item
                      name={[name, `downloadableFiles`]}
                      className="upload-input"
                    >
                      <Upload
                        beforeUpload={beforUploadFile}
                        maxCount={1}
                        action={false}
                        showUploadList={false}
                        onChange={(file) => changeUploadFiles(file, key)}
                      >
                        <span className="upload-click"></span>
                        <span className="file-name">
                          <Typography.Text>{getFileName(key)}</Typography.Text>
                        </span>
                        <div className="upload-icon">
                          {" "}
                          <UploadSVG />
                        </div>
                      </Upload>
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Button
                  onClick={() => {
                    setRestFilesName((prev) =>
                      prev.filter((file) => file.id !== key),
                    );
                    remove(name);
                  }}
                  className="big-input-btn"
                >
                  <Row align="middle" justify="center">
                    <Image src={Delete} preview={false} />
                  </Row>
                </Button>
              </Row>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item label="Download Limit">
        <Row className="input-with-btn-row">
          <Col flex={1}>
            <Form.Item name={[name, "downloadLimit"]} noStyle>
              <InputNumber
                className="input-with-btn w-100"
                placeholder="Enter number of downloads or Leave blank for unlimited re-downloads"
                disabled={downloadLimit}
                min={1}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              onClick={() => {
                form.setFieldValue(
                  ["attributes", name, "downloadLimit"],
                  undefined,
                );
                setDownloadLimit((prev) => !prev);
              }}
              className="big-input-btn-Infinity "
              style={{
                background: "#272942",
              }}
            >
              <Row justify="center" align="middle">
                <Image preview={false} src={Infinity} />
              </Row>
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label="Download Expiry">
        <Row className="input-with-btn-row">
          <Col flex={1}>
            <Form.Item name={[name, "downloadExpiry"]} noStyle>
              <InputNumber
                className="input-with-btn w-100"
                placeholder="Enter the number of day before a download link expeirs or Leave blank for unlimited"
                disabled={downloadExpiry}
                min={1}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              onClick={() => {
                form.setFieldValue(
                  ["attributes", name, "downloadExpiry"],
                  undefined,
                );
                setDownloadExpiry((prev) => !prev);
              }}
              className="big-input-btn-Infinity "
              style={{
                background: "#272942",
              }}
            >
              <Row justify="center" align="middle">
                <Image preview={false} src={Infinity} />
              </Row>
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
}
