import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { DeleteSVG } from "assets/jsx-svg";
import AddProductButton from "components/common/AddProductButton";
import { useRef, useState } from "react";
import checkFileds from "utils/checkFields";

export default function GeneralForm({ productData, form, lang, virtual, onClose, required }) {
  const addBtnRef = useRef();
  const [downloadLimit, setDownloadLimit] = useState(false);
  const [downloadExpiry, setDownloadExpiry] = useState(false);
  const [firstFileName, setFirstFileName] = useState("");
  const [restFilesName, setRestFilesName] = useState([]);

  // useEffect(() => {
  //   productData.productTranslation
  //     .find((prod) => prod.languageCode === lang)
  //     ?.forEach((val) => {
  //       setFirstFileName(val.downloadableFiles[0].name || "");
  //     });
  // }, []);

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
    <section className="general-form">
      <Form.Item
        name={`productName${lang}`}
        label="Product Name"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} product name`,
          },
        ]}>
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item name={`shortDescription${lang}`} label="Product short description">
        <Input.TextArea rows={8} placeholder="Enter product short description" />
      </Form.Item>

      <Form.Item
        name={`description${lang}`}
        label="Product description"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} product description`,
          },
        ]}>
        <Input.TextArea rows={8} placeholder="Enter product description" />
      </Form.Item>

      <Form.Item name={`productsTags${lang}`} label="Products tags">
        <Select placeholder="Type tag then press enter" open={false} mode="tags"></Select>
      </Form.Item>

      {virtual && (
        <>
          <Form.Item noStyle>
            <Row className="upload-input">
              <Col flex={1}>
                <Form.Item name={`firstDownloadableFiles${lang}`} label="Downloadable Files">
                  <Upload
                    beforeUpload={beforUploadFile}
                    maxCount={1}
                    action={false}
                    showUploadList={false}
                    onChange={(file) => setFirstFileName(file.file.name)}>
                    <span className="upload-click"></span>
                    <span className="file-name">
                      <Typography.Text>{firstFileName || "No File"}</Typography.Text>
                    </span>
                    <div className="upload-icon">{/* <UploadSVG /> */}</div>
                  </Upload>
                </Form.Item>
                {firstFileName !== "" ? (
                  <div
                    className="delete-photo"
                    onClick={() => {
                      form.setFieldValue(`firstDownloadableFiles${lang}`, undefined);
                      setFirstFileName("");
                    }}>
                    <DeleteSVG />
                  </div>
                ) : null}
              </Col>
              <Col className="btn-with-select">
                <Button
                  onClick={() => addBtnRef.current.click()}
                  type="primary"
                  className="add-btn">
                  + Add
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.List name={`downloadableFiles${lang}`}>
            {(fields3, { add, remove }) => (
              <>
                <Row style={{ display: "none" }} className="btn-with-select">
                  <Button
                    ref={addBtnRef}
                    type="primary"
                    onClick={() => {
                      add();
                    }}
                    className="add-btn">
                    + Add
                  </Button>
                </Row>

                {fields3.map(({ key, name }) => (
                  <Row key={key} wrap={false}>
                    <Col flex={1}>
                      <Form.Item noStyle>
                        <Form.Item name={[name, `downloadableFiles`]} className="upload-input">
                          <Upload
                            beforeUpload={beforUploadFile}
                            maxCount={1}
                            action={false}
                            showUploadList={false}
                            onChange={(file) => changeUploadFiles(file, key)}>
                            <span className="upload-click"></span>
                            <span className="file-name">
                              <Typography.Text>{getFileName(key)}</Typography.Text>
                            </span>
                            <div className="upload-icon">{/* <UploadSVG /> */}</div>
                          </Upload>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Button
                      onClick={() => {
                        setRestFilesName((prev) => prev.filter((file) => file.id !== key));
                        remove(name);
                      }}
                      className="big-input-btn">
                      <Row align="middle" justify="center">
                        <DeleteSVG />
                      </Row>
                    </Button>
                  </Row>
                ))}
              </>
            )}
          </Form.List>

          <Form.Item label="Download Limit">
            <Row>
              <Col flex={1}>
                <Form.Item name={`downloadLimit${lang}`} noStyle>
                  <InputNumber
                    className="input-with-btn"
                    placeholder="Enter number of downloads Leave blank for unlimited"
                    disabled={downloadLimit}
                    min={1}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    form.setFieldValue(`downloadLimit${lang}`, "");
                    setDownloadLimit((prev) => !prev);
                  }}
                  className="big-input-btn"
                  style={{ background: downloadLimit && "#D7DAE2" }}>
                  <Row justify="center" align="middle">
                    {/* <InfinitySVG /> */}
                  </Row>
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Download Expiry">
            <Row>
              <Col flex={1}>
                <Form.Item name={`downloadExpiry${lang}`} noStyle>
                  <InputNumber
                    className="input-with-btn"
                    placeholder="Enter the number of days before a download link expires, or leave blank"
                    disabled={downloadExpiry}
                    min={1}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    form.setFieldValue(`downloadExpiry${lang}`, "");
                    setDownloadExpiry((prev) => !prev);
                  }}
                  className="big-input-btn"
                  style={{ background: downloadExpiry && "#D7DAE2" }}>
                  <Row justify="center" align="middle">
                    {/* <InfinitySVG /> */}
                  </Row>
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </>
      )}

      <Form.Item name={`tagTitle${lang}`} label="Meta tag title">
        <Input placeholder="Enter meta tag title" />
      </Form.Item>
      <Form.Item name={`tagDescription${lang}`} label="Meta tag description">
        <Input.TextArea placeholder="Enter meta tag description" rows={6} />
      </Form.Item>
      <Form.Item name={`customTab${lang}`} label="customTab">
        <Form.List name={`customTab${lang}`}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, i) => (
                <Row
                  key={i}
                  style={{ marginTop: i > 0 ? "10px" : undefined }}
                  align="middle"
                  gutter={[10, 0]}>
                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      rules={[{ required: required, message: "Please enter title" }]}
                      name={[name, "title"]}>
                      <Input placeholder="title" />
                    </Form.Item>
                  </Col>
                  <Col span={23}>
                    <Form.Item
                      {...restField}
                      rules={[{ required: required, message: "Please description title" }]}
                      name={[name, "description"]}>
                      <Input.TextArea placeholder="description" />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Tabs
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Row justify="end">
          <AddProductButton
            htmlType="submit"
            onClick={() => checkFileds(form)}
            addName="Next"
            cancel={onClose}
          />
        </Row>
      </Form.Item>
    </section>
  );
}
