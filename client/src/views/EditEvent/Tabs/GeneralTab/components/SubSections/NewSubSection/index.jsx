import { Button, Col, Divider, Form, Input, message, Row, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import UploadInput from 'components/common/UploadInput';
import React, { useEffect, useState } from 'react'
import useAddEventSection from 'services/event-sections/Mutations/useAddEventSection';
import useEditEventSection from 'services/event-sections/Mutations/useEditEventSection';
import useGetEventSectionById from 'services/event-sections/Queries/useGetEventSectionById';
import { TRAVEL_API_URL } from 'services/travel/config';

const NewSubSection = ({ eventId, id, handelAdd, handelEdit , DrawerAPI }) => {
    const [form] = Form.useForm();
    const eventSection = useGetEventSectionById(id, { enabled: !!id });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (eventSection?.data) {
            console.log(eventSection?.data, "eventSection?.data")
            form.setFieldsValue({
                ...eventSection?.data, image: eventSection?.data?.image ? {
                    "id": Math.random() + "",
                    "name": Math.random() + "",
                    "link": eventSection?.data?.image
                } : undefined
            })
        }
    }, [eventSection?.data])

    const addNewSectionMutation = useAddEventSection(eventId, {
        onSuccess: (res) => {
            handelAdd(res)
            message.success("New sub section added successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to add new sub section");
            console.log(error)
        }
    });

    const editSectionMutation = useEditEventSection(id, {
        onSuccess: (res) => {
            handelEdit({ ...res, id })
            message.success("New sub section updated successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to add new sub section");
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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100dvh - 36px)',
            background: "#fff",
            padding: "1rem",
            border: "1px solid var(--gray-100)",
            borderRadius: "1rem",
        }}>
            <Form layout='vertical' style={{ flexGrow: 1 }} id={"NewSubSection"} onFinish={handelFinish} form={form}>
                <Typography.Title level={4} className='lg_text_semibold' style={{ color: "var(--vbooking-b700)" }}>{id ? "Edit" : "New"} Sub Section</Typography.Title>
                <Divider />
                <Form.Item
                    name={"title"}
                    label={<p className='sm_text_medium'>Title</p>}
                    rules={[{ required: true, message: "Enter section title" }]}
                >
                    <Input placeholder="Sub Section Title" />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label={<p className='sm_text_medium'>Description</p>}
                    rules={[{ required: true, message: "Enter section description" }]}
                >
                    <TextArea rows={10} placeholder="Sub Section Description" />
                </Form.Item>
                <Form.Item name={"image"} label={<p className='sm_text_medium'>Image</p>} style={{ maxWidth: "50%" }}>
                    <UploadInput
                        setUploadingState={setIsUploading}
                        name={"image"}
                        uploadText={"Upload Image"}
                        formatsText={"PNG, JPG or GIF"}
                        action={TRAVEL_API_URL + "common/add-image"}
                    />
                </Form.Item>
            </Form>
            <div style={{ padding: '16px 0 0 0', borderTop: '1px solid #f0f0f0' }}>
                <Row align={"middle"} justify={"end"}>
                    <Col>
                        <Space>
                            <Button onClick={DrawerAPI.close}>Cancel</Button>
                            <Button type='primary' htmlType='submit' form={"NewSubSection"}>Save</Button>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default NewSubSection