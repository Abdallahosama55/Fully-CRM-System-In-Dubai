import { Button, Col, Empty, message, Row, Space, Spin, Tag, Tooltip, Typography } from 'antd'
import React from 'react'
import EditEventSection from 'views/EditEvent/components/EditEventSection'
import AddEventHalls from './AddEventHalls'
import default_image from "assets/images/default_image.png"
// style
import './styles.css';
import { DeleteSVG, EditSVG, LiveSVG, PlusSVG } from 'assets/jsx-svg'
import { useParams } from 'react-router-dom'
import useGetEventHalls from 'services/event-halls/Queries/useGetEventHalls'
import useDeleteEventHall from 'services/event-halls/Mutations/useDeleteEventHall'
import { queryClient } from 'services/queryClient'
import useGetEventById from 'services/Events/Querys/useGetEventById'
import { useDrawer } from 'hooks/useDrawer'
/*
{
    "id": 4,
    "name": "test",
    "description": "Description",
    "image": "https://chickchack.s3.amazonaws.com/image/1729168823010Screenshot_from_2024-10-03_11-17-47.png",
    "type": "STANDARD",
    "dropPointAudienceName": null,
    "dropPointSpeakerName": null,
    "createdAt": "2024-10-17T12:40:26.523Z",
    "updatedAt": "2024-10-17T12:40:26.523Z",
    "deletedAt": null,
    "liveDimensionId": 807,
    "customerDimensionId": null
}
*/
const EventHallsTab = () => {
  const DrawerAPI = useDrawer();
  const { id: eventId } = useParams();
  const eventData = useGetEventById(eventId, { enabled: !!eventId, select: (data) => data.data.data });
  // sub sections
  const eventHalls = useGetEventHalls(eventId);
  const deleteHall = useDeleteEventHall({
    onSuccess: (_, payload) => {
      queryClient.setQueryData(eventHalls.key, (oldData) => {
        return {
          count: oldData?.count - 1,
          rows: oldData?.rows?.filter((section) => section.id !== payload)
        }
      })
      message.success("hall deleted successfully")
    },
    onError: (error) => {
      message.error(error.message || "something went wrong")
    }
  })
  return (
    <EditEventSection className="event_halls" title={"Halls"} headerEnd={<Button type='primary' onClick={() => {
      DrawerAPI.open("55%")
      DrawerAPI.setDrawerContent(<AddEventHalls eventId={eventId} handelAdd={eventHalls.refetch} DrawerAPI={DrawerAPI} />)
    }}>Add new</Button>}>
      {DrawerAPI.Render}
      <Row gutter={[12, 12]}>
        {eventHalls?.isLoading && <div className='center-items' style={{ width: "100%", height: "500px" }}>
          <Spin />
        </div>}
        {!eventHalls?.isLoading && eventHalls?.data?.count === 0 && <div className='center-items' style={{ width: "100%", height: "400px" }}>
          <Empty
            description={<div>
              <p className='md_text_medium'>No halls added yet</p>
              <Button type='primary' icon={<PlusSVG />} style={{ margin: "1rem" }} size='small' onClick={() => {
                DrawerAPI.open("55%")
                DrawerAPI.setDrawerContent(<AddEventHalls eventId={eventId} handelAdd={eventHalls.refetch} DrawerAPI={DrawerAPI}/>)
              }}>New Hall</Button>
            </div>}
          />
        </div>}
        {eventHalls?.data?.rows.map(hall => <Col key={hall?.id} span={12}>
          <div className='event_hall_card'>
            <img
              src={hall?.image || default_image}
              alt={hall?.name}
              onError={(e) => { e.currentTarget.src = default_image; }} />
            <div className='sub_section_card_body'>
              <div className='space-between'>
                <Typography.Paragraph ellipsis={{ rows: 2 }} className='xl_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>{hall?.name}</Typography.Paragraph>
                <Space>
                  <Tooltip title="Go live">
                    <Button
                      className='table_action_button'
                      onClick={() => {
                        window.open(eventData?.data?.adminLink, "_blank", "noreferrer");
                      }}
                      icon={<LiveSVG color="#000"/>}
                    />
                  </Tooltip>
                  {!hall?.isMainHall && <>
                    <Tooltip title="Edit">
                      <Button
                        type="primary"
                        icon={<EditSVG color="#fff" />}
                        className='table_action_button' onClick={() => {
                          DrawerAPI.open("55%")
                          DrawerAPI.setDrawerContent(<AddEventHalls id={hall?.id} eventId={eventId} handelEdit={eventHalls.refetch} DrawerAPI={DrawerAPI} />)
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteSVG color="#fff" />}
                        className='table_action_button' onClick={() => deleteHall.mutate(hall?.id)}
                      />
                    </Tooltip>
                  </>}
                </Space>
              </div>
              <Typography.Paragraph ellipsis={{ rows: 3 }} className='sm_text_regular' style={{ color: "var(--gray-500)", marginBottom: "1rem" }}>
                {hall?.description}
              </Typography.Paragraph>
              {hall?.dropPointSpeakerName && <div style={{ marginBottom: "1rem" }}>
                <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Speaker Drop Point</p>
                <p className='md_text_normal' style={{ color: "var(--gray-500)" }}>{hall?.dropPointSpeakerName}</p>
              </div>}
              {hall?.dropPointAudienceName && <div>
                <p className='sm_text_medium' style={{ color: "var(--gray-700)", marginBottom: "6px" }}>Audience Drop Point</p>
                <p className='md_text_normal' style={{ color: "var(--gray-500)" }}>{hall?.dropPointAudienceName}</p>
              </div>}
              {hall?.isMainHall && <Tag>Main Hall</Tag>}
            </div>
          </div>
        </Col>)}
      </Row>
    </EditEventSection>
  )
}

export default EventHallsTab