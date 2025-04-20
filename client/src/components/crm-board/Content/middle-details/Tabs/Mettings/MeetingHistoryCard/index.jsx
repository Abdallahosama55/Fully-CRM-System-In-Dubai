import React from 'react'
import CustomCollapse from '../../components/CustomCollapse'
import { Col, Row } from 'antd'
// icons
import { MeetingsSmallSVG } from 'assets/jsx-svg'

const MeetingHistoryCard = ({ by, Due }) => {
    return (
        <CustomCollapse
            isWithOutMenu={true}
            by={by}
            by_label={"Meeting by"}
            by_icon={<MeetingsSmallSVG />}
            Due={Due}
        >
            <Row justify="center">
                <Col span={2}>
                    <div className="call-icon">
                        <MeetingsSmallSVG />
                    </div>
                </Col>
                <Col span={20}>
                    <div>Call title</div>
                    <div className='fz-12 gc'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore
                    </div>
                </Col>
            </Row>
        </CustomCollapse>
    )
}

export default MeetingHistoryCard