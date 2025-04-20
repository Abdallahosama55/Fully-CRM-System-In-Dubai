import { Button, Divider, Form, Input, message, Select, Space, Tooltip, Typography } from 'antd'
import { useForm, useWatch } from 'antd/es/form/Form';
import { ArrowDownSVG, DeleteSVG, EditSVG, SearchSVG } from 'assets/jsx-svg';
import CustomTable from 'components/CustomTable';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react'
import EditEventSection from 'views/EditEvent/components/EditEventSection'
import NewSession from './NewSession';
import { useParams } from 'react-router-dom';
import useGetEventSessions from 'services/event-sessions/Queries/useGetEventSessions';
import { queryClient } from 'services/queryClient';
import useDeleteEventSession from 'services/event-sessions/Mutations/useDeleteEventSession';
import { useDebounce } from 'hooks/useDebounce';
import { useDrawer } from 'hooks/useDrawer';
const SessionsTab = () => {
  const [form] = useForm();
  const filters = useWatch("filters", form);
  const filtersDebounce = useDebounce(filters, 300);

  const [page, setPage] = useState(1);
  const DrawerAPI = useDrawer();
  const { id: eventId } = useParams();
  // partners
  const eventSessions = useGetEventSessions({ eventId: eventId, page, limit: 10, ...filtersDebounce }, { enabled: !!eventId });

  const deleteSession = useDeleteEventSession(eventId, {
    onSuccess: (_, payload) => {
      queryClient.setQueryData(eventSessions.key, (oldData) => {
        return {
          count: oldData?.count - 1,
          rows: oldData?.rows?.filter((Partner) => Partner.id !== payload)
        }
      })
      message.success("Session deleted successfully")
    },
    onError: (error) => {
      message.error(error.message || "something went wrong")
    }
  })

  const columns = useMemo(() => {
    return [
      {
        title: "Name",
        dataIndex: "title",
        key: "title",
        render: (text) => <Typography.Paragraph style={{ margin: "0" }} ellipsis={{ rows: 2, tooltip: text }} className='xs_text_medium'>{text}</Typography.Paragraph>
      },
      {
        title: "Date",
        dataIndex: "startDate",
        key: "startDate",
        render: (date) => <p className='xs_text_regular' style={{ textWrap: "nowrap" }}>
          {date ? <>
            {dayjs(date).format("dddd")}
            <br />
            {dayjs(date).format("D MMM, YYYY")}
          </> : <>-</>}
        </p>
      },
      {
        title: "Time",
        dataIndex: "startTime",
        key: "startTime",
        render: (startTime, record) => <p className='xs_text_regular'>
          {startTime ? <>
            {dayjs(startTime, "HH:mm").format("h:mm A")} - {dayjs(record.endTime, "HH:mm").format("h:mm A")}<br /> ({record.timeZone})
          </> : <>-</>}
        </p>
      },
      {
        title: "Hall",
        dataIndex: "hallName",
        key: "hallName",
        render: (hall) => <p className='xs_text_regular' style={{ minWidth: "50px" }}>
          {hall ? hall : "-"}
        </p>
      },
      {
        title: "Type",
        dataIndex: "sessionType",
        key: "sessionType",
        render: (type) => <p className='xs_text_regular'>
          {type ? type : "-"}
        </p>
      },
      {
        title: "Keywords",
        dataIndex: "tags",
        key: "tags",
        render: (tags) => <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 2, tooltip: tags && tags.length > 0 ? tags?.map(tag => `#${tag}`).join(" ") : "-" }} className='xs_text_regular'>
          {tags && tags.length > 0 ? tags?.map(tag => `#${tag}`).join(" ") : "-"}
        </Typography.Paragraph>
      },
      {
        title: "Speakers",
        dataIndex: "speakers",
        key: "speakers",
        render: (speakers) => <Typography.Paragraph style={{ margin: 0, minWidth: "58px" }} ellipsis={{ rows: 2, tooltip: speakers && speakers.length > 0 ? speakers.join(", ") : "-" }} className='xs_text_regular'>
          {speakers && speakers.length > 0 ? speakers.join(", ") : "-"}
        </Typography.Paragraph>
      },
      {
        title: "Actions",
        dataIndex: "id",
        key: "id",
        render: (id) => <Space className='center-items'>
          <Tooltip title="Delete">
            <Button
              type='primary'
              className='table_action_button'
              danger
              icon={<DeleteSVG color="#fff" />}
              onClick={() => deleteSession.mutate(id)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type='primary' className='table_action_button' icon={<EditSVG color="#fff" />} onClick={() => {
              DrawerAPI.open("55%")
              DrawerAPI.setDrawerContent(<NewSession id={id} eventId={eventId} handelEdit={eventSessions?.refetch} DrawerAPI={DrawerAPI} />)
            }} />
          </Tooltip>
        </Space>
      }
    ]
  }, [])
  return (
    <EditEventSection noDivider={true} title={"Sessions"} headerEnd={<Form form={form}>
      {DrawerAPI.Render}
      <Space split={<Divider type='vertical' />}>
        <Space>
          <Form.Item name={["filters", "generalSearch"]} noStyle>
            <Input prefix={<SearchSVG />} placeholder='Search' style={{ width: "350px" }} />
          </Form.Item>
          <Form.Item name={["filters", "type"]} noStyle>
            <Select
              showSearch
              allowClear
              suffixIcon={<ArrowDownSVG />}
              options={[
                { label: "All", value: "All" },
                { label: "Educational", value: "Educational" },
                { label: "Networking", value: "Networking" },
                { label: "Workshop", value: "Workshop" },
                { label: "Seminar", value: "Seminar" },
                { label: "Keynote", value: "Keynote" },
                { label: "Panel Discussion", value: "Panel Discussion" },
                { label: "Webinar", value: "Webinar" },
                { label: "Social Event", value: "Social Event" },
                { label: "Product Launch", value: "Product Launch" },
                { label: "Round Table", value: "Round Table" },
              ]}
              placeholder='Type'
              style={{ width: "170px" }}
            />
          </Form.Item>

        </Space>
        <Button type={"primary"} onClick={() => {
          DrawerAPI.open("55%")
          DrawerAPI.setDrawerContent(<NewSession eventId={eventId} handelAdd={eventSessions?.refetch} DrawerAPI={DrawerAPI}/>)
        }}>New session</Button>
      </Space>
    </Form>}>
      <CustomTable
        tableLayout='auto'
        page={page}
        setPage={setPage}
        total={eventSessions?.data?.count}
        columns={columns.map((column) => ({
          ...column,
          onCell: () => ({
            style: { verticalAlign: "middle" },
          }),
        }))}
        dataSource={eventSessions?.data?.rows}
      />
    </EditEventSection>
  )
}

export default SessionsTab