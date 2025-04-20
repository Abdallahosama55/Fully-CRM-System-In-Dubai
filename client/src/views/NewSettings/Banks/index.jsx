import { Button, message, Space, Tooltip } from 'antd';
import { Delete2SVG, DeleteSVG, EditSVG, PluseSVG } from 'assets/jsx-svg';
import CustomTable from 'components/CustomTable';
import React, { useState } from 'react'
import useGetBanks from 'services/newSettings/bank/Queries/useGetBanks'
import AddBank from './AddBank';
import { queryClient } from 'services/queryClient';
import useDeleteBankById from 'services/newSettings/bank/Mutations/useDeleteBankById';
import { useDrawer } from 'hooks/useDrawer';

const Banks = () => {
    const banksInfo = useGetBanks();
    const DrawerAPI = useDrawer();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const deleteBank = useDeleteBankById({
        onSuccess: (_, id) => {
            queryClient.setQueryData(banksInfo.key, (oldData) => {
                return oldData.filter(el => el.id !== id)
            });
            message.success("Bank deleted successfully");
        },
        onError: (error) => {
            message.error("Something went wrong");
            console.log(error)
        }
    });

    const onEndEdit = (payload) => {
        queryClient.setQueryData(banksInfo.key, (oldData) => {
            return oldData.map(el => {
                if (el.id === payload.id) {
                    return payload
                }
                return el;
            })
        })
    }

    const onEndAdd = (payload) => {
        queryClient.setQueryData(banksInfo.key, (oldData) => {
            return [payload, ...oldData]
        })
    }

    return (
        <section className="body-content products" style={{ padding: "1rem" }}>
            {DrawerAPI.Render}
            <div className="space-between" style={{ marginBottom: "0.8rem" }}>
                <h2 className='xl_text_semibold'>Banks</h2>
                <Button
                    type="primary"
                    size='small'
                    icon={<PluseSVG color={"#fff"} />}
                    onClick={() => {
                        DrawerAPI.setDrawerContent(<AddBank onEnd={onEndAdd} DrawerAPI={DrawerAPI}/>);
                        DrawerAPI.open("30%");
                    }}>New</Button>
            </div>
            <CustomTable
                total={banksInfo?.data?.length}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                dataSource={banksInfo?.data}
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Bank Name', dataIndex: 'name', key: 'name' },
                    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
                    { title: 'Swift', dataIndex: 'swift', key: 'swift' },
                    { title: 'Account Number', dataIndex: 'accountNumber', key: 'accountNumber' },
                    { title: 'IBAN', dataIndex: 'iban', key: 'iban' },
                    {
                        title: 'action', dataIndex: 'id', key: 'action', render: (id) => <Space>
                            <Tooltip title="Edit">
                                <Button
                                    className='table_action_button'
                                    type="primary"
                                    icon={<EditSVG color={"#fff"} />} onClick={() => {
                                        DrawerAPI.setDrawerContent(<AddBank id={id} onEnd={onEndEdit} DrawerAPI={DrawerAPI} />);
                                        DrawerAPI.open("30%");
                                    }} />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <Button
                                    size={"small"}
                                    type="primary"
                                    className='table_action_button'
                                    danger
                                    icon={<DeleteSVG color={"#fff"} />}
                                    onClick={() => deleteBank.mutate(id)}
                                    disabled={deleteBank.isPending}
                                />
                            </Tooltip>
                        </Space>
                    }
                ]}
            />
        </section>
    )
}

export default Banks