import React, { useEffect, useMemo, useState } from 'react'
import AddRooms from './components/AddRooms';
import CustomButton from 'components/common/Button';
// API CALLS
import useGetAccommodationRoomsList from 'services/travel/accommodations/Rooms/Queries/useGetAccommodationRoomsList';
// icons
import { PlusSVG } from 'assets/jsx-svg';
// style
import "./styles.css";
import { Form, message, Table } from 'antd';
import getTableColumns from './getTableColumns';
import useDeleteAccommodationRoom from 'services/travel/accommodations/Rooms/Mutations/useDeleteAccommodationRoom';
import { queryClient } from 'services/queryClient';

const Rooms = ({ id, next }) => {
    const [isAddStep, setIsAddStep] = useState(false);
    const [editId, setEditId] = useState("");
    const roomsListQuery = useGetAccommodationRoomsList(id, { enabled: Boolean(id) });
    const deleteAccommodationRoomMutation = useDeleteAccommodationRoom({
        onSuccess: (_, id) => {
            queryClient.setQueryData(roomsListQuery.key, oldData => {
                return oldData.filter(room => room.id !== id)
            })
        },
        onError: (error) => {
            message.error(error.message)
        }

    });
    useEffect(() => {
        if (roomsListQuery.isSuccess && roomsListQuery.data.length === 0) {
            setIsAddStep(true);
        }
    }, [roomsListQuery])


    const TABLE_COLUMNS = useMemo(() => {
        return getTableColumns({
            onDelete: (id) => deleteAccommodationRoomMutation.mutate(id),
            onEditStart: (id) => {
                setEditId(id);
                setIsAddStep(true);
            }
        })
    }, [])

    if (isAddStep) {
        return <AddRooms
            accommodationID={id}
            editId={editId}
            onCancel={() => {
                setEditId(null);
                setIsAddStep(false);
            }}
            back={() => {
                roomsListQuery.refetch()
                    .then(() => {
                        setEditId(null);
                        setIsAddStep(false);
                    });
            }} />
    }

    return (
        <div className='rooms_tab'>
            <Form id="form_inside_tab" hidden onFinish={() => {
                if (roomsListQuery.data.length === 0) {
                    message.error("You have to add at least one room")
                } else {
                    next();
                }
            }} />
            <div className='space-between w-100 rooms_header'>
                <div>
                    <p className='fz-18 fw-600'>Rooms</p>
                    <p className='fz-14 fw-400'>Add another room to add new layouts, bed options and more.</p>
                </div>
                <div>
                    <CustomButton icon={<PlusSVG />} onClick={() => setIsAddStep(true)}>Add New Room</CustomButton>
                </div>
            </div>
            <Table
                dataSource={roomsListQuery.data}
                columns={TABLE_COLUMNS}
                pagination={false}
                loading={roomsListQuery.isLoading}
            />
        </div>
    )
}

export default Rooms