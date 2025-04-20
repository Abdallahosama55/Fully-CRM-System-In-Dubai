import { Button, Col, DatePicker, Divider, Form, Input, message, Row, Select, Space, Tag, TimePicker, Typography } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { ArrowDownSVG } from 'assets/jsx-svg';
import React, { useEffect, useState } from 'react'
import TIME_ZONES from "constants/TIME_ZONES";
import TextArea from 'antd/es/input/TextArea';
import useGetEventParticipants from 'services/event-participant/Queries/useGetEventParticipants';
import EVENT_PEOPLE_TYPES from 'constants/EVENT_PEOPLE_TYPES';
import { useDebounce } from 'hooks/useDebounce';
import useAddEventSession from 'services/event-sessions/Mutations/useAddEventSession';
import useEditEventSession from 'services/event-sessions/Mutations/useEditEventSession';
import useGetEventHalls from 'services/event-halls/Queries/useGetEventHalls';
import useGetEventSessionById from 'services/event-sessions/Queries/useGetEventSessionById';
import dayjs from 'dayjs';
import LoadingPage from 'components/common/LoadingPage';

const NewSession = ({ id, eventId, handelAdd = () => { }, handelEdit = () => { } , DrawerAPI }) => {
    const [form] = useForm();
    const startTime = useWatch("startTime", form);

    const [searchText, setSearchText] = useState("");
    const generalSearch = useDebounce(searchText, 300);
    const eventParticipants = useGetEventParticipants({
        eventId: eventId,
        type: EVENT_PEOPLE_TYPES.SPEAKER,
        generalSearch
    }, { enabled: !!eventId });

    const eventHalls = useGetEventHalls(eventId);
    const eventSession = useGetEventSessionById({ id, eventId }, { enabled: !!id && !!eventId });

    useEffect(() => {
        if (eventSession?.data) {
            form.setFieldsValue({
                ...eventSession?.data,
                startDate: eventSession?.data?.startDate ? dayjs(eventSession.data.startDate) : undefined,
                startTime: eventSession?.data?.startTime ? dayjs(eventSession.data.startTime, "HH:mm") : undefined,
                endTime: eventSession?.data?.endTime ? dayjs(eventSession.data.endTime, "HH:mm") : undefined,
            })
        }
    }, [eventSession?.data, id])

    useEffect(() => {
        DrawerAPI.setRootClassName("gray_bg_drawer")
    }, []);

    const addNewSessionMutation = useAddEventSession(eventId, {
        onSuccess: (res) => {
            handelAdd(res)
            message.success("New session added successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to add new session");
            console.log(error)
        }
    });

    const editSessionMutation = useEditEventSession({ eventId, id }, {
        onSuccess: (res) => {
            handelEdit({ ...res, id })
            message.success("Session updated successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to updated session");
            console.log(error)
        }
    });

    const handelFinish = (values) => {
        const temp = {
            ...values,
            startDate: values?.startDate ? values?.startDate?.format("YYYY-MM-DD") : undefined,
            startTime: values?.startTime ? values?.startTime.format("HH:mm") : undefined,
            endTime: values?.endTime ? values?.endTime.format("HH:mm") : undefined,
        }

        if (id) {
            editSessionMutation.mutate(temp)
        } else {
            addNewSessionMutation.mutate(temp)
        }
    }

    if (eventSession.isLoading) {
        return <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: "#fff",
            height: 'calc(100dvh - 36px)',
            padding: "1rem",
            border: "1px solid var(--gray-100)",
            borderRadius: "1rem"
        }}>
            <LoadingPage />
        </div>
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: "#fff",
            height: 'calc(100dvh - 36px)',
            padding: "1rem",
            border: "1px solid var(--gray-100)",
            borderRadius: "1rem"
        }}>
            <Form layout='vertical' style={{ flexGrow: 1 }} id={"NewPartner"} onFinish={handelFinish} form={form}>
                <Typography.Title level={4} className='lg_text_semibold' style={{ color: "var(--vbooking-b700)" }}>{id ? "Edit" : "Create New"} Session </Typography.Title>
                <Divider />
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            name={"title"}
                            label={<p className='sm_text_medium'>Session Name</p>}
                            rules={[{ required: true, message: "Enter session name" }]}
                        >
                            <Input placeholder="Session name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"startDate"}
                            label={<p className='sm_text_medium'>Session Date</p>}
                            rules={[{ required: true, message: "Select session date" }]}
                        >
                            <DatePicker placeholder="Session date" className="w-100" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<p className='sm_text_medium'>Time Zone</p>}
                            name={"timeZone"}
                            className="w-100"
                            rules={[{ required: true, message: "Please Select Event Time Zone" }]}
                            initialValue={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                            <Select
                                placeholder="Select Time Zone"
                                suffixIcon={<ArrowDownSVG />}
                                className="w-100"
                                showSearch
                                options={TIME_ZONES.map((el) => ({ label: el, value: el }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"startTime"}
                            label={<p className='sm_text_medium'>Start time</p>}
                            rules={[{ required: true, message: "Select session start time" }]}
                        >
                            <TimePicker format={"h:mm A"} placeholder="Start time" className="w-100" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"endTime"}
                            label={<p className='sm_text_medium'>End</p>}
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("enter session end time")
                                        }

                                        if (dayjs(value).isBefore(dayjs(startTime), "time")) {
                                            return Promise.reject("End time can't be before start time")
                                        }


                                        return Promise.resolve();
                                    }
                                }]}
                        >
                            <TimePicker
                                disabledTime={() => {
                                    const startHour = dayjs(startTime).hour();
                                    const startMinute = dayjs(startTime).minute();
                                    return {
                                        disabledHours: () => {
                                            const hours = [];
                                            for (let i = 0; i < startHour; i++) {
                                                hours.push(i); // Disable hours before startHour
                                            }
                                            return hours;
                                        },
                                        disabledMinutes: (selectedHour) => {
                                            if (selectedHour === startHour) {
                                                const minutes = [];
                                                for (let i = 0; i < startMinute; i++) {
                                                    minutes.push(i); // Disable minutes before startMinute when the hour is the same
                                                }
                                                return minutes;
                                            }
                                            return [];
                                        },
                                    };
                                }}
                                format={"h:mm A"}
                                placeholder="End time" className="w-100" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name={"description"}
                            label={<p className='sm_text_medium'>Description</p>}
                            rules={[{ required: true, message: "Enter session description" }]}
                        >
                            <TextArea rows={7} placeholder="Session Description" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"tags"}
                            label={<p className='sm_text_medium'>Tags</p>}
                        >
                            <Select placeholder="Session tags" mode='tags' suffixIcon={<></>} tagRender={(tag) => <Tag
                                closable
                                onClose={tag?.onClose}>{tag?.label}</Tag>}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"sessionType"}
                            label={<p className='sm_text_medium'>Type</p>}
                            rules={[{ required: true, message: "Select session type" }]}
                        >
                            <Select
                                showSearch
                                allowClear
                                suffixIcon={<ArrowDownSVG />}
                                options={[
                                    { label: "All", value: "All" },
                                    { label: "Educational", value: "Educational" },
                                    { label: "Networking", value: "Networking" },
                                    { label: "Workshop", value: "Workshop" },
                                    { label: "Seminar", value: "Seminar" },
                                    { label: "Keynote", value: "Keynote" },
                                    { label: "Panel Discussion", value: "Panel Discussion" },
                                    { label: "Webinar", value: "Webinar" },
                                    { label: "Social Event", value: "Social Event" },
                                    { label: "Product Launch", value: "Product Launch" },
                                    { label: "Round Table", value: "Round Table" },
                                ]}
                                placeholder='Type'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"hallId"}
                            label={<p className='sm_text_medium'>Hall</p>}
                            rules={[{ required: true, message: "Select session hall" }]}
                        >
                            <Select
                                placeholder="Session hall"
                                suffixIcon={<ArrowDownSVG />}
                                options={eventHalls?.data?.rows?.map((el) => ({ label: el?.name, value: el?.id }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"speakerIds"}
                            label={<p className='sm_text_medium'>Speakers</p>}
                        >
                            <Select
                                suffixIcon={<ArrowDownSVG />}
                                placeholder="Session tags"
                                mode='multiple'
                                onSearch={setSearchText}
                                showSearch
                                options={eventParticipants?.data?.rows?.map((el) => ({ label: el?.name, value: el?.id }))}
                                tagRender={(tag) => <Tag
                                    closable
                                    onClose={tag?.onClose}>{tag?.label}</Tag>}
                                filterOption={false} // Disable local filtering
                                notFoundContent={null} // Optional: Show nothing when no options
                            />
                        </Form.Item>
                    </Col>
                </Row>


            </Form>
            <div style={{ padding: '16px 0 0 0', borderTop: '1px solid #f0f0f0' }}>
                <Row align={"middle"} justify={"end"}>
                    <Col>
                        <Space style={{ marginBottom: "0.5rem" }}                        >
                            <Button onClick={DrawerAPI.close}>Cancel</Button>
                            <Button
                                type='primary'
                                htmlType='submit'
                                form={"NewPartner"}
                                loading={addNewSessionMutation.isPending || editSessionMutation.isPending}
                            >Save</Button>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default NewSession