import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  List,
  Pagination,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";

import { SearchSVG, TicketSVG, TimeSVG } from "assets/jsx-svg";
import DimensionsService from "services/dimensions.service";
import { axiosCatch } from "utils/axiosUtils";
import defaultDim from "assets/images/house.png";
import CommonService from "services/common.service";
import { LoadingOutlined } from "@ant-design/icons";
import CallsAndMeetingsDetails from "../CallsAndMeetingsDetails";

import "./styles.css";
import { useNotification } from "context/notificationContext";
import useGetConstants from "services/Constants/Querys/useGetConstants";
import useGetAllLabelsInfo from "services/newSettings/Query/useGetAllLabelsInfo";
import useCreateMeeting from "services/meetings/Mutations/useCreateMeeting";
import { queryClient } from "services/queryClient";
import { QUERY_KEY } from "services/constants";
import useGetSearchEmployees from "services/Employees/Querys/useGetSearchEmployees";
import { useDebounce } from "hooks/useDebounce";
import useUpdateMeeting from "services/meetings/Mutations/useUpdateMeeting";
import useGetMeetingById from "services/meetings/Querys/useGetMeetingById";
import useGetDeskEmployees from "services/Desk/Querys/useGetDeskEmployees";
import ColorPicker from "components/common/ColorPicker";
import allTimezones from "constants/TIME_ZONES";
import { stringAvatar } from "utils/string";

export default function CallsAndMeetingsAdd({ id, setRefresh, startDate, endDate  , DrawerAPI}) {
  const { meetingStatus } = useGetConstants();
  const [fadeColor, setFadeColor] = useState("#3a5ee3");
  const [dimensionPlacese, setDimensionPlacese] = useState([]);
  const [verses, setVerses] = useState([]);
  const [verseSelected, setVerseSelected] = useState(null);

  useEffect(() => {
    if (verseSelected) {
      let selectedVerse = verses.filter((item) => item.id == verseSelected)[0];

      setDimensionPlacese(selectedVerse?.places ? JSON.parse(selectedVerse?.places) : []);
    }
  }, [verses, verseSelected]);
  const { data: listLabel, isPending } = useGetAllLabelsInfo({
    refetchOnMount: false,
    select: (data) => {
      return data.data.data;
    },
  });
  const { createMeeting } = useCreateMeeting({
    onSuccess: (resp) => {
      openNotificationWithIcon("success", "Meeting Created Successfully");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MEETINGS_CALENDAR],
      });

      DrawerAPI.setDrawerContent(<CallsAndMeetingsDetails id={resp.data.data} DrawerAPI={DrawerAPI}/>);
    },
  });

  const { updateMeeting } = useUpdateMeeting({
    onSuccess: (resp) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CUSTOMER_ACTIVITY],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MEETINGS_CALENDAR],
      });
      openNotificationWithIcon("success", "Meeting Edit Successfully");
      setRefresh && setRefresh((prev) => !prev);
      DrawerAPI.setDrawerContent(<CallsAndMeetingsDetails id={id} DrawerAPI={DrawerAPI}/>);
    },
  });
  const { data: listDeskEmployees, isLoading: isLoadingDeskEmployees } = useGetDeskEmployees(
    "MEETING_DESK",
    {
      refetchOnMount: false,
      select: (rest) => rest.data.data,
      retry: 1,
    },
  );
  const [form] = Form.useForm();

  const [employeesSearch, setEmployeesSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [versesCount, setVersesCount] = useState(0);
  const [page, setPage] = useState(0);
  // const [deskSelected, setDeskSelected] = useState(null);
  const callType = Form.useWatch("callType", form);
  const isReminderInMinutes = Form.useWatch("isReminderInMinutes", form);
  const [customersList, setCustomersList] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);
  const { openNotificationWithIcon } = useNotification();
  const queryEmployeesSearch = useDebounce(employeesSearch);

  const { data, isLoading: isFetchMeeting } = useGetMeetingById(id, {
    onSuccess: (resp) => {
      const newData = resp.data.data;

      form.setFieldValue("title", newData.title);
      form.setFieldValue("description", newData.reason);
      form.setFieldValue("date", dayjs(newData.date).tz(newData.timeZone));
      form.setFieldValue("timeZone", newData.timeZone);
      form.setFieldValue("callType", newData.meetingType);
      form.setFieldValue("isReminderInMinutes", Boolean(newData.reminderInMinutes));
      form.setFieldValue("reminderInMinutes", newData.reminderInMinutes ?? 15);
      form.setFieldValue("durationInMinutes", newData.durationInMinutes);
      form.setFieldValue("status", newData.actionStatus?.id);
      form.setFieldValue("meetingLink", newData.meetingLink);
      form.setFieldValue("label", newData.label?.id);
      form.setFieldValue("deskId", newData.deskId);
      form.setFieldValue(
        "participants",
        newData?.participantBookedMeetings
          .filter((item) => !!item.customer)
          ?.map((item) => item.customer.id),
      );

      form.setFieldValue(
        "employees",
        newData?.participantBookedMeetings
          .filter((item) => !!item?.employee && !item.isHost)
          ?.map((item) => item?.employee?.id) ?? [],
      );

      // participantBookedMeetings;
      form.setFieldValue("timeFrom", dayjs(newData.date).tz(newData.timeZone));
      // setDeskSelected(newData?.deskId);
      setVerseSelected(newData?.dimensionId);
      setSearchQuery(newData?.customerDimension?.name || "");
      setFadeColor(newData?.meetingColor);
    },
    select: (data) => {
      return data.data.data;
    },
  });

  const { data: dataEmployees, isLoading } = useGetSearchEmployees(
    {
      limit: 100,
      searchKey: queryEmployeesSearch,
      offset: 0,
    },
    {
      select: (res) => {
        return res.data.data.data;
      },
    },
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            const res = await CommonService.customerSearch({
              limit: 100,
              searchKey: customerSearch,
            });

            setCustomersList(res.data.data);
          } catch (err) {
            axiosCatch(err);
          }
        })();
      },
      customerSearch.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [customerSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            const res = await DimensionsService.searchDimensions({
              limit: 10,
              searchKey: searchQuery,
              offset: (page ? page - 1 : page) * 10,
            });
            setVerses(res.data.data.rows);
            setVersesCount(res.data.data.count);
          } catch (err) {
            axiosCatch(err);
          }
        })();
      },
      searchQuery.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page]);

  const onFinish = async (values) => {
    const data = {
      title: values.title,
      reason: values.description,
      date:
        values.date &&
        dayjs(values.date)
          .tz(values.timeZone)
          .set("hour", dayjs(values.timeFrom).format("HH"))
          .set("minutes", dayjs(values.timeFrom).format("mm"))

          ?.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),

      timeZone: values.timeZone,
      participants: [
        ...(values?.participants || []).map((item) => ({
          customerId: item,
        })),
        ...(values?.employees || []).map((item) => ({
          employeeId: item,
        })),
      ],
      deskId: values?.deskId || null,
      dimensionId: callType === "VINDO_METAVERSE_CALL" ? verseSelected : null,
      meetingType: values.callType,
      labelId: values.label,
      reminderInMinutes: values?.isReminderInMinutes ? values.reminderInMinutes : undefined,
      durationInMinutes: values.durationInMinutes,
      statusId: values?.status,
      meetingLink: values?.meetingLink,
      meetingColor: fadeColor,
      dimensionDropPoint: values?.dimensionDropPoint,
    };

    try {
      setAddLoading(true);
      if (id) {
        await updateMeeting({ id, ...data });
      } else {
        await createMeeting(data);
        // const res = await BookedMeetingService.addMeeting(data);

        setRefresh && setRefresh((prev) => !prev);
      }
    } catch (err) {
      axiosCatch(err);
    } finally {
      setAddLoading(false);
    }
  };
  if (fetchLoading || isFetchMeeting || isLoadingDeskEmployees) {
    return (
      <Row justify="center">
        <LoadingOutlined />
      </Row>
    );
  }
  const meetingStatusIcons = [
    {
      id: 0,
      icon: <TicketSVG />,
    },
    {
      id: 1,
      icon: <TicketSVG />,
    },
    {
      id: 2,
      icon: <TicketSVG />,
    },
    {
      id: 3,
      icon: <TicketSVG />,
    },
    {
      id: 4,
      icon: <TicketSVG />,
    },
    {
      id: 5,
      icon: <TicketSVG />,
    },
    {
      id: 6,
      icon: <TicketSVG />,
    },
  ];

  return (
    <Row
      style={{ flexDirection: "column", minHeight: "100%" }}
      className="calls-meetings-add"
      gutter={[0, 12]}>
      <Col flex={1}>
        <Row style={{ marginBottom: "12px" }}>
          <Typography.Title level={3}>
            {id ? `Edit #${id} Meeting` : "Create New Meeting"}
          </Typography.Title>
        </Row>

        <Form
          form={form}
          initialValues={{
            title: "New Meet",
            date: dayjs(startDate),
            timeFrom: dayjs(startDate),

            durationInMinutes:
              dayjs(endDate).diff(dayjs(startDate), "minute") === 0
                ? 30
                : dayjs(endDate).diff(dayjs(startDate), "minute"),
            timeZone:
              localStorage.getItem("time-zone") ??
              Intl.DateTimeFormat().resolvedOptions().timeZone ??
              allTimezones[0],
            reminderInMinutes: 15,
            isReminderInMinutes: true,
            callType: "VINDO_MEETING_CALL",
          }}
          onFinish={onFinish}
          layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please Enter Title" }]}
            initialValue={"New Meet"}>
            <Input placeholder="Write Here" />
          </Form.Item>

          <Form.Item label="Reasons" name="description">
            <Input.TextArea rows={4} placeholder="Write Description" />
          </Form.Item>

          <Row gutter={[8, 8]} style={{ marginBottom: "12px" }}>
            <Col xs={24} lg={24}>
              <Form.Item
                required
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please Enter Date" }]}>
                <DatePicker className="w-100" placeholder="Select" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={24}>
              <Row gutter={[12, 12, 12]}>
                <Col xs={24} lg={10}>
                  <Form.Item
                    label="Time"
                    required
                    name="timeFrom"
                    rules={[{ required: true, message: "Please Enter Time From" }]}
                    initialValue={dayjs()}>
                    <DatePicker.TimePicker
                      className="w-100"
                      placeholder="Select"
                      format={"HH:mm"}
                      suffixIcon={
                        <Row gutter={[5, 0]} align="middle">
                          <Col>
                            <Row align="middle">
                              <TimeSVG style={{ width: "14px", height: "14px" }} color="#AEAEB2" />
                            </Row>
                          </Col>
                          <Col>
                            <Typography.Text className="fz-12" style={{ color: "#AEAEB2" }}>
                              From
                            </Typography.Text>
                          </Col>
                        </Row>
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={7}>
                  <Form.Item
                    name="durationInMinutes"
                    label="Duration"
                    rules={[{ required: true, message: "Please Enter Duration" }]}>
                    <Input type="number" suffix="min" placeholder="Duration"></Input>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={7}>
                  <Form.Item name="timeZone" label="Time zone">
                    <Select
                      showSearch
                      options={allTimezones.map((item) => ({ label: item, value: item }))}></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          {console.log("dataEmployees", dataEmployees)}
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={12}>
              <Form.Item name="employees" label="Employees">
                <Select
                  placeholder="Select employees"
                  mode="multiple"
                  loading={isLoading}
                  optionRender={(option) => (
                    <List.Item.Meta
                      key={option.data.id}
                      style={{ display: "flex", gap: 8 }}
                      avatar={
                        <Avatar
                          size={32}
                          src={option.data.profileImage}
                          {...stringAvatar(option?.data?.fullName)}
                        />
                      }
                      title={option.data.fullName}
                      description={option.data.email}
                    />
                  )}
                  onSearch={(text) => setEmployeesSearch(text)}
                  options={(dataEmployees || []).map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.email,
                  }))}></Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name="participants" label="Participants">
                <Select
                  mode="tags"
                  onSearch={(text) => setCustomerSearch(text)}
                  options={(customersList || []).map((customer) => ({
                    label: customer.email,
                    value: customer.id,
                  }))}
                  placeholder="Select or Add"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            // required
            name="deskId"
            // rules={[{ required: true, message: "Please Select Meeting Type" }]}
            label="Meeting desk">
            <Select
              placeholder="Please select a desk"
              options={(listDeskEmployees || []).map((desk) => ({
                label: desk.name,
                value: desk.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            required
            name="callType"
            rules={[{ required: true, message: "Please Select Meeting Type" }]}
            label="Meeting type">
            <Select options={meetingTypes}></Select>
          </Form.Item>
          {callType?.includes("CUSTOM_LINK") && (
            <Form.Item
              name="meetingLink"
              required
              rules={[
                {
                  required: true,
                  message: "Please Write Link ",
                },
              ]}>
              <Input placeholder="Paste Link Here"></Input>
            </Form.Item>
          )}

          {/* {callType === "VINDO_MEETING_DESK" && (
            <Form.Item
              required
              name="meetingDesk"
              rules={[
                {
                  required: !deskSelected,
                  message: "Please Select Desk",
                },
              ]}
              style={{ marginBottom: "0px" }}>
              <Row
                justify="start"
                gutter={[32, 42]}
                style={{ marginTop: "15px" }}
                className="rows-verses">
                {(listDeskEmployees || []).map((verse) => (
                  <Col
                    style={{ opacity: "1", width: "268px" }}
                    key={verse.id}
                    onClick={() => setDeskSelected(verse.id)}>
                    <Row gutter={[10, 10]}>
                      <Col xs={24}>
                        <div
                          className={`explore-card ${deskSelected === verse.id && "border-blue"}`}
                          style={{ position: "relative" }}>
                          <div className="image-holder">
                            <Image
                              preview={false}
                              src={verse.image || defaultDim}
                              alt="dimension"
                              width="100%"
                              height="100%"
                              className="explore-card-img"
                            />
                          </div>
                          <div className="image-text-holder">
                            <Typography.Text className="explore-card-subtitle" ellipsis>
                              {verse.name}
                            </Typography.Text>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          )} */}
          {callType?.includes("VINDO_METAVERSE_CALL") && (
            <>
              <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col>
                  <Typography.Text className="fw-500">Select Meeting Verse</Typography.Text>
                </Col>
                <Col>
                  <Row align="middle" gutter={[16, 16]}>
                    <Col>
                      <Input
                        placeholder="Search.."
                        className="general-table-search"
                        addonAfter={
                          <div
                            className="clickable center-items"
                            style={{
                              width: "44px",
                              height: "42px",
                              borderRadius: "0 8px 8px 0",
                            }}>
                            <SearchSVG />
                          </div>
                        }
                        suffix={<SearchSVG />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Form.Item
                name="meetingVerse"
                rules={[
                  {
                    required: !verseSelected,
                    message: "Please Select Verse",
                  },
                ]}
                style={{ marginBottom: "0px" }}>
                <Row
                  justify="start"
                  gutter={[32, 42]}
                  style={{ marginTop: "15px" }}
                  className="rows-verses">
                  {(verses || []).map((verse) => (
                    <Col
                      style={{ opacity: "1", width: "268px" }}
                      key={verse.id}
                      onClick={() => setVerseSelected(verse.id)}>
                      <Row gutter={[10, 10]}>
                        <Col xs={24}>
                          <div
                            className={`explore-card ${verseSelected === verse.id && "border-blue"
                              }`}
                            style={{ position: "relative" }}>
                            <div className="image-holder">
                              <Image
                                preview={false}
                                src={verse.image || defaultDim}
                                alt="dimension"
                                width="100%"
                                height="100%"
                                className="explore-card-img"
                              />
                            </div>
                            <div className="image-text-holder">
                              <Typography.Text className="explore-card-subtitle" ellipsis>
                                {verse.name}
                              </Typography.Text>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "12px",
                }}>
                <Pagination onChange={(e) => setPage(e)} defaultCurrent={1} total={versesCount} />
              </div>
              {verseSelected && dimensionPlacese && dimensionPlacese?.length > 0 && (
                <>
                  <Form.Item label={"Drop Point"} name="dimensionDropPoint">
                    <Radio.Group>
                      {dimensionPlacese?.map((place) => (
                        <Radio value={place.name}>{place.name}</Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </>
              )}
            </>
          )}
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={12}>
              <Form.Item name="status" label="Status">
                <Select
                  placeholder="Select status"
                  loading={meetingStatus?.isPending}
                  options={(meetingStatus?.data?.data?.data || []).map((item) => {
                    const iconItem = meetingStatusIcons.find((icon) => icon.id === item.id);

                    return {
                      value: item.id,
                      label: (
                        <span style={{ color: item.color }}>
                          <span style={{ paddingRight: 5 }}>
                            {iconItem && React.cloneElement(iconItem.icon, { color: item.color })}
                          </span>
                          {item.name}
                        </span>
                      ),
                    };
                  })}></Select>
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Label" name="label">
                <Select
                  onChange={(value) =>
                    setFadeColor(listLabel.filter((item) => item.id == value)[0]?.color)
                  }
                  placeholder="Select label"
                  loading={isPending}
                  options={
                    (listLabel || [])?.map((item) => ({
                      value: item.id,
                      label: (
                        <span style={{ color: item.color }}>
                          <span style={{ paddingRight: 5 }}>
                            <TicketSVG color={item.color} />
                          </span>
                          {item.name}
                        </span>
                      ),
                    })) ?? []
                  }></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={12}>
              <div>Color</div>
              <ColorPicker onChange={setFadeColor} value={fadeColor} />
            </Col>
          </Row>
          <Flex justify="space-between">
            <Form.Item valuePropName="checked" name={"isReminderInMinutes"}>
              <Checkbox>Remind me before</Checkbox>
            </Form.Item>
            {isReminderInMinutes && (
              <Form.Item
                name="reminderInMinutes"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input type="number" suffix="min"></Input>
              </Form.Item>
            )}
          </Flex>
        </Form>
      </Col>
      <Col
        style={{
          position: "sticky",
          bottom: "0",
          filter: "drop-shadow(#fafafbad 0rem 1rem 3px)",
          background: "#fafafb",
        }}>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button
              type="ghost"
              onClick={() => {
                DrawerAPI.close();
              }}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              loading={addLoading}
              onClick={() => form.submit()}
              type="primary"
              style={{ background: "#272942" }}>
              {id ? "Edit" : "Create"}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export const meetingTypes = [
  {
    label: "Meeting Call",
    value: "VINDO_MEETING_CALL",
  },
  {
    label: "Metaverse Meeting",
    value: "VINDO_METAVERSE_CALL",
  },
  // {
  //   label: "Meeting desk",
  //   value: "VINDO_MEETING_DESK",
  // },
  {
    label: "Custom Link (ex: zoom, teams, etc…)",
    value: "CUSTOM_LINK",
  },
];
