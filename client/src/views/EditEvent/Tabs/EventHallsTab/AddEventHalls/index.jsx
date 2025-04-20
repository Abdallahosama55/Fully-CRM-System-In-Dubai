import { Button, Col, Divider, Form, Image, Input, message, Radio, Row, Space, Typography } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import UploadInput from 'components/common/UploadInput';
import EVENT_TYPE from 'constants/EVENT_TYPE';
import { useDebounce } from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react'
import ExploreService from 'services/explore.service';
import { TRAVEL_API_URL } from 'services/travel/config';
import { axiosCatch } from 'utils/axiosUtils';
import isValidJson from 'utils/isValidJson';
import house from "assets/images/house.png";
import { SearchSVG } from 'assets/jsx-svg';
// style
import "./styles.css";
import useAddEventHall from 'services/event-halls/Mutations/useAddEventHall';
import useEditEventHall from 'services/event-halls/Mutations/useEditEventHall';
import useGetEventHallById from 'services/event-halls/Queries/useGetEventHallById';
const AddEventHalls = ({ id, eventId, handelAdd, handelEdit ,DrawerAPI  }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [verseSelected, setVerseSelected] = useState(undefined);
    const [verses, setVerses] = useState([]);
    const [dimensionPlacese, setDimensionPlacese] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const searchQueryDebounce = useDebounce(searchQuery, 300)
    const [form] = useForm();
    const eventType = useWatch("type", form);
    // get edit data
    const eventHall = useGetEventHallById(id, { enabled: !!id });
    useEffect(() => {
        if (eventHall?.data) {
            console.log(eventHall?.data, "eventHall?.data")
            form.setFieldsValue({
                ...eventHall?.data, image: eventHall?.data?.image ? {
                    "id": Math.random() + "",
                    "name": Math.random() + "",
                    "link": eventHall?.data?.image
                } : undefined
            })
        }
    }, [eventHall?.data])

    useEffect(() => {
        const delayDebounceFn = setTimeout(
            () => {
                (async () => {
                    try {
                        const res = await ExploreService.search({
                            serach: searchQuery,
                            tag: "MyDimension",
                        });
                        setVerses(res.data.data.rows);
                    } catch (err) {
                        axiosCatch(err);
                    }
                })();
            },
            searchQuery.length > 0 ? 500 : 0,
        );

        return () => clearTimeout(delayDebounceFn);
    }, [searchQueryDebounce]);

    useEffect(() => {
        if (verseSelected && eventType === EVENT_TYPE.METAVERSE) {
            const temp = verses.find((verse) => verse.id === verseSelected);
            const places = isValidJson(temp?.places) ? JSON.parse(temp?.places) : [];
            setDimensionPlacese(places);
        }
    }, [verseSelected, verses, eventType])

    const addNewSectionMutation = useAddEventHall(eventId, {
        onSuccess: (res) => {
            handelAdd(res)
            message.success("New Section hall added successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to add Section hall");
            console.log(error)
        }
    });

    const editSectionMutation = useEditEventHall(id, {
        onSuccess: (res) => {
            handelEdit({ ...res, id })
            message.success("Section hall updated successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to update section hall");
            console.log(error)
        }
    });

    const handelFinish = (values) => {
        if (isUploading) {
            message.error("Please wait while image is uploading")
            return
        }

        if (id) {
            editSectionMutation.mutate({ ...values, image: values?.image?.link })
        } else {
            addNewSectionMutation.mutate({ ...values, image: values?.image?.link })
        }
    }
    useEffect(() => {
        DrawerAPI.setRootClassName("gray_bg_drawer")
    }, []);

    return (
        <div className="add_event_halls" style={{
            display: 'flex',
            flexDirection: 'column',
            background: "#fff",
            padding: "1rem",
            border: "1px solid var(--gray-100)",
            borderRadius: "1rem"
        }}>
            <Form layout='vertical' style={{ flexGrow: 1 }} id={"AddEventHalls"} onFinish={handelFinish} form={form}>
                <Typography.Title level={4} className='lg_text_semibold' style={{ color: "var(--vbooking-b700)" }}>{id ? "Edit" : "Add New"} Hall</Typography.Title>
                <Divider />
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Form.Item
                            name={"name"}
                            label={<p className='sm_text_medium'>Name</p>}
                            rules={[{ required: true, message: "Enter hall name" }]}
                        >
                            <Input placeholder="Hall name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name={"description"}
                            label={<p className='sm_text_medium'>Description</p>}
                            rules={[{ required: true, message: "Enter hall description" }]}
                        >
                            <TextArea rows={8} placeholder="Hall website" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={"image"} label={<p className='sm_text_medium'>Image</p>}>
                            <UploadInput
                                setUploadingState={setIsUploading}
                                name={"image"}
                                uploadText={"Upload Hall Image"}
                                formatsText={"PNG, JPG or GIF"}
                                action={TRAVEL_API_URL + "common/add-image"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="type"
                            rules={[{ required: true, message: "Please Select Event Type" }]}
                            initialValue={EVENT_TYPE.STANDARD} label="Event Type" className="event_type_radio_form_item">
                            <Radio.Group>
                                <Radio value={EVENT_TYPE.STANDARD}>Standard</Radio>
                                <Radio value={EVENT_TYPE.METAVERSE}>Metaverse</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        {eventType === EVENT_TYPE.METAVERSE && <>
                            <Divider />
                            <Row align="middle" justify="space-between" gutter={[16, 16]}>
                                <Col span={12}>
                                    <Typography.Text className="md_text_medium">Select Event Hall</Typography.Text>
                                </Col>
                                <Col span={12}>
                                    <Input
                                        className="w-100"
                                        placeholder="Search"
                                        prefix={<SearchSVG color="#3F65E4" />}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Form.Item
                                name="customerDimensionId"
                                rules={[{ required: !verseSelected, message: "Please Select Event Hall" }]}
                            >
                                <Row
                                    justify="start"
                                    gutter={[12, 0]}
                                    style={{
                                        marginTop: "15px",
                                    }}
                                    className="rows-verses">
                                    {verses?.map((verse) => (
                                        <Col
                                            style={{
                                                opacity: "1",
                                                width: "268px",
                                            }}
                                            key={verse.id}
                                            onClick={() => setVerseSelected(verse.id)}>
                                            <Row gutter={[10, 10]}>
                                                <Col xs={24}>
                                                    <div className={`explore-card ${verseSelected === verse.id && "border-blue"}`} style={{
                                                        position: "relative",
                                                    }}>
                                                        <div className="image-holder">
                                                            <Image
                                                                preview={false}
                                                                src={verse.image || house}
                                                                alt="dimension"
                                                                width="100%"
                                                                height="100%"
                                                                className="explore-card-img"
                                                            />
                                                        </div>
                                                        <div className="image-text-holder" style={{ height: "80px" }}>
                                                            {verse.name && <Typography.Paragraph className="xs_text_medoum" ellipsis style={{ marginBottom: "0" }}>
                                                                {verse.name}
                                                            </Typography.Paragraph>}
                                                            {verse.description && <Typography.Paragraph className="xs_text_regular" ellipsis={{ rows: 2, tooltip: verse.description }}>
                                                                {verse.description}
                                                            </Typography.Paragraph>}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))}
                                </Row>
                            </Form.Item>
                            <div>
                                {verseSelected && dimensionPlacese && dimensionPlacese?.length > 0 && <Form.Item
                                    initialValue={null}
                                    label={"Select Audience Drop Point"}
                                    name="dropPointAudienceName">
                                    <Radio.Group>
                                        <Row gutter={[8, 4]}>
                                            {dimensionPlacese?.map((place) => (
                                                <Col xs={24} lg={8} key={place.name}>
                                                    <Radio value={place.name}>
                                                        <Typography.Text ellipsis>{place.name}</Typography.Text>
                                                    </Radio>
                                                </Col>
                                            ))}
                                            <Col xs={24} lg={8}>
                                                <Radio value={null}>Default</Radio>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </Form.Item>}
                            </div>
                            <div>
                                {verseSelected && dimensionPlacese && dimensionPlacese?.length > 0 && <Form.Item
                                    initialValue={null}
                                    label={"Select Speaker Drop Point"}
                                    name="dropPointSpeakerName">
                                    <Radio.Group>
                                        <Row gutter={[8, 4]}>
                                            {dimensionPlacese?.map((place) => (
                                                <Col xs={24} lg={8} key={place.name}>
                                                    <Radio value={place.name}>
                                                        <Typography.Text ellipsis>{place.name}</Typography.Text>
                                                    </Radio>
                                                </Col>
                                            ))}
                                            <Col xs={24} lg={8}>
                                                <Radio value={null}>Default</Radio>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </Form.Item>}
                            </div>
                        </>}
                    </Col>
                </Row>
            </Form>
            <div style={{ padding: '16px 0 0 0', borderTop: '1px solid #f0f0f0' }}>
                <Row align={"middle"} justify={"end"}>
                    <Col>
                        <Space>
                            <Button onClick={DrawerAPI.close}>Cancel</Button>
                            <Button type='primary' htmlType='submit' form={"AddEventHalls"}>Save</Button>
                        </Space>
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default AddEventHalls