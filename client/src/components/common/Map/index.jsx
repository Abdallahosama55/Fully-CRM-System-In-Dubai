import React, { memo, useEffect, useRef, useState } from 'react'
import { Typography } from 'antd';
// google maps
import { Map as GoogleMap, Marker, AdvancedMarker, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
/*
ZOOM LEVELS
1: Entire World
5: Landmass/continent
10: City
15: Streets
20: Buildings
*/
// style
import "./styles.css";
/**
 * @typedef {Object} DirectionCoordinates
 * @property {number} lat - The latitude of the point.
 * @property {number} lng - The longitude of the point.
 */

/**
 * @typedef {Object} Directions
 * @property {DirectionCoordinates} source - The starting point for directions.
 * @property {DirectionCoordinates} destination - The ending point for directions.
 */

/**
 * Map component for rendering a Google Map with markers and directions.
 *
 * @param {Object} props - The component props.
 * @param {[number, number]} [props.center=[51.505, -0.09]] - The initial latitude and longitude to center the map.
 * @param {Array} [props.trip=[]] - An array of trip objects, where each object represents a location to mark on the map.
 * @param {number} [props.zoom=10] - The initial zoom level of the map.
 * @param {boolean} [props.zoomControl=false] - Whether to display the zoom control on the map.
 * @param {string} [props.width="500px"] - The width of the map.
 * @param {string} [props.height="500px"] - The height of the map.
 * @param {[number, number]} [props.markerLocation] - The latitude and longitude for the marker's location.
 * @param {function} [props.setLocation] - A callback function to set the location when the marker is dragged. Accepts an array of [latitude, longitude].
 * @param {string} [props.className=""] - Additional CSS class name(s) for styling the map component.
 * @param {Directions} [props.directions] - An object containing source and destination coordinates for displaying directions on the map.
 * @param {Object} [props.style={}] - Inline styles to apply to the map component.
 * @param {Object} [props.rest] - Any additional props to pass to the Google Map component.
 *
 * @returns {JSX.Element} The rendered Map component.
 */
const Map = ({
    center = [51.505, -0.09],
    trip = [],
    zoom = 10,
    zoomControl = false,
    width = "500px",
    height = "500px",
    markerLocation,
    setLocation,
    className = "",
    directions,
    style = {},
    ...rest
}) => {
    const [zoomState, setZoomState] = useState(zoom);
    const [centerState, setCenterState] = useState(Array.isArray(center) && center.length === 2 ? [Number(center[0]), Number(center[1])] : [51.505, -0.09]);
    const mapRef = useRef(null); // Create a ref to store the Google Map instance

    useEffect(() => {
        if (
            center &&
            center.length === 2 &&
            (centerState[0] !== Number(center[0]) || centerState[1] !== Number(center[1]))
        ) {
            setCenterState(center?.map(Number)); // Update with numbers if center changes
        }
    }, [center]);

    if (!centerState[0] && isNaN(centerState[0]) && centerState[1] && isNaN(centerState[1])) {
        return <></>
    }
    return <GoogleMap
        ref={mapRef}
        fullscreenControl={false}
        mapTypeControl={false}
        streetViewControl={false}
        zoomControl={zoomControl}
        zoom={zoomState}
        onZoomChanged={({ detail }) => setZoomState(detail.zoom)}
        center={{ lat: centerState[0], lng: centerState[1] }}
        onCenterChanged={({ detail }) => setCenterState([detail.center.lat, detail.center.lng])}
        className={className}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        reuseMaps={true}
        style={{
            width,
            height,
            ...style
        }}
        {...rest}
    >
        {!!directions && directions?.source && directions?.destination && <Directions {...directions} />}
        {markerLocation && <Marker
            title="Hello"
            draggable={typeof setLocation === "function"}
            onDragEnd={(e) => {
                if (typeof setLocation === "function") {
                    setLocation([e.latLng.lat(), e.latLng.lng()])
                }
            }}
            position={{ lat: Number(markerLocation[0]), lng: Number(markerLocation[1]) }}
        />}
        {trip?.length > 0 && trip.map((el, index) => <AdvancedMarker
            key={el.name}
            title={el.name}
            draggable={false}
            position={{ lat: el.position[0], lng: el.position[1] }}
        >
            <InfoWindow
                headerContent={<span className='fw-400'>Aginda item {index + 1}</span>}
                disableAutoPan={true}
                minWidth={100}
                position={{ lat: el.position[0], lng: el.position[1] }}>
                <Typography.Paragraph style={{ maxWidth: "150px" }} className="w-100 fz-14 fw-600" ellipsis={{ rows: 2 }}>
                    {el.name}
                </Typography.Paragraph>
            </InfoWindow>
        </AdvancedMarker>
        )}
    </GoogleMap>
}

export default Map

const Directions = ({ source, destination }) => {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    useEffect(() => {
        if (!routesLibrary || !map) return;

        const service = new routesLibrary.DirectionsService();
        const renderer = new routesLibrary.DirectionsRenderer({ map });

        setDirectionsService(service);
        setDirectionsRenderer(renderer);
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        console.log(window.google.maps.TravelMode.DRIVING, "window.google.maps.TravelMode.DRIVING")
        const request = {
            origin: source,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
        };

        // Use a callback instead of a Promise
        directionsService.route(request, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                console.error(`Directions request failed due to ${status}`);
            }
        });
    }, [directionsService, directionsRenderer, source, destination]);

    return null;
};
