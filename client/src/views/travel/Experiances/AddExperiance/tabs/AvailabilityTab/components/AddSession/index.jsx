import { useEffect } from "react";
import {
  Calendar,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Result,
  Row,
  Select,
  Space,
  Switch,
  message,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useWatch } from "antd/es/form/Form";

import useGetProductDuration from "services/travel/experiance/AvailabilityTab/Querys/useGetProductDuration";
import useAddSession from "services/travel/experiance/AvailabilityTab/Mutations/useAddSession";
import CustomButton from "components/common/Button";
import { REPEAT_TYPES } from "constants/EXPERIENCE";

// style
import "./styles.css";
const getIncludedDays = (startDate, endDate) => {
  const includedDays = new Set();
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const dayOfWeek = currentDate.getDay();
    includedDays.add(dayOfWeek);

    if (includedDays.size === 7) {
      break;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return Array.from(includedDays).map(
    (day) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]
  );
};

const AddSession = ({ noTime, back, productId, minStartDate, maxEndDate }) => {
  const [form] = Form.useForm();
  const fromDate = useWatch("fromDate", form);
  const toDate = useWatch("toDate", form);
  const startTime = useWatch("startTime", form);
  const repeatType = useWatch("repeatType", form);
  const isAllDay = useWatch("isAllDay", form);
  const [api, contextHolder] = notification.useNotification();

  const date = (current, dates) => {
    return dates?.find((errorDate) =>
      dayjs(errorDate, "YYYY-MM-DD").isSame(dayjs(current), "day"),
    ) ? (
      <div className="error_date">{dayjs(current).date()}</div>
    ) : null;
  };

  const cellRender = (current, info, dates) => {
    if (info.type === "date") return date(current, dates);
    return info.originNode;
  };

  const errorNotification = (dates) => {
    api.open({
      duration: 6,
      message: "",
      placement: "topRight",
      style: {
        maxWidth: "600px",
      },
      description: (
        <Result
          status="error"
          title="You have conflict in this days"
          subTitle="Please check and modify the dates before resubmitting."
          extra={[
            <Calendar
              key="Calendar"
              headerRender={undefined}
              cellRender={(current, info) => cellRender(current, info, dates)}
              disabled
              fullscreen={false}
            />,
          ]}
        />
      ),
    });
  };

  const disabledDate = (current) => {
    if (
      !current ||
      dayjs(current).isBefore(dayjs(minStartDate), "day") ||
      dayjs(current).isAfter(dayjs(maxEndDate), "day")
    ) {
      return true;
    }
    return false;
  };

  const {
    data: experianceDuration,
    isError,
    error,
  } = useGetProductDuration(productId, {
    enabled: !noTime,
  });

  useEffect(() => {
    if (isError) {
      message.error(error?.message);
    }
  }, [isError, error]);

  const { addSession } = useAddSession({
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: (data) => {
      if (data?.status) {
        back();
      } else {
        errorNotification(data?.matchingDates);
      }
    },
  });

  const handelNext = () => {
    form.validateFields().then((values) => {
      addSession({
        productId,
        data: {
          ...values,
          outDays:
            ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]?.filter(
              (el) => !values?.inDays?.includes(el),
            ) || [],
          fromDate: values?.toDate ? dayjs(values?.fromDate).format("YYYY-MM-DD") : "",
          toDate: values?.toDate ? dayjs(values?.toDate).format("YYYY-MM-DD") : "",
          startTime: values?.startTime ? dayjs(values?.startTime, "HH:mm A").format("HH:mm") : "00:00",
          endTime: values?.endTime ? dayjs(values?.endTime, "HH:mm A").format("HH:mm") : "23:59",
        },
      });
    });
  };

  return (
    <>
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={handelNext} id="form_inside_tab">
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <p className="fz-18 fw-600">Date range</p>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item
              name="fromDate"
              label={"Start Date"}
              rules={[{ required: true, message: "You have to select start date" }]}>
              <DatePicker className="w-100" disabledDate={disabledDate} />
            </Form.Item>
          </Col>
          <Col lg={12} md={24}>
            <Form.Item
              name="toDate"
              label={"End Date"}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject("You have to select end date");
                    }

                    if (fromDate && dayjs(value).isBefore(fromDate)) {
                      return Promise.reject("End date can't be befor start date");
                    }

                    return Promise.resolve();
                  },
                },
              ]}>
              <DatePicker className="w-100" disabledDate={disabledDate} />
            </Form.Item>
          </Col>
          {!noTime && (
            <>
              <Col span={24}>
                <p className="fz-18 fw-600">Time range</p>
                <p className="fz-14 check_container">
                  <Form.Item valuePropName="checked" initialValue={false} name="isAllDay">
                    <Switch className="switch_input" size="small" />
                  </Form.Item>
                  is't in all of the day times?
                </p>
              </Col>
              <Col lg={12} md={24}>
                <Form.Item
                  name="startTime"
                  label={"Start Time"}
                  rules={[{ required: !isAllDay, message: "You have to select start time" }]}>
                  <DatePicker.TimePicker
                    onChange={(value) => {
                      if (repeatType !== REPEAT_TYPES.HOURLY) {
                        const newTime = dayjs(value).add(Number(experianceDuration), "minute");
                        form.setFieldValue("endTime", newTime);
                      }
                    }}
                    format={"hh:mm A"}
                    className="w-100"
                    disabled={isAllDay}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} md={24}>
                <Form.Item
                  name="endTime"
                  label={
                    repeatType !== REPEAT_TYPES.HOURLY
                      ? "End Time: Start Time + Experience duration"
                      : "End Time"
                  }
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!isAllDay && !value) {
                          return Promise.reject("You have to select end time");
                        }

                        if (!isAllDay && startTime && dayjs(value).isBefore(startTime)) {
                          return Promise.reject("End time can't be befor start time");
                        }

                        if (
                          !isAllDay &&
                          startTime &&
                          dayjs(value).isBefore(dayjs(startTime).add(experianceDuration, "minute"))
                        ) {
                          return Promise.reject("Duration shorter than the product's own duration");
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}>
                  <DatePicker.TimePicker
                    format={"hh:mm A"}
                    className="w-100"
                    disabled={isAllDay || repeatType !== REPEAT_TYPES.HOURLY}
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
        {!noTime && (
          <Row gutter={[8, 8]} className="center-items">
            <Col lg={12} md={24}>
              <p className="fz-18 fw-600">Repeat</p>
            </Col>
            <Col lg={repeatType === REPEAT_TYPES.NO_REPEAT ? 12 : 6} md={12} xs={24}>
              <Form.Item
                name="repeatType"
                rules={[{ required: true, message: "select the repeat type" }]}>
                <Select
                  style={{ minWidth: "150px" }}
                  placeholder="Repeat type"
                  options={[
                    { label: "Repeat hourly", value: REPEAT_TYPES.HOURLY },
                    { label: "Repeat dayly", value: REPEAT_TYPES.DAILY },
                    { label: "Repeat weekly", value: REPEAT_TYPES.WEEKLY },
                    { label: "No repeat", value: REPEAT_TYPES.NO_REPEAT },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} xs={24}>
              {repeatType !== REPEAT_TYPES.NO_REPEAT && (
                <Form.Item
                  name="repeatInterval"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject("add repeat interval");
                        }

                        if (value < 0) {
                          return Promise.reject("add positive value");
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}>
                  <Input
                    addonBefore={"Every"}
                    addonAfter={
                      repeatType === REPEAT_TYPES.HOURLY
                        ? "hours"
                        : repeatType === REPEAT_TYPES.DAILY
                          ? "days"
                          : "weeks"
                    }
                    style={{
                      minWidth: "170px",
                      maxWidth: "250px",
                    }}
                    type="number"
                    min={0}
                  />
                </Form.Item>
              )}
            </Col>

            {repeatType !== REPEAT_TYPES.NO_REPEAT && (
              <Col lg={24} md={24}>
                <Space wrap={true}>
                  {getIncludedDays(fromDate, toDate).length > 0 && (
                    <Form.Item
                      name="inDays"
                      rules={[{ required: true, message: "You have to select at least one day" }]}>
                      <Checkbox.Group>
                        <Row gutter={[8, 8]}>
                          {getIncludedDays(fromDate, toDate)?.map((day) => <Checkbox key={day} value={day.toLowerCase()}>{day}</Checkbox>)}
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  )}
                </Space>
              </Col>
            )}
          </Row>
        )}
        <Row gutter={[16, 16]} className="mt-1">
          <CustomButton type="default" onClick={back}>
            Cancel
          </CustomButton>
          <CustomButton color="dark" className="action_btn ml-1" htmlType="submit">
            Add
          </CustomButton>
        </Row>
      </Form>
    </>
  );
};

export default AddSession;
