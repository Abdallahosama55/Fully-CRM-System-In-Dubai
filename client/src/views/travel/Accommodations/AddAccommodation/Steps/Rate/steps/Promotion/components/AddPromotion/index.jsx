import { useEffect, useState, useCallback } from 'react';
import Typography from 'antd/es/typography/Typography';
import { Col, DatePicker, Form, Input, Row, Select, Spin, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import CustomButton from 'components/common/Button';
import PromotionAPI from 'services/travel/promotions.service';
import dayjs from 'dayjs';
// style
import './styles.css';
import { BoldCalendarSVG } from 'assets/jsx-svg';
import useGetAccommodationPensionsList from 'services/travel/accommodations/common/Queries/useGetAccommodationPensionsList';
import useGetAccommodationRoomsList from 'services/travel/accommodations/Rooms/Queries/useGetAccommodationRoomsList';
import useAddPromotion from 'services/travel/accommodations/Rate/Promotion/Mutations/useAddPromotion';
import useEditPromotion from 'services/travel/accommodations/Rate/Promotion/Mutations/useEditPromotion';
import useGetPromotionByID from 'services/travel/accommodations/Rate/Promotion/Queries/useGetPromotionByID';
import LoadingPage from 'components/common/LoadingPage';
const AddPromotion = ({ id: editID, accommodationId, onEnd = () => { } }) => {
    const [form] = useForm();
    // QUERIES
    const pensionsListQuery = useGetAccommodationPensionsList();
    const roomsListQuery = useGetAccommodationRoomsList(accommodationId);
    const promotionByIdQuery = useGetPromotionByID(editID, { enabled: !!editID })
    // MUTATIONS
    const addPromotionMutation = useAddPromotion({
        onSuccess: () => {
            onEnd();
            message.success("New promotion added successfully")
        },
        onError: (error) => message.error(error.message)
    })

    const editPromotionMutation = useEditPromotion({
        onSuccess: () => {
            onEnd();
            message.success("Promotion updated successfully")
        },
        onError: (error) => message.error(error.message)
    })

    useEffect(() => {
        if (promotionByIdQuery.isSuccess) {
            const promotion = promotionByIdQuery.data;
            form.setFieldsValue({
                ...promotion,
                book_date_range: [dayjs(promotion.startDate), dayjs(promotion.endDate)],
                stay_date_range: [dayjs(promotion.bookStartDate), dayjs(promotion.bookEndDate)],
                rooms: promotion.promotionRooms?.map(el => el.roomId),
                contracts: promotion.promotionContracts?.map(el => el.salesContractId),
                pensions: promotion.promotionPensions?.map(el => el.id),
            });
        }

    }, [promotionByIdQuery.isSuccess, promotionByIdQuery.data])

    const onFinish = (values) => {
        const temp = {
            ...values,
            startDate: dayjs(values.stay_date_range[0]).format("YYYY-MM-DD"),
            endDate: dayjs(values.stay_date_range[1]).format("YYYY-MM-DD"),
            bookStartDate: dayjs(values.book_date_range[0]).format("YYYY-MM-DD"),
            bookEndDate: dayjs(values.book_date_range[1]).format("YYYY-MM-DD"),
            accommodationId
        }

        if (editID) {
            editPromotionMutation.mutate({ ...temp, id: editID })
        } else {
            addPromotionMutation.mutate(temp)
        }
    };

    // Validators
    const minimumStayValidator = (_, value) => {
        if (Number(value) < 0) {
            return Promise.reject('Minimum stay must be greater than 0');
        }

        if (Number(value) > Number(form.getFieldValue('maxStay'))) {
            return Promise.reject("Minimum stay can't be greater than Maximum stay");
        }
        return Promise.resolve();
    }

    const maximumStayValidator = (_, value) => {
        if (Number(value) < 0) {
            return Promise.reject('Maximum stay must be greater than 0');
        }

        return Promise.resolve();
    }

    const filterOptions = useCallback(
        (inputValue, option) => {
            return option.label.toLowerCase().includes(inputValue.toLowerCase()) || option.value === "ALL";
        },
        [],
    )

    if (promotionByIdQuery.isLoading || editPromotionMutation.isPending || addPromotionMutation.isPending) {
        return <LoadingPage />
    }

    return (
        <div className='travel_drawer add_promotion'>
            <Typography.Text className="fz-24 fw-500">{editID ? "Edit" : "Add"} Promotion</Typography.Text>
            <Form form={form} layout="vertical" onFinish={onFinish} className="travel_drawer_container">
                <div className='travel_drawer_content'>
                    <Row gutter={[20, 20]}>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Please select promotion type' }]}
                            >
                                <Select placeholder="Promotion type">
                                    <Select.Option value="Standard offer">Standard offer</Select.Option>
                                    <Select.Option value="Early Booking">Early Booking</Select.Option>
                                    <Select.Option value="Long stay">Long stay</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter promotion name' }]}
                            >
                                <Input placeholder='Add Name' />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="book_date_range"
                                label="What Dates Will Customers Need To Book?"
                                rules={[{ required: true, message: 'Please select book date range' }]}
                            >
                                <DatePicker.RangePicker className='w-100' suffixIcon={<BoldCalendarSVG />} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="stay_date_range"
                                label="What dates will customers stay ?"
                                rules={[{ required: true, message: 'Please select stay date range' }]}
                            >
                                <DatePicker.RangePicker className='w-100' suffixIcon={<BoldCalendarSVG />} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="minStay"
                                label="The Minimum Length Of Stay"
                                rules={[
                                    { required: true, message: 'Please add minimum stay' },
                                    { validator: minimumStayValidator }
                                ]}
                            >
                                <Input placeholder='0' type='number' />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="maxStay"
                                label="The Maximum Length Of Stay"
                                rules={[
                                    { required: true, message: 'Please select maximum stay' },
                                    { validator: maximumStayValidator }
                                ]}
                            >
                                <Input placeholder='0' type='number' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col md={24} xs={24}>
                            <Form.Item
                                name="rooms"
                                label="Rooms"
                                rules={[{ required: true, message: 'Please select rooms' }]}
                            >
                                <Select
                                    filterOption={filterOptions}
                                    mode="multiple"
                                    placeholder="Select rooms"
                                    suffixIcon={<CustomButton color='dark' size="small" onClick={() => {
                                        form.setFieldValue("rooms", roomsListQuery.data?.map(el => el.id))
                                    }}>Select all</CustomButton>}
                                    options={roomsListQuery.data?.map(room => ({
                                        value: room.id,
                                        label: room.name
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="pensions"
                                label="Pensions"
                                rules={[{ required: true, message: 'Please select pension' }]}
                            >
                                <Select
                                    filterOption={filterOptions}
                                    mode="multiple"
                                    placeholder="Select pension"
                                    suffixIcon={<CustomButton
                                        size="small"
                                        color='dark'
                                        onClick={() => {
                                            form.setFieldValue("pensions", pensionsListQuery?.data?.map(pension => pension.id))
                                        }}>Select all</CustomButton>}
                                    options={pensionsListQuery?.data?.map(pension => {
                                        return {
                                            value: pension.id,
                                            label: pension.name
                                        }
                                    })}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="amount"
                                label="Amount"
                                rules={[{ required: true, message: 'Please enter amount' }]}
                            >
                                <Input placeholder='Add amount' type='number' />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="typeOfDiscount"
                                label="Type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select amount type'
                                    },
                                ]}
                            >
                                <Select placeholder="fixed amount / percentage %">
                                    <Select.Option value="fixed">Fixed amount</Select.Option>
                                    <Select.Option value="per">Percentage</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name="priority"
                                label="Priority"
                                rules={[{ required: true, message: 'Please enter prmotion priority' }]}
                            >
                                <Input placeholder='priority' type='number' />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name="anotherDiscount"
                                label="Can be combined with another discount ?"
                                rules={[{ required: true, message: 'Please select yes or no' }]}
                            >
                                <Select placeholder="yes / no">
                                    <Select.Option value={true}>Yes</Select.Option>
                                    <Select.Option value={false}>No</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <CustomButton
                    className='w-100 mt-1'
                    htmlType="submit"
                    color='dark'
                >{editID ? "Edit" : "Add"}</CustomButton>
            </Form >
        </div >
    )
}

export default AddPromotion