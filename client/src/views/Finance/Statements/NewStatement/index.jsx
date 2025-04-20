import { Button, Col, ConfigProvider, DatePicker, Divider, Empty, Form, Input, message, Row, Select, Space, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { ArrowBackSVG } from 'assets/jsx-svg'
import ROUTER_URLS from 'constants/ROUTER_URLS';
import TRANSACTION_TYPE from 'constants/TRANSACTION_TYPE';
import dayjs from 'dayjs';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import useGetOffices from 'services/agencies/Queries/useGetOffices';
import useAddStatement from 'services/agencies/Statements/Mutations/useAddStatement';
import useGetBanks from 'services/newSettings/bank/Queries/useGetBanks';

const NewStatement = ({ officerId, isFullPage, back, isAgent, DrawerAPI }) => {
    const [form] = useForm();
    const transactiontype = Form.useWatch("transactiontype", form);
    const banks = useGetBanks();
    const offices = useGetOffices();
    console.log('officerId , isAgent', officerId, isAgent)
    const navigate = useNavigate();
    const addStatementMutation = useAddStatement({
        onSuccess: () => {
            message.success("Statement added successfully");
            back();
        },
        onError: (error) => {
            message.error("Something went wrong");
            console.log(error)
        }
    })

    const handelFinish = (values) => {
        addStatementMutation.mutate({
            ...values,
            date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : undefined
        });
    }

    return (
        <div>
            <ConfigProvider theme={{
                "components": {
                    "DatePicker": {
                        "cellHeight": 18,
                        "cellWidth": 24
                    }
                }
            }}>
                {!isFullPage ? <Space>
                    <Button
                        style={{ height: "36px", width: "36px" }}
                        icon={<ArrowBackSVG />}
                        onClick={back}
                    />
                    <span className='fz-18 fw-500' style={{ color: "var(--gray-700)" }}>Back</span>
                </Space> : <span className='fz-18 fw-500' style={{ color: "var(--gray-700)" }}>{isAgent ? "Request New Statement" : "New Statement"}</span>}
                {isFullPage && <Divider />}
                <Form form={form} layout='vertical' onFinish={handelFinish}>
                    <div>
                        <Row gutter={[16, 0]} className='mt-1'>
                            {officerId && <Form.Item hidden name="officerId" initialValue={officerId} />}
                            {(!officerId && !isAgent) && <Col lg={isFullPage ? 24 : 12} md={24}>
                                <Form.Item
                                    name={"officerId"}
                                    label={<span className='sm_text_medium'>Officer</span>}
                                    rules={[{ required: true, message: 'Select officer' }]}
                                >
                                    <Select
                                        placeholder='officer'
                                        disabled={banks?.isLoading}
                                        showSearch
                                        notFoundContent={<Empty
                                            description={<div>
                                                <p className={"fz-14 fw-400"}>No officers found</p>
                                                <p className={"fz-12 fw-400"}>you can start add agencies by <span
                                                    style={{
                                                        color: "#3F65E4",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        back();
                                                        navigate(ROUTER_URLS.CRM.AGENCIES);
                                                    }}
                                                >click here</span> OR you can add suppliers by<span
                                                    style={{
                                                        color: "#3F65E4",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        back();
                                                        navigate(ROUTER_URLS.CRM.SUPPLIERS);
                                                    }}
                                                > click here</span></p>
                                            </div>}
                                        />}
                                        options={offices?.data?.data?.map(el => ({
                                            label: el?.companyName, value: el?.id
                                        }))}
                                    />
                                </Form.Item>
                            </Col>}
                            <Col lg={isFullPage ? 24 : 12} md={24}>
                                <Form.Item

                                    name={"transactiontype"}
                                    label={<span className='sm_text_medium'>Transaction Type</span>}
                                    rules={[{ required: true, message: 'Select transaction type' }]}
                                >
                                    <Select placeholder="Transaction Type" >
                                        <Select.Option value={TRANSACTION_TYPE.BANK_TRANSFER}>Bank transfer</Select.Option>
                                        <Select.Option value={TRANSACTION_TYPE.CREDIT_CARD}>Credit card</Select.Option>
                                        <Select.Option value={TRANSACTION_TYPE.CASH}>Cash</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col lg={isFullPage ? 24 : 12} md={24}>
                                <Form.Item
                                    name={"amount"}
                                    label={<span className='sm_text_medium'>Amount</span>}
                                    rules={[
                                        {
                                            validator: (_, value) => {
                                                if (!value) {
                                                    return Promise.reject("Enter transaction amount")
                                                }

                                                if (value < 0) {
                                                    return Promise.reject("Enter valid amount")
                                                }

                                                return Promise.resolve()
                                            }
                                        }
                                    ]}
                                >
                                    <Input type={"number"} prefix={"$"} />
                                </Form.Item>
                            </Col>
                            <Col lg={officerId ? 12 : 24} md={24}>
                                <Form.Item
                                    name={"comments"}
                                    label={<span className='sm_text_medium'>Comments</span>}
                                >
                                    <Input placeholder='comments ...' />
                                </Form.Item>
                            </Col>
                            <Col lg={isFullPage ? 24 : 12} md={24}>
                                <Form.Item
                                    name={"confirmedBy"}
                                    label={<span className='sm_text_medium'>Confirmed by</span>}
                                    rules={[{ required: true, message: 'Who confirmed the statement?' }]}
                                >
                                    <Input placeholder='confirmed by.' />
                                </Form.Item>
                            </Col>
                            {transactiontype === TRANSACTION_TYPE.BANK_TRANSFER && <>
                                <Col span={24} className='mt-1'>
                                    <p className='lg_text_medium'>Bank Transfer</p>
                                </Col>
                                <Col lg={isFullPage ? 24 : 12} md={24}>
                                    <Form.Item
                                        name={"date"}
                                        label={<span className='sm_text_medium'>Date</span>}
                                        rules={[{ required: true, message: 'Enter bank transfer date' }]}
                                    >
                                        <DatePicker placeholder='transfer date' className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col lg={isFullPage ? 24 : 12} md={24}>
                                    <Form.Item
                                        name={"companyName"}
                                        label={<span className='sm_text_medium'>Company Name</span>}
                                        rules={[{ required: true, message: 'Enter company name' }]}
                                    >
                                        <Input placeholder='company name' />
                                    </Form.Item>
                                </Col>
                                <Col lg={isFullPage ? 24 : 12} md={24}>
                                    <Form.Item
                                        name={"bankAmount"}
                                        label={<span className='sm_text_medium'>Amount</span>}
                                        rules={[{
                                            validator: (_, value) => {
                                                if (!value) {
                                                    return Promise.reject("Enter transaction amount")
                                                }

                                                if (value < 0) {
                                                    return Promise.reject("Enter valid amount")
                                                }

                                                return Promise.resolve();
                                            }
                                        }]}>
                                        <Input type={"number"} prefix={"$"} />
                                    </Form.Item>
                                </Col>
                                <Col lg={isFullPage ? 24 : 12} md={24}>
                                    <Form.Item
                                        name={"bankaccount"}
                                        label={<span className='sm_text_medium'>Bank Account</span>}
                                        rules={[{ required: true, message: 'Select bank account' }]}
                                    >
                                        <Select
                                            placeholder='bank account'
                                            disabled={banks?.isLoading}
                                            notFoundContent={<Empty
                                                description={<div>
                                                    <p className={"fz-14 fw-400"}>No bank accounts found</p>
                                                    <p className={"fz-12 fw-400"}>you can start add banks account by <span
                                                        style={{
                                                            color: "#3F65E4",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => {
                                                            back();
                                                            navigate("/data-management/banks");
                                                        }}
                                                    >click here</span></p>
                                                </div>}
                                            />}
                                            options={banks?.data?.map(el => ({
                                                label: el?.name, value: el?.id
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                            </>}
                            {transactiontype === TRANSACTION_TYPE.CREDIT_CARD && <>
                                <Col span={24} className='mt-1'>
                                    <p className='lg_text_medium'>Credit Card Transfer</p>
                                </Col>
                                <Col lg={isFullPage ? 24 : 12} md={24}>
                                    <Form.Item
                                        name={"transactionId"}
                                        label={<span className='sm_text_medium'>Transaction ID</span>}
                                        rules={[{ required: true, message: 'Enter transaction ID' }]}
                                    >
                                        <Input placeholder='transaction ID' className="w-100" />
                                    </Form.Item>
                                </Col>
                                <Col lg={isFullPage ? 24 : 12} md={24}>
                                    <Form.Item
                                        name={"lastFourDigitCreditCard"}
                                        label={<span className='sm_text_medium'>Credit card last 4 digits</span>}
                                        rules={[
                                            {
                                                validator: (_, value) => {
                                                    if (!value) {
                                                        return Promise.reject("Enter last 4 digits")
                                                    }

                                                    if (String(value).length !== 4) {
                                                        return Promise.reject("Enter valid last 4 digits")
                                                    }

                                                    if (isNaN(value)) {
                                                        return Promise.reject("Enter valid last 4 digits")
                                                    }

                                                    return Promise.resolve();
                                                }
                                            }]}
                                    >
                                        <Input type='number' max={9999} maxLength={4} minLength={4} placeholder='last 4 digits' />
                                    </Form.Item>
                                </Col>
                            </>}
                        </Row>
                        <Space align='center' style={{ justifyContent: "flex-end" }}>
                            <Button type="default" onClick={DrawerAPI?.close}>Cancel</Button>
                            <Button
                                type={"primary"}
                                htmlType='submit'
                                disabled={addStatementMutation.isPending}>{addStatementMutation.isPending ? <Spin /> : "Add"}</Button>
                        </Space>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    )
}

export default NewStatement