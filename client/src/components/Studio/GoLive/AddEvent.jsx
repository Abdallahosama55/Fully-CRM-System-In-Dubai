import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Typography,
  Radio,
  DatePicker,
  Select,
  Timeline,
  TimePicker,
  Tag,
  Divider,
  message,
} from "antd";
import dayjs from "dayjs";

import { ArrowDownSVG, WorldMapSVG, SearchSVG } from "assets/jsx-svg";
import "./styles.css";

import { axiosCatch } from "utils/axiosUtils";
import ExploreService from "services/explore.service";
import house from "assets/images/house.png";
import TIME_ZONES from "constants/TIME_ZONES";
import UploadInput from "components/common/UploadInput";
import { TRAVEL_API_URL } from "services/travel/config";
import { useWatch } from "antd/es/form/Form";
import useGetEventById from "services/Events/Querys/useGetEventById";
import isValidJson from "utils/isValidJson";
import useAddEvent from "services/Events/Mutations/useAddEvent";
import useUpdateEvent from "services/Events/Mutations/useUpdateEvent";
import LoadingPage from "components/common/LoadingPage";
import EVENT_TYPE from "constants/EVENT_TYPE";
import { useNavigate } from "react-router-dom";
export default function AddEvent({ id, onEnd = () => {} , DrawerAPI }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const [goLiveForm] = Form.useForm();
  const eventType = useWatch("type", goLiveForm);
  const startDate = useWatch("startDate", goLiveForm);
  const endDate = useWatch("endDate", goLiveForm);
  const startTime = useWatch("startTime", goLiveForm);

  const [dimensionPlacese, setDimensionPlacese] = useState([]);
  const navigate = useNavigate();
  const [verseSelected, setVerseSelected] = useState(undefined);
  const [verses, setVerses] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const eventData = useGetEventById(id, { enabled: !!id, select: (data) => data.data.data });

  useEffect(() => {
    DrawerAPI.setRootClassName("gray_bg_drawer");
  }, []);

  useEffect(() => {
    if (eventData?.data) {
      console.log("eventData?.data", eventData?.data);
      goLiveForm.setFieldsValue({
        ...eventData?.data,
        endDate: eventData?.data?.endDate ? dayjs(eventData?.data?.endDate) : undefined,
        startDate: eventData?.data?.startDate ? dayjs(eventData?.data?.startDate) : undefined,
        startTime: eventData?.data?.startTime
          ? dayjs(eventData?.data?.startTime, "HH:mm:ss")
          : undefined,
        endTime: eventData?.data?.endTime ? dayjs(eventData?.data?.endTime, "HH:mm:ss") : undefined,
        invitationCard: {
          link: eventData?.data?.invitationCard,
          id: Math.random(),
          name: Math.random(),
        },
      });
      setVerseSelected(eventData?.data?.customerDimension?.id);
    }
  }, [eventData?.data, goLiveForm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            const res = await ExploreService.search({
              serach: searchQuery,
              tag: "MyDimension",
            });
            setVerses(res.data.data.rows);
          } catch (err) {
            axiosCatch(err);
          }
        })();
      },
      searchQuery.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page]);

  useEffect(() => {
    if (verseSelected && eventType === EVENT_TYPE.METAVERSE) {
      const temp = verses.find((verse) => verse.id === verseSelected);
      const places = isValidJson(temp?.places) ? JSON.parse(temp?.places) : [];
      setDimensionPlacese(places);
    }
  }, [verseSelected, verses, eventType]);

  // MUTATUIONS
  const { addEvent, isPending: isAddEventPending } = useAddEvent({
    onSuccess: (data) => {
      console.log("data", data.data.data);
      message.success("Event added successfully");
      onEnd();
      navigate("/event/edit/" + data?.data?.data);
      DrawerAPI.close();
    },
    onError: (error) => {
      message.error(error.message || "something went wrong");
    },
  });

  const { updateEvent, isPending: isUpdateEventPending } = useUpdateEvent(id, {
    onSuccess: () => {
      message.success("Event updated successfully");
      onEnd();
      DrawerAPI.close();
    },
    onError: (error) => {
      message.error(error.message || "something went wrong");
    },
  });

  const onFinish = async (values) => {
    if (isUploading) {
      message.error("Please wait for cover image to upload");
      return;
    }

    const objectToAdd = {
      ...values,
      customerDimensionId: verseSelected,
      startDate: values?.startDate ? values?.startDate?.format("YYYY-MM-DD") : undefined,
      endDate: values?.endDate ? values?.endDate?.format("YYYY-MM-DD") : undefined,
      startTime: values?.startTime ? values?.startTime.format("HH:mm") : undefined,
      endTime: values?.endTime ? values?.endTime.format("HH:mm") : undefined,
      invitationCard: values?.invitationCard?.link,
    };

    if (id) {
      updateEvent(objectToAdd);
    } else {
      addEvent(objectToAdd);
    }
  };

  const closeDrawer = () => {
    DrawerAPI.close();
  };

  if (isUpdateEventPending || isAddEventPending || eventData.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div style={{
      background: "#fff",
      padding: "1rem",
      border: "1px solid var(--gray-100)",
      borderRadius: "1rem"
    }}>
      <Typography.Text className="lg_text_semibold" style={{ color: "var(--vbooking-b700)" }}>
        {id ? `Update Event` : "Create New Event"}
      </Typography.Text>
      <Divider />
      <Form
        scrollToFirstError={{ behavior: "smooth" }}
        style={{ marginTop: "8px" }}
        onFinish={onFinish}
        layout="vertical"
        form={goLiveForm}
        requiredMark={false}
        className="go-live">
        <Form.Item
          name="title"
          label={<span className="sm_text_medium color">Event Name</span>}
          rules={[{ required: true, message: "Pleaes Enter Event Name" }]}>
          <Input placeholder="Enter event name" />
        </Form.Item>
        <Row gutter={[8, 8]} style={{ marginTop: "1.2rem" }}>
          <Col lg={17}>
            <Timeline>
              <Timeline.Item color="#2D6ADB">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "35px 1fr 1fr",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                  <span
                    className="sm_text_regular"
                    style={{ color: "var(--font-secondary)" }}>
                    Start
                  </span>
                  <div>
                    <p style={{ marginBottom: "6px" }} className="sm_text_medium">
                      Date
                    </p>
                    <Form.Item
                      name="startDate"
                      rules={[{ required: true, message: "Please Enter Event Start Date" }]}
                      initialValue={dayjs()}>
                      <DatePicker className={"w-100"} placeholder="Select Start Date" />
                    </Form.Item>
                  </div>
                  <div>
                    <p style={{ marginBottom: "6px" }} className="sm_text_medium">
                      Time
                    </p>
                    <Form.Item
                      name="startTime"
                      rules={[{ required: true, message: "Please Enter Starting Time" }]}
                      initialValue={dayjs()}>
                      <TimePicker
                        className={"w-100"}
                        placeholder="Select Start Time"
                        format={"HH:mm"}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#2D6ADB">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "35px 1fr 1fr",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                  <span
                    className="sm_text_regular"
                    style={{ color: "var(--font-secondary)" }}>
                    End
                  </span>
                  <div>
                    <Form.Item
                      name="endDate"
                      rules={[
                        {
                          validator: (_, value) => {
                            if (!value) {
                              return Promise.reject("Please Enter Event End Date")
                            }

                            if (startDate && value && dayjs(value).isBefore(dayjs(startDate), 'date')) {
                              return Promise.reject("End date can't be before start date")
                            }

                            return Promise.resolve();
                          }
                        }]}
                    >
                      <DatePicker
                        disabledDate={(current) => {
                          if (!startDate) {
                            return false; // Allow all dates
                          }
                          return current && dayjs(current).isBefore(dayjs(startDate), 'date'); // Disable all dates before startDate
                        }}
                        className={"w-100"}
                        placeholder="Select End Date"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      name="endTime"
                      rules={[
                        {
                          validator: (_, value) => {
                            if (!value) {
                              return Promise.reject("enter event end time")
                            }

                            if (dayjs(startDate).isSame(dayjs(endDate), "date")) {
                              if (dayjs(value).isBefore(dayjs(startTime), "time")) {
                                return Promise.reject("End time can't be before start time")
                              }
                            }

                            return Promise.resolve();
                          }
                        }]}>
                      <TimePicker
                        className="w-100"
                        placeholder="Select End Time"
                        format="HH:mm"

                        disabledTime={() => {
                          if (dayjs(startDate).isSame(dayjs(endDate), "date")) {
                            console.log(" SAME DAY !!")
                            const startHour = dayjs(startTime).hour();
                            const startMinute = dayjs(startTime).minute();
                            console.log({ startHour, startMinute })
                            return {
                              disabledHours: () => {
                                const hours = [];
                                for (let i = 0; i < startHour; i++) {
                                  hours.push(i); // Disable hours before startHour
                                }
                                return hours;
                              },
                              disabledMinutes: (selectedHour) => {
                                if (selectedHour === startHour) {
                                  const minutes = [];
                                  for (let i = 0; i < startMinute; i++) {
                                    minutes.push(i); // Disable minutes before startMinute when the hour is the same
                                  }
                                  return minutes;
                                }
                                return [];
                              },
                            };
                          }
                          return {}; // No disabling if the date is not the same
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Timeline.Item>
            </Timeline>
          </Col>
          <Col lg={7}>
            <div
              className="select-with-prefix"
              style={{ marginTop: "20px", height: "calc(100% - 50px)" }}>
              <WorldMapSVG className="select-prefix-icon" fill="#3F65E4" width={16} height={16} />
              <Form.Item
                noStyle
                name={"timeZone"}
                className="w-100"
                rules={[{ required: true, message: "Please Select Event Time Zone" }]}
                initialValue={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                <Select
                  placeholder="Select Time Zone"
                  suffixIcon={<ArrowDownSVG />}
                  className="w-100 h-100"
                  showSearch
                  options={TIME_ZONES.map((el) => ({ label: el, value: el }))}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please Enter Event Description" }]}
          label={
            <p className="sm_text_medium" style={{ color: "var(--gray-700)" }}>
              Description
            </p>
          }>
          <Input.TextArea rows={10} placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          className="w-100"
          label={"Tags"}
          rules={[{ required: true, message: "Please Enter Event Tags" }]}
          name="tags">
          <Select
            suffixIcon={<></>}
            placeholder="Enter tags"
            mode="tags"
            tagRender={(el) => (
              <Tag
                style={{ height: "30px", display: "flex", alignItems: "center" }}
                closable
                onClose={el?.onClose}>
                {el?.label}
              </Tag>
            )}
          />
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="invitationCard"
              rules={[{ required: true, message: "Please Upload Event Cover Image" }]}
              label="Event Cover Image">
              <UploadInput
                setUploadingState={setIsUploading}
                formatsText={"PNG, JPG"}
                uploadText={"Click to upload"}
                action={TRAVEL_API_URL + "common/add-image"}
                name={"image"}
                maxText={"100 x 75px"}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              rules={[{ required: true, message: "Please Select Event Type" }]}
              initialValue={EVENT_TYPE.STANDARD}
              label="Event Type"
              className="event_type_radio_form_item">
              <Radio.Group>
                <Radio value={EVENT_TYPE.STANDARD}>Standard</Radio>
                <Radio value={EVENT_TYPE.METAVERSE}>Metaverse</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {eventType === EVENT_TYPE.METAVERSE && <>
          <Divider />
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Text className="md_text_medium">Select Main Hall</Typography.Text>
            </Col>
            <Col span={12}>
              <Input
                className="w-100"
                placeholder="Search"
                prefix={<SearchSVG color="#3F65E4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
          </Row>
          <Form.Item
            name="meetingVerse"
            rules={[{ required: !verseSelected, message: "Please Select Main Hall" }]}
          >
            <Row
              justify="start"
              gutter={[12, 0]}
              style={{
                marginTop: "15px",
              }}
              className="rows-verses">
              {verses?.map((verse) => (
                <Col
                  style={{
                    opacity: "1",
                    width: "268px",
                  }}
                  key={verse.id}
                  onClick={() => setVerseSelected(verse.id)}>
                  <Row gutter={[10, 10]}>
                    <Col xs={24}>
                      <div className={`explore-card ${verseSelected === verse.id && "border-blue"}`} style={{
                        position: "relative",
                      }}>
                        <div className="image-holder">
                          <Image
                            preview={false}
                            src={verse.image || house}
                            alt="dimension"
                            width="100%"
                            height="100%"
                            className="explore-card-img"
                          />
                        </div>
                        <div className="image-text-holder" style={{ height: "80px" }}>
                          {verse.name && <Typography.Paragraph className="xs_text_medoum" ellipsis style={{ marginBottom: "0" }}>
                            {verse.name}
                          </Typography.Paragraph>}
                          {verse.description && <Typography.Paragraph className="xs_text_regular" ellipsis={{ rows: 2, tooltip: verse.description }}>
                            {verse.description}
                          </Typography.Paragraph>}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Form.Item>
          <div>
            {verseSelected && dimensionPlacese && dimensionPlacese?.length > 0 && <Form.Item
              initialValue={null}
              label={"Select Audience Drop Point"}
              name="audienceDimensionDropPoint">
              <Radio.Group>
                <Row gutter={[8, 4]}>
                  {dimensionPlacese?.map((place) => (
                    <Col xs={24} lg={8} key={place.name}>
                      <Radio value={place.name}>
                        <Typography.Text ellipsis>{place.name}</Typography.Text>
                      </Radio>
                    </Col>
                  ))}
                  <Col xs={24} lg={8}>
                    <Radio value={null}>Default</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>}
          </div>
          <div>
            {verseSelected && dimensionPlacese && dimensionPlacese?.length > 0 && <Form.Item
              initialValue={null}
              label={"Select Speaker Drop Point"}
              name="speakerDimensionDropPoint">
              <Radio.Group>
                <Row gutter={[8, 4]}>
                  {dimensionPlacese?.map((place) => (
                    <Col xs={24} lg={8} key={place.name}>
                      <Radio value={place.name}>
                        <Typography.Text ellipsis>{place.name}</Typography.Text>
                      </Radio>
                    </Col>
                  ))}
                  <Col xs={24} lg={8}>
                    <Radio value={null}>Default</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>}
          </div>
        </>}
        <Divider />
        <Row align="end" gutter={[12]} className="mt-1">
          <Button className="fz-14" onClick={() => closeDrawer()} style={{ marginRight: "8px" }}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            {id ? "Edit" : "Add"} Event
          </Button>
        </Row>
      </Form>
    </div>
  );
}
