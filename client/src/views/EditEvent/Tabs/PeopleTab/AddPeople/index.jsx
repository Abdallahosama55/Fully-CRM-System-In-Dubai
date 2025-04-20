import { Button, Col, Divider, Form, Input, message, Row, Select, Space, Tag, Typography, Upload } from 'antd'
import { useWatch } from 'antd/es/form/Form'
import { ArrowDownSVG, DeleteSVG, ImagesSVG, PluseSVG } from 'assets/jsx-svg'
import CityInput from 'components/common/CityInput'
import EVENT_PEOPLE_TYPES from 'constants/EVENT_PEOPLE_TYPES'
import React, { useEffect, useRef, useState } from 'react'
import { API_BASE } from 'services/config'
// style
import "./styles.css"
import isValidJson from 'utils/isValidJson'
import useGetEventParticipantById from 'services/event-participant/Queries/useGetEventParticipantById'
import useAddEventParticipant from 'services/event-participant/Mutations/useAddEventParticipant'
import useEditEventParticipant from 'services/event-participant/Mutations/useEditEventParticipant'
const AddPeople = ({ eventId, id, handelAdd = () => { }, handelEdit = () => { } , DrawerAPI }) => {
    const [form] = Form.useForm();
    const image = useWatch("image", form);
    const fileInputRef = useRef(null);

    useEffect(() => {
        DrawerAPI.setRootClassName("gray_bg_drawer")
    }, [])

    const eventParticipant = useGetEventParticipantById({ id, eventId }, { enabled: !!id && !!eventId });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (eventParticipant?.data) {
            form.setFieldsValue({
                ...eventParticipant?.data, image: eventParticipant?.data?.image ? {
                    file: {
                        response: {
                            uploadedFiles: {
                                image: eventParticipant?.data?.image
                            }
                        }
                    }
                } : undefined,
                skills: eventParticipant?.data?.skills ? eventParticipant?.data?.skills?.split(", ") : [],
                interests: eventParticipant?.data?.interests ? eventParticipant?.data?.interests?.split(", ") : [],
            })
        }
    }, [eventParticipant?.data])

    const addNewParticipantMutation = useAddEventParticipant(eventId, {
        onSuccess: (res) => {
            handelAdd(res)
            message.success("New Attendee added successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to add new Attendee");
            console.log(error)
        }
    });

    const editParticipantMutation = useEditEventParticipant({ eventId, id }, {
        onSuccess: (res) => {
            handelEdit({ ...res, id })
            message.success("New Attendee updated successfully")
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error(error.message || "Failed to updated Attendee");
            console.log(error)
        }
    });

    const handelFinish = (values) => {
        if (isUploading) {
            message.error("Please wait while image is uploading")
            return
        }

        const temp = {
            ...values,
            image: values?.image?.file?.response?.uploadedFiles?.image,
            city: values?.city ? values?.city?.city : "",
            skills: values?.skills && values?.skills.length > 0 ? values?.skills?.map(skill => skill.replaceAll(",", " ")).join(", ") : "",
            interests: values?.interests && values?.interests.length > 0 ? values?.interests?.map(interest => interest.replaceAll(",", " ")).join(", ") : "",
        }
        console.log(temp)

        if (id) {
            editParticipantMutation.mutate(temp)
        } else {
            addNewParticipantMutation.mutate(temp)
        }
    }
    return (
        <div className="add_people" style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100dvh - 36px)',
            background: "#fff",
            padding: "1rem",
            border: "1px solid var(--gray-100)",
            borderRadius: "1rem"
        }}>
            <Form layout='vertical' style={{ flexGrow: 1 }} id={"NewPartner"} onFinish={handelFinish} form={form}>
                <Typography.Title level={4} className='lg_text_semibold' style={{ color: "var(--vbooking-b700)" }}>{id ? "Edit" : "Add New"} Attendee</Typography.Title>
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Space>
                            <Form.Item name={"image"}>
                                <Upload
                                    name="image"
                                    listType="picture-circle"
                                    showUploadList={false}
                                    action={API_BASE + `common/upload-file`}
                                    disabled={image?.file?.status === "uploading"}
                                >
                                    <div ref={fileInputRef} className='center-items'>
                                        {image?.file?.response?.uploadedFiles?.image ? <img
                                            style={{ width: "70px", height: '70px', borderRadius: '50%' }}
                                            src={image?.file?.response?.uploadedFiles?.image} alt="" /> : <PluseSVG />}
                                    </div>
                                </Upload>
                            </Form.Item>
                            <div>
                                <p>Attendee Avatar</p>
                                <p style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                                    <span
                                        className='button_with_icon'
                                        style={{ color: "#3A5EE3" }}
                                        onClick={() => fileInputRef.current?.click()}><ImagesSVG color="#3A5EE3" /> Update</span>
                                    {image?.file?.response?.uploadedFiles?.image &&
                                        <span
                                            className='button_with_icon'
                                            style={{ color: "#DB4F40" }}
                                            onClick={() => form.setFieldValue("image", undefined)}><DeleteSVG color={"#DB4F40"} /> Delete</span>
                                    }
                                </p>
                            </div>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"name"}
                            label={<p className='sm_text_medium'>Name</p>}
                            rules={[{ required: true, message: "Enter Attendee name" }]}
                        >
                            <Input placeholder="Attendee name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"email"}
                            label={<p className='sm_text_medium'>Email</p>}
                            rules={[{ required: true, message: "Enter Attendee email" }, { type: "email", message: "Enter valid email" }]}
                        >
                            <Input placeholder="Attendee email" type={"email"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"city"}
                            label={<p className='sm_text_medium'>City</p>}
                        >
                            <CityInput placeholder="Attendee city" suffixIcon={<ArrowDownSVG />} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"jobTitle"}
                            label={<p className='sm_text_medium'>job</p>}
                        >
                            <Select
                                placeholder="Attendee job"
                                suffixIcon={<ArrowDownSVG />}
                                showSearch
                                options={[
                                    { label: "Developer", value: "Developer" },
                                    { label: "Designer", value: "Designer" },
                                    { label: "Project Manager", value: "Project Manager" },
                                    { label: "Software Engineer", value: "Software Engineer" },
                                    { label: "Product Manager", value: "Product Manager" },
                                    { label: "Data Scientist", value: "Data Scientist" },
                                    { label: "Marketing Specialist", value: "Marketing Specialist" },
                                    { label: "Sales Executive", value: "Sales Executive" },
                                    { label: "HR Manager", value: "HR Manager" },
                                    { label: "Consultant", value: "Consultant" },
                                    { label: "Business Analyst", value: "Business Analyst" },
                                    { label: "Accountant", value: "Accountant" },
                                    { label: "Graphic Designer", value: "Graphic Designer" },
                                    { label: "Mechanical Engineer", value: "Mechanical Engineer" },
                                    { label: "Electrical Engineer", value: "Electrical Engineer" },
                                    { label: "Architect", value: "Architect" },
                                    { label: "Content Writer", value: "Content Writer" },
                                    { label: "Research Scientist", value: "Research Scientist" },
                                    { label: "Operations Manager", value: "Operations Manager" },
                                    { label: "Teacher", value: "Teacher" },
                                    { label: "Doctor", value: "Doctor" },
                                    { label: "Nurse", value: "Nurse" },
                                    { label: "Lawyer", value: "Lawyer" },
                                    { label: "Financial Analyst", value: "Financial Analyst" },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"skills"}
                            label={<p className='sm_text_medium'>Skills</p>}
                        >
                            <Select
                                placeholder="Attendee job"
                                suffixIcon={<></>}
                                mode='tags'
                                tagRender={(tag) => <Tag onClose={tag?.onClose} closable>{tag?.label}</Tag>}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"interests"}
                            label={<p className='sm_text_medium'>Interests</p>}
                        >
                            <Select
                                placeholder="Attendee interests"
                                suffixIcon={<></>}
                                mode='tags'
                                tagRender={(tag) => <Tag onClose={tag?.onClose} closable>{tag?.label}</Tag>}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={"type"}
                            label={<p className='sm_text_medium'>Type</p>}
                        >
                            <Select
                                placeholder="Attendee type"
                                options={[
                                    { label: "Attendee", value: EVENT_PEOPLE_TYPES.ATEENDEE },
                                    { label: "Blocked", value: EVENT_PEOPLE_TYPES.BLOCKED },
                                    { label: "Expositor", value: EVENT_PEOPLE_TYPES.EXPOSITOR },
                                    { label: "Speakers", value: EVENT_PEOPLE_TYPES.SPEAKER },
                                    { label: "Sponsors", value: EVENT_PEOPLE_TYPES.SPONSOR },
                                    { label: "Users", value: EVENT_PEOPLE_TYPES.USER },
                                    { label: "Vip", value: EVENT_PEOPLE_TYPES.VIP },
                                ]}
                                suffixIcon={<ArrowDownSVG />}
                            />
                        </Form.Item>
                    </Col>
                    {/* <Form.Item name={"image"} label={<p className='sm_text_medium'>Image</p>} style={{ maxWidth: "100%" }}>
                        <UploadInput
                            setUploadingState={setIsUploading}
                            name={"image"}
                            uploadText={"Upload Image"}
                            formatsText={"PNG, JPG or GIF"}
                            action={TRAVEL_API_URL + "common/add-image"}
                        />
                    </Form.Item> */}
                </Row>
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

export default AddPeople