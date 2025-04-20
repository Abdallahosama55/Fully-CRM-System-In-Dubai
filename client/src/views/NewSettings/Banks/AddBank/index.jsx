import { Button, Form, Input, message, Space, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import useAddBank from 'services/newSettings/bank/Mutations/useAddBank';
import useEditBank from 'services/newSettings/bank/Mutations/useEditBank';
import useGetBankById from 'services/newSettings/bank/Queries/useGetBankById';
/*
{
    "id": 3,
    "name": "John Doe",
    "branch": "PAL",
    "swift": "ABC123XYZ",
    "accountNumber": "1234567890",
    "iban": "PAL983223425",
    "beneficiaryName": "John Doe",
    "createdAt": "2024-09-25T12:43:49.554Z",
    "updatedAt": "2024-09-25T12:45:01.421Z",
    "companyId": 21
}
*/
const AddBank = ({ id, onEnd = () => { } , DrawerAPI }) => {
    const [form] = useForm();
    // QUERIES
    const bankData = useGetBankById(id, { enabled: !!id });
    useEffect(() => {
        if (bankData.data) {
            form.setFieldsValue(bankData.data);
        }
    }, [bankData.data]);
    // MUTATIONS
    const addBank = useAddBank({
        onSuccess: (res) => {
            message.success("Bank added successfully");
            onEnd(res);
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error("Something went wrong");
            console.log(error)
        }
    });

    const editBank = useEditBank({
        onSuccess: (_, payload) => {
            message.success("Bank updated successfully");
            onEnd(payload);
            DrawerAPI.close();
        },
        onError: (error) => {
            message.error("Something went wrong");
            console.log(error)
        }
    });

    const handelFinish = (values) => {
        if (id) {
            editBank.mutate({ id, ...values })
        } else {
            addBank.mutate(values)
        }
    }

    if (editBank.isPending || addBank.isPending || bankData.isLoading) {
        return <div className='h-100 center-items'>
            <Spin />
        </div>
    }

    return (
        <Form form={form} layout='vertical' onFinish={handelFinish}>
            <div className={"space-between"}>
                <p className={"lg_text_medium mb-1"}>{id ? "Edit" : "Add"} Bank</p>
                <Space>
                    <Button size='small'>Cancel</Button>
                    <Button size='small' type="primary" htmlType='submit'>Save</Button>
                </Space>
            </div>
            <Form.Item
                name="name"
                label={<p className='sm_text_medium'>Bank Name</p>}
                rules={[{ required: true, message: 'Please bank branch' }]}
            >
                <Input placeholder='name' />
            </Form.Item>

            <Form.Item
                name="branch"
                label={<p className='sm_text_medium'>Branch</p>}
                rules={[{ required: true, message: 'Please bank branch' }]}
            >
                <Input placeholder='branch' />
            </Form.Item>

            <Form.Item
                name="swift"
                label={<p className='sm_text_medium'>Swift</p>}
                rules={[{ required: true, message: 'Please enter swift' }]}
            >
                <Input placeholder='swift' />
            </Form.Item>

            <Form.Item
                name="accountNumber"
                label={<p className='sm_text_medium'>Bank Account Number</p>}
                rules={[{ required: true, message: 'Please enter account number' }]}
            >
                <Input placeholder='account number' maxLength={20} />
            </Form.Item>

            <Form.Item
                name="iban"
                label={<p className='sm_text_medium'>IBAN</p>}
                rules={[{ required: true, message: 'Please enter account IBAN' }]}
            >
                <Input placeholder='IBAN' maxLength={50} />
            </Form.Item>

            <Form.Item
                name="beneficiaryName"
                label={<p className='sm_text_medium'>Beneficiary Name</p>}
                rules={[{ required: true, message: 'Please enter beneficiary name' }]}
            >
                <Input placeholder='beneficiary name' />
            </Form.Item>
        </Form>
    )
}

export default AddBank