import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, Row, Tooltip, Typography, Upload, message } from "antd";
import { DeleteSVG } from "assets/jsx-svg";
import userContext from "context/userContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CommonService from "services/common.service";

import png from "assets/images/png.png";
import pdf from "assets/images/pdf.png";
import doc from "assets/images/doc.png";
import xls from "assets/images/xls.png";
import zip from "assets/images/zip.png";
import jpg from "assets/images/jpg.png";
import fileImg from "assets/images/file.png";
import Cart from "../Cart";
import isValidJson from "utils/isValidJson";

export default function CounterForUser({
  meetingSettings,
  changeSettings,
  setActiveBtn,
  setShowCounterBtn,
  isHost,
}) {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [counterFormData, setCounterFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(userContext);
  
  useEffect(() => {
    if (meetingSettings.counter.dataAskedFor !== "null") {
      console.log("RUN TEMP RUN TEMP RUN TEMP RUN TEMP")
      console.log(isValidJson(meetingSettings.counter.dataAskedFor) , JSON.parse(meetingSettings.counter.dataAskedFor)?.formData)
      if(isValidJson(meetingSettings.counter.dataAskedFor) && JSON.parse(meetingSettings.counter.dataAskedFor)?.formData?.type === 5){
        setActiveBtn("myCart");
        console.log("RUN RUN RUN RUN RUN RUN RUN RUN RUN RUN")
        setShowCounterBtn(false);
        return;
      }
      try {
        const data = JSON.parse(meetingSettings.counter.dataAskedFor);
        setCounterFormData(data.formData);
      } catch (ignored) {}
    }
  }, [meetingSettings]);

  const onFinish = (values) => {
    let counterUsersData = meetingSettings.counterUsersData
      ? JSON.parse(meetingSettings.counterUsersData)
      : {};

    if (!counterUsersData) {
      counterUsersData = {};
    }
    const askedForType = JSON.parse(meetingSettings.counter.dataAskedFor);
    if (counterUsersData && askedForType.formData) {
      if (counterUsersData.hasOwnProperty(user.id)) {
        const sharedFullName = {
          user: values.fullName,
          hisGuests: values.fullNameGuests
            ? values.fullNameGuests.map((guest) => guest.guestName)
            : null,
        };
        const sharedSignature = sharedFiles[0];
        const sharedfile = [...counterUsersData[user.id].files, ...sharedFiles];
        const sharedCustomField = [
          ...counterUsersData[user.id].customField,
          {
            user: {
              name: counterFormData.customField,
              value: values.customField,
            },
            hisGuests: values.customFieldGuests
              ? values.customFieldGuests.map((guest) => ({
                  name: counterFormData.customField,
                  value: guest.guestCustomField,
                }))
              : null,
          },
        ];

        counterUsersData[user.id].userData = {
          id: user.id,
          fullName: user.fullName,
          profileImage: user.profileImage,
        };

        if (askedForType.formData.type === 1) {
          counterUsersData[user.id].fullName = sharedFullName;
        }
        if (askedForType.formData.type === 2) {
          counterUsersData[user.id].signature = sharedSignature;
        }
        if (askedForType.formData.type === 3) {
          counterUsersData[user.id].files = sharedfile;
        }
        if (askedForType.formData.type === 4) {
          counterUsersData[user.id].customField = sharedCustomField;
        }
      } else {
        counterUsersData[user.id] = {
          userData: user,
          fullName: {
            user: values.fullName,
            hisGuests: values.fullNameGuests
              ? values.fullNameGuests.map((guest) => guest.guestName)
              : null,
          },
          signature: askedForType.formData.type === 2 ? sharedFiles[0] : [],
          files: askedForType.formData.type === 3 ? sharedFiles : [],
          customField:
            askedForType.formData.type === 4
              ? [
                  {
                    user: {
                      name: counterFormData.customField,
                      value: values.customField,
                    },
                    hisGuests: values.customFieldGuests
                      ? values.customFieldGuests.map((guest) => ({
                          name: counterFormData.customField,
                          value: guest.guestCustomField,
                        }))
                      : null,
                  },
                ]
              : [],
        };
      }
    }
    changeSettings("counterUsersData", JSON.stringify(counterUsersData));
    setActiveBtn("participant");
    setShowCounterBtn(false);
    message.success("Data send successfully");
    setSharedFiles([]);
  };

  const filesDraggerProps = useMemo(
    () => ({
      name: "file",
      multiple: true,
      action: false,
      beforeUpload: () => false,
      onChange: async (info) => {
        setLoading(true);

        try {
          const res = await CommonService.uploadFile(info.file);

          const newFile = {
            id: info.file.uid,
            name: info.file.name,
            type: info.file.type,
            url: res.data.uploadedFiles.file,
            userName: user.fullName,
          };

          setSharedFiles((prev) => [...prev, newFile]);

          message.success({
            content: `Uploaded file: ${info.file.name}`,
          });
        } catch (error) {
          console.warn("Error uploading file: ", error);
          message.error({
            content: `Failed to upload file: ${info.file.name}`,
          });
        } finally {
          setLoading(false);
        }
      },
      showUploadList: false,
    }),
    [user.fullName],
  );

  const signatureDraggerProps = useMemo(
    () => ({
      name: "file",
      multiple: false,
      action: false,
      beforeUpload: () => false,
      onChange: async (info) => {
        setSharedFiles([]);
        setLoading(true);

        try {
          const res = await CommonService.uploadFile(info.file);

          const newFile = {
            id: info.file.uid,
            name: info.file.name,
            type: info.file.type,
            url: res.data.uploadedFiles.file,
            userName: user.fullName,
          };

          setSharedFiles((prev) => [...prev, newFile]);

          message.success({
            content: `Uploaded file: ${info.file.name}`,
          });
        } catch (error) {
          console.warn("Error uploading file: ", error);
          message.error({
            content: `Failed to upload file: ${info.file.name}`,
          });
        } finally {
          setLoading(false);
        }
      },
      showUploadList: false,
    }),
    [user.fullName],
  );

  const onFileDelete = useCallback(
    (id) => {
      setSharedFiles((prev) => prev.filter((file) => file.id !== id));
    },
    [setSharedFiles],
  );

  useEffect(() => {
    if (meetingSettings.counter?.dataAskedFor === "null") {
      setActiveBtn("participant");
    }
  }, [meetingSettings.counter?.dataAskedFor, setActiveBtn]);

  return (
    <>
      <Typography.Text className="fz-18 fw-500">Counter</Typography.Text>

      <section style={{ marginTop: "24px", height: "calc(100% - 80px" }}>
        <Typography.Text className="fw-500">Host asked you for:</Typography.Text>
        <Form
          name="userCounter"
          requiredMark={false}
          layout="vertical"
          onFinish={onFinish}
          className="h-100">
          <Row className="h-100" justify="space-between" style={{ flexDirection: "column" }}>
            <Col className={counterFormData.type === 5 && "h-100"}>
              {counterFormData.type === 1 && (
                <>
                  <Form.Item
                    rules={[
                      {
                        required: counterFormData.type === 1,
                        message: "Please Enter Your Full Name",
                      },
                    ]}
                    name="fullName"
                    label="Full Name"
                    className="mt-1">
                    <Input placeholder="Enter Your Full Name" />
                  </Form.Item>

                  <Form.List name="fullNameGuests">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Row
                            key={key}
                            gutter={[8, 0]}
                            wrap={false}
                            align="middle"
                            className="mt-1">
                            <Col>
                              <Typography.Text className="fw-600">Guest {name + 1}</Typography.Text>
                            </Col>
                            <Col flex={1}>
                              <Form.Item
                                {...restField}
                                name={[name, "guestName"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Guest Full Name",
                                  },
                                ]}>
                                <Input placeholder="Guest Full Name" />
                              </Form.Item>
                            </Col>

                            <Col>
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{
                              background: "transparent",
                              height: "40px",
                              padding: "0",
                            }}
                            className="mt-1">
                            Add Guest
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </>
              )}

              {counterFormData.type === 2 && (
                <Form.Item
                  rules={[
                    {
                      required: counterFormData.type === 2,
                      message: "Please Upload File",
                    },
                  ]}
                  name="signature"
                  label="Signature File"
                  className="mt-1">
                  <Upload.Dragger
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      minHeight: "140px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    {...signatureDraggerProps}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                      }}>
                      <Typography.Text className="fw-500">Upload File</Typography.Text>
                      <Typography.Text className="gc">or drag and drop</Typography.Text>
                    </div>
                  </Upload.Dragger>
                </Form.Item>
              )}

              {counterFormData.type === 3 && (
                <Form.Item
                  rules={[
                    {
                      required: counterFormData.type === 3,
                      message: "Please Upload File",
                    },
                  ]}
                  name="file"
                  label={`${counterFormData.fileName}`}
                  className="mt-1">
                  <Upload.Dragger
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      minHeight: "140px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    {...filesDraggerProps}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                      }}>
                      <Typography.Text className="fw-500">Upload File</Typography.Text>
                      <Typography.Text className="gc">or drag and drop</Typography.Text>
                    </div>
                  </Upload.Dragger>
                </Form.Item>
              )}

              {counterFormData.type === 4 && (
                <>
                  <Form.Item
                    rules={[
                      {
                        required: counterFormData.type === 3,
                        message: `Please Enter ${counterFormData.customField}`,
                      },
                    ]}
                    name="customField"
                    label={`${counterFormData.customField}`}
                    className="mt-1">
                    <Input placeholder={`Enter ${counterFormData.customField}`} />
                  </Form.Item>

                  <Form.List name="customFieldGuests">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Row
                            key={key}
                            gutter={[8, 0]}
                            wrap={false}
                            align="middle"
                            className="mt-1">
                            <Col>
                              <Typography.Text className="fw-600">Guest {name + 1}</Typography.Text>
                            </Col>
                            <Col flex={1}>
                              <Form.Item
                                {...restField}
                                name={[name, "guestCustomField"]}
                                rules={[
                                  {
                                    required: true,
                                    message: `Guest ${counterFormData.customField}`,
                                  },
                                ]}>
                                <Input placeholder={`Guest ${counterFormData.customField}`} />
                              </Form.Item>
                            </Col>

                            <Col>
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{
                              background: "transparent",
                              height: "40px",
                              padding: "0",
                            }}
                            className="mt-1">
                            Add Guest
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </>
              )}

              {counterFormData.type === 5 && (
                <Cart
                  setActiveBtn={setActiveBtn}
                  meetingSettings={meetingSettings}
                  isHost={isHost}
                  setShowCounterBtn={setShowCounterBtn}
                />
              )}

              {(counterFormData.type === 2 || counterFormData.type === 3) && sharedFiles?.length ? (
                <div style={{ marginTop: "32px" }}>
                  <Typography.Text className="fz-16 fw-500">Uploaded Files:</Typography.Text>

                  <Row
                    gutter={[0, 8]}
                    className="mt-1"
                    style={{
                      maxHeight: "390px",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}>
                    {sharedFiles.map((file) => (
                      <Col key={file.id} xs={24}>
                        <Row
                          justify="space-between"
                          align="middle"
                          wrap={false}
                          className="file-uploaded">
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
                          <Col className="clickable" onClick={() => onFileDelete(file.id)}>
                            <Row align="middle" wrap={false} gutter={[8, 0]}>
                              <Col>
                                <Typography.Text>Delete</Typography.Text>
                              </Col>
                              <Col>
                                <Row align="middle">
                                  <DeleteSVG color="#000" />
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : null}
            </Col>
            {counterFormData.type !== 5 && (
              <Col>
                <Form.Item style={{ marginTop: "4rem" }}>
                  <Button loading={loading} className="w-100" type="primary" htmlType="submit">
                    Done
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </section>
    </>
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
