import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import "./styles.css";
import { useNotification } from "context/notificationContext";
import AddMetaverseForm from "../Metaverse/add-metaverse/addMetaverse";
import DesksList from "../Metaverse/DeskList";
import AddMetaverse from "../Metaverse/AddMetaverse";
import AddMetaverseLink from "../Metaverse/AddMetaverseLink";
import "../Metaverse/style.css";
import FoldersService from "services/meetaversProjects/folders.service";
import noData from "../../assets/images/no-data.png";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Menu, Row, Typography, Form, Dropdown, Space } from "antd";
import { BackwardOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import AddEditFolderModal from "./Components/AddEditFolderModal";
import FolderCard from "./Components/FolderCard";
import DimensionsService from "services/dimensions.service";
import VerseCard from "./Components/VerseCard";
import { axiosCatch } from "utils/axiosUtils";
import { NavLink, useLocation, useParams, useSearchParams } from "react-router-dom";
import AddToCustomerModal from "./Components/AddToCustomerModal";
import MoveToFolderModal from "./Components/MoveToFolderModal";
import FolderTreeCard from "./Components/FolderTreeCard";
import { useNavigate } from "react-router-dom";

import {
  DeleteSVG,
  EmbeddedCodeSVG,
  EyeSVG,
  LinkSVG,
  RenameSVG,
  UserSVG,
  NewVerseSVG,
  NewFolderDropDownSVG,
  RequestCutomeVersSVG,
  AddLinkVersSVG,
  MoveToFolderSVG,
  LeftArrow2SVG,
  AddFoldersSVG,
  LastUpdate,
} from "assets/jsx-svg";
import WarningModal from "components/common/WarningModal";
import usePageTitle from "hooks/usePageTitle";
import { useDrawer } from "hooks/useDrawer";
import { EXTERNAL_IFRAME_BASE_URL } from "constants/IFRAME_ROUTER_URLS";
export default function VersesOfProject() {
  const navigate = useNavigate();
  usePageTitle("Metaverse");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isInsideExternalIframe = useMemo(() => location?.pathname?.includes(EXTERNAL_IFRAME_BASE_URL) , [location])
  const { projectId, projectName } = useParams();
  const [dimensions, setDimensions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openNotificationWithIcon } = useNotification();
  const [folderList, setFolderList] = useState([]);
  const [folderListTree, setFolderListTree] = useState([]);

  const getAllFoldersByIdRequest = useCallback(
    (folderId) => {
      setLoading(true);
      FoldersService.getAllByFolderId(folderId)
        .then(({ data }) => {
          setLoading(false);
          setFolderList(
            data.data?.filter((item) => item.type === "folder").sort((a, b) => a.id - b.id),
          );
          setDimensions(data.data?.filter((item) => item.type === "metaverse"));
        })
        .catch((error) => {
          setLoading(false);

          var { errors } = error?.response.data;
          openNotificationWithIcon("error", errors[0]);
        });
    },
    [openNotificationWithIcon],
  );

  const getAllFoldersRequest = useCallback(() => {
    FoldersService.getAll()
      .then(({ data }) => {
        let rootFolder = {
          key: 0,
          title: <FolderTreeCard folderName={"root"} />,
        };

        setFolderListTree([rootFolder]);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  }, [openNotificationWithIcon]);

  useEffect(() => {
    getAllFoldersByIdRequest(projectId === undefined ? null : projectId);
    getAllFoldersRequest();
  }, [getAllFoldersByIdRequest, getAllFoldersRequest, projectId]);

  const [deleteDimLoading, setDeleteDimLoading] = useState(false);

  const deleteDim = async (id) => {
    setDeleteDimLoading(true);
    await DimensionsService.deleteDimension(id)
      .then((data) => {
        setIsDeleteModalOpen(false);
        setDimensions((prev) => prev.filter((dim) => dim.id !== id));
      })
      .catch((error) => {
        axiosCatch(error);
      })
      .finally(() => {
        setDeleteDimLoading(false);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const [addToCustomerModalOpen, setAddToCustomerModalOpen] = useState({ open: false, data: null });

  const [addToCustomerform] = Form.useForm();
  const addToCustomerOnFinsh = (values) => {
    var values = {
      dimensionId: addToCustomerModalOpen.data.id,
      email: values.email,
    };
    addToCustomerRequest(values);
  };
  const addToCustomerOnCancel = () => {
    addToCustomerform.resetFields();
    setAddToCustomerModalOpen({ ...addToCustomerModalOpen, open: false });
  };
  const addToCustomerRequest = (data) => {
    DimensionsService.pushToCustomer(data)
      .then(({ data }) => {
        setLoading(false);
        setAddToCustomerModalOpen({ data: null, open: false });
        addToCustomerform.resetFields();
        openNotificationWithIcon("success", "Sent successfully");
      })
      .catch((error) => {
        setLoading(false);
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const [addEditFolderform] = Form.useForm();
  const DrawerAPI = useDrawer();
  const onFolderEditView = (folderRow) => {
    addEditFolderform.setFieldsValue({
      name: folderRow.name,
    });
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddEditFolderModal
        isFolder={true}
        form={addEditFolderform}
        image={folderRow?.image}
        DrawerAPI={DrawerAPI}
        getAllFoldersRequest={getAllFoldersByIdRequest}
        folderId={projectId}
        isEditAction={folderRow}
      />,
    );
  };
  const deleteProjectRequest = (id) => {
    FoldersService.deleteFolder(id)
      .then(({ data }) => {
        openNotificationWithIcon("success", "Deleted successfully");

        getAllFoldersByIdRequest(projectId);
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const showAddFolderModal = () => {
    addEditFolderform.resetFields();
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddEditFolderModal
        isFolder={true}
        form={addEditFolderform}
        DrawerAPI={DrawerAPI}
        getAllFoldersRequest={getAllFoldersByIdRequest}
        folderId={projectId}
        isEditAction={null}
      />,
    );
  };
  const handelOpenAddNewVerse = () => {
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddMetaverse
        data={null}
        setDimensions={setDimensions}
        folderId={projectId}
        drowerClose={() => DrawerAPI.close()}
      />,
    );
  };
  const handelOpenEditVerse = (data) => {
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddMetaverse
        data={data}
        setDimensions={setDimensions}
        folderId={projectId}
        drowerClose={() => DrawerAPI.close()}
      />,
    );
  };
  const [verseLinkModalOpen, setVerseLinkModalOpen] = useState({
    open: false,
    data: null,
  });
  const handelOpenAddLinkNewVerse = () => {
    setVerseLinkModalOpen({ open: true });
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddMetaverseLink
        data={null}
        setVerseModalOpen={setVerseLinkModalOpen}
        setDimensions={setDimensions}
        folderId={projectId}
        drowerClose={() => DrawerAPI.close()}
      />,
    );
  };

  const handelOpenEditLinkVerse = (data) => {
    setVerseLinkModalOpen({ open: true, data });
    DrawerAPI.open("40%");
    DrawerAPI.setDrawerContent(
      <AddMetaverseLink
        data={data}
        setVerseModalOpen={setVerseLinkModalOpen}
        setDimensions={setDimensions}
        folderId={projectId}
        drowerClose={() => DrawerAPI.close()}
      />,
    );
  };

  const handleDropDimentionToFolder = (dimensionIdToSend, receiveingFolderId) => {
    handleDropDimentionToFolderRequest(dimensionIdToSend, receiveingFolderId);
  };
  const handleDropDimentionToFolderRequest = (dimensionIdToSend, receiveingFolderId) => {
    DimensionsService.addDimentionToFolder(dimensionIdToSend, receiveingFolderId)
      .then(({ data }) => {
        getAllFoldersByIdRequest(projectId);

        openNotificationWithIcon("success", "Moved successfully");
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const requestNewCustome = () => {
    setModalOpen(true);
  };
  const [isMoveToFolderModalOpen, setIsMoveToFolderModalOpen] = useState();
  const [dimensionIdToMove, setdimensionIdToMove] = useState();
  const [dimensionNameToMove, setDimensionNameToMove] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dimentionToDelete, setDimentionToDelete] = useState({});

  const handelMoveToFolder = (dimensionId, dimensionName) => {
    setdimensionIdToMove(dimensionId);
    setDimensionNameToMove(dimensionName);
    setIsMoveToFolderModalOpen(true);
  };

  const handelCancelMoveToFolder = () => {
    setIsMoveToFolderModalOpen(false);
  };

  const onDimentionDelete = (dimData) => {
    showDeleteModal();
    setDimentionToDelete(dimData);
  };
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalOk = () => {
    deleteDim(dimentionToDelete.id);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setDimentionToDelete(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {DrawerAPI.Render}
      {loading ? (
        <div className="center-items" style={{ width: "100%", height: "100%" }}>
          <LoadingOutlined />
        </div>
      ) : (
        <Fragment>
          {projectId && (
            <Row>
              <div
                onClick={() => navigate(-1)}
                style={{ color: "#030713", fontSize: 15, cursor: "pointer", width: 100 }}>
                <span style={{ marginRight: 7 }}>
                  <LeftArrow2SVG />
                </span>
                Back
              </div>
            </Row>
          )}
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col lg={8}>{projectName && <h2>{projectName}</h2>}</Col>
            <Col lg={8}>
              <Space className="d-flex mb-1" style={{ justifyContent: "flex-end" }}>
                <Button icon={<AddFoldersSVG />} onClick={showAddFolderModal} type="primary">
                  New Folder
                </Button>
                <Dropdown
                  dropdownRender={() =>
                    NewFolderDimMenu({
                      showAddFolderModal,
                      handelOpenAddNewVerse,
                      requestNewCustome,
                      handelOpenAddLinkNewVerse,
                    })
                  }
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow>
                  <Button type="primary">
                    <PlusOutlined className="wc" />
                    Add
                  </Button>
                </Dropdown>
              </Space>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="folder-list" style={{ paddingBottom: "2rem" }}>
            {folderList?.map((folder) => (
              <Col xs={24} sm={12} md={8} key={folder.id}>
                <FolderCard
                  onDropDimention={handleDropDimentionToFolder}
                  key={folder.id}
                  id={folder.id}
                  onFolderEditView={() => onFolderEditView(folder)}
                  name={folder.name}
                  img={folder.image}
                  createdDate={folder?.createdAt}
                  deleteRequest={deleteProjectRequest}
                />
              </Col>
            ))}
            {dimensions.map((dim) => {
              return (
                <Col xs={24} sm={12} md={8} key={dim.id}>
                  <VerseCard
                    isOpenExternalPage={dim?.isOpenExternalPage}
                    data={dim}
                    deleteDim={deleteDim}
                    DimMenu={() => (
                      <DimMenu
                        data={dim}
                        id={dim.id}
                        name={dim.name}
                        deleteDim={() => onDimentionDelete(dim)}
                        setAddToCustomerModalOpen={setAddToCustomerModalOpen}
                        handelOpenEditVerse={
                          dim.isMetaverseExternalLink
                            ? handelOpenEditLinkVerse
                            : handelOpenEditVerse
                        }
                        MoveToFolder={() => handelMoveToFolder(dim.id, dim.name)}
                      />
                    )}
                    isMetaverseExternalLink={dim.isMetaverseExternalLink}
                    joinLink={
                      dim.isMetaverseExternalLink
                        ? dim.metaverseExternalLink
                        : isInsideExternalIframe ? `/external-iframe/metaverse/${dim.name}?${searchParams?.toString()}` : `/metaverse/${dim.name}`
                    }
                    settingLink={
                      dim.isMetaverseExternalLink
                        ? dim.metaverseExternalLink
                        : `/metaverse/${dim.name}`
                    }
                  />
                </Col>
              );
            })}
            {folderList.length === 0 && dimensions.length === 0 && (
              <div
                style={{
                  height: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  placeContent: "center",
                  width: "100%",
                }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={noData} width={60} />
                  </div>
                  <div> No data to show !</div>
                </div>
              </div>
            )}
          </Row>
          <AddMetaverseForm setModalOpen={setModalOpen} modalOpen={modalOpen} />

          <AddToCustomerModal
            form={addToCustomerform}
            onFinish={addToCustomerOnFinsh}
            isAddToCustomerModalOpen={addToCustomerModalOpen.open}
            handleAddToCustomerModalCancel={addToCustomerOnCancel}
          />
          {/* delete dimention warning modal */}
          <WarningModal
            isloading={deleteDimLoading}
            isWarningModalOpen={isDeleteModalOpen}
            handleCancel={handleDeleteModalCancel}
            handleOk={handleDeleteModalOk}
            warningBody={`Are you sure you want to delete this "${dimentionToDelete?.name}" metaverse?`}
          />
          <MoveToFolderModal
            folderName={projectName || "root"}
            metaversName={dimensionNameToMove}
            handleModalCancel={handelCancelMoveToFolder}
            isModalOpen={isMoveToFolderModalOpen}
            initailTree={folderListTree}
            currentProjectId={projectId}
            getMeetversesByProjectId={getAllFoldersByIdRequest}
            metaversId={dimensionIdToMove}
          />
        </Fragment>
      )}
    </>
  );
}

const DimMenu = ({
  id,
  name,
  deleteDim,
  setVerseModalOpen,
  data,
  setAddToCustomerModalOpen,
  handelOpenEditVerse,
  MoveToFolder,
}) => {
  const { openMessage } = useNotification();
  return (
    <Menu
      className="profile-menu"
      style={{ width: "200px" }}
      items={[
        {
          label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <UserSVG />
                <Typography style={{ marginLeft: 13 }}>Add to customer</Typography>
              </div>
            </div>
          ),
          key: "0",
          onClick: () => setAddToCustomerModalOpen({ open: true, data }),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <LinkSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Copy Link</Typography>
              </Col>
            </Row>
          ),
          key: "1",
          onClick: () => {
            navigator.clipboard.writeText(
              `${window.location.origin}/metaverse/${name.split(" ").join("_")}`,
            );
            openMessage({ type: "success", message: "Copied Successfully ✔" });
          },
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <EmbeddedCodeSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Embedded Code</Typography>
              </Col>
            </Row>
          ),
          key: "2",
          // onClick: toggleAddDeskModal,
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <EyeSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Desks List</Typography>
              </Col>
            </Row>
          ),
          key: "3",
          onClick: () =>
            setVerseModalOpen({
              open: true,
              data,
              render: <DesksList setVerseModalOpen={setVerseModalOpen} companyDimensionId={id} />,
            }),
        },

        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <RenameSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Edit</Typography>
              </Col>
            </Row>
          ),
          key: "4",
          onClick: () => handelOpenEditVerse(data),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <DeleteSVG />
                </Row>
              </Col>
              <Col>
                <Typography style={{ color: "#f93e3e" }}>Delete</Typography>
              </Col>
            </Row>
          ),
          key: "6",
          onClick: () => deleteDim(),
        },
        {
          label: (
            <Row align="middle" gutter={[14, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <MoveToFolderSVG />
                </Row>
              </Col>
              <Col>
                <Typography>Move to folder</Typography>
              </Col>
            </Row>
          ),
          key: "7",
          onClick: () => MoveToFolder(),
        },

        {
          label: (
            <NavLink to={`/metaverse/${id}/dimension-backups`}>
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <LastUpdate />
                  </Row>
                </Col>
                <Col>
                  <Typography>Dimension Backups</Typography>
                </Col>
              </Row>
            </NavLink>
          ),
          key: "8",
        },
      ]}
    />
  );
};
const NewFolderDimMenu = ({
  showAddFolderModal,
  handelOpenAddNewVerse,
  requestNewCustome,
  handelOpenAddLinkNewVerse,
}) => {
  const { openMessage } = useNotification();
  return (
    <Menu
      className="profile-menu"
      style={{ width: "240px" }}
      items={[
        {
          label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <NewVerseSVG />
                <Typography style={{ marginLeft: 13 }}>New Verse</Typography>
              </div>
            </div>
          ),
          key: "0",
          onClick: () => handelOpenAddNewVerse(),
        },

        {
          label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RequestCutomeVersSVG />
                <Typography style={{ marginLeft: 13 }}>Request Custom Verse</Typography>
              </div>
            </div>
          ),
          key: "2",
          onClick: () => requestNewCustome(),
        },
        {
          label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <AddLinkVersSVG />
                <Typography style={{ marginLeft: 13 }}>Add Link Verse</Typography>
              </div>
            </div>
          ),
          key: "3",
          onClick: () => handelOpenAddLinkNewVerse(),
        },
      ]}
    />
  );
};
