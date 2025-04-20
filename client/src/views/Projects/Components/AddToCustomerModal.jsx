import React, { useEffect, useState } from 'react'
import {
    Button,
    Modal,
    Form,
    Input,
    Switch,
    Image
} from "antd";
import "../../Projects/styles.css";

export default function AddToCustomerModal({ form, onFinish, isAddToCustomerModalOpen, handleAddToCustomerModalCancel, }) {

    return (
        <Modal centered={true} width={400} title={null} open={isAddToCustomerModalOpen} onCancel={handleAddToCustomerModalCancel} footer={null}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: 20 }}>
                Add to customer
            </h3>

            <Form
                requiredMark="optional"
                form={form}
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item

                    name={'email'}
                    label="Email"
                    rules={[
                        {
                            type: 'email',

                            message: "Please write a valid email"
                        },
                        {

                            required: true,
                            message: "Email is required"
                        },
                    ]}
                >
                    <Input placeholder='Write email here' />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                        <Button size="small" style={{ width: '48%' }} block onClick={handleAddToCustomerModalCancel}>Cancel</Button>
                        <span style={{ width: 5 }}></span>
                        <Button size="small" htmlType="submit" className="btn-add" style={{ width: '48%' }}>
                            Add
                        </Button>

                    </div>
                </Form.Item>
            </Form>

        </Modal>
    )
}
