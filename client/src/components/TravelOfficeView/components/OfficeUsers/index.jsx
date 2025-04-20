import { Button, Divider, Empty, Input, message, Space, Switch, Tooltip, Typography } from 'antd'
import { EditSVG, EmailSVG, PhoneSVG, PluseSVG, SearchSVG } from 'assets/jsx-svg'
import CustomTable from 'components/CustomTable';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import AddNewOfficeUser from './AddNewOfficeUser';
import useGetOfficeUsers from 'services/agencies/Users/Queries/useGetOfficeUsers';
import { queryClient } from 'services/queryClient';
import useFlipOfficeUserActiveStatus from 'services/agencies/Users/Mutations/useFlipOfficeUserActiveStatus';
// style
import "./styles.css";
import Badge from 'components/common/Badge';
const OfficeUsers = ({ officerId }) => {
    const [isAddUser, setIsAddUser] = useState(false);
    const [page, setPage] = useState(1);
    const [userId, setUserId] = useState(null);
    // QUERYES
    const officeUsers = useGetOfficeUsers({ officerId: officerId, page, size: 10 }, { enabled: !!officerId });
    // MUTATIONS
    const flipOfficeUserActiveMutation = useFlipOfficeUserActiveStatus({
        onSuccess: () => {
            message.success("User status updated successfully");
        },
        onError: (error, id) => {
            console.log(error, id);
            queryClient.setQueryData(officeUsers.key, (oldData) => {
                return {
                    ...oldData,
                    data: oldData?.data?.map((item) => item.id === id ? { ...item, isActive: !item.isActive } : item)
                }
            });
            message.error("Failed to update user status");
        }
    });

    if (isAddUser) {
        return <AddNewOfficeUser
            officerId={officerId}
            userId={userId}
            onEndAdd={(res) => {
                console.log('res', res)
                queryClient.setQueryData(officeUsers.key, (oldData = { data: [] }) => {
                    console.log('oldData', oldData)
                    return { ...oldData, data: [res, ...oldData?.data] }
                })
            }}
            onEndEdit={(res) => {
                queryClient.setQueryData(officeUsers.key, (oldData = { data: [] }) => {
                    return { ...oldData, data: oldData?.data?.map((item) => item.id === res.id ? res : item) }
                })
            }}
            back={() => {
                setIsAddUser(false);
                setUserId(null);
            }} />
    }

    return (
        <div>
            <div className="space-between">
                <p className="lg_text_medium">Users</p>
                <Space split={<Divider type='horizontal' />}>
                    <div>
                        <Input prefix={<SearchSVG color="#3F65E4" />} placeholder='Search' />
                    </div>
                    <div>
                        <Button type="primary" icon={<PluseSVG color="#fff" />} onClick={() => setIsAddUser(true)}>New</Button>
                    </div>
                </Space>
            </div>
            <CustomTable
                loading={officeUsers.isLoading}
                locale={{
                    emptyText: <Empty
                        description={<div className='mt-1 mb-1'>
                            <p className='lg_text_medium'>No users found</p>
                            <p className='xs_text_regular'>To add new user <span style={{ color: "#2D6ADB", cursor: "pointer" }} onClick={() => setIsAddUser(true)}>click here</span></p>
                        </div>}
                    />
                }}
                page={page}
                pageSize={10}
                setPage={setPage}
                total={officeUsers?.data?.count || 0}
                style={{ marginTop: "0.5rem" }}
                dataSource={officeUsers?.data?.data}
                tableLayout='auto'
                columns={[
                    {
                        dataIndex: "fullName",
                        key: "Full name",
                        ellipsis: true,
                        title: <p className='xs_text_medium'>Full name</p>,
                        render: (fullName) => <p className="fw-500" style={{ color: "#000" }}>{fullName}</p>
                    },
                    {
                        dataIndex: "employeeRoles",
                        ellipsis: true,
                        key: "Access level",
                        title: <p className='xs_text_medium'>Access level</p>,
                        render: (employeeRoles) => employeeRoles && employeeRoles[0] && employeeRoles[0]?.role ? <Badge status={employeeRoles[0]?.role?.id === 0 ? "orange" : "grey"}>{employeeRoles[0]?.role?.name}</Badge> : ""
                    },
                    {
                        title: <p className='xs_text_medium'>Contact</p>,
                        dataIndex: 'email',
                        render: (email, rowData) => <div>
                            {email && <div className="info_line_with_icon">
                                <EmailSVG fill={"#1D2939"} />
                                <Tooltip title={email}>
                                    <Typography.Text ellipsis className='xs_text_regular'>{email}</Typography.Text>
                                </Tooltip>
                            </div>}
                            {rowData?.mobile && <div className="info_line_with_icon">
                                <PhoneSVG fill={"#1D2939"} />
                                <Tooltip title={rowData?.mobile}>
                                    <Typography.Text ellipsis className='xs_text_regular'>{rowData?.mobile}</Typography.Text>
                                </Tooltip>
                            </div>}
                        </div>,
                    },
                    {
                        title: <p className='xs_text_medium'>Last login</p>,
                        dataIndex: 'lastLogin',
                        render: (lastLogin) => <Typography.Paragraph ellipsis={{ tooltip: lastLogin ? dayjs(lastLogin).format("YYYY/MM/DD hh:mm") : "Never logged in" }} className='xs_text_regular'>{lastLogin ? dayjs(lastLogin).format("YYYY/MM/DD hh:mm") : "Never logged in"}</Typography.Paragraph>,
                    },
                    {
                        title: <p className='xs_text_medium'>Actions</p>,
                        dataIndex: 'id',
                        render: (id, rowData) => <Space>
                            <Tooltip title={!rowData.isActive ? "Activate" : "Deactivate"}>
                                <Switch
                                    disabled={flipOfficeUserActiveMutation.isPending}
                                    checked={rowData.isActive}
                                    onChange={() => {
                                        queryClient.setQueryData(officeUsers.key, (oldData) => {
                                            return {
                                                ...oldData,
                                                data: oldData?.data?.map((item) => item.id === id ? { ...item, isActive: !item.isActive } : item)
                                            }
                                        });
                                        flipOfficeUserActiveMutation.mutate(id);
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title={"Edit"}>
                                <Button
                                    type='primary'
                                    className='table_action_button'
                                    onClick={() => {
                                        setUserId(id);
                                        setIsAddUser(true);
                                    }}
                                    icon={<EditSVG color={"#fff"} />}
                                />
                            </Tooltip>
                        </Space>
                    }
                ]}
            />
        </div>
    )
}

export default OfficeUsers