import React, { useState } from 'react'
import {  useParams } from 'react-router-dom';
import { AirportSVG, EmailFiledSVG, ImagesSVG2, LocationSVG2, PhoneFilledSVG, RateStarSVG } from 'assets/jsx-svg';
import { Col, Row, Typography } from 'antd';
import RoomsSection from './components/RoomsSection';
import Map from 'components/common/Map';
import ImagesGrid from 'components/common/ImagesGrid';
// style
import "./styles.css"
import LoadingPage from 'components/common/LoadingPage';
import MapDrawer from 'components/common/MapDrawer';
import useGetClientHotelByID from 'services/travel/client_side/booking/Accommodation/Queries/useGetClientHotelByID';
import Description from 'components/common/Description';
const ViewHotelClient = () => {
    const { id } = useParams();
    const accommodationQuery = useGetClientHotelByID(id, { enabled: !!id });
    const [openMap, setOpenMap] = useState(false);
    const showDrawer = () => {
        setOpenMap(true);
    };
    const onClose = () => {
        setOpenMap(false);
    };

    const description = JSON.parse(accommodationQuery.data?.description || "[]")
        ?.find(lang => lang.name === "english")?.value

    if (accommodationQuery.isLoading || accommodationQuery.isFetching) {
        return <LoadingPage />
    }

    return (
        <div className='accommodation_page'>
            <MapDrawer
                open={openMap}
                onClose={onClose}
                center={[accommodationQuery.data?.lat, accommodationQuery.data?.lng]}
                markerLocation={[accommodationQuery.data?.lat, accommodationQuery.data?.lng]}
            />
            <div className="page_content">
                <ImagesGrid images={JSON.parse(accommodationQuery.data?.images || "[]")} />
                <div className='mt-1 mb-1'>
                    <div className='title'>
                        <Typography.Title level={2} className="fz-32 fw-700">
                            {accommodationQuery.data?.name}
                        </Typography.Title>
                        <span className="rate_stars">{[...new Array(accommodationQuery.data?.rate || 0)].map((el, index) => <RateStarSVG key={index} />)}</span>
                    </div>
                    <Typography.Paragraph className='info_with_icon location'>
                        <LocationSVG2 fill="#697281" /><Typography.Text ellipsis>{accommodationQuery.data?.location}</Typography.Text>
                    </Typography.Paragraph>
                </div>
                <Row gutter={[16, 12]} className='mb-1'>
                    <Col md={18} xs={24}>
                        <div className='about_section section'>
                            <Typography.Title level={3} className="fz-18 fw-500">About</Typography.Title>
                            <Description description={description}/>
                        </div>
                        <div className="contact_section section">
                            <Row gutter={[8, 12]}>
                                <Col md={12} xs={24}>
                                    <Typography.Paragraph className='info_with_icon'>
                                        <span className='icon_circle'>
                                            <EmailFiledSVG />
                                        </span>
                                        <Typography.Text>{accommodationQuery.data?.email}</Typography.Text>
                                    </Typography.Paragraph>
                                </Col>
                                <Col md={12} xs={24}>
                                    <Typography.Paragraph className='info_with_icon'>
                                        <span className='icon_circle'>
                                            <PhoneFilledSVG />
                                        </span>
                                        <Typography.Text>{accommodationQuery.data?.phoneNumber}</Typography.Text>
                                    </Typography.Paragraph>
                                </Col>
                            </Row>
                        </div>
                        <div className="facilities_section section">
                            <Typography.Title level={3} className="fz-18 fw-500">Popular amenities</Typography.Title>
                            <Row gutter={[8, 8]}>
                                {accommodationQuery.data?.accommodationFacilities?.map(facility => {
                                    return <Col key={facility.id} md={8} xs={12}>
                                        <p className='info_with_icon'>
                                            {facility?.facility?.icon ? <img src={facility?.facility?.icon} alt={""} /> : <ImagesSVG2 fill="#000" />}
                                            <span>{facility?.facility?.name}</span>
                                        </p>
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </Col>
                    <Col md={6} xs={24}>
                        <div className='map_card section'>
                            <div className="map">
                                {accommodationQuery.data?.lat && accommodationQuery.data?.lng && <Map
                                    width='100%'
                                    height='100%'
                                    center={[accommodationQuery.data?.lat, accommodationQuery.data?.lng]}
                                    markerLocation={[accommodationQuery.data?.lat, accommodationQuery.data?.lng]}
                                    zoom={7}
                                />}
                            </div>
                            <div className='card_body'>
                                <p className='fz-14 fw-400'>{accommodationQuery.data?.location}</p>
                                <a className='fz-14 fw-600'
                                    onClick={showDrawer}
                                    rel="noreferrer">View in a map</a>
                            </div>
                        </div>
                        {accommodationQuery.data?.distanceToAirport && <Typography.Paragraph className='info_with_icon'>
                            <AirportSVG />
                            <Typography.Text>Distance to airport {accommodationQuery.data?.distanceToAirport}km</Typography.Text>
                        </Typography.Paragraph>}
                        {accommodationQuery.data?.distanceToCityCenter && <Typography.Paragraph className='info_with_icon'>
                            <LocationSVG2 fill="#000" />
                            <Typography.Text>Distance to city center {accommodationQuery.data?.distanceToCityCenter}km</Typography.Text>
                        </Typography.Paragraph>}
                    </Col>
                </Row>
                <RoomsSection accommodationId={id} />
            </div>
        </div >
    );
};

export default ViewHotelClient;
