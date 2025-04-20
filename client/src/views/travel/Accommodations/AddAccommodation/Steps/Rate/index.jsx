import React, { useMemo, useState } from 'react'
import { Collapse, Form, message } from 'antd';
import Steps, { STEPS_KEYS } from './steps';
// images
import SeasonPNG from "assets/images/SeasonPNG.png";
import StarPNG from "assets/images/StarPNG.png";
import LoudspeakerPNG from "assets/images/LoudspeakerPNG.png";
import CancelledPNG from "assets/images/CancelledPNG.png";
// style
import "./styles.css";
import useGetSeasonsList from 'services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsList';
import useGetCancelationPoliciesList from 'services/travel/accommodations/Rate/Cancelation/Queries/useGetCancelationPoliciesList';
import useGetRatesCount from 'services/travel/accommodations/Rate/Rate/Queries/useGetRatesCount';
import useGetSeasonsType from 'services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsType';
const Rate = ({ id, next }) => {
    const [activeKey, setActiveKey] = useState([STEPS_KEYS.SEASONS])
    const seasonsListQuery = useGetSeasonsList(id);
    const seasonsTypeQuery = useGetSeasonsType(id, {})

    const seassons = useMemo(() => {
        let temp = [];
        if (seasonsTypeQuery?.data?.type && seasonsListQuery?.data?.data) {
            temp = seasonsListQuery?.data?.data.filter(el => el.type === seasonsTypeQuery?.data?.type)
        }
        return temp;
    }, [seasonsTypeQuery?.data?.type, seasonsListQuery?.data?.data])

    const cancelationPoliciesQuery = useGetCancelationPoliciesList(id);
    const ratesCountQuery = useGetRatesCount(id);

    const moveTo = (key) => {
        setActiveKey(key)
    }

    const handelNext = () => {
        if (seassons.length === 0) {
            setActiveKey(STEPS_KEYS.SEASONS);
            message.error("You have to add at least one season");
        } else {
            if (ratesCountQuery?.data?.count === 0) {
                setActiveKey(STEPS_KEYS.RATE);
                message.error("You have to add at least one rate");
            } else {
                if (cancelationPoliciesQuery?.data?.length === 0) {
                    setActiveKey(STEPS_KEYS.CANCELLATION);
                    message.error("You have to add at least one cancelation policy")
                } else {
                    next();
                }
            }
        }
    }

    return (
        <div className='rate_tab'>
            <Form hidden id="form_inside_tab" onFinish={handelNext} />
            <Collapse
                accordion
                defaultActiveKey={STEPS_KEYS.SEASONS}
                activeKey={activeKey}
                onChange={(arr) => {
                    setActiveKey([arr[0]])
                }}
                expandIconPosition={"start"}
                items={[
                    {
                        key: STEPS_KEYS.SEASONS,
                        label: <div className='collapse_title'>
                            <img src={SeasonPNG} alt="Season" />
                            <p className='fz-16 fw-700'>All Seasons</p>
                        </div>,
                        children: <Steps.Seasons id={id} moveTo={moveTo} />,
                    },
                    {
                        key: STEPS_KEYS.RATE,
                        label: <div className='collapse_title'>
                            <img src={StarPNG} alt="Star" />
                            <p className='fz-16 fw-700'>Rate</p>
                        </div>,
                        children: <Steps.Rate id={id} moveTo={moveTo} />,
                        collapsible: seassons.length === 0 ? "disabled" : undefined
                    },
                    {
                        key: STEPS_KEYS.PROMOTION,
                        label: <div className='collapse_title'>
                            <img src={LoudspeakerPNG} alt="Loudspeaker" />
                            <p className='fz-16 fw-700'>Promotion</p>
                        </div>,
                        children: <Steps.Promotion id={id} moveTo={moveTo} />,
                        collapsible: (ratesCountQuery?.data?.count === 0 || seassons.length === 0) ? "disabled" : undefined
                    },
                    {
                        key: STEPS_KEYS.CANCELLATION,
                        label: <div className='collapse_title'>
                            <img src={CancelledPNG} alt="Cancelled" />
                            <p className='fz-16 fw-700'>Cancellation</p>
                        </div>,
                        children: <Steps.Cancellation id={id} moveTo={moveTo} />,
                        collapsible: (ratesCountQuery?.data?.count === 0 || seassons.length === 0) ? "disabled" : undefined
                    },
                ]}
            />
        </div>
    )
}

export default Rate