import { Avatar, Button, Divider, Input, message, Space, Tabs, Tooltip, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
// style
import "./styles.css"
import EVENT_PEOPLE_TYPES from 'constants/EVENT_PEOPLE_TYPES'
import { DeleteSVG, EditSVG, PlusSVG, SearchSVG } from 'assets/jsx-svg'
import CustomTable from 'components/CustomTable'
import default_avatar from "assets/images/avatar.png"
import AddPeople from './AddPeople'
import { useParams } from 'react-router-dom'
import useGetEventParticipants from 'services/event-participant/Queries/useGetEventParticipants'
import useDeleteEventParticipant from 'services/event-participant/Mutations/useDeleteEventParticipant'
import { queryClient } from 'services/queryClient'
import { useDebounce } from 'hooks/useDebounce'
import { useDrawer } from 'hooks/useDrawer'
const PeopleTab = () => {
  const [peopleEventType, setPeopleEventType] = useState(EVENT_PEOPLE_TYPES.SPONSORS);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const generalSearch = useDebounce(searchText, 300);

  const DrawerAPI = useDrawer()
  const { id } = useParams();
  // partners
  const eventParticipants = useGetEventParticipants({ eventId: id, page, limit: 10, type: peopleEventType, generalSearch }, { enabled: !!id });
  const deleteParticipant = useDeleteEventParticipant(id, {
    onSuccess: (_, payload) => {
      queryClient.setQueryData(eventParticipants.key, (oldData) => {
        return {
          count: oldData?.count - 1,
          rows: oldData?.rows?.filter((Partner) => Partner.id !== payload)
        }
      })
      message.success("Attendee deleted successfully")
    },
    onError: (error) => {
      message.error(error.message || "something went wrong")
    }
  })

  const TABLE_COLUMNS = useMemo(() => {
    return [
      {
        title: "image",
        dataIndex: "image",
        key: "image",
        width: "96px",
        render: (image, rowData) => <div className='center-items'>
          <Avatar
            width={40}
            height={40}
            src={image || default_avatar}
            alt={rowData?.name}
          />
        </div>
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (name) => <Typography.Paragraph ellipsis={{ rows: 2, tooltip: name }} className='xs_text_regular' style={{ color: "var(--gray-600)", margin: 0 }}>{name}</Typography.Paragraph>
      },
      {
        title: "Job",
        dataIndex: "jobTitle",
        key: "jobTitle",
        render: (jobTitle) => <Typography.Paragraph ellipsis={{ rows: 2, tooltip: jobTitle }} className='xs_text_regular' style={{ color: "var(--gray-600)", margin: 0 }}>{jobTitle}</Typography.Paragraph>
      },
      {
        title: "Skills",
        dataIndex: "skills",
        key: "skills",
        render: (skills) => <Typography.Paragraph ellipsis={{ rows: 2, tooltip: skills }} className='xs_text_regular' style={{ color: "var(--gray-600)", margin: 0 }}>{skills}</Typography.Paragraph>
      }
      , {
        title: "Interests",
        dataIndex: "interests",
        key: "interests",
        render: (interests) => <Typography.Paragraph ellipsis={{ rows: 2, tooltip: interests }} className='xs_text_regular' style={{ color: "var(--gray-600)", margin: 0 }}>{interests}</Typography.Paragraph>
      }
      , {
        title: "City",
        dataIndex: "city",
        key: "city",
        render: (city) => <Typography.Paragraph ellipsis={{ rows: 2, tooltip: city }} className='xs_text_regular' style={{ color: "var(--gray-600)", margin: 0 }}>{city}</Typography.Paragraph>
      }
      , {
        title: "Actions",
        dataIndex: "id",
        key: "id",
        width: "100px",
        render: (people_id) => <Space className='center-items'>
          <Tooltip title={"Edit"}>
            <Button
              type='primary'
              className='table_action_button'
              icon={<EditSVG color={"#fff"} />}
              onClick={() => {
                DrawerAPI.open("50%")
                DrawerAPI.setDrawerContent(<AddPeople id={people_id} eventId={id} handelEdit={() => eventParticipants.refetch()} DrawerAPI={DrawerAPI}/>)
              }}
            />
          </Tooltip>
          <Tooltip title={"Delete"}>
            <Button
              type='primary'
              danger
              className='table_action_button'
              onClick={() => deleteParticipant.mutate(people_id)}
              icon={<DeleteSVG color={"#fff"} />}
            />
          </Tooltip>
        </Space>
      }
    ]
  }, [])

  return (
    <div className='event_people_tab'>
      {DrawerAPI.Render}
      <div className='space-between' style={{ marginBottom: "20px" }}>
        <p className='xl_text_medium' style={{ color: "var(--gray-700)" }}>People</p>
        <Space split={<Divider type='vertical' />} size={8}>
          <Input
            prefix={<SearchSVG />}
            style={{ width: "325px" }}
            value={searchText}
            onChange={e => setSearchText(e?.target?.value)}
            placeholder='Search' />
          <Space size={8}>
            <Button>Import</Button>
            <Button icon={<PlusSVG />} type={"primary"} onClick={() => {
              DrawerAPI.open("50%")
              DrawerAPI.setDrawerContent(<AddPeople eventId={id} handelAdd={() => eventParticipants.refetch()} DrawerAPI={DrawerAPI} />)
            }}>Add New</Button>
          </Space>
        </Space>
      </div>
      <Tabs
        activeKey={peopleEventType}  // Controlled active tab key
        onChange={setPeopleEventType}
        items={[
          {
            key: EVENT_PEOPLE_TYPES.SPONSOR,
            label: 'Sponsors',
            children: <></>,
          },
          {
            key: EVENT_PEOPLE_TYPES.SPEAKER,
            label: 'Speakers',
            children: <></>,
          },
          {
            key: EVENT_PEOPLE_TYPES.USER,
            label: 'Users',
            children: <></>,
          },
          {
            key: EVENT_PEOPLE_TYPES.VIP,
            label: 'VIP',
            children: <></>,
          },
          {
            key: EVENT_PEOPLE_TYPES.EXPOSITOR,
            label: 'Expositor',
            children: <></>,
          },
          {
            key: EVENT_PEOPLE_TYPES.ATEENDEE,
            label: 'Attendee',
            children: <></>,
          },
          {
            key: EVENT_PEOPLE_TYPES.BLOCKED,
            label: 'Blocked',
            children: <></>,
          },
        ]}
      />
      <CustomTable
        loading={eventParticipants.isLoading}
        page={page}
        setPage={setPage}
        pageSize={10}
        total={eventParticipants?.data?.count}
        columns={TABLE_COLUMNS.map((column) => ({
          ...column,
          onCell: () => ({
            style: { verticalAlign: "middle" },
          }),
        }))}
        dataSource={eventParticipants?.data?.rows && eventParticipants?.data?.rows?.length > 0 ? eventParticipants?.data?.rows?.filter((el) => el?.name?.toLowerCase().includes(generalSearch?.toLowerCase())) : []}
      />
    </div>
  )
}

export default PeopleTab