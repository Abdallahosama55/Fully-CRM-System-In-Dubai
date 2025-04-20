import React, { useEffect } from 'react'
// style
import "./styles.css"
import NewPNG from 'assets/images/NewPNG.png'
import { useForm, useWatch } from 'antd/es/form/Form';
import { Checkbox, Col, ConfigProvider, DatePicker, Form, Input, message, Row, Select, Typography } from 'antd';
import { BoldCalendarSVG } from 'assets/jsx-svg';
import dayjs from 'dayjs';
import useGetAccommodationPensionsList from 'services/travel/accommodations/common/Queries/useGetAccommodationPensionsList';
import useGetAccommodationRoomsList from 'services/travel/accommodations/Rooms/Queries/useGetAccommodationRoomsList';
import CustomButton from 'components/common/Button';
// API CALLS
import useAddSeason from 'services/travel/accommodations/Rate/Seasons/Mutations/useAddSeason';
import useEditSeason from 'services/travel/accommodations/Rate/Seasons/Mutations/useEditSeason';
import useSeasonByID from 'services/travel/accommodations/Rate/Seasons/Queries/useSeasonByID';
import { queryClient } from 'services/queryClient';
import SEASSONS_TYPE from 'constants/SEASSONS_TYPE';

const AddSeason = ({ accommodationId, editId = false, onEnd = () => { }, getSeassonType }) => {

    const seasonType = getSeassonType();

    console.log('seasonType :>> ', seasonType);
    const [form] = useForm();
    const startDate = useWatch("startDate", form);
    const startMonth = useWatch("startMonth", form);
    // QUERIES
    const pensionsListQuery = useGetAccommodationPensionsList();
    const seasonByIdQuery = useSeasonByID(editId, { enabled: !!editId });

    useEffect(() => {
        // SET THE DATA IN THE FORM
        if (seasonByIdQuery.data) {
            const temp = {
                name: seasonType === SEASSONS_TYPE.NO_REPEAT ? seasonByIdQuery.data.name : undefined,
                startDate: seasonType === SEASSONS_TYPE.NO_REPEAT ? dayjs(seasonByIdQuery.data.startDate) : undefined,
                endDate: seasonType === SEASSONS_TYPE.NO_REPEAT ? dayjs(seasonByIdQuery.data.endDate) : undefined,
                minStay: seasonByIdQuery.data.minStay,
                restrocesionDeadlines: seasonByIdQuery.data.restrocesionDeadlines,
                pensions: seasonByIdQuery.data.seasonPensions?.map(el => el.id),
                rooms: seasonByIdQuery.data.seasonRooms?.map(el => el.id),
                startMonth: seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY ? dayjs(seasonByIdQuery.data?.startDate).month() + 1 + "" : undefined,
                endMonth: seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY ? dayjs(seasonByIdQuery.data?.endDate).month() + 1 + "" : undefined,
            }

            form.setFieldsValue({ ...temp })
        }
    }, [seasonByIdQuery.isSuccess, seasonByIdQuery.data])

    // MUTATIONS
    const roomsListQuery = useGetAccommodationRoomsList(accommodationId, { enabled: !!accommodationId });
    const addSeasonMutation = useAddSeason({
        onSuccess: (res) => {
            onEnd(res)
            message.success("new season added sucessfully")
        },
        onError: (error) => message.error(error.message)
    });

    const editSeasonMutation = useEditSeason({
        onSuccess: (res) => {
            onEnd(res);
            queryClient.invalidateQueries(seasonByIdQuery.key);
            message.success("season updated sucessfully")
        },
        onError: (error) => message.error(error.message)
    });

    const handelFinish = (values) => {
        const temp = {
            ...values,
            type: seasonType,
            accommodationId,
            startDate: seasonType === SEASSONS_TYPE.NO_REPEAT ? dayjs(values.startDate).format("YYYY-MM-DD") : undefined,
            endDate: seasonType === SEASSONS_TYPE.NO_REPEAT ? dayjs(values.endDate).format("YYYY-MM-DD") : undefined,
        }

        if (editId) {
            editSeasonMutation.mutate({ ...temp, id: editId })
        } else {
            addSeasonMutation.mutate(temp)
        }
    }

    return (

        <ConfigProvider theme={{
            "components": {
                "DatePicker": {
                    "cellHeight": seasonType === SEASSONS_TYPE.NO_REPEAT ? 20 : 10,
                    "cellWidth": 30,
                    "textHeight": 40
                }
            }
        }}>
            <div className='add_season'>
                <div className="add_season_title">
                    <img src={NewPNG} alt="NewPNG" />
                    <p className='fz-16 fw-700'>New Season</p>
                </div>
                <Form layout='vertical' form={form} onFinish={handelFinish}>
                    <Row gutter={[16, 4]}>
                        {seasonType === SEASSONS_TYPE.NO_REPEAT && <Col span={24}>
                            <Form.Item
                                label="Season Name"
                                name="name"
                                rules={[{ required: true, message: "Enter season name" }]}
                            >
                                <Input placeholder='Enter season name' />
                            </Form.Item>
                        </Col>}
                        <Col span={12}>
                            <Form.Item
                                label="Minimum Stay"
                                name="minStay"
                                rules={[{
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("Enter Minimum stay")
                                        }

                                        if (value < 0) {
                                            return Promise.reject("Minimum stay can't be less than 0")
                                        }

                                        return Promise.resolve();
                                    }
                                }]}
                            >
                                <Input placeholder='Enter Number' type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Retrocession Deadlines"
                                name="restrocesionDeadlines"
                                rules={[{
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("Enter Retrocession deadlines")
                                        }

                                        return Promise.resolve();
                                    }
                                }]}
                            >
                                <Input placeholder='Enter Number' addonAfter={"Days"} type="number" />
                            </Form.Item>
                        </Col>
                        {seasonType === SEASSONS_TYPE.NO_REPEAT && <>
                            <Col span={12}>
                                <Form.Item
                                    name="startDate"
                                    label={<p className='fz-16'>Start Date</p>}
                                    rules={[{ required: true, message: 'Please select start date' }]}
                                >
                                    <DatePicker
                                        allowClear={false}
                                        className='w-100'
                                        suffixIcon={<BoldCalendarSVG />} />
                                </Form.Item>
                            </Col><Col span={12}>
                                <Form.Item
                                    name="endDate"
                                    label={<p className='fz-16'>End Date</p>}
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                if (!value) {
                                                    return Promise.reject("Please select end date")
                                                }

                                                if (startDate && dayjs(value).isBefore(startDate)) {
                                                    return Promise.reject("End date can't be before start date")
                                                }

                                                return Promise.resolve();
                                            }
                                        }

                                    ]}
                                >

                                    <DatePicker
                                        allowClear={false}
                                        className='w-100'
                                        suffixIcon={<BoldCalendarSVG />}
                                    />
                                </Form.Item>
                            </Col>
                        </>}
                        {seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY && <>
                            <Col span={12}>
                                <Form.Item
                                    name="startMonth"
                                    label={<p className='fz-16'>Start Month</p>}
                                    rules={[{ required: true, message: 'Please select start date' }]}
                                >
                                    <Select
                                        placeholder="Select start month"
                                        options={[
                                            { label: "January", value: "1" },
                                            { label: "February", value: "2" },
                                            { label: "March", value: "3" },
                                            { label: "April", value: "4" },
                                            { label: "May", value: "5" },
                                            { label: "June", value: "6" },
                                            { label: "July", value: "7" },
                                            { label: "August", value: "8" },
                                            { label: "September", value: "9" },
                                            { label: "October", value: "10" },
                                            { label: "November", value: "11" },
                                            { label: "December", value: "12" },
                                        ]}
                                    />
                                </Form.Item>
                            </Col><Col span={12}>
                                <Form.Item
                                    name="endMonth"
                                    label={<p className='fz-16'>End Month</p>}
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                if (!value) {
                                                    return Promise.reject("Please select end month")
                                                }

                                                if (startMonth && Number(value) <= Number(startMonth)) {
                                                    return Promise.reject("End month have to be after start month")
                                                }

                                                return Promise.resolve();
                                            }
                                        }

                                    ]}
                                >
                                    <Select
                                        placeholder="Select start month"
                                        options={[
                                            { label: "January", value: "1" },
                                            { label: "February", value: "2" },
                                            { label: "March", value: "3" },
                                            { label: "April", value: "4" },
                                            { label: "May", value: "5" },
                                            { label: "June", value: "6" },
                                            { label: "July", value: "7" },
                                            { label: "August", value: "8" },
                                            { label: "September", value: "9" },
                                            { label: "October", value: "10" },
                                            { label: "November", value: "11" },
                                            { label: "December", value: "12" },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </>}
                        <Col span={24}>
                            <Typography.Paragraph style={{ marginBottom: "0" }} className='fz-14 fw-500'>Pensions:</Typography.Paragraph>
                            <Form.Item
                                name="pensions"
                                rules={[{ required: true, message: "You have to select at least on pension" }]}>
                                <Checkbox.Group>
                                    <div className='checkbox_group'>
                                        {pensionsListQuery.data?.map(el => {
                                            return <Checkbox key={el.id} value={el.id}>{el.name}</Checkbox>
                                        })}
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Typography.Paragraph style={{ marginBottom: "0" }} className='fz-14 fw-500'>Rooms:</Typography.Paragraph>
                            <Form.Item
                                name="rooms"
                                rules={[{ required: true, message: "You have to select at least on room" }]}
                            >
                                <Checkbox.Group>
                                    <div className='checkbox_group'>
                                        {roomsListQuery.data?.map(room => <Checkbox key={room.id} value={room.id}>{room.name}</Checkbox>)}
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>

                    </Row>
                    <CustomButton
                        color='dark'
                        className='w-100 add_season_btn'
                        htmlType="submit"
                    >{editId ? "Edit" : "Add"} Season</CustomButton>
                </Form>
            </div>
        </ConfigProvider>
    )
}

export default AddSeason