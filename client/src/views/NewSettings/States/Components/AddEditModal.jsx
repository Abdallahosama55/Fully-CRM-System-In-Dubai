import React from 'react'
import {
    Button,
    Modal,
    Form,
    Input,
    Switch,
    Select
} from "antd";
export default function AddEditModal({ form, onFinish, isAddEditStateModalOpen, handleAddNewStateModalCancel, isEditAction, CountryList }) {

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) => {
        console.log("input-->>", input);
        console.log("option-->>", option);
        return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())

    }


    return (
        <Modal centered={true} width={400} title={null} open={isAddEditStateModalOpen} onCancel={handleAddNewStateModalCancel} footer={null}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {isEditAction ?
                    <span>Edit </span> :
                    <span>Add New </span>
                }
                State
            </h3>

            <Form
                requiredMark="optional"
                form={form}

                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    labelCol={{ span: 24 }}  // Default label column width
                    wrapperCol={{ span: 24, }}
                    // label="Countries"
                    label={
                        <span>
                            Countries
                            <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                        </span>
                    }
                    name="country_id"
                    rules={[
                        {
                            required: true,
                            message: "Please select a country"

                        },
                    ]} >
                    <Select
                        showSearch
                        filterOption={filterOption}
                    >
                        {CountryList.map(country => (
                            <Select.Option key={country.id} value={country.id}>{country.country_name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item

                    labelCol={{ span: 24 }}  // Default label column width
                    wrapperCol={{ span: 24, }}  // Default wrapper (input) column width
                    name="state_name"
                    label={
                        <span>
                            State
                            <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Please enter state name"
                        },
                        {
                            type: 'string',
                            min: 3,
                            message: "state name must be at least 3 characters"
                        },
                    ]}
                >
                    <Input placeholder="State name" />
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

                        <Button size="small" style={{ width: '48%' }} block onClick={handleAddNewStateModalCancel}>Cancel</Button>
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
