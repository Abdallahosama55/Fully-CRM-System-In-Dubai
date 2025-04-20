import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Switch, Image } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { CloseSVG, UploadSVG } from "assets/jsx-svg";
import "../../Projects/styles.css";
import FoldersService from "services/meetaversProjects/folders.service";
import { useNotification } from "context/notificationContext";

export default function AddEditFolderModal({
  form,
  image,
  DrawerAPI,
  getAllFoldersRequest,
  folderId,
  isEditAction,
  isFolder,
}) {
  const [previewPicForm, setPreviewPicForm] = useState("");
  const [previewPic, setPreviewPic] = useState(image || "");
  const [isLoading, setIsLoading] = useState(false);
  const { openNotificationWithIcon } = useNotification();

  const resetAddEditFormValues = () => {
    setPreviewPicForm("");
    setPreviewPic("");
    form.resetFields();
  };
  const handleAddNewFolderModalCancel = () => {
    // setIsAddEditFolderModalOpen(false);
    DrawerAPI.close();
    resetAddEditFormValues();
  };
  const onFinish = (values) => {
    const folderData = new FormData();
    folderData.append("name", values.name);
    folderData.append("image", previewPicForm);
    folderId && folderData.append("parentId", folderId);
    !isEditAction ? addFoldersRequest(folderData) : editFoldersRequest(isEditAction.id, folderData);
  };
  // const getAllFoldersRequest = (folderId) => {
  //     setIsLoading(true);
  //     debugger;
  //     FoldersService.getAllByFolderId(folderId)
  //         // FoldersService.getAll()

  //         .then(({ data }) => {
  //             debugger;

  //             setIsLoading(false);
  //             setFolderList(data.data.rows);
  //         })
  //         .catch((error) => {
  //             debugger;

  //             setIsLoading(false);
  //             var { errors } = error?.response.data;
  //             openNotificationWithIcon("error", errors[0]);
  //         });
  // }

  const addFoldersRequest = (folderData) => {
    setIsLoading(true);
    FoldersService.addFolder(folderData)
      .then(({ data }) => {
        // setIsAddEditFolderModalOpen(false);
        DrawerAPI.close();
        setIsLoading(false);
        getAllFoldersRequest(folderId);
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const editFoldersRequest = (id, folderData) => {
    setIsLoading(true);
    FoldersService.editFolder(id, folderData)
      .then(({ data }) => {
        // setIsAddEditFolderModalOpen(false);
        DrawerAPI.close();
        setIsLoading(false);
        getAllFoldersRequest(folderId);
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const props = {
    name: "file",
    multiple: false,
    action: false,
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      const { status } = info.file;
      setPreviewPic(await getBase64(info.fileList[0].originFileObj));
      setPreviewPicForm(info.fileList[0].originFileObj);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: "image/*",
    height: 160,
    style: { background: "#27294205", border: previewPic && "none" },
  };
  return (
    <>
      {/* <Modal centered={true} width={400} title={null} open={isAddEditFolderModalOpen} onCancel={handleAddNewFolderModalCancel} footer={null}> */}
      <h3 style={{ textAlign: "left", marginBottom: "1rem", fontSize: 20 }}>
        {isEditAction ? <span>Edit </span> : <span>Create New </span>}
        Folder
      </h3>

      <Form requiredMark="optional" form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          labelCol={{ span: 24 }} // Default label column width
          wrapperCol={{ span: 24 }} // Default wrapper (input) column width
          name="name"
          label={
            <span>
              Folder Name
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
            },
            {
              type: "string",
              min: 2,
            },
          ]}>
          <Input placeholder={"Write Here"} />
        </Form.Item>

        <Form.Item
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          className="make-row"
          label={"Folder Picture"}>
          <Dragger showUploadList={false} {...props}>
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
                    setPreviewPicForm("");
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
                {!previewPic && <UploadSVG />}
              </div>
            </div>
            {!previewPic && (
              <div>
                <p className="ant-upload-hint">Upload Photo</p>
                <p className="ant-upload-hint">Or Drag & Drop</p>
              </div>
            )}
          </Dragger>
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button
              style={{ width: 100, borderRadius: 12 }}
              block
              onClick={handleAddNewFolderModalCancel}>
              Cancel
            </Button>
            <span style={{ width: 5 }}></span>
            <Button
              htmlType="submit"
              className=""
              style={{
                width: 100,
                backgroundColor: "#272942",
                color: "#FFFFFF",
                borderRadius: 12,
              }}>
              {isEditAction ? <span>Edit</span> : <span>Create</span>}
            </Button>
          </div>
        </Form.Item>
      </Form>

      {/* </Modal> */}
    </>
  );
}
