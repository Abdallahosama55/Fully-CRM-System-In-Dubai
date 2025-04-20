import { Col, Divider, Row } from 'antd'
import { AirplaneSVG, FlightSVG } from 'assets/jsx-svg'
import dayjs from 'dayjs'
import React from 'react'
// style
import "./styles.css"
import TimerSVG from 'assets/jsx-svg/TimerSVG'
/*
{
        "id": 67,
        "fromDateTime": "2024-10-16T12:14:59.000Z",
        "toDateTime": "2024-10-16T19:14:59.000Z",
        "flightNo": "RNC-15",
        "alotment": 50,
        "coast": {
            "adult": 20,
            "child": 30,
            "infant": 40
        },
        "sellPrice": {
            "adult": 20,
            "child": 30,
            "infant": 40
        },
        "groupId": "8d89af7d-851d-419f-9122-1d37b303c028",
        "soldAlotment": 1,
        "status": "ACTIVE",
        "createdAt": "2024-10-02T11:00:35.304Z",
        "updatedAt": "2024-10-07T08:22:35.939Z",
        "deletedAt": null,
        "fromAirportId": 7,
        "toAirportId": 6,
        "currencyCode": "USD",
        "companyId": 34,
        "supplierAccountId": 6020,
        "airlineCompanyId": 20,
        "officerId": 7,
        "officer": {
            "fullName": "rami"
        },
        "fromAirPortInfo": {
            "id": 7,
            "name": "Narsarsuaq Airport"
        },
        "toAirPortInfo": {
            "id": 6,
            "name": "Wewak International Airport"
        },
        "airlineCompany": {
            "id": 20,
            "name": "Delta Air Lines "
        }
    }
*/
const FlightCard = ({ data, type }) => {
    return (
        <div className="flight_card">
            <Row gutter={[6, 6]}>
                <Col lg={6}>
                    <div className='airlines_company'>
                        <img

                            src={"https://static.vecteezy.com/system/resources/previews/023/616/612/non_2x/airplane-aviation-logo-design-concept-airline-logo-plane-travel-icon-airport-flight-world-aviation-vector.jpg"}
                            alt="log"
                        />
                        <p className='fz-12 fw-500' style={{ color: "#697281" }}>{data?.airlineCompany?.name}</p>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className='airlines_from_airport'>
                        {data?.fromDateTime && <p className='fz-16 fw-700' style={{ color: "#313343" }}>{dayjs(data?.fromDateTime).format('ddd., DD MMM. HH:mm')}</p>}
                        {data?.fromAirPortInfo?.name && <p className='fz-14 fw-400' style={{ color: "#697281" }}>{data?.fromAirPortInfo?.name}</p>}
                        {data?.fromAirPortInfo?.id && <p className='fz-14 fw-400' style={{ color: "#697281" }}>#{data?.fromAirPortInfo?.id}</p>}
                    </div>
                </Col>
                <Col lg={6}>
                    <div className='airlines_way'>
                        {data?.fromDateTime && data?.toDateTime && <p className='fz-12 fw-400 center-items' style={{ color: "#313343", gap: "2px" }}><TimerSVG /> {dayjs(data?.toDateTime).diff(dayjs(data?.fromDateTime), 'hour')}h</p>}
                        <Divider type='horizontal' dashed style={{ display: 'flex', alignItems: 'center' }}
                        >
                            {type === "Outbound" && <span>
                                <FlightSVG />
                            </span>}

                            {type === "Return" && (
                                <span style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}>
                                    <FlightSVG />
                                </span>
                            )}
                        </Divider>
                        {type && <p className='fz-12 fw-400' style={{ color: "#697281" }}>{type}</p>}
                    </div>
                </Col>
                <Col lg={6}>
                    <div className='airlines_to_airport'>
                        {data?.toDateTime && <p className='fz-16 fw-700' style={{ color: "#313343" }}>{dayjs(data?.toDateTime).format('ddd., DD MMM. HH:mm')}</p>}
                        {data?.toAirPortInfo?.name && <p className='fz-14 fw-400' style={{ color: "#697281" }}>{data?.toAirPortInfo?.name}</p>}
                        {data?.toAirPortInfo?.id && <p className='fz-14 fw-400' style={{ color: "#697281" }}>#{data?.toAirPortInfo?.id}</p>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FlightCard