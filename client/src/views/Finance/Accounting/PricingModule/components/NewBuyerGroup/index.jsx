import { Col, Form, Input, Row, Select, Spin, Table } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import CurrencyInput from 'components/common/CurrencyInput';
import { REFUNDABLE_NONREFUNDABLE } from 'constants/BUYER_GROUB';
import React, { useEffect } from 'react'
import useGetBanks from 'services/newSettings/bank/Queries/useGetBanks';
import useGetBuyerGroupByID from 'services/pricingModule/buyerGroup/Queries/useGetBuyerGroupByID';

const NewBuyerGroup = ({ id, isLoading, form }) => {
    const banksList = useGetBanks();
    const bankId = useWatch("bankId", form);
    const buyerGroup = useGetBuyerGroupByID(id);
    useEffect(() => {
        if(buyerGroup.data){
            form.setFieldsValue({...buyerGroup.data})
        }
    } , [buyerGroup.data])

    if (isLoading || buyerGroup.isLoading) {
        return <div className='center-items' style={{ height: "300px" }}>
            <Spin />
        </div>
    }

    return <div>
        <Form form={form} layout='vertical'>
            <div className='mb-1'>
                <Form.Item hidden name={"type"} initialValue={"GENERAL"} />
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item rules={[{ required: true, message: "Enter group name" }]} name="name" label={<p className='sm_text_medium'>Name</p>}>
                            <Input placeholder='Group name' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item rules={[{ required: true, message: "Select group refund type" }]} name="refundable_nonRefundableItems" label={<p className='sm_text_medium'>Refundable / non-refundable items</p>}>
                            <Select
                                placeholder={"Refundable and non-refundable"}
                                options={[
                                    { label: "Non Refundable", value: REFUNDABLE_NONREFUNDABLE.NON_REFUNDABLE_ONLY },
                                    { label: "Refundable", value: REFUNDABLE_NONREFUNDABLE.REFUNDABLE_ONLY },
                                    { label: "Non Refundable / Refundable", value: REFUNDABLE_NONREFUNDABLE.REFUNDABLE_NON_REFUNDABLE },
                                ]} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item rules={[{ required: true, message: "Select group currency" }]} name="currencyCode" label={<p className='sm_text_medium'>Currency</p>}>
                            <CurrencyInput />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("Enter VAT value")
                                        }

                                        if (value && Number(value) < 0) {
                                            return Promise.reject('VAT must be greater than 0');
                                        }
                                        if (value && Number(value) > 100) {
                                            return Promise.reject('VAT must less than 100');
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                            name="vat" label={<p className='sm_text_medium'>VAT%</p>}>
                            <Input type='number' min={0} max={100} addonAfter="%" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            rules={[{ required: true, message: "Select bank account" }]}
                            name="bankId" label={<p className='sm_text_medium'>Bank Account</p>}>
                            <Select
                                disabled={banksList.isLoading}
                                options={banksList?.data?.map(el => ({ label: el.name, value: el.id }))}
                            />
                        </Form.Item>
                    </Col>
                    {bankId &&
                        <Col span={24}>
                            <Table
                                pagination={false}
                                dataSource={banksList?.data?.filter(bank => bank.id === bankId)}
                                columns={[
                                    {
                                        width: "33%",
                                        title: 'Bank name',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        width: "33%",
                                        title: 'Bank Account Number',
                                        dataIndex: 'accountNumber',
                                        key: 'accountNumber',
                                    },
                                    {
                                        width: "33%",
                                        title: 'Options',
                                        dataIndex: 'swift',
                                        key: 'swift',
                                    }
                                ]}
                            />
                        </Col>
                    }
                </Row>
            </div>
        </Form>
    </div>
}

export default NewBuyerGroup