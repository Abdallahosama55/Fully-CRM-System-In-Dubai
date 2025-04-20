import { Col, DatePicker, Form, Row, Table, Typography, message, Tabs, Switch } from "antd"
import { useForm, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react"
// import AvailabilityAPI from "services/travel/availability.service";
// import UpdateForm from "./components/UpdateForm";
// import AddForm from "./components/AddForm";
import useGetRoomsTypesList from "services/travel/accommodations/Rooms/Queries/useGetRoomsTypesList";
import useGetAvailabilities from "services/travel/accommodations/Availability/Queries/useGetAvailabilities";
import useGetSeasonsList from "services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsList";
import useAddAutomatically from "services/travel/accommodations/Availability/Mutations/useAddAutomatically";
import useCloseAutomatically from "services/travel/accommodations/Availability/Mutations/useCloseAutomatically";
import { groupData } from "./utils";

// style
import './styles.css'
import useGetLastActionType from "services/travel/accommodations/Availability/Queries/useGetLastActionType";

const AVAILABILITY_TABS_TYPES = {
    ADD: "ADD",
    UPDATE: "UPDATE",
}

const Availability = ({ id, next }) => {
    const roomsTypes = useGetRoomsTypesList();
    // validate form
    const [validateForm] = useForm();
    const startDate = useWatch("startDate", validateForm);
    const endDate = useWatch("endDate", validateForm);
    const [rooms, setRooms] = useState([]);

    const [isAllAvailabilitiesActive, setIsAllAvailabilitiesActive] = useState(false);
    // QUERIES
    const availabilitiesQuery = useGetAvailabilities({
        accommodationId: id,
        startDate: startDate && dayjs(startDate).format('YYYY-MM-DD'),
        endDate: endDate && dayjs(endDate).format('YYYY-MM-DD')
    }, { enabled: !!id && !!startDate && !!endDate });

    // const availabilityByAccomdationIdQuery = useGetAvailabilityByAccomdationId(id, { enabled: !!id });
    const seasonsQuery = useGetSeasonsList(id);
    const lastActionType = useGetLastActionType(id);


    useEffect(() => {
        if (lastActionType?.data && lastActionType?.data[0]) {
            if (lastActionType?.data[0]?.actionType === 2) {
                setIsAllAvailabilitiesActive(false);
            } else if (lastActionType?.data[0]?.actionType === 0) {
                setIsAllAvailabilitiesActive(true);
            }
        }
    }, [lastActionType?.data])
    // mutations
    const addAutomatically = useAddAutomatically({
        onSuccess: () => {
            message.success("all availabilities enabled sucessfully");
            availabilitiesQuery.refetch();
        }
    });

    const closeAutomatically = useCloseAutomatically({
        onSuccess: () => {
            message.success("all availabilities disabled sucessfully");
            availabilitiesQuery.refetch();
        }
    });

    useEffect(() => {
        if (availabilitiesQuery.isSuccess) {
            setRooms(groupData(availabilitiesQuery.data, roomsTypes.data))
        }
    }, [availabilitiesQuery.isSuccess, availabilitiesQuery.data])

    useEffect(() => {
        if (seasonsQuery.data?.data) {
            const activeSeasons = seasonsQuery.data.data.filter(el => el.active);
            if (activeSeasons.length > 0) {
                const earliestStartDate = activeSeasons.reduce((earliest, season) => {
                    const startDate = dayjs(season.startDate);
                    return startDate.isBefore(earliest) ? startDate : earliest;
                }, dayjs(activeSeasons[0].startDate));

                const latestEndDate = activeSeasons.reduce((latest, season) => {
                    const endDate = dayjs(season.endDate);
                    return endDate.isAfter(latest) ? endDate : latest;
                }, dayjs(activeSeasons[0].endDate));

                validateForm.setFieldsValue({ "validate.period": [earliestStartDate, latestEndDate] }); // Set validateForm values as array
            }
        }
    }, [seasonsQuery.data, validateForm]);

    return (
        <div className="hotels_page availability_page">
            <div className="availability_card validate_card">
                <div className="space-between" style={{ alignItems: "center" }}>
                    <Typography.Title level={4} className="availability_card_title">Calendar Availability</Typography.Title>
                    <p className="fz-14 fw-400 d-flex mt-1"><Switch
                        checked={isAllAvailabilitiesActive}
                        disabled={closeAutomatically.isPending || addAutomatically.isPending}
                        onChange={() => {
                            if (isAllAvailabilitiesActive === true) {
                                closeAutomatically.mutate({ accommodationId: id })
                                setIsAllAvailabilitiesActive(false)
                            } else {
                                addAutomatically.mutate({ accommodationId: id })
                                setIsAllAvailabilitiesActive(true)
                            }
                        }}
                    /> <span style={{ marginInlineStart: "8px" }}>Availability {!isAllAvailabilitiesActive ? "Off" : "On"}</span></p>
                </div>
                <Form form={validateForm} layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                label={"Start date"}
                                name="startDate"
                                rules={[{ required: true, message: "Please add a start date" }]}
                            >
                                <DatePicker
                                    className="w-100"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={"End date"}
                                name="endDate"
                                rules={[{ required: true, message: "Please add a end date" }]}
                            >
                                <DatePicker
                                    disabledDate={(current) => current.isBefore(startDate)}
                                    className="w-100"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Tabs
                    defaultActiveKey={AVAILABILITY_TABS_TYPES.ADD}
                    items={rooms.map((room, index) => {
                        return {
                            label: room.roomTypeName,
                            key: index,
                            children: <Table
                                pagination={{ pageSize: 7 }}
                                columns={room.columns}
                                dataSource={room.rows}
                                loading={availabilitiesQuery.isLoading || availabilitiesQuery.isFetching || availabilitiesQuery.isPending}
                            />
                        }
                    })}
                />
            </div>
        </div>
    )
}

export default Availability
