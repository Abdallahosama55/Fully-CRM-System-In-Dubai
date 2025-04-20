import React, { useEffect, useState } from 'react'
import BookRoomSection from './components/BookRoomSection'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ROUTER_URLS from 'constants/ROUTER_URLS';
import RoomInfo from './components/RoomInfo';
import { Button, Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import PassengersDataForm from './components/PassengersDataForm';
import ContactDataForm from './components/ContactDataForm';
import TermsAndCondation from './components/TermsAndCondation';
import dayjs from 'dayjs';
// images
import { HomeColoredSVG } from 'assets/jsx-svg'
import passengerPNG from "assets/images/passengerPNG.png"
import contactUsPNG from "assets/images/contactUsPNG.png"
import documentsPNG from "assets/images/documentsPNG.png"
import moneyPNG from "assets/images/moneyPNG.png"
import useClientPreBook from 'services/travel/client_side/booking/Accommodation/Mutations/useClientPreBook';
import usePageTitle from 'hooks/usePageTitle';
// style
import "./styles.css";
const BookRoomClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [form] = useForm();
    // set page title
    usePageTitle(`Book / ${state?.accommodation?.name ? state.accommodation.name : "", state?.accommodation?.name}`)
    const preBookMutation = useClientPreBook({
        onSuccess: () => {
            message.success("Booking done successfully");
            setTimeout(() => {
                navigate("/");
            }, 1000)
        },
        onError: (error) => message.error(error.message)
    });

    useEffect(() => {
        if (!state) {
            navigate(ROUTER_URLS.TRAVEL.ACCOMMODATION.VIEW + id)
        }
    }, [state])

    const handelFinish = (values) => {
        const temp = {
            holderEmail: values.holderEmail,
            holderMobile: values?.holderMobile,
            cancellationKey: state.cancellationKey,
            isMeeting: false,
            rooms: values.rooms.map(room => {
                return {
                    ...room,
                    paxes: room.paxes.map(el => ({
                        ...el,
                        dob: dayjs(el.dob).format("YYYY-MM-DD")
                    }))
                }
            })
        }

        preBookMutation.mutate(temp)
    }

    return (
        <div className='book_page'>
            <div className="page_content">
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handelFinish}
                    scrollToFirstError={{
                        behavior: 'smooth',
                    }}
                >
                    <BookRoomSection title="Home" icon={<HomeColoredSVG />}>
                        <RoomInfo room={state.room} rate={state.rate} accommodation={state.accommodation} />
                    </BookRoomSection>
                    <BookRoomSection title="Passengers Data" icon={<img src={passengerPNG} alt="passengerPNG" />}>
                        <PassengersDataForm bookingKey={state.bookingKey} />
                    </BookRoomSection>
                    <BookRoomSection title="Contact Information" icon={<img src={contactUsPNG} alt="contactUsPNG" />}>
                        <ContactDataForm />
                    </BookRoomSection>
                    <BookRoomSection title="Terms and conditions" icon={<img src={documentsPNG} alt="documentsPNG" />}>
                        <TermsAndCondation
                            cancellationPolicy={state.cancellationName}
                            smokingAllowed={state.room.smokingAllowed}
                        />
                    </BookRoomSection>
                    <BookRoomSection title="Total Due" icon={<img src={moneyPNG} alt="moneyPNG" />}>
                        <div className='space-between'>
                            <span className='fz-16 fw-500'>Gross Total Due</span>
                            <span className='fz-22 fw-700'>{state.rate?.amountWithPromotion || state.rate?.amount} {state.accommodation?.currencyCode || "USD"}</span>
                        </div>
                    </BookRoomSection>
                    <div className='book_btns space-between'>
                        <Button type="default" onClick={() => navigate(-1)}>Back</Button>
                        <Button type="primary" htmlType='submit'>Book</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default BookRoomClient

