import { Col, Form, Row, DatePicker, message, Skeleton, ConfigProvider } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { CalenderSVG3 } from 'assets/jsx-svg';
import TravelersInput from 'components/common/TravelaresInput';
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import RoomCard from '../RoomCard';
import { useSearchParams } from 'react-router-dom';
import searchPramsToKeyValue from 'utils/searchPramsToKeyValue';
import useGetHotelRoomsClient from 'services/travel/client_side/booking/Accommodation/Queries/useGetHotelRoomsClient';

const RoomsSection = ({ accommodationId }) => {
    const [form] = useForm();
    const arrival = useWatch("arrival", form);
    const departure = useWatch("departure", form);
    const travelers = useWatch("travelers", form);
    const [searchPrams] = useSearchParams();
    useEffect(() => {
        const temp = searchPramsToKeyValue(searchPrams)
        if (temp.arrival) {
            form.setFieldValue("arrival", dayjs(temp.arrival))
        }

        if (temp.departure) {
            form.setFieldValue("departure", dayjs(temp.departure))
        }

        if (temp.adults) {
            form.setFieldValue("travelers", {
                adults: Number(temp.adults),
                childs: temp.children?.split("-").length || 0,
                childsAges: temp.children?.split("-") || []
            })
        }
    }, [searchPrams])

    const hotelRoomsQuery = useGetHotelRoomsClient({
        accommodationId,
        arrival: dayjs(arrival).format("YYYY-MM-DD"),
        departure: dayjs(departure).format("YYYY-MM-DD"),
        night: Math.abs(dayjs(arrival).diff(dayjs(departure), "day")),
        adults: travelers?.adults,
        children:
            travelers?.childsAges?.length > 0 ? travelers?.childsAges.join("-") : undefined,
    }, {
        enabled: false
    });


    console.log('hotelRoomsQuery.data :>> ', hotelRoomsQuery.data);
    useEffect(() => {
        if (arrival && departure && travelers) {
            form.validateFields()
                .then(() => {
                    hotelRoomsQuery.refetch();
                }).catch((error) => {
                    console.log('error :>> ', error);
                })
        }
    }, [arrival, departure, travelers])

    return <div>
        <ConfigProvider theme={{
            "components": {
                "DatePicker": {
                    "cellHeight": 30,
                    "cellWidth": 40,
                    "textHeight": 40
                }
            }
        }}>
            <Form form={form} layout='vertical'>
                <Row gutter={[12, 16]}>
                    <Col xs={24} lg={8}>
                        <Form.Item
                            name="arrival"
                            label={"Check in"}
                            rules={[{ required: true, message: "Select check in" }]}
                        >
                            <DatePicker
                                className="w-100"
                                placeholder="Add date"
                                suffixIcon={<CalenderSVG3 />}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Form.Item
                            name="departure"
                            label={"Check out"}
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("Select check out")
                                        }

                                        if (dayjs(value).isBefore(dayjs(arrival), "day")) {
                                            return Promise.reject("Check out can't be before check in")
                                        }

                                        return Promise.resolve();
                                    }
                                }]}
                        >
                            <DatePicker
                                className="w-100"
                                placeholder="Add date"
                                disabledDate={(date) => {
                                    return dayjs(date).isBefore(dayjs(arrival), "day")
                                }}
                                suffixIcon={<CalenderSVG3 />}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Form.Item
                            label={"Travelers"}
                            name="travelers"
                            required
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("Add travelers data");
                                        }

                                        if (value?.adults <= 0) {
                                            return Promise.reject("Number of adults can't be 0");
                                        }

                                        if (value?.childs) {
                                            if (value?.childs !== value.childsAges.length) {
                                                return Promise.reject("Enter all childs ages");
                                            } else if (value.childsAges.find((age) => age > 17 || age < 0)) {
                                                return Promise.reject("Childs ages must be between 0 and 17");
                                            }
                                        }

                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <TravelersInput form={form} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </ConfigProvider>

        <div className='rooms_container' style={{ marginBottom: "1rem" }}>
            {hotelRoomsQuery.isLoading && <Skeleton active />}
            {hotelRoomsQuery.data?.roomsData?.length > 0 && <Row gutter={[24, 24]}>
                {hotelRoomsQuery.data?.roomsData.map(el => {
                    return <Col lg={6} md={8} sm={12} xs={24} key={el.id}>
                        <RoomCard
                            room={el}
                            accommodation={{
                                ...hotelRoomsQuery.data?.accommodationInfo,
                                cancellationPolicy: hotelRoomsQuery.data?.cancellationPolicy
                            }}
                        />
                    </Col>
                })}
            </Row>}
        </div>
    </div>
}

export default RoomsSection

