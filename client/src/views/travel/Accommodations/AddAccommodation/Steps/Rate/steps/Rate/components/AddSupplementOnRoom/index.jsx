import { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Col, Form, Input, Row, Select, Typography } from 'antd';
import CustomButton from 'components/common/Button';
// style
import "./styles.css";

const SUPPLEMENT_VALUE_TYPES = {
    FIXED: "fixed",
    PERCANTAGE: "per"
}

const AddSupplementOnRoom = ({
    data,
    onAdd = () => { },
    onEdit = () => { },
    DrawerAPI
}) => {
    const [form] = useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
            });
        }
    }, [data])

    const onFinish = () => {
        form.validateFields()
            .then(() => {
                if (data) {
                    onEdit({
                        ...data,
                        ...form.getFieldsValue()
                    })
                } else {
                    onAdd({
                        ...form.getFieldsValue(),
                    })
                }
                DrawerAPI.close()
            })
    };

    return (
        <div className='add_suplement'>
            <Typography.Text className="fz-18 fw-600">{!data ? "Add" : "Edit"} Supplement On Room</Typography.Text>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className='mt-1'>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Form.Item
                                name="value"
                                label="Value"
                                rules={[
                                    { required: true, message: 'Add supplement value' },
                                    {
                                        validator: (_, value) => {
                                            if (value < 0) {
                                                return Promise.reject('Value can\'t be less than 0');
                                            }

                                            if (value > 100 && form.getFieldValue("type") === SUPPLEMENT_VALUE_TYPES.PERCANTAGE) {
                                                return Promise.reject('Percantage value can not be grater than 100%');
                                            }

                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input type='number' placeholder='value' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Select supplement value type' }]}
                            >
                                <Select placeholder="type">
                                    <Select.Option value={SUPPLEMENT_VALUE_TYPES.FIXED}>fixed amount</Select.Option>
                                    <Select.Option value={SUPPLEMENT_VALUE_TYPES.PERCANTAGE}>percentage</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="note"
                                label="Note"
                                rules={[
                                    { required: true, message: 'Add notes on supplement' },
                                ]}
                            >
                                <Input.TextArea rows={5} placeholder='note ..' />
                            </Form.Item>
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

export default AddSupplementOnRoom