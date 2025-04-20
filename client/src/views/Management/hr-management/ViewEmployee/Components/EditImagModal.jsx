import React, { useState } from 'react'
import {
    Button,
    Modal,
    Form,
    Input,
    Switch,
    Select
} from "antd";
import './style.css';
import AvatarUpload from './AvatarUpload/index';
export default function EditImagModal({ form, jobTitleList, isEditModalOpen, handleEditModalCancel }) {
    const onFinish = (values) => {
        console.log("valuessss->", values);
    }
    return (
        <Modal centered={true} width={400} title={null} open={isEditModalOpen} onCancel={handleEditModalCancel} footer={null}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>

                <span style={{ fontSize: '15px', fontWeight: 'bold' }}>Edit Employee</span>
            </h3>

            <Form
                requiredMark="optional"
                form={form}
                size='small'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item name="avatar" label="" className='avater-label'>
                    <AvatarUpload />
                </Form.Item>
                <Form.Item

                    labelCol={{ span: 24 }}  // Default label column width
                    wrapperCol={{ span: 24, }}  // Default wrapper (input) column width
                    name="full_name"
                    label={
                        <span style={{ fontWeight: 'bold' }}>
                            Full Name
                            <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Full Name'
                        },
                    ]}
                >
                    <Input placeholder="Write here" />
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 24 }}  // Default label column width
                    wrapperCol={{ span: 24, }}  // Default wrapper (input) column width
                    label={
                        <span style={{ fontWeight: 'bold' }}>
                            Job Title
                            <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                        </span>
                    }
                    name='job_title'
                    rules={[
                        {
                            required: true,
                            message: 'Please select Job Title'

                        },
                    ]}
                >
                    <Select placeholder="select" style={{ textAlign: 'left' }}>
                        {jobTitleList.map(jobTitle => (
                            <Select.Option key={jobTitle.id} value={jobTitle.id}>{jobTitle.name}</Select.Option>
                        ))}

                    </Select>
                </Form.Item>
                <Form.Item
                    label={
                        <span style={{ fontWeight: 'bold' }}>
                            Status
                            <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                        </span>
                    }

                    colon={false}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    name="status"
                    valuePropName="checked">
                    <Switch style={{ float: "right" }} />
                </Form.Item>


                <Form.Item>



                    <Button size="small" htmlType="submit" className="btn-add" style={{ width: '100%' }}>

                        <span>Save</span>

                    </Button>


                </Form.Item>
            </Form>

        </Modal>
    )
}
