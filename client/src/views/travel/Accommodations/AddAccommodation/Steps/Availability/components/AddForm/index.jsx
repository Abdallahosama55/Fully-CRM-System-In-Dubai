import React, { useEffect, useState } from 'react'
import { Col, ConfigProvider, DatePicker, Divider, Form, Input, Row, Slider, Typography, message } from 'antd'
import dayjs from 'dayjs';
import AvailabilityAPI from 'services/travel/availability.service';
import { useForm, useWatch } from 'antd/es/form/Form';
import CustomButton from 'components/common/Button';
import useGetAvailabilityByAccomdationId from 'services/travel/accommodations/Availability/Queries/useGetAvailabilityByAccomdationId';
import useGetRoomTypes from 'services/travel/accommodations/Availability/Queries/useGetRoomTypes';
import useAddAvailability from 'services/travel/accommodations/Availability/Mutations/useAddAvailability';
import useGetSeasonsList from 'services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsList';
import useGetRoomsCapacity from 'services/travel/accommodations/Availability/Queries/useGetRoomsCapacity';

const AddForm = ({ accommodationId }) => {
    const [form] = useForm();
    const updatePeriod = useWatch("period", form);
    // QUERIES
    const availabilitiesQuery = useGetAvailabilityByAccomdationId(accommodationId);
    const seasonsQuery = useGetSeasonsList(accommodationId);
    const availabilitySeasonsQuery = useGetRoomTypes({
        accommodationId,
        startDate: !!updatePeriod && dayjs(updatePeriod[0]).format('YYYY-MM-DD'),
        endDate: !!updatePeriod && dayjs(updatePeriod[1]).format('YYYY-MM-DD')
    }, { enabled: (!!accommodationId && !!updatePeriod) });

    const roomsCapacityQuery = useGetRoomsCapacity(accommodationId);

    // MUTATIONS
    const addAvailabilityMutation = useAddAvailability({
        onSuccess: () => {
            availabilitiesQuery.refetch();
            availabilitySeasonsQuery.refetch();
            message.success("Availability added successfully");
            roomsCapacityQuery.refetch();
        },
        onError: (error) => message.error(error.message)
    });

    function disabledDate(current) {
        let result = false;
        // disable all dates outside seasons
        seasonsQuery.data?.data?.forEach((obj) => {
            if (dayjs(current).isBefore(dayjs(obj.startDate), "day") || dayjs(current).isAfter(dayjs(obj.endDate), "day")) {
                result = true;
            }
        })
        // disable all dates in another availabilities
        availabilitiesQuery.data.forEach((obj) => {
            if (!(dayjs(current).isBefore(dayjs(obj.startDate), "day") || dayjs(current).isAfter(dayjs(obj.endDate), "day"))) {
                result = true;
            }
        })

        return result;
    }

    const handelAddAvilapity = (value) => {
        addAvailabilityMutation.mutate({
            ...value,
            accommodationId,
            actionType: 0,
            startDate: dayjs(value?.period[0])?.format('YYYY-MM-DD'),
            endDate: dayjs(value?.period[1])?.format('YYYY-MM-DD'),
            period: undefined,
        })
    }

    return <Form form={form} layout="vertical" onFinish={handelAddAvilapity}>
        <ConfigProvider theme={{
            "components": {
                "Slider": {
                    "trackBg": "rgb(45,95,235)",
                    "handleColor": "rgb(45,95,235)"
                }
            }
        }}>
            <Row gutter={[16, 8]}>
                <Col span={24}>
                    <Form.Item
                        label="Period"
                        name="period"
                        rules={[{ required: true, message: "Please add a period" }]}
                    >
                        <DatePicker.RangePicker disabledDate={disabledDate} className="w-100" />
                    </Form.Item>
                </Col>
                {availabilitySeasonsQuery.data?.map((season, index) => {
                    return <React.Fragment key={season.season.id}>
                        <Col span={24}>
                            <Divider />
                            <Typography.Title level={5} className="season_update_avilabilty_title">Season: {season.season.name}</Typography.Title>
                            <Form.Item
                                name={["roomDetails", index, "seasonId"]}
                                initialValue={season.season.id}
                                hidden
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {season.rooms.map((room, roomIndex) => {
                            return <Col span={12} key={room.room.id}>
                                <Form.Item
                                    hidden
                                    name={["roomDetails", index, "rooms", roomIndex, "seasonRoomId"]}
                                    initialValue={room.seasonRoom.id} />

                                <Form.Item
                                    label={room.roomType.status}
                                    name={["roomDetails", index, "rooms", roomIndex, "availableRooms"]}
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                if (!value) {
                                                    return Promise.reject(`Please add number of ${room.roomType.status} available rooms`)
                                                }

                                                if (value < 0) {
                                                    return Promise.reject(`Number of available rooms must be 0 or grater`)
                                                }


                                                return Promise.resolve();
                                            }
                                        }
                                    ]}
                                >
                                    <Slider
                                        min={0}
                                        marks={{
                                            0: <span className='fw-600'>0</span>,
                                            [roomsCapacityQuery.data?.find(el => el.roomId === room.room.id)?.numberOfRooms]:
                                                <span className='fw-600'>{roomsCapacityQuery.data?.find(el => el.roomId === room.room.id)?.numberOfRooms}</span>
                                        }}
                                        max={roomsCapacityQuery.data?.find(el => el.roomId === room.room.id)?.numberOfRooms}
                                    />
                                </Form.Item>
                            </Col>
                        })}
                    </React.Fragment>
                })}
            </Row>
            <div className="submit_btns_container">
                <CustomButton
                    color='gray'
                    onClick={() => {
                        form.resetFields();
                    }}
                >Cancel</CustomButton>
                <CustomButton htmlType="submit">Add</CustomButton>
            </div>
        </ConfigProvider>
    </Form >
}

export default AddForm