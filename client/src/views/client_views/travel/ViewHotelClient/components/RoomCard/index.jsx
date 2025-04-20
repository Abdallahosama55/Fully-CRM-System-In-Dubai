import { Button, Carousel, Divider, Radio } from 'antd'
import React, { useMemo, useState } from 'react'
import { ImagesSVG2 } from 'assets/jsx-svg'
import { useNavigate } from 'react-router-dom'
// style
import "./styles.css"
import isValidJson from 'utils/isValidJson'
import defualt_image from 'assets/images/default_image.png'
import CLIENT_ROUTER_URLS from 'constants/CLIENT_ROUTER_URLS'
const RoomCard = ({ room, accommodation }) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const [bookingKey, setBookingKey] = useState(null);
    const [cancellationPolicy, setCancellationPolicy] = useState(null);
    
    const roomImages = useMemo(() => isValidJson(room?.images) ? JSON.parse(room?.images) : undefined, [room?.images])
    const accommodationImages = useMemo(() => isValidJson(accommodation?.images) ? JSON.parse(accommodation?.images) : undefined, [accommodation?.images])

    return (
        <div className='room_card'>
            <Carousel arrows infinite={true}>
            {(roomImages && roomImages.length > 0 ?  roomImages : (accommodationImages && accommodationImages.length > 0 ? accommodationImages : [{link: defualt_image}]))
                .map(image => <img
                        className='room_card_image'
                        src={image.link}
                        alt={image.name}
                        key={image.name}
                    />)}
            </Carousel>
            <div className='room_card_body'>
                <p className='fz-14 fw-500'>{room.name} ({room.type})</p>
                <p className='fz-12 fw-500 rc' style={{ color: "#D50000" }}>we have {room?.numberOfRoomsAvailabel} left</p>
                <div className='accommodation_facilities'>
                    {accommodation.accommodationFacilities?.slice(0, showMore ? accommodation.accommodationFacilities?.length : 3)
                        .map(facility => {
                            return <p key={facility.id} className='facility_line'>
                                {facility.icon ? <img src={facility.icon} alt={facility.name} /> : <ImagesSVG2 fill="#000" />}
                                <span>{facility.name}</span>
                            </p>
                        })}

                    {accommodation.accommodationFacilities?.length > 3 && <p
                        onClick={() => setShowMore(prev => !prev)}
                        className="fz-12 fw-600"
                        style={{
                            color: "#2D5FEB",
                            cursor: "pointer",
                            userSelect: "none"
                        }}>{showMore ? "Show less" : "Show more"}</p>}
                </div>
                <Divider />
                {room?.cancellationOptions?.length !== 0 && <div className='room_card_section cancellation_section'>
                    <p className='fz-16 fw-600'>Cancellation</p>
                    <Radio.Group onChange={(e) => setCancellationPolicy(e.target.value)} value={cancellationPolicy} style={{ marginBottom: "1rem" }}>
                        {room?.cancellationOptions.map(el => {
                            return <Radio
                                key={el.key}
                                value={el}
                            >
                                <p className='info_line fz-14' style={{ alignItems: "flex-start" }}>
                                    <p>{el.type}</p>
                                    <span className='fz-14 fw-600'>+${el?.fees || 0}</span>
                                </p>
                            </Radio>
                        })}
                    </Radio.Group>
                </div>}
                <Divider />
                <div className='book_section'>
                    <div className='room_card_section'>
                        <p className='fz-16 fw-600'>Extras</p>
                        <Radio.Group onChange={(e) => setBookingKey(e.target.value)} value={bookingKey} style={{ marginBottom: "1rem" }}>
                            {room.rates.map(el => {
                                return <Radio
                                    key={el.bookingKey}
                                    value={el.bookingKey}
                                >
                                    <p className='info_line'>
                                        <p>{el.pensionName}</p>
                                        {el.amount !== el.amountWithPromotion ? <span className='price'>
                                            <del className='fz-12 fw-400'>${el.amount}</del> <span className='fz-14 fw-600'>${el.amountWithPromotion}</span>
                                        </span> : <span className='fz-14 fw-600'>${el.amount}</span>}
                                    </p>
                                </Radio>
                            })}
                        </Radio.Group>
                    </div>
                    <Button
                        type='primary'
                        className='w-100'
                        size='small'
                        disabled={!bookingKey || !cancellationPolicy}
                        onClick={() => {
                            navigate(CLIENT_ROUTER_URLS.BOOKING.BOOK_ROOM + accommodation?.id,
                                {
                                    state: {
                                        bookingKey: bookingKey,
                                        cancellationKey: cancellationPolicy.key,
                                        cancellationName: cancellationPolicy.type,
                                        room,
                                        rate: room.rates.find(el => el.bookingKey === bookingKey),
                                        accommodation,
                                    }
                                })
                        }}
                    >
                        Book
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default RoomCard