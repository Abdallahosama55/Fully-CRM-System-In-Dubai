import React from 'react'
import {
    Button,
    Modal,
    Form,
    Input,
    Switch
} from "antd";
export default function AddEditModal({ form, onFinish, isAddEditJobTitleModalOpen, handleAddNewJobTitleModalCancel, isEditAction }) {
    return (
        <Modal centered={true} width={400} title={null} open={isAddEditJobTitleModalOpen} onCancel={handleAddNewJobTitleModalCancel} footer={null}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {isEditAction ?
                    <span>Edit </span> :
                    <span>Add New </span>
                }
                Job Title
            </h3>

            <Form
                requiredMark="optional"
                form={form}

                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item

                    labelCol={{ span: 24 }}  // Default label column width
                    wrapperCol={{ span: 24, }}  // Default wrapper (input) column width
                    name="title"
                    label={
                        <span>
                            Job Title
                            <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'string',
                            min: 2,
                        },
                    ]}
                >
                    <Input placeholder="job title name" />
                </Form.Item>
                {isEditAction &&
                    <Form.Item
                        label={
                            <span>
                                Status
                                <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                            </span>
                        }
                        rules={[{ required: true, message: 'This field is required' }]}
                        colon={false}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        name="status"
                        valuePropName="checked">
                        <Switch style={{ float: "right" }} />
                    </Form.Item>
                }

                <Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                        <Button size="small" style={{ width: '48%' }} block onClick={handleAddNewJobTitleModalCancel}>Cancel</Button>
                        <span style={{ width: 5 }}></span>
                        <Button size="small" htmlType="submit" className="btn-add" style={{ width: '48%' }}>
                            {isEditAction ?
                                <span>Edit</span> :
                                <span>Add</span>
                            }
                        </Button>

                    </div>
                </Form.Item>
            </Form>

        </Modal>
    )
}
