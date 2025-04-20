import { Button, Col, DatePicker, Divider, Form, Image, Row, Select, Space, Switch, Tag, Timeline, TimePicker, Typography } from 'antd'
import { ArrowDownSVG, WorldMapSVG } from 'assets/jsx-svg'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import EditEventSection from 'views/EditEvent/components/EditEventSection'
import SubSections from './components/SubSections'
// style
import './styles.css'
import Partners from './components/Partners'
import AddEvent from 'components/Studio/GoLive/AddEvent'
import { useParams } from 'react-router-dom'
import useGetEventById from 'services/Events/Querys/useGetEventById'
import { useForm } from 'antd/es/form/Form'
import default_image from "assets/images/default_image.png"
import EVENT_TYPE from 'constants/EVENT_TYPE'
import usePageTitle from 'hooks/usePageTitle'
import { useDrawer } from 'hooks/useDrawer'

const GeneralTab = () => {
  const DrawerAPI = useDrawer()
  const { id } = useParams();
  const eventData = useGetEventById(id, { enabled: !!id, select: (data) => data.data.data });
  const [form] = useForm();
  usePageTitle(`Event / ${eventData.data?.title ? eventData.data?.title : ""}`);
  console.log("run run")
  useEffect(() => {
    if (eventData?.data) {
      form.setFieldsValue({
        startDate: eventData?.data?.startDate ? dayjs(eventData?.data?.startDate) : undefined,
        endDate: eventData?.data?.endDate ? dayjs(eventData?.data?.endDate) : undefined,
        startTime: eventData?.data?.startDate && eventData?.data?.startTime
          ? dayjs(`${eventData?.data?.startDate} ${eventData?.data?.startTime}`)
          : undefined,
        endTime: eventData?.data?.endDate && eventData?.data?.endTime
          ? dayjs(`${eventData?.data?.endDate} ${eventData?.data?.endTime}`)
          : undefined,
        timeZone: eventData?.data?.timeZone
      });

    }
  }, [eventData?.data])

  return (
    <div>
      {DrawerAPI.Render}
      <EditEventSection className='general_info' title={"General info"} headerEnd={<Space size={4} split={<Divider type='vertical' />}>
        <Button style={{ padding: "0px 18px", height: "44px" }} onClick={() => {
          DrawerAPI.open("55%")
          DrawerAPI.setDrawerContent(<AddEvent id={id} onEnd={() => eventData.refetch()} DrawerAPI={DrawerAPI}/>)
        }}>Edit</Button>
        <Button
          onClick={() => {
            window.open(eventData?.data?.adminLink, "_blank", "noreferrer");
          }}
          style={{ padding: "0px 18px", height: "44px" }} type="primary">Go live</Button>
        <p className='center-items' style={{ gap: "8px" }}>Active <Switch /></p>
      </Space>}>
        <Form form={form}>
          <div>
            <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Event Name</p>
            <p className='md_text_normal' style={{ color: "var(--gray-500)" }}>{eventData?.data?.title}</p>
          </div>
          <Row gutter={[8, 8]} style={{ marginTop: "1.2rem", width: "70%" }}>
            <Col lg={17}>
              <Timeline>
                <Timeline.Item color="#2D6ADB">
                  <div style={{ display: "grid", gridTemplateColumns: "35px 1fr 1fr", alignItems: "center", gap: "8px" }}>
                    <span className="sm_text_regular" style={{ color: "var(--font-secondary)" }}>Start</span>
                    <div>
                      <p style={{ marginBottom: "6px" }} className="sm_text_medium">Date</p>
                      <Form.Item
                        name="startDate"
                      >
                        <DatePicker
                          disabled
                          className={"w-100"}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <p style={{ marginBottom: "6px" }} className="sm_text_medium">Time</p>
                      <Form.Item
                        name="startTime"
                      >
                        <TimePicker
                          disabled
                          className={"w-100"}
                          format={"HH:mm"}
                        />
                      </Form.Item>
                    </div>
                  </div></Timeline.Item>
                <Timeline.Item color="#2D6ADB">
                  <div style={{ display: "grid", gridTemplateColumns: "35px 1fr 1fr", alignItems: "center", gap: "8px" }}>
                    <span className="sm_text_regular" style={{ color: "var(--font-secondary)" }}>End</span>
                    <div>
                      <Form.Item name="endDate">
                        <DatePicker
                          disabled
                          className={"w-100"}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item name="endTime">
                        <TimePicker
                          disabled
                          className={"w-100"}
                          format={"HH:mm"}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </Timeline.Item>
              </Timeline>
            </Col>
            <Col lg={7}>
              <div className="select-with-prefix" style={{ marginTop: "20px", height: "calc(100% - 50px)" }}>
                <WorldMapSVG className="select-prefix-icon" fill="#3F65E4" width={16} height={16} />
                <Form.Item
                  noStyle
                  name={"timeZone"}
                  className='w-100'
                >
                  <Select
                    suffixIcon={<ArrowDownSVG />}
                    className="w-100 h-100"
                    disabled
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <div>
            <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Description</p>
            <p className='md_text_normal' style={{ color: "var(--gray-500)" }}>
              {eventData?.data?.description}
            </p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "2px" }}>Event Type</p>
            <p className='md_text_normal' style={{ color: "var(--gray-500)" }}>
              {eventData?.data?.type}
            </p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Tags</p>
            <Space size={2}>
              {eventData?.data?.tags?.map(el => <Tag key={el} style={{ height: "30px" }} className='center-items sm_text_medium'>{el}</Tag>)}
            </Space>
          </div>
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Event Cover Image</p>
            <Image src={eventData?.data?.invitationCard || default_image} alt={"Cover Image"} width={124} height={124} style={{ borderRadius: "12px" }} />
          </div>
          <Divider />
          {eventData?.data?.type === EVENT_TYPE.METAVERSE && eventData?.data?.customerDimension && <div className='event_hall_card'>
            <img src={eventData?.data?.customerDimension?.image || default_image} alt={eventData?.data?.customerDimension?.name} />
            <div className='sub_section_card_body'>
              <p className='xl_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px", marginTop: "1rem" }}>{eventData?.data?.customerDimension?.name}</p>
              <Typography.Paragraph ellipsis={{ rows: 3 }} className='md_text_normal' style={{ color: "var(--gray-500)", marginBottom: "1.2rem" }}>
                {eventData?.data?.customerDimension?.description}
              </Typography.Paragraph>
              {eventData?.data?.speakerDimensionDropPoint && <div style={{ marginBottom: "1.2rem" }}>
                <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Speaker Drop Point</p>
                <p className='md_text_normal' style={{ color: "var(--gray-500)" }}>{eventData?.data?.speakerDimensionDropPoint}</p>
              </div>}
              {eventData?.data?.audienceDimensionDropPoint && <div>
                <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Audience Drop Point</p>
                <p className='md_text_normal' style={{ color: "var(--gray-500)" }}>{eventData?.data?.audienceDimensionDropPoint}</p>
              </div>}
            </div>
          </div>}
        </Form>
      </EditEventSection>
      <SubSections />
      <Partners />
    </div>
  )
}

export default GeneralTab