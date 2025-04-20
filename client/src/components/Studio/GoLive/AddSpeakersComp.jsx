import { useState } from "react";
import { Button, Col, Form, Image, Input, message, Row, Table, Tag, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";

import { CloseSVG, DeleteSVG, EditSVG } from "assets/jsx-svg";
import UploadSVG from "assets/jsx-svg/UploadSVG";

import "./styles.css";
import { LoadingOutlined } from "@ant-design/icons";
import { axiosCatch } from "utils/axiosUtils";
import useFileUpload from "services/FileUpload/Mutations/useFileUpload";

export default function AddSpeakersComp({
  setActiveCreateEventTab,
  speakersList,
  setSpeakersList,
}) {
  const [addSpeakersForm] = Form.useForm();
  const [previewPic, setPreviewPic] = useState(null);

  const addToList = (values) => {
    const objectToAdd = {
      id: uuidv4(),
      ...values,
      image: previewPic,
      source: "FRONT",
    };
    setPreviewPic(null);
    setSpeakersList([objectToAdd, ...speakersList]);
  };

  const updateItem = (id, values) => {
    const otherParticipantList = speakersList.filter((item) => item.id !== id);
    const objToSave = {
      id: id,
      image: previewPic,
      ...values,
      source: "FRONT",
    };
    setPreviewPic(null);
    setSpeakersList([objToSave, ...otherParticipantList]);
  };

  const onFinish = async (values) => {
    if (!idToEdit) {
      addToList(values);
    } else {
      updateItem(idToEdit, values);
    }
    setIdToEdit(null);
    addSpeakersForm.resetFields();
  };

  const handelCancelEdit = () => {
    setIdToEdit(null);
    addSpeakersForm.resetFields();
  };

  const handelDeleteParticipant = (id) => {
    let itemToDelete = speakersList.filter((item) => item.id === id)[0];

    if (itemToDelete.source === "BACK") {
      setSpeakersList([
        ...speakersList.filter((item) => item.id !== id),
        { ...itemToDelete, isDeleted: true },
      ]);
    } else {
      setSpeakersList(speakersList.filter((item) => item.id !== id));
    }
  };
  const [idToEdit, setIdToEdit] = useState();
  const onRowEditView = async (row) => {
    setIdToEdit(row.id);
    console.log("row", row);
    if (row.image) {
      setPreviewPic(row.image);
    }
    addSpeakersForm.setFieldsValue({
      ...row,
    });
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: 70,
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      ellipsis: true,
      width: 100,
      render: (image, record) =>
        image ? (
          <Image src={image} alt={record.name + "image"} preview={false} width={52} height={52} />
        ) : null,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 100,
    },
    {
      title: "User Badge",
      ellipsis: true,
      render: () => <Tag color="#FDB022">SPEAKER</Tag>,
      width: 110,
    },
    {
      title: "Speaker Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      ellipsis: true,
      width: 180,
      render: (_, record) => {
        return (
          <div style={{ display: "flex", columnGap: 5 }}>
            {record?.source === "FRONT" && (
              <span
                title={"Edit"}
                style={{ cursor: "pointer" }}
                onClick={() => onRowEditView(record)}>
                <EditSVG />
              </span>
            )}

            <span
              title="Delete"
              style={{ cursor: "pointer" }}
              onClick={() => handelDeleteParticipant(record.id)}>
              <DeleteSVG />
            </span>
          </div>
        );
      },
    },
  ];

  const { mutate: uploadFile, isPending: uploadFileLoading } = useFileUpload({
    onSuccess: (data) => {
      setPreviewPic(data.data.data);
      message.info("File uplaoded successfully");
    },
    onError: (err) => axiosCatch(err),
  });

  const props = {
    name: "file",
    multiple: false,
    action: false,
    maxCount: 1,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange(info) {
      addSpeakersForm.setFieldValue("speakerImage", undefined);
      const formData = new FormData();
      formData.append("file", info.fileList[0].originFileObj);
      uploadFile(formData);
    },
    accept: "image/*",
    height: 218,
    style: { background: "#27294205", border: previewPic && "none" },
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={addSpeakersForm}
        requiredMark={false}
        className="go-live">
        {/* <div style={{ display: "flex", columnGap: 5 }}> */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Form.Item name="speakerImage" label="Image">
              <Upload.Dragger
                className="add-speaker-comp-dragger"
                showUploadList={false}
                {...props}
                disabled={uploadFileLoading}>
                {uploadFileLoading ? (
                  <div className="basic-info-upload-img">
                    <LoadingOutlined />
                  </div>
                ) : (
                  <>
                    {previewPic && (
                      <>
                        <div className="basic-info-upload-img">
                          <Image preview={false} src={previewPic} style={{ height: 130 }} />
                        </div>
                        <div
                          className="basic-info-upload-img-close"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewPic("");
                            addSpeakersForm.setFieldValue("speakerImage", undefined);
                          }}>
                          <span title="Remove image">
                            <CloseSVG />
                          </span>
                        </div>
                      </>
                    )}
                    <div className="ant-upload-hint">
                      <div
                        className="basic-info-upload-icon"
                        style={{ height: previewPic ? "0px" : "60px" }}>
                        {!previewPic && <UploadSVG color="#fff" />}
                      </div>
                    </div>
                    {!previewPic && (
                      <div>
                        <p className="ant-upload-hint">Upload Photo</p>
                        <p className="ant-upload-hint">Or Drag & Drop</p>
                      </div>
                    )}
                  </>
                )}
              </Upload.Dragger>
            </Form.Item>

            <Form.Item name="bio" label="Bio">
              <Input.TextArea rows={10} placeholder="Type Bio" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Row gutter={5}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Speaker Name",
                    },
                  ]}>
                  <Input placeholder="write here" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="company" label="Company">
                  <Input placeholder="Enter Speaker Company Name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="title" label="Title">
                  <Input placeholder="Enter Speaker Title" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                    {
                      required: true,
                      message: "Pleaes Enter Email",
                    },
                  ]}>
                  <Input placeholder="Speaker Email - For invitation purpose" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="socialLink" label="Social Link">
                  <Input placeholder="Social Handle - Example Instagram..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="website" label="Website">
                  <Input placeholder="www.example.com" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* </div> */}
        <Row justify="end">
          <Col span={12}>
            <div style={{ height: 20 }}></div>
            {idToEdit && (
              <Button style={{ width: "48%" }} block onClick={handelCancelEdit}>
                Cancel
              </Button>
            )}
            <Button
              style={{ float: "right", width: "48%" }}
              htmlType="submit"
              loading={uploadFileLoading}
              type="primary">
              {idToEdit ? "Save" : "Add"}
            </Button>
          </Col>
        </Row>
        <h4>Participants</h4>
        <Table
          // scroll={{ x: 700, y: 400 }}
          rowKey={"id"}
          className="studio-table"
          dataSource={speakersList?.filter((item) => !item?.isDeleted) || []}
          locale={{ emptyText: "No data yet. Add participants to view here directly" }}
          style={{ marginTop: "30px" }}
          columns={columns}
        />
      </Form>
      <Row align="end" gutter={[12]} className="mt-1">
        <Button
          type="text"
          className=" fz-14"
          onClick={() => setActiveCreateEventTab((prev) => --prev)}
          style={{ marginRight: "8px" }}>
          Previous
        </Button>
        <Button
          onClick={() => setActiveCreateEventTab((prev) => ++prev)}
          style={{ background: "#272942", color: "#fff" }}>
          Next
        </Button>
      </Row>
    </>
  );
}
