import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'antd/es/form/Form';
import { Col, Form, Input, Radio, Row, Select, Typography } from 'antd';
import CustomButton from 'components/common/Button';
// style
import "./styles.css";
import { useDrawer } from 'hooks/useDrawer';

export const APPLICABLE_ON = {
    CHILD: 0,
    ADULT: 1
}

export const APPLICABLE_FOR = {
    ALL: 'all',
    ON_PERSON: "on_person",
}

const AddSupplementOnOccupation = ({
    data,
    onAdd = () => { },
    onEdit = () => { },
    DrawerAPI
}) => {
    const [form] = useForm();
    const applicableFor = useWatch("applicableFor", form)
    const applicableOn = useWatch("applicableOn", form)
    const minAge = useWatch("minAge", form)
    const [onPersonNo, setOnPersonNo] = useState("");

    useEffect(() => {
        if (data) {
            if (data.onPersonNo) {
                setOnPersonNo(data.onPersonNo ? data.onPersonNo : undefined)
            }

            form.setFieldsValue({
                ...data,
            });
        }
    }, [data])

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                if (data) {
                    onEdit({
                        ...data,
                        ...values,
                    })
                } else {
                    onAdd({
                        ...values,
                    })
                }
                DrawerAPI.close()
            }).catch(() => { })
    };

    return (
        <div className='add_suplement'>
            <Typography.Text className="fz-18 fw-600 mb-1">{!data ? "Add" : "Edit"} Supplements / Reductions On Occupancy</Typography.Text>
            <Form form={form} layout="vertical" onFinish={onFinish} className="travel_drawer_container">
                <div className='mt-1'>
                    <Row gutter={[20, 15]}>
                        <Col span={8}>
                            <Form.Item
                                name="plus_minus"
                                label="Plus / Minus"
                                rules={[{ required: true, message: 'Select supplement type' }]}
                            >
                                <Select placeholder="+ / -">
                                    <Select.Option value="plus">Plus</Select.Option>
                                    <Select.Option value="minus">Minus</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="value"
                                label="Value"
                                required
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject('Add supplement value')
                                            }

                                            if (value < 0) {
                                                return Promise.reject("Value can't be less than 0")
                                            }

                                            return Promise.resolve()
                                        }
                                    },
                                ]}
                            >
                                <Input type='number' placeholder='5 USD' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Select value type' }]}
                            >
                                <Select placeholder="fixed amount">
                                    <Select.Option value="Fixed">fixed amount</Select.Option>
                                    <Select.Option value="Per">percentage</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Typography.Title level={5} className='fz-16 fw-600'>If the occupancy is</Typography.Title>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="adult"
                                label="Adult"
                                required
                                initialValue={1}
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Add adult's number")
                                            }

                                            if (value < 1) {
                                                return Promise.reject("Adult's number can't be less than 1")
                                            }

                                            return Promise.resolve()
                                        }
                                    }
                                ]}
                            >
                                <Input min={1} type="number" placeholder='adult' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="kids"
                                label="Children"
                                required
                                initialValue={0}
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value && value !== 0) {
                                                return Promise.reject("Add children's number")
                                            }

                                            if (value < 0) {
                                                return Promise.reject("Children's number can't be less than 0")
                                            }

                                            return Promise.resolve()
                                        }
                                    }
                                ]}
                            >
                                <Input min={0} type="number" placeholder='children' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="applicableOn"
                                label="Applicable On"
                                rules={[{ required: true, message: 'Applicable on type' }]}
                            >
                                <Select placeholder="Adult / child">
                                    <Select.Option value={APPLICABLE_ON.ADULT}>Adult</Select.Option>
                                    <Select.Option value={APPLICABLE_ON.CHILD}>Child</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            {applicableOn === APPLICABLE_ON.CHILD && <Row gutter={20}>
                                <Col span={12}>
                                    <Form.Item
                                        name="minAge"
                                        required
                                        label="Min children age"
                                        rules={[
                                            {
                                                validator: (_, value) => {
                                                    if (!value) {
                                                        return Promise.reject("Add minimum age")
                                                    }

                                                    if (value < 0) {
                                                        return Promise.reject("Minimum age can't be less than 0")
                                                    }

                                                    return Promise.resolve()
                                                }
                                            }
                                        ]}
                                    >
                                        <Input type="number" placeholder='min age' min={0} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="maxAge"
                                        label={"Max children age"}
                                        required
                                        rules={[
                                            {
                                                validator: (_, value) => {
                                                    if (!value) {
                                                        return Promise.reject("Add maximum age")
                                                    }

                                                    if (Number(value) < 0) {
                                                        return Promise.reject("Maximum age can't be less than 0")
                                                    }

                                                    if (Number(value) < Number(minAge)) {
                                                        return Promise.reject("Maximum age can't be less than min minimum")
                                                    }

                                                    return Promise.resolve()
                                                }
                                            }
                                        ]}
                                    >
                                        <Input type="number" placeholder='max age' min={0} />
                                    </Form.Item>
                                </Col>
                            </Row>}
                        </Col>
                        <Col span={24}>
                            <Typography.Title level={5}>Applicable for</Typography.Title>
                        </Col>
                        <Col span={24}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div>
                                    <Form.Item
                                        name="applicableFor"
                                        rules={[
                                            { required: true, message: "Please select applicable for type" },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value={APPLICABLE_FOR.ALL}>Every person</Radio>
                                            <Radio value={APPLICABLE_FOR.ON_PERSON}>Or on person no.</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    name="onPersonNo"
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                if (applicableFor !== APPLICABLE_FOR.ON_PERSON) {
                                                    return Promise.resolve();
                                                }
                                                if (!value) {
                                                    return Promise.reject("Add on person number")
                                                }

                                                if (value < 0) {
                                                    return Promise.reject("On person number can't be less than 0")
                                                }

                                                if (Number(value) === "") {
                                                    return Promise.reject("You have to fill on person number field")
                                                }

                                                if (applicableOn === APPLICABLE_ON.CHILD && Number(value) > Number(form.getFieldValue("kids"))) {
                                                    return Promise.reject("On person number can not be grater than number of childrens")
                                                }

                                                if (applicableOn === APPLICABLE_ON.ADULT && Number(value) > Number(form.getFieldValue("adult"))) {
                                                    return Promise.reject("On person number can not be grater than number of adults")
                                                }

                                                return Promise.resolve()
                                            }
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={applicableFor !== APPLICABLE_FOR.ON_PERSON}
                                        type="number"
                                        style={{ maxWidth: "100px" }}
                                        placeholder='0'
                                        min={0}
                                    />
                                </Form.Item>

                            </div>
                        </Col>
                    </Row>
                </div>
                <CustomButton
                    className='add_supplement_btn'
                    htmlType="submit"
                    color='dark'
                >{data ? "Edit" : "Add"} Supplement</CustomButton>
            </Form >
        </div >
    )
}

export default AddSupplementOnOccupation