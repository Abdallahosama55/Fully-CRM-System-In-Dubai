import { CopyFilled, LoadingOutlined } from "@ant-design/icons";
import { Col, Flex, Menu, Row, Typography, message } from "antd";
import { useCallback, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AIConfigrationGeneralSVG,
  AIConfigrationPermissionsSVG,
  CreateNewDeskSVG,
  Delete2SVG,
  GlobalMetaverse,
  MeetingSVG,
  SettingsSVG,
  ShareSVG,
} from "assets/jsx-svg";
import VerseCard from "components/common/VerseCard";
import { useNotification } from "context/notificationContext";
import AddDeskMeeting from "./AddDeskMeeting";
import Box from "components/Box";
import useDeleteDesk from "services/Desk/Mutations/useDeleteDesk";
import useGetDeskEmployees from "services/Desk/Querys/useGetDeskEmployees";
import "./style.css";
import ShareModal from "views/Desks/DeskInformation/ShareModal";
import userContext from "context/userContext";
import useUpdateDesk from "services/Desk/Mutations/useUpdateDesk";
import { useQueryClient } from "@tanstack/react-query";
import { useDrawer } from "hooks/useDrawer";

const MeetingDesk = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [renameModal, setRenameModal] = useState({ open: false, id: null });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [deskDropdownVisible, setDeskDropdownVisible] = useState(false);
  const { openNotificationWithIcon } = useNotification();

  console.log("deskDropdownVisible", deskDropdownVisible);
  const handleMenuClick = (e) => {
    if (e.key !== "4") {
      setDeskDropdownVisible({
        open: false,
        id: deskDropdownVisible.id,
      });
    } else {
      setDeskDropdownVisible({
        open: true,
        id: deskDropdownVisible.id,
      });
    }
  };

  const {
    data: desks,
    isLoading: loading,
    isError,
    queryKey,
  } = useGetDeskEmployees(type, {
    select: (data) => {
      return data.data.data;
    },
  });
  const { deleteDesk } = useDeleteDesk({
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      openNotificationWithIcon("success", data.data.message);
    },
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
  });

  const { updateDesk, isPending } = useUpdateDesk({
    onSuccess: (data, values) => {
      queryClient.setQueryData(queryKey, (prev) => {
        const editedDeskIndex = prev.data.data.findIndex((desk) => desk.id === values.deskId);
        prev.data.data[editedDeskIndex] = {
          ...prev.data.data[editedDeskIndex],
          aiAgent: !prev.data.data[editedDeskIndex].aiAgent,
        };
        return { ...prev };
      });
      openNotificationWithIcon("success", data.data.message);
    },
  });

  const handleClickCard = useCallback(
    (id) => {
      navigate(`/desks/${id}`);
    },
    [navigate],
  );

  const handleJoinDesk = (id) => {
    navigate(`/booked-meeting?desk_id=${id}&meetingType=${type}`);
  };
  if (isError) {
    return "Error";
  }

  const handleOpenShareModal = () => {
    setIsShareModalOpen(true);
  };

  return (
    <section className={`desks ${"desks"}`}>
      <Flex align="center" justify="space-between">
        <Typography.Title level={5}>
          {type === "MEETING_DESK" ? "Schedule Desk" : "Customer Service Desk"}
        </Typography.Title>
        {type === "MEETING_DESK" && (
          <>
            <Box
              onClick={handleOpenShareModal}
              className="clickable d-flex align-center"
              sx={{
                gap: "4px",
                color: "#3a5ee3",
              }}>
              <ShareSVG color="#3a5ee3" width={12} />
              Share
            </Box>
            <ShareModal isOpen={isShareModalOpen} setIsOpen={setIsShareModalOpen} />
          </>
        )}
      </Flex>
      <Row
        justify="start"
        gutter={[16, 16]}
        style={{
          marginTop: "23px",
        }}>
        {loading ? (
          <div className="center-items" style={{ width: "100%" }}>
            <LoadingOutlined />
          </div>
        ) : (
          <>
            <Col
              style={{ aspectRatio: "14/4" }}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              className="explore-card">
              <Link
                to={
                  type === "MEETING_DESK"
                    ? `/desks/create-desk`
                    : "/desks/customer-service/create-desk"
                }>
                <div className="create-new-desk">
                  <div>
                    <div>
                      <CreateNewDeskSVG />
                    </div>
                    <div className="create-new">Create New Desk</div>
                  </div>
                </div>
              </Link>
            </Col>
            {desks
              ?.filter((item) => item)
              .map((desk) => {
                const prop = {
                  onClickJoinMeeting: () => handleJoinDesk(desk.id),
                  deskDropdownVisible,
                  setDeskDropdownVisible,
                };

                return (
                  <Col xs={24} sm={24} md={12} lg={8} key={desk.id}>
                    {desk.callType === "METAVERSE" ? (
                      <>
                        <VerseCard
                          {...prop}
                          onClick={() => handleClickCard(desk.id)}
                          data={desk}
                          setRenameModal={setRenameModal}
                          DimMenu={() => (
                            <DeskMenu
                              type={type}
                              handleDelete={() => deleteDesk(desk.id)}
                              id={desk.id}
                              name={desk.name}
                              setRenameModal={setRenameModal}
                              location={location}
                              isAiAgent={desk.aiAgent}
                              updateDesk={updateDesk}
                              isPending={isPending}
                              deskData={desk}
                              handleMenuClick={handleMenuClick}
                            />
                          )}
                        />
                        <div className={"meeting-desk-with-verse"}>
                          <Row align="middle" gutter={[8, 0]} wrap={false}>
                            <Col>
                              <Row align="middle">
                                <GlobalMetaverse />
                              </Row>
                            </Col>
                            <Col>Metaverse</Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <VerseCard
                        onClick={() => handleClickCard(desk.id)}
                        {...prop}
                        data={desk}
                        setRenameModal={setRenameModal}
                        DimMenu={() => (
                          <DeskMenu
                            handleDelete={() => deleteDesk(desk.id)}
                            id={desk.id}
                            name={desk.name}
                            setRenameModal={setRenameModal}
                            location={location}
                            isAiAgent={desk.aiAgent}
                            updateDesk={updateDesk}
                            isPending={isPending}
                            deskData={desk}
                            handleMenuClick={handleMenuClick}
                          />
                        )}
                      />
                    )}
                  </Col>
                );
              })}
          </>
        )}
      </Row>
    </section>
  );
};
export default MeetingDesk;

const DeskMenu = ({
  id,
  location,
  handleDelete,
  type,
  isAiAgent,
  updateDesk,
  isPending,
  deskData,
  handleMenuClick,
}) => {
  const DrawerAPI = useDrawer();
  const { user } = useContext(userContext);
  return (
    <>
      {DrawerAPI.Render}
      <Menu
        className="profile-menu"
        style={{ width: "190px" }}
        onClick={handleMenuClick}
        items={[
          {
            label: (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {location?.pathname.includes("customer-service") ? (
                  <Link to={`/desks/${id}`}>
                    <Row align="middle" gutter={[14, 0]} wrap={false}>
                      <Col>
                        <Row align="middle">
                          <SettingsSVG fill="#000" />
                        </Row>
                      </Col>
                      <Col>
                        <Typography>Desk Settings</Typography>
                      </Col>
                    </Row>
                  </Link>
                ) : (
                  <Link to={`/desks/${id}`}>
                    <Row align="middle" gutter={[14, 0]} wrap={false}>
                      <Col>
                        <Row align="middle">
                          <SettingsSVG fill="#000" />
                        </Row>
                      </Col>
                      <Col>
                        <Typography>Desk Settings</Typography>
                      </Col>
                    </Row>
                  </Link>
                )}
              </>
            ),
            key: "0",
          },
          {
            label: (
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <CopyFilled color="#000" />
                  </Row>
                </Col>
                <Col>
                  <Typography>Schedule Link</Typography>
                </Col>
              </Row>
            ),
            key: "1",
            onClick: (e) => {
              navigator.clipboard.writeText(
                window.location.origin + "/web-widget/schedule-call?desk_id=" + id,
              );
              message.success("Link Copied Successfully ✅");
            },
          },

          {
            label: (
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <MeetingSVG color="#000" />
                  </Row>
                </Col>
                <Col>
                  <Typography>Add Meetings</Typography>
                </Col>
              </Row>
            ),
            key: "2",
            onClick: (e) => {
              e.domEvent.stopPropagation();
              DrawerAPI.open("30%");
              DrawerAPI.setDrawerContent(<AddDeskMeeting deskId={id} DrawerAPI={DrawerAPI}/>);
            },
          },
          {
            key: "4",
            label: (
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    {isPending ? <LoadingOutlined /> : <AIConfigrationGeneralSVG />}
                  </Row>
                </Col>
                <Col>
                  <Typography>{isAiAgent ? "Deactivate" : "Activate"} AI</Typography>
                </Col>
              </Row>
            ),
            onClick: (e) => {
              if (!isPending) {
                e.domEvent.stopPropagation();
                updateDesk({ ...deskData, deskId: deskData.id, aiAgent: !deskData.aiAgent });
              }
            },
            disabled: isPending,
          },
          ...(isAiAgent
            ? [
              {
                key: "5",
                label: (
                  <Link to={`/desks/${id}/ai-configrations`}>
                    <Row align="middle" gutter={[14, 0]} wrap={false}>
                      <Col>
                        <Row align="middle">
                          <AIConfigrationPermissionsSVG />
                        </Row>
                      </Col>
                      <Col>
                        <Typography>AI Configration</Typography>
                      </Col>
                    </Row>
                  </Link>
                ),
              },
            ]
            : []),

          {
            label: (
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <Delete2SVG color="red" />
                  </Row>
                </Col>
                <Col>
                  <Typography>Delete</Typography>
                </Col>
              </Row>
            ),
            key: "3",
            onClick: (e) => {
              handleDelete();
            },
          },
        ]
          .filter((item) => (type === "MEETING_DESK" ? true : item.key !== "1"))
          .filter((item) => {
            if (user?.employeeDeskId === id) return item.key !== "3";
            else return item;
          })}
      />
    </>
  );
};
