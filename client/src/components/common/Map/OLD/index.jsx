import React, { memo, useEffect, useRef, useState } from 'react'
import L from "leaflet";
import icon from 'assets/svgs/location-marker.svg'
// style
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [35, 45],
});

const Map = ({
    center = [51.505, -0.09],
    trip = [],
    zoom = 10,
    zoomControl = false,
    width = "500px",
    height = "500px",
    markerLocation,
    setLocation,
    className,
    style = {},
    ...rest
}) => {
    const mapRef = useRef();
    const [mapObj, setMapObj] = useState(null);
    const [marker, setMarker] = useState(null);
    const [tripMarkers, setTripMarkers] = useState([]);

    useEffect(() => {
        if (mapRef.current && center) {
            if (!mapObj) {
                const map = L.map(mapRef.current, {
                    zoomControl: zoomControl,
                    ...rest
                }).setView(center, zoom);
                setMapObj(map)
            }
        }
    }, [])

    useEffect(() => {
        if (mapObj) {
            mapObj.setView(center, zoom)
        }
    }, [center, zoom, mapObj])

    useEffect(() => {
        if (marker && markerLocation) {
            marker.setLatLng(markerLocation)
        }
    }, [marker, markerLocation])
    
    useEffect(() => {
        if (mapRef.current && center && mapObj) {
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            }).addTo(mapObj);

            if (tripMarkers.length === 0 && trip.length > 0) {
                setTripMarkers(trip.map((el) =>
                    L.marker(el.position).addTo(mapObj)
                        .bindPopup(el.name)
                        .openPopup()
                        .setIcon(customIcon)
                ));

                if (!markerLocation) {
                    mapObj.setView(trip[0].position, zoom)
                }
            }

            if (markerLocation) {
                if (!marker) {
                    const marker = L.marker(markerLocation, {
                        draggable: setLocation && true,
                    }).addTo(mapObj);
                    setMarker(marker)
                } else {
                    marker.on('dragend', (event) => {
                        var marker = event.target;
                        var position = marker.getLatLng();
                        if (typeof setLocation === "function") {
                            setLocation(position)
                        }
                    });
                    marker.setIcon(customIcon)
                }
            }
        }
    }, [setLocation, mapObj, marker, trip])

    return (
        <div className={className} style={{
            width,
            height,
            ...style
        }} ref={mapRef} />
    )
}

export default memo(Map)