import { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { DeleteSVG, EditSVG } from "assets/jsx-svg";
import useAddEvent from "services/Events/Mutations/useAddEvent";
import useUpdateEvent from "services/Events/Mutations/useUpdateEvent";
import { QUERY_KEY } from "services/constants";
import dayjs from "dayjs";

export default function AddSubEventComp({
  eventId,
  eventData,
  DrawerAPI,
  eventDetails,
  setActiveCreateEventTab,
  speakersList,
  participantList,
  dimensionPlacese,
  subEventsList,
  setSubEventsList,
  previewPicForm,
}) {
  const [addSubEventForm] = Form.useForm();
  const queryClient = useQueryClient();
  const [idToEdit, setIdToEdit] = useState(null);

  const closeDrawer = () => {
    DrawerAPI.close();
  };
  const { addEvent, isPending } = useAddEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EVENTS] });

      closeDrawer();
    },
  });

  const { updateEvent, isPending: isPendingUpdateEvent } = useUpdateEvent(eventId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EVENTS] });

      closeDrawer();
    },
  });

  const handelSaveEvent = () => {
    //update
    eventDetails.startDate = dayjs(eventDetails.startDate).format("YYYY-MM-DD");
    eventDetails.endDate = dayjs(eventDetails.endDate).format("YYYY-MM-DD");
    eventDetails.startTime = dayjs(eventDetails.startTime, "HH:mm:ss").format("HH:mm:ss");

    if (eventId) {
      //edit
      eventDetails.liveDimensionsParticipants = participantList?.map((item) => {
        let objectToUpdate = {
          source: item?.source?.toLowerCase(),
          isDeleted: item?.isDeleted,
          email: item.email,
          name: item.name,
          accountId: item?.accountId,
          isVIP: item.isVIP,
        };
        //dont send id to back when it is new from front
        delete objectToUpdate.id;
        if (item?.source === "FRONT") {
          return objectToUpdate;
        }
        return {
          id: item.id,
          ...objectToUpdate,
        };
      });

      eventDetails.liveDimensionsSpeakers = speakersList?.map((item) => {
        let objectToUpdate = {
          ...item,
          source: item?.source?.toLowerCase(),
          isDeleted: item?.isDeleted,
          accountId: item?.accountId,
        };
        //dont send id to back when it is new from front
        delete objectToUpdate.id;
        delete objectToUpdate.speakerImage;
        if (item?.source === "FRONT") {
          return objectToUpdate;
        }
        return {
          id: item.id,
          ...objectToUpdate,
        };
      });

      /*
      {
    "title":"test event22-V2",
    "description":"tes NEW Event data",
    "tags":["test"],
     "invitationCard":"https://chickchack.s3.eu-west-2.amazonaws.com/event-invitation-card/17173431801042zqrtznrxghw3jilsxewhe3mti_3.jpg",//cover image,
    "startDate":"2024-11-23",
    "endDate":"2024-11-23",
    "startTime":"08:00",
    "endTime":"20:00",
    "timeZone":"GMT",
    "type":"METAVERSE",//STANDARD
    "customerDimensionId":1370,
    "audienceDimensionDropPoint":"right",
    "speakerDimensionDropPoint":"center"



}
      */
      eventDetails.subEvents = subEventsList.map((event) => {
        delete event.id;
        delete event.source;
        if (event.speakers) {
          const newSpeakersEmails = event.speakers?.map(
            (speakerId) => speakersList.find((speaker) => speaker.id === speakerId)?.email,
          );
          if (event.speakerEmails) {
            event.speakerEmails = [...event.speakerEmails, ...newSpeakersEmails];
          } else {
            event.speakerEmails = newSpeakersEmails;
          }
        } else {
          console.log("event", event);
          event.speakerEmails = event.speakerIds?.map(
            (speakerId) =>
              eventDetails.liveDimensionsSpeakers?.find((speaker) => speaker.id === speakerId)
                ?.email,
          );
          console.log("event.speakersIds", event.speakersIds);
          console.log("event.speakerEmails", event.speakerEmails);
        }
        return event;
      });

      console.log("eventDetails", eventDetails);

      updateEvent({ ...eventData, ...eventDetails });
    } else {
      //add
      eventDetails.liveDimensionsParticipants = participantList?.map((item) => {
        return {
          email: item.email,
          name: item.name,
          isVIP: item.isVIP,
        };
      });

      eventDetails.liveDimensionsSpeakers = speakersList?.map((item) => {
        return {
          email: item.email,
          name: item.name,
          title: item.title,
          company: item.company,
          image: item.image,
        };
      });

      eventDetails.subEvents = subEventsList.map((event) => {
        delete event.id;
        event.speakerEmails = event.speakers.map(
          (speakerId) => speakersList.find((speaker) => speaker.id === speakerId)?.email,
        );
        return event;
      });

      eventDetails.invitationCard = previewPicForm;

      addEvent(eventDetails);
    }
  };

  const updateItem = (id, values) => {
    const otherSubEventsList = subEventsList.filter((item) => item.id !== id);
    const objToSave = {
      id: id,
      ...values,
      source: "FRONT",
    };
    setSubEventsList([objToSave, ...otherSubEventsList]);
  };

  const onFinish = (values) => {
    console.log(values);

    if (!idToEdit) {
      setSubEventsList((prev) => [
        {
          id: uuidv4(),
          source: "FRONT",
          ...values,
        },
        ...prev,
      ]);
    } else {
      updateItem(idToEdit, values);
    }
    setIdToEdit(null);
    addSubEventForm.resetFields();
  };

  const handelCancelEdit = () => {
    setIdToEdit(null);
    addSubEventForm.resetFields();
  };

  const handelDeleteParticipant = (id) => {
    let itemToDelete = subEventsList.filter((item) => item.id === id)[0];

    if (itemToDelete && itemToDelete.source === "BACK") {
      setSubEventsList([
        ...subEventsList.filter((item) => item.id !== id),
        { ...itemToDelete, isDeleted: true },
      ]);
    } else {
      setSubEventsList(subEventsList.filter((item) => item.id !== id));
    }
  };

  const onRowEditView = async (row) => {
    setIdToEdit(row.id);
    console.log("row", row);

    addSubEventForm.setFieldsValue({
      ...row,
    });
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      ellipsis: true,
      width: 70,
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: 100,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      ellipsis: true,
      width: 100,
      render: (startTime) => dayjs(startTime).format("HH:mm A"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      ellipsis: true,
      width: 100,
      render: (endTime) => dayjs(endTime).format("HH:mm A"),
    },
    {
      title: "Speakers",
      dataIndex: "speakers",
      key: "speakers",
      ellipsis: true,
      width: 200,
      render: (speakers) => {
        const speakersListRender = speakers
          ?.map((speakerId) => speakersList.find((speaker) => speaker.id === speakerId)?.email)
          ?.join(", ");
        return (
          <Tooltip title={speakersListRender}>
            <Typography.Text>{speakersListRender}</Typography.Text>
          </Tooltip>
        );
      },
    },
    {
      title: "Session Type",
      dataIndex: "isSession",
      key: "isSession",
      ellipsis: true,
      width: 100,
      render: (isSession) => (isSession ? "Session" : "Sub-Event"),
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
  console.log("eventDetails", eventDetails);
  const disabledDate = (current) => {
    // Can not select days before today and today

    return (
      current &&
      (current < dayjs(eventDetails.eventStartDate).startOf("day") ||
        (eventDetails.eventEndDate
          ? current > dayjs(eventDetails.eventEndDate).endOf("day")
          : false))
    );
  };

  const durationUnits = {
    MIN: "minute",
    HOUR: "hour",
    DAY: "day",
  };
  const disabledDateTime = () => {
    const eventDate = dayjs(eventDetails.startingTime);
    const endEventTime = eventDate.add(
      eventDetails.duration || 0,
      durationUnits[eventDetails.durationUnit] || "minute",
    );

    const disabledHours = () => {
      let hours = [];
      for (let i = 0; i < 24; i++) {
        if (i < eventDate.hour() || i > endEventTime.hour()) {
          hours.push(i);
        }
      }
      return hours;
    };

    const disabledMinutes = (selectedHour) => {
      let minutes = [];
      if (selectedHour === eventDate.hour()) {
        for (let i = 0; i < 60; i++) {
          if (i < eventDate.minute()) {
            minutes.push(i);
          }
        }
      }
      if (selectedHour === endEventTime.hour()) {
        for (let i = 0; i < 60; i++) {
          if (i > endEventTime.minute()) {
            minutes.push(i);
          }
        }
      }
      return minutes;
    };

    return {
      disabledHours: disabledHours,
      disabledMinutes: disabledMinutes,
    };
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={addSubEventForm}
        requiredMark={false}
        className="go-live">
        <Row gutter={5}>
          <Col span={24} lg={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter title",
                },
              ]}>
              <Input placeholder="Enter title" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item name="speakers" label="Speakers">
              <Select
                mode="multiple"
                options={speakersList.map((speaker) => ({
                  label: speaker.email,
                  value: speaker.id,
                }))}
                allowClear
                placeholder="Select speakers"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                  message: "Pleaes select date",
                },
              ]}>
              <DatePicker disabledDate={disabledDate} placeholder="Select date" className="w-100" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[
                {
                  required: true,
                  message: "Pleaes select end time",
                },
              ]}>
              <DatePicker.TimePicker
                placeholder="Select start time"
                className="w-100"
                mode="time"
                disabledTime={disabledDateTime}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={6}>
            <Form.Item initialValue={30} label="Duration" name="duration">
              <InputNumber
                type="number"
                max={eventDetails.duration}
                className="w-100"
                placeholder="duration"
                min={15}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={6}>
            <Form.Item
              className="w-100"
              initialValue="MIN"
              label="Duration Unit"
              name="durationUnit">
              <Select>
                {["DAY", "HOUR", "MIN"]
                  .filter((item) => {
                    if (eventDetails.durationUnit === "MIN") {
                      return item === "MIN";
                    } else if (eventDetails.durationUnit === "HOUR") {
                      return item === "MIN" || item === "HOUR";
                    } else {
                      return true;
                    }
                  })
                  .map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          {dimensionPlacese && dimensionPlacese?.length > 0 && (
            <>
              <Col xs={24}>
                <Form.Item
                  initialValue={null}
                  label={"Speaker Dimension DropPoint"}
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
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  initialValue={null}
                  label={"Audience Dimension DropPoint"}
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
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
        <Row justify="end">
          <Form.Item name="isSession" valuePropName="checked" initialValue={true}>
            <Checkbox>Is Session</Checkbox>
          </Form.Item>
        </Row>
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
              // loading={addLoading}
              type="primary">
              {idToEdit ? "Save" : "Add"}
            </Button>
          </Col>
        </Row>
        <h4>Sub Events</h4>
        <Table
          // scroll={{ x: 700, y: 400 }}
          rowKey={"id"}
          className="studio-table"
          dataSource={subEventsList?.filter((item) => !item?.isDeleted) || []}
          locale={{ emptyText: "No data yet. Add sub events to view here directly" }}
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
          onClick={handelSaveEvent}
          loading={isPendingUpdateEvent || isPending}
          style={{ background: "#272942", color: "#fff" }}>
          Save
        </Button>
      </Row>
    </>
  );
}
