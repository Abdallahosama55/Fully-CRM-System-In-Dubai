import { useEffect, useState } from "react";
import "./styles.css";
import { Button, Form, Typography } from "antd";
import AddEditFolderModal from "./Components/AddEditFolderModal";
import FolderCard from "./Components/FolderCard";
import FoldersService from "services/meetaversProjects/folders.service";
import { useNotification } from "context/notificationContext";
import { Row, Col } from "antd";
import { AddFoldersSVG } from "assets/jsx-svg";
import { useDrawer } from "hooks/useDrawer";
export default function VerseProjects() {
  const DrawerAPI = useDrawer();

  const [addEditFolderform] = Form.useForm();

  const onFolderEditView = (folderRow) => {
    addEditFolderform.setFieldsValue({
      name: folderRow.name,
    });
    DrawerAPI.open("30%");
    DrawerAPI.setDrawerContent(
      <AddEditFolderModal
        isFolder={false}
        form={addEditFolderform}
        image={folderRow?.image}
        DrawerAPI={DrawerAPI}
        getAllFoldersRequest={getAllFoldersRequest}
        folderId={null}
        isEditAction={folderRow}
      />,
    );
  };
  const { openNotificationWithIcon } = useNotification();

  const showAddFolderModal = () => {
    addEditFolderform.resetFields();
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddEditFolderModal
        isFolder={false}
        form={addEditFolderform}
        DrawerAPI={DrawerAPI}
        getAllFoldersRequest={getAllFoldersRequest}
        folderId={null}
        isEditAction={null}
      />,
    );
  };
  const deleteProjectRequest = (id) => {
    setIsLoading(true);
    FoldersService.deleteFolder(id)
      .then(({ data }) => {
        setIsLoading(false);

        getAllFoldersRequest();
        openNotificationWithIcon("success", "Deleted successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getAllFoldersRequest();
  }, []);

  const [folderList, setFolderList] = useState([]);

  const getAllFoldersRequest = () => {
    setIsLoading(true);
    FoldersService.getAll()
      .then(({ data }) => {
        setIsLoading(false);
        setFolderList(data.data?.sort((a, b) => a.id - b.id));
      })
      .catch((error) => {
        setIsLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };

  return (
    <>
      {DrawerAPI.Render}
      <Row
        gutter={[16, 16]}
        justify="space-between"
        align="center"
        style={{
          padding: "0px 10px",
          marginBottom: "24px",
        }}>
        <Typography
          className="fz-16 fw-600"
          style={{
            color: "#030713",
            lineHeight: "24px",
          }}>
          Metaverse
        </Typography>
        <Button
          icon={<AddFoldersSVG />}
          onClick={showAddFolderModal}
          className="wc"
          style={{ background: "#272942", width: "130px" }}>
          New Folder
        </Button>
      </Row>
      <Row gutter={[16, 16]} className="folder-list">
        {folderList?.map((folder) => (
          <Col xs={24} key={folder.id} sm={12} md={8} lg={6}>
            <FolderCard
              key={folder.id}
              id={folder.id}
              onFolderEditView={() => onFolderEditView(folder)}
              name={folder.name}
              img={folder.image}
              isProject={true}
              createdDate={folder?.createdAt}
              deleteRequest={deleteProjectRequest}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
