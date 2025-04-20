import { Carousel, Col, Row, Typography } from 'antd'
import { AllUsersDeskSVG, ArrowRightSVG, CancelSVG, LeftArrow2SVG, LocationSVG2, RateStarSVG } from 'assets/jsx-svg'
import React, { useMemo } from 'react'
// style
import "./styles.css"
import BedSVG2 from 'assets/jsx-svg/BedSVG2'
import isValidJson from 'utils/isValidJson'
import defualt_image from 'assets/images/default_image.png'
const RoomInfo = ({ room, accommodation, rate }) => {
    console.log('accommodation :>> ', accommodation);

    const roomImages = useMemo(() => isValidJson(room?.images) ? JSON.parse(room?.images) : undefined, [room?.images])
    const accommodationImages = useMemo(() => isValidJson(accommodation?.images) ? JSON.parse(accommodation?.images) : undefined, [accommodation?.images])

    return (
        <div className='room_info'>
            <Row gutter={[16, 16]}>
                <Col md={12} xs={24}>
                    <Carousel arrows
                        nextArrow={
                            <div>
                                <ArrowRightSVG
                                    color={"#3A5EE3"} />
                            </div>}
                        prevArrow={<div>
                            <LeftArrow2SVG
                                color={"#3A5EE3"} />
                        </div>}
                        infinite={true}
                    >
                        {(roomImages && roomImages.length > 0 ?  roomImages : (accommodationImages && accommodationImages.length > 0 ? accommodationImages : [{link: defualt_image}]))
                            .map(image => <img
                                className='room_card_image'
                                src={image.link}
                                alt={image.name}
                                key={image.name}
                            />)}
                    </Carousel>
                </Col>
                <Col md={12} xs={24}>
                    <div className='info_body'>
                        <div className='accommodation_data'>
                            <div className='title'>
                                <Typography.Title level={2} className="fz-32 fw-700">
                                    {accommodation.name}
                                </Typography.Title>
                                <span className="rate_stars">{[...new Array(accommodation.rate || 0)].map((el, index) => <RateStarSVG key={index} />)}</span>
                            </div>
                            <div className='info_with_icon location'>
                                <div>
                                    <LocationSVG2 fill="#697281" />
                                </div>
                                <Typography.Text ellipsis>{accommodation.location}</Typography.Text>
                            </div>
                            <div className='info_with_icon mt-1'>
                                <BedSVG2 />
                                <Typography.Text ellipsis>{room.name} ({room.type})</Typography.Text>
                            </div>
                            <div className='info_with_icon' style={{ marginTop: "0.4rem" }}>
                                <AllUsersDeskSVG color="#3A5EE3" />
                                <Typography.Text ellipsis>number of guest ({room.numberOfGuest})</Typography.Text>
                            </div>
                            {accommodation?.cancellationPolicy[0]?.name && <div className='info_with_icon mt-1'>
                                <CancelSVG />
                                <Typography.Text ellipsis>Cancellation Policy: <span className='cancellation fw-600 fz-14'>{accommodation?.cancellationPolicy[0]?.name}</span></Typography.Text>
                            </div>}
                        </div>
                        <div className='info_body-price_section'>
                            <span className='gc fz-12 fw-400'>total</span>
                            <Typography.Text className='fz-18 fw-700' ellipsis>{rate?.amountWithPromotion || rate?.amount} {accommodation?.currencyCode || "USD"}</Typography.Text>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RoomInfo