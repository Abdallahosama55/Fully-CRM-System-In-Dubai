import { Typography } from 'antd'
import React from 'react'

const ContactTab = ({ type, data }) => {
    return (
        <div>
            <Typography.Title level={4} className="md_text_bold" style={{ color: "var(--gray-700);", marginBottom: "0.5rem" }}>Agency Data</Typography.Title>
            <table className='booking_info_table' style={{maxWidth:"700px"}}>
                <tbody>
                    {data?.agencyData?.fullName &&
                        <tr>
                            <td className='xs_text_medium'>Name</td>
                            <td className='xs_text_medium'>{data?.agencyData?.fullName}</td>
                        </tr>
                    }
                    {data?.agencyData?.email && <tr>
                        <td className='xs_text_medium'>Email</td>
                        <td className='xs_text_medium'><a href={`mailto:${data?.agencyData?.email}`}>{data?.agencyData?.email}</a></td>
                    </tr>
                    }
                    {data?.agencyData?.phone && <tr>
                        <td className='xs_text_medium'>Phone</td>
                        <td className='xs_text_medium'>{data?.agencyData?.phone}</td>
                    </tr>}
                </tbody>
            </table>
            <Typography.Title level={4} className="md_text_bold" style={{ color: "var(--gray-700);", marginBottom: "0.5rem" }}>User Data</Typography.Title>
            <table className='booking_info_table' style={{maxWidth:"700px"}}>
                <tbody>
                    {data?.userData?.email && <tr>
                        <td className='xs_text_medium'>Email</td>
                        <td className='xs_text_medium'><a href={`mailto:${data?.userData?.email}`}>{data?.userData?.email}</a></td>
                    </tr>}
                    {data?.userData?.mobile && <tr>
                        <td className='xs_text_medium'>Phone</td>
                        <td className='xs_text_medium'>{data?.userData?.mobile}</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    )
}

export default ContactTab