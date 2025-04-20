import { Avatar, Col, Row, Space, Tag, Typography } from 'antd';
import React from 'react'
import useGetOfficeInsights from 'services/agencies/Queries/useGetOfficeInsights'
import InsightsCard from './InsightsCard';
import { CartColorSVG, EmailSVG, PhoneSVG } from 'assets/jsx-svg';
import meetingsImage from 'assets/images/meetings.png'
import WhatsappSVG from 'assets/jsx-svg/WhatsappSVG';
import AnimatedNumber from 'components/common/AnimatedNumber';
import default_image from "assets/images/default_image.png";
import OFFICER_TYPES from 'constants/OFFICER_TYPES';
const mockData = {
    "fullName": "Ali ABUALKHAIR",
    "email": "aliaboalkhear99@gmail.com",
    "phone": "970592158541",
    "whatsapp": "970592158541",
    "logo": "https://chickchack.s3.amazonaws.com/vindo-files/1727509291313111111.jpeg",
    "buyerGroupCurrency": "USD",
    "officeType": "AGENT",
    "totalBookings": 52420,
    "countBookings": 17,
    "lastBookingDate": "Oct 08, 2024",
    "level": "VIP",
    "lastLoginDate": "Oct 08, 2024, 02:46 PM",
    "loginCount": 12,
}
const ANIMATION_DURATION = 800;

const InsightsTab = ({ id }) => {
    const officeInsights = useGetOfficeInsights(id);
    console.log({ officeInsights })
    return (
        <Row gutter={[12, 8]}>
            <Col span={12}>
                <InsightsCard title={"Bookings"} image={<CartColorSVG />} sections={[
                    (officeInsights?.data?.totalBookings && <div key={"Total"}>
                        <p className='sm_display_regular'>$ <AnimatedNumber
                            isFormated={true}
                            duration={ANIMATION_DURATION}
                            value={officeInsights?.data?.totalBookings}
                        /></p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Total</p>
                    </div>),
                    (officeInsights?.data?.countBookings || officeInsights?.data?.countBookings === 0 && <div key={"Counts"}>
                        <p className='sm_display_regular'>
                            <AnimatedNumber
                                isFormated={true}
                                duration={ANIMATION_DURATION}
                                value={officeInsights?.data?.countBookings}
                            />
                        </p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Counts</p>
                    </div>),
                    (officeInsights?.data?.lastBookingDate && <div key={"Date"} style={{ display: "flex", alignItems: "center", height: "100%" }}>
                        <p className='sm_text_medium' style={{ color: "var(--gray-700)" }}>{officeInsights?.data?.lastBookingDate}</p>
                    </div>),
                ]} />
            </Col>
            <Col span={12}>
                <InsightsCard title={"Activities"} image={<img src={meetingsImage} alt={"meetings"} width={26} height={26} />} sections={[
                    (officeInsights?.data?.lastLoginDate && <div key={"Total"}>
                        <p className='md_text_semibold'>{officeInsights?.data?.lastLoginDate}</p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Last login</p>
                    </div>),
                    (officeInsights?.data?.loginCount || officeInsights?.data?.loginCount === 0 && <div key={"Attend"}>
                        <p className='sm_display_regular'>
                            <AnimatedNumber
                                isFormated={true}
                                duration={ANIMATION_DURATION}
                                value={officeInsights?.data?.loginCount}
                            />
                        </p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Login count</p>
                    </div>),
                ]} />
            </Col>
            <Col span={24}>
                <InsightsCard sections={[
                    (officeInsights?.data?.fullName && <div key={"Total"}>
                        <div>
                            <Space>
                                <Avatar src={officeInsights?.data?.logo || default_image} />
                                <Typography.Paragraph style={{ margin: "0" }} ellipsis={{ rows: 2 }} className='md_text_medium'>{officeInsights?.data?.fullName}</Typography.Paragraph>
                            </Space>
                        </div>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Account Manager</p>
                    </div>),
                    (officeInsights?.data?.email && <div key={"Attend"} style={{ display: "flex", alignItems: "center", height: "100%", paddingInlineEnd: "8px" }}>
                        <div className='center-items' style={{
                            justifyContent: "flex-start",
                            gap: "6px"
                        }}>
                            <EmailSVG />
                            <Typography.Paragraph style={{ margin: "0" }} ellipsis={{ tooltip: officeInsights?.data?.email }} className='sm_text_regular'>{officeInsights?.data?.email}</Typography.Paragraph>
                        </div>
                    </div>),
                    (officeInsights?.data?.phone && <div key={"Attend"} style={{ display: "flex", alignItems: "center", height: "100%", paddingInlineEnd: "8px" }}>
                        <div className='center-items' style={{
                            justifyContent: "flex-start",
                            gap: "6px"
                        }}>
                            <PhoneSVG />
                            <Typography.Paragraph style={{ margin: "0" }} ellipsis={{ tooltip: officeInsights?.data?.phone }} className='sm_text_regular'>{officeInsights?.data?.phone}</Typography.Paragraph>
                        </div>
                    </div>),
                    (officeInsights?.data?.whatsapp && <div key={"Attend"} style={{ display: "flex", alignItems: "center", height: "100%", paddingInlineEnd: "8px" }}>
                        <div className='center-items' style={{
                            justifyContent: "flex-start",
                            gap: "6px"
                        }}>
                            <WhatsappSVG fill={"#1D2939"} width={16} height={16} />
                            <Typography.Paragraph style={{ margin: "0" }} ellipsis={{ tooltip: officeInsights?.data?.whatsapp }} className='sm_text_regular'>{officeInsights?.data?.whatsapp}</Typography.Paragraph>
                        </div>
                    </div>),
                ]} />
            </Col>
            <Col span={24}>
                <InsightsCard sections={[
                    (officeInsights?.data?.level && <div key={"Client"}>
                        <p className='md_text_medium'>{officeInsights?.data?.level}</p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Status</p>
                    </div>),
                    (officeInsights?.data?.activationDate && <div key={"Attend"}>
                        <p className='md_text_medium'>{officeInsights?.data?.activationDate}</p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Activation Date</p>
                    </div>),
                    (officeInsights?.data?.sendingDate && <div key={"Date"}>
                        <p className='md_text_medium'>{officeInsights?.data?.sendingDate}</p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Sending Date</p>
                    </div>),
                ]} />
            </Col>
            <Col span={24}>
                <InsightsCard sections={[
                    (officeInsights?.data?.buyerGroupName && <div key={"Client"}>
                        <p className='md_text_medium'>{officeInsights?.data?.buyerGroupName}</p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Buyer Group</p>
                    </div>),
                    (officeInsights?.data?.supplierOf && officeInsights?.data?.supplierOf?.length > 0 && <div key={"Client"}>
                        <Space size={"0px"} wrap={"wrap"}>{officeInsights?.data?.supplierOf.map(el => <Tag key={el} color={
                            el === "HOTELS" ? "#2D6ADB" :
                                el === "FLIGHTS" ? "#007BFF" :  // Sky Blue for FLIGHTS
                                    el === "EXPERIENCES" ? "#28A745" :  // Green for EXPERIENCES
                                        "#D77E00" // Default color (Amber)
                        }>{el}</Tag>)}</Space>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)", marginTop: "0.5rem" }}>Buyer Group</p>
                    </div>),
                    (officeInsights?.data?.officeType && <div key={"Attend"}>
                        <p className='md_text_medium'>Travel {officeInsights?.data?.officeType === OFFICER_TYPES.AGENT ? "Agent" :
                            officeInsights?.data?.officeType === OFFICER_TYPES.SUPPLIER ? "Supplier" : ""}</p>
                        <p className='xs_text_regular' style={{ color: "var(--gray-400)" }}>Office Type</p>
                    </div>),
                ]} />
            </Col>
        </Row >
    )
}

export default InsightsTab