import { Col, Row, Typography } from 'antd'
import { PlaySVG } from 'assets/jsx-svg'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

const Clock = () => {
    const [date, setDate] = useState(new Date());
    function refreshClock() {
        setDate(new Date());
    }
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);


    return <button className="clock-in-btn">
        <Row align="middle" gutter={[12, 0]} wrap={false}>
            <Col>
                <Typography.Text ellipsis className="fz-24 fw-600">
                    {dayjs(date).format("HH:mm")}
                </Typography.Text>
            </Col>
            <Col>
                <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                        <Row align="middle">
                            <PlaySVG />
                        </Row>
                    </Col>
                    <Col>
                        <Typography.Text ellipsis className="fw-500">
                            CLOCK IN
                        </Typography.Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    </button>
}

export default Clock