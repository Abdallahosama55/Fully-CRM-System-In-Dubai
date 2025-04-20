import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Col, Form, Row, Typography } from "antd";
import dayjs from "dayjs";
import BasicInformation from "./BasicInformation";
import Employee from "./Employee";
import DeskService from "services/Desk/desk.service";
import { CheckSVG } from "assets/jsx-svg";
import { filterWorkingHoursObject, separateDays } from "utils/WokingHours";
import { Link } from "react-router-dom";
import { axiosCatch } from "utils/axiosUtils";
import { LoadingOutlined } from "@ant-design/icons";

import "./styles.css";
import { useNotification } from "context/notificationContext";
import { DURATION_VALUES } from "../options";
import userContext from "context/userContext";

const CreateDisk = ({ type, currentStep: current }) => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [seletedEmployess, setSeletedEmployess] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [previewPic, setPreviewPic] = useState("");
  const [previewPicForm, setPreviewPicForm] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [servicesSelected, setServicesSelected] = useState(null);
  const [servicesSelectedRoom, setServicesSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryRoom, setSearchQueryRoom] = useState("");
  const { openNotificationWithIcon } = useNotification();
  const dataDesk = useRef();
  const { user } = useContext(userContext);
  useEffect(() => {
    if ((id || searchParams.get("deskId")) && current === 1) {
      (async () => {
        try {
          setFetchLoading(true);
          const res = await DeskService.getById(id || searchParams.get("deskId"));
          const data = res.data.data;

          dataDesk.current = data;
          setUpdatedAt(data.updatedAt);
          setServicesSelected(data.meetingVerseId);
          setServicesSelectedRoom(data.waitingVerseId);
          data.meetingVerse && setSearchQuery(data.meetingVerse.name);
          data.waitingVerse && setSearchQueryRoom(data.waitingVerse.name);

          form.setFieldValue("callType", data.callType);
          setPreviewPic(data.image || "");

          form.setFieldValue("departmentId", data?.departmentId);
          form.setFieldValue(
            "deskEmployees",
            data?.aiAgent ? user.id : (data?.deskEmployees || []).map((item) => item?.employeeId),
          );
          form.setFieldValue("description", data?.description);
          form.setFieldValue(
            "durationSelection",
            DURATION_VALUES.includes(data?.duration) ? data?.duration : "CUSTOM",
          );
          form.setFieldValue("duration", data?.duration);
          form.setFieldValue("scheduleDaysRange", data?.scheduleDaysRange);
          form.setFieldValue("aiAgent", data?.aiAgent);
          form.setFieldValue("allowCustomerToChangeCallType", data?.allowCustomerToChangeCallType);
          form.setFieldValue("showInWidget", data?.showInWidget);
          form.setFieldValue(
            "showAvailableBookingTimesInWidget",
            data?.showAvailableBookingTimesInWidget,
          );
          form.setFieldValue("autoApproveForScheduleMeeting", data?.autoApproveForScheduleMeeting);
          form.setFieldValue("deskName", data.name);
          form.setFieldValue("meetingVerse", data.meetingVerseId);
          form.setFieldValue("waitingRoomVerse", data.waitingVerseId);
          form.setFieldValue("meetingDimensionDropPoint", data?.meetingDimensionDropPoint);
          form.setFieldValue("waitingDimensionDropPoint", data?.waitingDimensionDropPoint);
        } catch (err) {
          axiosCatch(err);
        } finally {
          setFetchLoading(false);
        }
      })();
    }
  }, [id, searchParams, current]);

  const steps = [
    {
      id: 2,
      title: "Basic Information",
      content: (
        <BasicInformation
          form={form}
          loading={loading}
          previewPic={previewPic}
          setPreviewPic={setPreviewPic}
          servicesSelectedRoom={servicesSelectedRoom}
          setServicesSelectedRoom={setServicesSelectedRoom}
          servicesSelected={servicesSelected}
          setServicesSelected={setServicesSelected}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchQueryRoom={searchQueryRoom}
          setSearchQueryRoom={setSearchQueryRoom}
          setPreviewPicForm={setPreviewPicForm}
        />
      ),
    },
    {
      id: 3,
      title: "Employees & Working Hours ",
      content: (
        <Employee
          form={form}
          seletedEmployess={seletedEmployess}
          setSeletedEmployess={setSeletedEmployess}
          loading={loading}
        />
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (current === 1) {
        const deskData = new FormData();
        const data = {
          name: values.deskName,
          allowCustomerToChangeCallType: values.allowCustomerToChangeCallType,
          showInWidget: values.showInWidget,
          showAvailableBookingTimesInWidget: values.showAvailableBookingTimesInWidget,
          autoApproveForScheduleMeeting: values.autoApproveForScheduleMeeting,
          description: values.description,
          duration: values.duration ?? values.durationSelection,
          departmentId: values.departmentId,
          meetingVerseId: values.meetingVerse,
          waitingVerseId: values.waitingRoomVerse,
          callType: values.callType.includes("METAVERSE") ? "METAVERSE" : "STANDARD",
          serviceType: servicesSelected === null ? null : JSON.stringify(servicesSelected),
          deskEmployees: values.aiAgent ? user.id : values.deskEmployees,
          image: previewPicForm || null,
          deskId: id || searchParams.get("deskId"),
          deskType: type ?? dataDesk.current?.deskType,
          scheduleDaysRange: values.scheduleDaysRange,
          aiAgent: values.aiAgent,
          meetingDimensionDropPoint: values.meetingDimensionDropPoint,
          waitingDimensionDropPoint: values.waitingDimensionDropPoint,
        };
        for (const key in data) {
          if (data[key] !== null && data[key] !== undefined) {
            deskData.append(key, data[key]);
          }
        }
        if (id || searchParams.get("deskId")) {
          await DeskService.editDesk(deskData);
          navigate("/desks/" + id);
          openNotificationWithIcon("success", "Desk Edited Successfully");
        } else {
          console.log("deskData", deskData);
          const res = await DeskService.addDesk(deskData);
          openNotificationWithIcon("success", "Desk Created Successfully");
          navigate("/desks/" + res.data.data.id);
          //setSearchParams({ deskId: res.data.data.id });
        }
        // setCurrent(2);
      }

      if (current === 2) {
        const employess = [];
        let shouldSkip = false;
        seletedEmployess.forEach((seletedEmployee) => {
          if (shouldSkip) {
            return;
          }
          const filterdValues = filterWorkingHoursObject(values[`employee${seletedEmployee.id}`]);
          const result = separateDays(filterdValues);

          if (result.length === 0) {
            openNotificationWithIcon(
              "info",
              `You should add one day at least for ${seletedEmployee.fullName}`,
            );

            shouldSkip = true;
            return;
          }

          const formatObj = {};

          result.forEach((day) => {
            formatObj[day.day] = {
              startTime: day.startTime,
              endTime: day.endTime,
            };
          });

          employess.push({
            employeeId: seletedEmployee.id,
            workingHours: formatObj,
          });
        });
        if (employess.length !== seletedEmployess.length) {
          return;
        }

        await DeskService.addEditDeskEmployee({
          deskId: searchParams.get("deskId") || id,
          data: employess,
        });
        openNotificationWithIcon("success", "Working Time Added Successfully");
      }
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Breadcrumb
        style={{ marginBottom: "24px" }}
        items={[
          {
            title: <Link to={"/desks/desk-query"}>Help Desk</Link>,
          },
          {
            title: <div className="bc">Meeting Desk</div>,
          },
          {
            title: <div className="pc">{id ? "Update" : "Create New"}</div>,
          },
        ]}
      /> */}
      <section className="create-update-desk">
        <Form form={form} onFinish={onFinish} layout="vertical">
          {fetchLoading ? (
            <Row justify="center">
              <LoadingOutlined />
            </Row>
          ) : (
            steps[current - 1].content
          )}
          <div className="create-desk-next" style={{}}>
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                {updatedAt && (
                  <Row align="middle" gutter={[10, 0]}>
                    {current === 1 && (
                      <Link to={"/desks/" + id}>
                        <Button
                          style={{
                            marginRight: "8px",
                            background: "#df1b62",
                          }}
                          type="primary">
                          Cancel
                        </Button>
                      </Link>
                    )}
                    <Col>
                      <Row align="middle" gutter={[8, 0]}>
                        <Col>
                          <Row align="middle">
                            <CheckSVG />
                          </Row>
                        </Col>
                        <Col>
                          <Typography.Text style={{ color: "#AEAEB2" }}>Last Saved</Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text className="fw-500">
                        {dayjs(updatedAt).format("MMM D, YYYY HH:mm A")}
                      </Typography.Text>
                    </Col>
                  </Row>
                )}
              </Col>
              <Col>
                <Row align="middle" gutter={[16, 0]} wrap={false}>
                  {/* <Col>
                    <Typography.Text className="fw-500">
                      Step {current}
                      <span className="gc">/{steps.length}</span>
                    </Typography.Text>
                  </Col> */}

                  <Col>
                    <Row gutter={[8, 8]} align="middle">
                      {/* {current !== 1 && (
                        <Col>
                          <Button
                            type="primary"
                            style={{
                              background: "#fff",
                              borderColor: "#27294240",
                              padding: "0px",
                              width: "44px",
                              boxShadow: "0px 3px 8px #2729421c",
                            }}
                            onClick={() => {
                              if (current !== 1) {
                                setCurrent((prev) => prev - 1);
                              }
                            }}>
                            <ArrowDownSVG
                              style={{
                                width: "16px",
                                height: "9px",
                                rotate: "90deg",
                              }}
                            />
                          </Button>
                        </Col>
                      )} */}
                      <Col>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          style={{ background: "#272942", display: "inline-flex" }}>
                          <Row gutter={[4, 0]} wrap={false} align="middle">
                            <Col>{id ? "Save" : "Create"} </Col>
                            <Col>
                              {/* {current === 1 && (
                                <Row align="middle">
                                  <ArrowDownSVG color="#fff" style={{ rotate: "-90deg" }} />
                                </Row>
                              )} */}
                            </Col>
                          </Row>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </section>
    </>
  );
};

export default CreateDisk;
