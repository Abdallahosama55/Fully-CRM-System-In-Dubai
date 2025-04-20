import {
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import ColoredCircle from "components/common/ColoredCircle";
import Description from "components/common/Description";
import TextEditor from "components/common/TextEditor";
import {
  ENGAGEMENTS_ACTIONS_TYPES,
  ENGAGEMENTS_PROVIDER,
  PACKAGE_ENGAGEMENTS_MESSAGE_TYPES,
  TEMPLATE_TYPES,
} from "constants/PACKAGE_ENGAGEMENTS_TYPES";
import React, { useEffect, useState } from "react";
import useAddPackageMessage from "services/travel/packages/engagement/mutations/useAddPackageMessage";
import useListEngagementTags from "services/travel/packages/engagement/queries/useListEngagementTags";
import useListEngagementTemplates from "services/travel/packages/engagement/queries/useListEngagementTemplates";
import { ArrowDownSVG, ArrowRightSVG } from "assets/jsx-svg";
// style
import "./styles.css";
import useGetItineraryItemById from "services/travel/packages/itinerary/Queries/useGetItineraryItemById";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import {
  ExperiencesSVG,
  FlightSVG,
  HotelSVG,
  TransferSVG,
} from "assets/jsx-svg/PackagesItemsTypesIcons";
const TypeItemRender = ({ value, label }) => (
  <Flex gap={8} align="center">
    <ColoredCircle
      color={(() => {
        switch (value) {
          case TEMPLATE_TYPES?.WELCOMING:
            return "#89AAE9";
          case TEMPLATE_TYPES?.ENGAGEMENT:
            return "#90D1DE";
          case TEMPLATE_TYPES?.FEEDBACK:
            return "#FFD137";
          case TEMPLATE_TYPES?.UPSELL:
            return "#B5C621";
          case TEMPLATE_TYPES?.REMINDER:
            return "#C1AFEE";
          case TEMPLATE_TYPES?.OTHER:
            return "#D1D3D6";
          default:
            break;
        }
      })()}
    />
    <span>{label}</span>
  </Flex>
);

const ItineraryItemRender = ({ value, label, ...props }) => {
  return (
    <Flex gap={8} align="center">
      {props?.data?.type === "ACCOMODATION" && <HotelSVG />}
      {props?.data?.type === BOOKINGS_TYPES.EXPERIENCE && <ExperiencesSVG />}
      {props?.data?.type === BOOKINGS_TYPES.TRANSFER && <TransferSVG />}
      {props?.data?.type === BOOKINGS_TYPES.FLIGHT && <FlightSVG />}
      <span>{label}</span>
    </Flex>
  );
};
const AddNewMessageModal = ({
  isOpen,
  close,
  messageDayType = PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.DAY,
  itineraryId,
  tripId,
  onAdd,
}) => {
  const [form] = useForm();
  const type = useWatch("type", form);
  const action = useWatch("action", form);

  const [activeCollapseKey, setActiveCollapseKey] = useState(undefined);
  const [openConfirmTemplate, setOpenConfirmTemplate] = useState(undefined);
  const engagementTemplates = useListEngagementTemplates({ type }, { enabled: !!type });
  const engagementTags = useListEngagementTags();
  const itineraryItems = useGetItineraryItemById(itineraryId, { enabled: !!itineraryId });

  useEffect(() => {
    if (Array.isArray(engagementTemplates?.data) && engagementTemplates?.data?.length > 0) {
      setActiveCollapseKey("1");
    }
  }, [engagementTemplates?.data]);
  const addNewMessage = useAddPackageMessage({
    onSuccess: () => {
      message.success("new message created successfully");
      onAdd();
      close();
    },
    onError: (error) => {
      message.error(error?.message);
    },
  });

  const handelFinish = (values) => {
    if (addNewMessage?.isPending) return;
    if (values?.content === "<p><br></p>" || values?.content === "<p></p>") {
      message.error("Content is required");
      return;
    }

    const temp = {
      ...values,
      tripId,
      schedule:
        messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.DAY
          ? undefined
          : action === ENGAGEMENTS_ACTIONS_TYPES?.PRE_TRIP_ARRIVAL
          ? "BEFORE"
          : "AFTER",
      itineraryId,
      scheduledTime:
        messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.DAY
          ? values?.scheduledTime?.format("HH:mm")
          : undefined,
    };
    console.log(temp);

    addNewMessage.mutate(temp);
  };

  return (
    <Modal
      okText={"Save"}
      open={isOpen}
      onCancel={close}
      onOk={form.submit}
      width={"70%"}
      height={"calc(100dvh - 30px)"}
      title={<p className="lg_text_medium mb-1">Add new message</p>}
      centered>
      <Form form={form} layout="vertical" onFinish={handelFinish}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              label="Message type"
              name="type"
              rules={[{ required: true, message: "Select message type" }]}>
              <Select
                placeholder={"Select message type"}
                labelRender={(el) => <TypeItemRender {...el} />}
                optionRender={(el) => <TypeItemRender {...el} />}
                options={[
                  { label: "Welcoming", value: TEMPLATE_TYPES?.WELCOMING },
                  { label: "Engagement", value: TEMPLATE_TYPES?.ENGAGEMENT },
                  { label: "Feedback", value: TEMPLATE_TYPES?.FEEDBACK },
                  { label: "Upsell", value: TEMPLATE_TYPES?.UPSELL },
                  { label: "Reminder", value: TEMPLATE_TYPES?.REMINDER },
                  { label: "Other", value: TEMPLATE_TYPES?.OTHER },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Message provider"
              name="provider"
              rules={[{ required: true, message: "Select provider" }]}>
              <Checkbox.Group>
                <Checkbox value={ENGAGEMENTS_PROVIDER.EMAIL}>Email</Checkbox>
                <Checkbox value={ENGAGEMENTS_PROVIDER.WHATSAPP}>Whatsapp</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Action type"
              name="action"
              initialValue={
                messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.PRE_TRIP
                  ? ENGAGEMENTS_ACTIONS_TYPES.PRE_TRIP_ARRIVAL
                  : messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.DAY
                  ? ENGAGEMENTS_ACTIONS_TYPES.DAY_MESSAGE
                  : ENGAGEMENTS_ACTIONS_TYPES.POST_TRIP_DEPARTURE
              }
              rules={[{ required: true, message: "Select action trigger date" }]}>
              <Radio.Group>
                {messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.PRE_TRIP && (
                  <>
                    <Radio value={ENGAGEMENTS_ACTIONS_TYPES.PRE_TRIP_ARRIVAL}>Arrival</Radio>
                    <Radio value={ENGAGEMENTS_ACTIONS_TYPES.PRE_TRIP_BOOKING_DATE}>
                      Booking date
                    </Radio>
                  </>
                )}
                {messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.DAY && (
                  <>
                    <Radio value={ENGAGEMENTS_ACTIONS_TYPES.DAY_MESSAGE}>Day message</Radio>
                    <Radio value={ENGAGEMENTS_ACTIONS_TYPES.ITEM_MESSAGE}>Item message</Radio>
                  </>
                )}
                {messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.POST_TRIP && (
                  <>
                    <Radio value={ENGAGEMENTS_ACTIONS_TYPES.POST_TRIP_DEPARTURE}>Departure</Radio>
                  </>
                )}
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            {messageDayType === PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.DAY ? (
              <Form.Item
                label="Message time"
                name="scheduledTime"
                rules={[{ required: true, message: "Select message time" }]}>
                <DatePicker.TimePicker format={"hh:mm A"} className="w-100" />
              </Form.Item>
            ) : (
              <Form.Item
                label={
                  action === ENGAGEMENTS_ACTIONS_TYPES?.PRE_TRIP_ARRIVAL
                    ? "Before Minutes"
                    : "After Minutes"
                }
                name="minutes"
                rules={[
                  { required: true, message: "Enter minutes" },
                  {
                    validator: (_, value) => {
                      if (value && value < 0) {
                        return Promise.reject("Can't be less than 0");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}>
                <Input type={"number"} min={0} placeholder="minutes" />
              </Form.Item>
            )}
          </Col>
          {action === ENGAGEMENTS_ACTIONS_TYPES.ITEM_MESSAGE && (
            <Col span={24}>
              <Form.Item
                label="Item"
                name="itineraryItemId"
                rules={[{ required: true, message: "Select item" }]}>
                <Select
                  placeholder={"Select item"}
                  labelRender={(el) => <ItineraryItemRender {...el} />}
                  optionRender={(el) => <ItineraryItemRender {...el} />}
                  options={itineraryItems?.data?.map((el) => ({
                    label: el?.item?.name,
                    value: el?.id,
                    type: el?.item?.type,
                  }))}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <div>
              {Array.isArray(engagementTemplates?.data) &&
                engagementTemplates?.data?.length > 0 && (
                  <div className="engagement_templates_list">
                    <Collapse
                      activeKey={[activeCollapseKey]}
                      accordion
                      onChange={(key) => {
                        setActiveCollapseKey(key[0]);
                      }}
                      ghost
                      expandIconPosition="end"
                      expandIcon={(props) => {
                        console.log(props);
                        return (
                          <span style={{ marginInlineEnd: "0.5rem" }}>
                            {props?.isActive ? (
                              <ArrowDownSVG color={"#000"} />
                            ) : (
                              <ArrowRightSVG color={"#000"} />
                            )}
                          </span>
                        );
                      }}
                      items={[
                        {
                          key: "1",
                          label: <p>You can use one of the predefined templates</p>,
                          children: (
                            <Form.Item name="templateId">
                              <Radio.Group>
                                <Flex vertical style={{ maxHeight: "200px", overflow: "auto" }}>
                                  {engagementTemplates?.data?.map((el) => (
                                    <Popconfirm
                                      key={el?.id}
                                      title={
                                        <p>
                                          Replace editor content
                                          <br /> with template content?
                                        </p>
                                      }
                                      open={openConfirmTemplate === el?.id}
                                      onOpenChange={() => setOpenConfirmTemplate(undefined)}
                                      onConfirm={() => {
                                        form.setFieldsValue({ content: el?.content });
                                        setActiveCollapseKey(undefined);
                                      }}
                                      onCancel={() => setOpenConfirmTemplate(undefined)}
                                      okText="Yes"
                                      cancelText="No">
                                      <Radio
                                        value={el?.id}
                                        onClick={() => setOpenConfirmTemplate(el?.id)}>
                                        <div
                                          style={{
                                            background: "#EFEFEF",
                                            display: "block",
                                            padding: "0 0.5rem",
                                            marginBottom: "0.5rem",
                                            borderRadius: "0.5rem",
                                            border: "1px solid #ccc",
                                          }}>
                                          <Description rows={3} description={el?.content} />
                                        </div>
                                      </Radio>
                                    </Popconfirm>
                                  ))}
                                </Flex>
                              </Radio.Group>
                            </Form.Item>
                          ),
                        },
                      ]}
                    />
                  </div>
                )}
              <Form.Item
                label="Content"
                name="content"
                validateTrigger="submit"
                rules={[{ required: true, message: "Enter message content" }]}>
                <TextEditor
                  minHeight={"200px"}
                  tags={engagementTags?.data?.map((el) => `[${el}]`)}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddNewMessageModal;

/*
{
    "type": "WELCOMING",
    "provider": [
        "EMAIL",
        "WHATSAPP"
    ],
    "action": "DAY_MESSAGE",
    "scheduledTime": "2024-11-30T08:38:11.300Z",
    "content": "<p><strong>Hi</strong>  <span style=\"color: #e00000\">[ClientName] </span>how are you</p>",
    "templateId": 5,
    "tripId": "37",
    "itineraryId": 87
}

{
    "type": "WELCOMING",
    "content": "<h1> Welcome to Our Platform </h1>",
    "action": "PRE_TRIP_ARRIVAL",
    "provider": [
        "EMAIL"
    ],
    "schedule": "BEFORE",
    "minutes": 15,
    "tripId": "37",
    "itineraryId": "86",
    "itineraryItemId": "92",
    "scheduledTime": "10:30" // if action DAY_MESSAGE - ITEM_MESSAGE
}
*/
