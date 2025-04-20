import { Button, Empty, message, Space, Tooltip, Typography } from 'antd';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useDeleteEventPartner from 'services/event-partners/Mutations/useDeleteEventPartner';
import useGetEventPartners from 'services/event-partners/Queries/useGetEventPartners';
import { queryClient } from 'services/queryClient';
import EditEventSection from 'views/EditEvent/components/EditEventSection';
import NewPartner from './NewPartner';
import CustomTable from 'components/CustomTable';
import default_image from "assets/images/default_image.png"
import { DeleteSVG, EditSVG } from 'assets/jsx-svg';
import { useDrawer } from 'hooks/useDrawer';
const Partners = () => {
    const DrawerAPI = useDrawer();
    const { id } = useParams();
    const [page, setPage] = useState(1);
    // partners
    const eventPartners = useGetEventPartners(id);
    const deletePartner = useDeleteEventPartner({
        onSuccess: (_, payload) => {
            queryClient.setQueryData(eventPartners.key, (oldData) => {
                return {
                    count: oldData?.count - 1,
                    rows: oldData?.rows?.filter((Partner) => Partner.id !== payload)
                }
            })
            message.success("Partner deleted successfully")
        },
        onError: (error) => {
            message.error(error.message || "something went wrong")
        }
    })

    return <EditEventSection
        className='partners'
        title={"Partners"}
        headerEnd={<Button type={"primary"} onClick={() => {
            DrawerAPI.setDrawerContent(<NewPartner DrawerAPI={DrawerAPI} eventId={id} handelAdd={(res) => {
                queryClient.setQueryData(eventPartners.key, (oldData) => {
                    return {
                        count: oldData?.count ? oldData?.count + 1 : 1,
                        rows: oldData?.rows ? [...oldData.rows, res] : [res]
                    }
                })
            }} />)
            DrawerAPI.open("35%");
            DrawerAPI.setRootClassName("gray_bg_drawer")
        }}>Add New</Button>}>
        {DrawerAPI.Render}
        <CustomTable
            locale={{
                emptyText: <Empty
                    description={"No Partners"}
                />
            }}
            dataSource={eventPartners?.data?.rows}
            page={page}
            setPage={setPage}
            total={eventPartners?.data?.rows?.length}
            columns={[
                {
                    title: 'Logo',
                    dataIndex: 'image',
                    onCell: () => ({ style: { verticalAlign: "middle" } }),
                    render: (image, rowData) => <img
                        src={image || default_image}
                        alt={rowData?.name}
                        width={40}
                        height={40}
                        style={{
                            objectFit: "cover",
                            borderRadius: "50%"
                        }}
                    />
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    onCell: () => ({ style: { verticalAlign: "middle" } }),
                    key: 'name',
                },
                {
                    title: 'Link',
                    dataIndex: 'website',
                    onCell: () => ({ style: { verticalAlign: "middle" } }),
                    key: 'website',
                    render: (website) => <Typography.Link ellipsis href={website} target='_blank'>{website}</Typography.Link>
                },
                {
                    title: 'Actions',
                    dataIndex: 'id',
                    key: 'id',
                    onCell: () => ({ style: { verticalAlign: "middle" } }),
                    render: (partnerId) => <Space className="center-items">
                        <Tooltip title="Edit">
                            <Button
                                icon={<EditSVG color="#fff" />}
                                type='primary'
                                className='table_action_button'
                                onClick={() => {
                                    DrawerAPI.setDrawerContent(<NewPartner eventId={id} id={partnerId} handelEdit={() => eventPartners.refetch()} />)
                                    DrawerAPI.open("35%")
                                    DrawerAPI.setRootClassName("gray_bg_drawer")
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button
                                icon={<DeleteSVG color="#fff" />}
                                type='primary'
                                danger
                                className='table_action_button'
                                onClick={() => deletePartner.mutate(partnerId)}
                            />
                        </Tooltip>
                    </Space>
                }
            ]}
        />
    </EditEventSection>
}

export default Partners