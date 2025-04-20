import { Table, Typography } from 'antd'
import React from 'react'

const PaymentTransactionsTab = ({ type , data }) => {
    console.log(data , data)
    return (
        <div>
            <Typography.Title level={4} className="md_text_bold" style={{ color: "var(--gray-700);", marginBottom: "0.5rem" }}>Pricing Details</Typography.Title>
            <Table
                pagination={false}
                dataSource={Array.isArray(data) ? data : [data]}
                columns={[
                    {
                        title: "Date",
                        dataIndex: "formattedDate",
                        key: "formattedDate",
                    },
                    {
                        title: "Paid by",
                        dataIndex: "paidBy",
                        key: "paidBy",
                    },
                    {
                        title: "Paid to",
                        dataIndex: "paidTo",
                        key: "paidTo",
                    },
                    {
                        title: "Comment",
                        dataIndex: "comment",
                        key: "comment",
                    },
                    {
                        title: "Amount",
                        dataIndex: "amount",
                        key: "amount",
                        render: (amount) => <p className="fz-14 fw-600" style={{color:"#D92D20"}}>{amount + " USD"}</p>
                    },
                ]}
            />

        </div>
    )
}

export default PaymentTransactionsTab