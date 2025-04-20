import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useGetAccommodationByID from "services/travel/accommodations/common/Queries/useGetAccommodationByID";
import {
  AirportSVG,
  ChevronLeftSVG,
  ChevronRightSVG,
  EmailFiledSVG,
  ImagesSVG2,
  LocationSVG2,
  PhoneFilledSVG,
  RateStarSVG,
} from "assets/jsx-svg";
import { Col, Flex, Row, Typography } from "antd";
import RoomsSection from "./components/RoomsSection";
import Map from "components/common/Map";
import ImagesGrid from "components/common/ImagesGrid";
// style
import "./styles.css";
import MapDrawer from "components/common/MapDrawer";
import usePageTitle from "hooks/usePageTitle";
import Description from "components/common/Description";
import isValidJson from "utils/isValidJson";
import formatNumber from "utils/formatNumber";
import TurboLoadingPage from "components/common/TurboLoadingPage";
const ViewAccommodation = () => {
  const { id } = useParams();
  const [isShowAllAmenities, setIsShowAllAmenities] = useState(false);
  const location = useLocation();
  const [rateConditions, setRateConditions] = useState([]);
  const tboData = useMemo(() => {
    return location.state?.tboData || undefined;
  }, [location.state]);

  const accommodationQuery = useGetAccommodationByID(id, {
    enabled: id !== "BOOK_FROM_LOCAL" && !!id,
  });

  const [openMap, setOpenMap] = useState(false);

  // set page title
  usePageTitle(
    accommodationQuery.data?.name ? accommodationQuery.data?.name : "",
    accommodationQuery.data?.name,
  );

  const showDrawer = () => {
    setOpenMap(true);
  };
  const onClose = () => {
    setOpenMap(false);
  };

  const description = tboData?.description
    ? tboData?.description
    : JSON.parse(accommodationQuery.data?.description || "[]")?.find(
        (lang) => lang.name === "english",
      )?.value;

  if (accommodationQuery.isLoading || accommodationQuery.isFetching) {
    return <TurboLoadingPage />;
  }

  return (
    <div className="accommodation_page">
      {((accommodationQuery.data?.lat && accommodationQuery.data?.lng) ||
        (tboData?.lat && tboData?.lng)) && (
        <MapDrawer
          open={openMap}
          onClose={onClose}
          center={
            accommodationQuery.data?.lat && accommodationQuery.data?.lng
              ? [accommodationQuery.data?.lat, accommodationQuery.data?.lng]
              : [Number(tboData?.lat), Number(tboData?.lng)]
          }
          markerLocation={
            accommodationQuery.data?.lat && accommodationQuery.data?.lng
              ? [accommodationQuery.data?.lat, accommodationQuery.data?.lng]
              : [Number(tboData?.lat), Number(tboData?.lng)]
          }
        />
      )}
      <div className="page_content">
        <ImagesGrid
          images={
            isValidJson(accommodationQuery.data?.images)
              ? JSON.parse(accommodationQuery.data?.images)
              : typeof tboData?.images === "string"
              ? tboData?.images?.split(",").map((el) => ({ link: el, name: tboData?.name }))
              : []
          }
        />
        <div className="mt-1 mb-1" style={{ marginTop: "0.75rem" }}>
          <div className="title">
            <Typography.Title level={2} className="fz-32 fw-700">
              {accommodationQuery.data?.name || tboData?.name}
            </Typography.Title>
            <span className="rate_stars">
              {[...new Array(accommodationQuery.data?.rate || Number(tboData?.rate) || 0)].map(
                (el, index) => (
                  <RateStarSVG key={index} />
                ),
              )}
            </span>
          </div>
          <Typography.Paragraph className="info_with_icon location">
            <LocationSVG2 fill="#697281" />
            <Typography.Paragraph style={{ marginBottom: 0 }}>
              {accommodationQuery.data?.location ||
                accommodationQuery.data?.address ||
                (isValidJson(tboData?.city) &&
                  `${JSON.parse(tboData?.city).city}, ${JSON.parse(tboData?.city).country}`)}
            </Typography.Paragraph>
          </Typography.Paragraph>
        </div>
        <Row gutter={[16, 12]} className="mb-1">
          <Col md={18} xs={24}>
            <div className="about_section section">
              <Typography.Title level={3} className="fz-18 fw-500">
                About
              </Typography.Title>
              <Description description={description} rows={5} />
            </div>
            {Array.isArray(rateConditions) && rateConditions?.length > 0 && (
              <div style={{ margin: "1rem 0" }}>
                <p className="fz-18 fw-500">Conditions</p>
                <ul style={{ width: "95%" }} className="rate_conditions">
                  {rateConditions?.map((el, index) => (
                    <li key={index} className="fz-14 fw-500 color-gray-800">
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="contact_section section">
              <Row gutter={[8, 12]}>
                {accommodationQuery.data?.email && (
                  <Col md={12} xs={24}>
                    <Typography.Paragraph className="info_with_icon">
                      <span className="icon_circle">
                        <EmailFiledSVG />
                      </span>
                      <Typography.Text>{accommodationQuery.data?.email}</Typography.Text>
                    </Typography.Paragraph>
                  </Col>
                )}
                {accommodationQuery.data?.phoneNumber && (
                  <Col md={12} xs={24}>
                    <Typography.Paragraph className="info_with_icon">
                      <span className="icon_circle">
                        <PhoneFilledSVG />
                      </span>
                      <Typography.Text>{accommodationQuery.data?.phoneNumber}</Typography.Text>
                    </Typography.Paragraph>
                  </Col>
                )}
              </Row>
            </div>
            {accommodationQuery.data?.accommodationFacilities && (
              <div className="facilities_section section">
                <Typography.Title level={3} className="fz-18 fw-500">
                  Popular amenities
                </Typography.Title>
                <Row gutter={[8, 8]}>
                  {(isShowAllAmenities
                    ? accommodationQuery.data?.accommodationFacilities
                    : accommodationQuery.data?.accommodationFacilities?.slice(0, 15)
                  )?.map((facility) => {
                    return (
                      <Col key={facility?.id || facility} md={8} xs={12}>
                        <p className="info_with_icon">
                          {facility?.facility?.icon ? (
                            <img src={facility?.facility?.icon} alt={""} />
                          ) : (
                            <ImagesSVG2 fill="#000" />
                          )}
                          <span>
                            {typeof facility === "string" ? facility : facility?.facility?.name}
                          </span>
                        </p>
                      </Col>
                    );
                  })}
                  {accommodationQuery.data?.accommodationFacilities?.length > 15 && (
                    <Col md={8} xs={12}>
                      <Flex align="center" className="color-link">
                        <p
                          onClick={() => setIsShowAllAmenities((prev) => !prev)}
                          className="fw-600 fz-12"
                          style={{ cursor: "pointer" }}>
                          {isShowAllAmenities
                            ? "See less property amenities"
                            : "See all property amenities"}
                        </p>
                        {isShowAllAmenities ? (
                          <ChevronLeftSVG
                            width={16}
                            height={16}
                            viewBox="0 0 22 22"
                            strokeWidth={2}
                          />
                        ) : (
                          <ChevronRightSVG
                            width={16}
                            height={16}
                            viewBox="0 0 22 22"
                            strokeWidth={2}
                          />
                        )}
                      </Flex>
                    </Col>
                  )}
                </Row>
              </div>
            )}
          </Col>
          <Col md={6} xs={24}>
            <div className="map_card section">
              <div className="map">
                {((accommodationQuery.data?.lat && accommodationQuery.data?.lng) ||
                  (tboData?.lat && tboData?.lng)) && (
                  <Map
                    width="100%"
                    height="100%"
                    center={
                      accommodationQuery.data?.lat && accommodationQuery.data?.lng
                        ? [accommodationQuery.data?.lat, accommodationQuery.data?.lng]
                        : [Number(tboData?.lat), Number(tboData?.lng)]
                    }
                    markerLocation={
                      accommodationQuery.data?.lat && accommodationQuery.data?.lng
                        ? [accommodationQuery.data?.lat, accommodationQuery.data?.lng]
                        : [Number(tboData?.lat), Number(tboData?.lng)]
                    }
                    zoom={7}
                  />
                )}
              </div>
              <div className="card_body">
                <p className="fz-14 fw-400">
                  {accommodationQuery.data?.location ||
                    (isValidJson(tboData?.city) &&
                      `${JSON.parse(tboData?.city).city}, ${JSON.parse(tboData?.city).country}`)}
                </p>
                <a className="fz-14 fw-600" onClick={showDrawer} rel="noreferrer">
                  View in a map
                </a>
              </div>
            </div>
            {!isNaN(accommodationQuery.data?.distanceToAirport) && (
              <Typography.Paragraph className="info_with_icon">
                <AirportSVG />
                <Typography.Text>
                  Distance to airport {formatNumber(accommodationQuery?.data?.distanceToAirport)} KM
                </Typography.Text>
              </Typography.Paragraph>
            )}
            {!isNaN(accommodationQuery.data?.distanceToCityCenter) && (
              <Typography.Paragraph className="info_with_icon">
                <LocationSVG2 fill="#000" />
                <Typography.Text>
                  Distance to city center {accommodationQuery.data?.distanceToCityCenter}km
                </Typography.Text>
              </Typography.Paragraph>
            )}
          </Col>
        </Row>
        <RoomsSection accommodationId={id} tboAccomodationInfo={{ ...tboData, Rooms: undefined }} setRateConditions={setRateConditions}/>
      </div>
    </div>
  );
};

export default ViewAccommodation;
