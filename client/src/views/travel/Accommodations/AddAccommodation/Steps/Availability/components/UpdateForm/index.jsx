import React, { useEffect } from 'react'
import { Col, ConfigProvider, DatePicker, Divider, Form, Input, Radio, Row, Select, Slider, Typography, message } from 'antd'
import dayjs from 'dayjs';
import CustomButton from 'components/common/Button';
import { useForm, useWatch } from 'antd/es/form/Form';
import useGetAvailabilityByAccomdationId from 'services/travel/accommodations/Availability/Queries/useGetAvailabilityByAccomdationId';
import useGetRoomTypes from 'services/travel/accommodations/Availability/Queries/useGetRoomTypes';
import useGetAvailabilityById from 'services/travel/accommodations/Availability/Queries/useGetAvailabilityById';
import useEditAvailability from 'services/travel/accommodations/Availability/Mutations/useEditAvailability';
import useGetRoomsCapacity from 'services/travel/accommodations/Availability/Queries/useGetRoomsCapacity';

const UpdateForm = ({ accommodationId }) => {
    const [form] = useForm();
    const updatePeriod = useWatch("period", form);
    const availability_id = useWatch("availability_id", form);
    // QUERIES
    const availabilitiesQuery = useGetAvailabilityByAccomdationId(accommodationId);
    const availabilitySeasonsQuery = useGetRoomTypes({
        accommodationId,
        startDate: !!updatePeriod && dayjs(updatePeriod[0]).format('YYYY-MM-DD'),
        endDate: !!updatePeriod && dayjs(updatePeriod[1]).format('YYYY-MM-DD')
    }, { enabled: (!!accommodationId && !!updatePeriod) });

    const availabilityDetailesQuery = useGetAvailabilityById(
        { availabilityId: availability_id, accommodationId },
        { enabled: (!!accommodationId && !!availability_id) }
    );
    const roomsCapacityQuery = useGetRoomsCapacity(accommodationId);

    // MUTATIONS
    const editAvailabilityMutation = useEditAvailability({
        onSuccess: () => {
            availabilitiesQuery.refetch();
            availabilitySeasonsQuery.refetch();
            availabilityDetailesQuery.refetch();
            message.success("Availability updated successfully")
            roomsCapacityQuery.refetch();
        },
        onError: (error) => message.error(error.message)
    });

    // 
    useEffect(() => {
        if (availabilityDetailesQuery.isSuccess) {
            form.setFieldValue("roomDetails", availabilityDetailesQuery.data);
        }
    }, [availabilityDetailesQuery.isSuccess, availabilityDetailesQuery.data])

    useEffect(() => {
        form.setFieldValue("period", null)
    }, [availability_id]);

    const handelUpdateAvilapity = (value) => {
        editAvailabilityMutation.mutate({
            ...value,
            accommodationId,
            startDate: dayjs(value?.period[0]).format('YYYY-MM-DD'),
            endDate: dayjs(value?.period[1]).format('YYYY-MM-DD'),
            period: undefined,
        })
    }

    function disabledDate(current) {
        const perioedDateRange = availabilitiesQuery.data?.find(el => el.id === availability_id);
        return dayjs(current).isBefore(dayjs(perioedDateRange.startDate), "day") || dayjs(current).isAfter(dayjs(perioedDateRange.endDate), "day")
    }

    return <Form form={form} layout="vertical" onFinish={handelUpdateAvilapity}>
        <ConfigProvider theme={{
            "components": {
                "Slider": {
                    "trackBg": "rgb(45,95,235)",
                    "handleColor": "rgb(45,95,235)"
                }
            }
        }}>
            <Row gutter={[16, 8]}>
                {(availabilitiesQuery.data?.length !== 0) && <Col span={24}>
                    <Form.Item
                        label="Availability"
                        name="availability_id"
                        rules={[{ required: true, message: "Please select a availability that you want to edit" }]}
                    >
                        <Select className="w-100" placeholder="Availability">
                            {availabilitiesQuery.data?.map(el => {
                                return <Select.Option
                                    key={el?.id}
                                    value={el?.id}
                                >{dayjs(el?.startDate).format("YYYY/MM/DD")} - {dayjs(el?.endDate).format("YYYY/MM/DD")}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </Col>}
                {availability_id && <><Col span={24}>
                    <Form.Item
                        label="Period"
                        name="period"
                        rules={[{ required: true, message: "Please add a period" }]}
                    >
                        <DatePicker.RangePicker disabledDate={disabledDate} className="w-100" />
                    </Form.Item>
                </Col>
                    <Col span={24}>
                        <Typography.Title level={5}>Action</Typography.Title>
                        <Form.Item
                            name="actionType"
                            rules={[{ required: true, message: "Please select action type" }]}
                        >
                            <Radio.Group>
                                <Radio value={0}>Open sales</Radio>
                                <Radio value={1}>Close sales</Radio>
                            </Radio.Group>
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
                                        name={["roomDetails", index, "rooms", roomIndex, "seasonRoomId"]}
                                        hidden
                                        initialValue={room.seasonRoom.id + ""} />
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
                    })}</>}
            </Row>
            <div className="submit_btns_container">
                <CustomButton
                    color='gray'
                    onClick={() => {
                        form.resetFields();
                    }}
                >Cancel</CustomButton>
                <CustomButton htmlType="submit">Save</CustomButton>
            </div>
        </ConfigProvider>
    </Form>
}

export default UpdateForm