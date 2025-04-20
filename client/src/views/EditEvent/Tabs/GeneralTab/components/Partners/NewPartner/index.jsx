import { Button, Col, Divider, Form, Input, message, Row, Space, Typography } from 'antd';
import UploadInput from 'components/common/UploadInput';
import React, { useEffect, useState } from 'react'
import useAddEventPartner from 'services/event-partners/Mutations/useAddEventPartner';
import useEditEventPartner from 'services/event-partners/Mutations/useEditEventPartner';
import useGetEventPartnerById from 'services/event-partners/Queries/useGetEventPartnerById';
import { TRAVEL_API_URL } from 'services/travel/config';

const NewPartner = ({ eventId, id, handelAdd, handelEdit  , DrawerAPI}) => {
    const [form] = Form.useForm();
    const eventPartner = useGetEventPartnerById(id, { enabled: !!id });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (eventPartner?.data) {
            console.log(eventPartner?.data, "eventPartner?.data")
            form.setFieldsValue({
                ...eventPartner?.data, image: eventPartner?.data?.image ? {
                    "id": Math.random() + "",
                    "name": Math.random() + "",
                    "link": eventPartner?.data?.image
                } : undefined
            })
        }
    }, [eventPartner?.data])

    const addNewPartnerMutation = useAddEventPartner(eventId, {
        onSuccess: (res) => {
            handelAdd(res)
            message.success("New Partner added successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to add new Partner");
            console.log(error)
        }
    });

    const editPartnerMutation = useEditEventPartner(id, {
        onSuccess: (res) => {
            handelEdit({ ...res, id })
            message.success("New Partner updated successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to updated Partner");
            console.log(error)
        }
    });

    const handelFinish = (values) => {
        if (isUploading) {
            message.error("Please wait while image is uploading")
            return
        }

        if (id) {
            editPartnerMutation.mutate({ ...values, image: values?.image?.link })
        } else {
            addNewPartnerMutation.mutate({ ...values, image: values?.image?.link })
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
            borderRadius: "1rem"
        }}>
            <Form layout='vertical' style={{ flexGrow: 1 }} id={"NewPartner"} onFinish={handelFinish} form={form}>
                <Typography.Title level={4} className='lg_text_semibold' style={{ color: "var(--vbooking-b700)" }}>{id ? "Edit" : "New"} Partner</Typography.Title>
                <Divider />
                <Form.Item
                    name={"name"}
                    label={<p className='sm_text_medium'>name</p>}
                    rules={[{ required: true, message: "Enter partner name" }]}
                >
                    <Input placeholder="Partner name" />
                </Form.Item>
                <Form.Item
                    name={"website"}
                    label={<p className='sm_text_medium'>Website</p>}
                    rules={[{ required: true, message: "Enter partner website" }]}
                >
                    <Input placeholder="Partner website" />
                </Form.Item>
                <Form.Item name={"image"} label={<p className='sm_text_medium'>Image</p>} style={{ maxWidth: "100%" }}>
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
                            <Button type='primary' htmlType='submit' form={"NewPartner"}>Save</Button>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default NewPartner