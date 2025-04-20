import React, { useCallback, useEffect } from "react";
import { AutoComplete, ConfigProvider, Input, Popover } from "antd";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { GoogleMapsSVG } from "assets/jsx-svg";
import Map from "../Map";
// Utility function for parsing address components
const parseAddressComponents = (results) => {
  const countryComponent = results[0]?.address_components?.find((component) =>
    component?.types?.includes("country"),
  );

  const cities = results.map(
    (place) =>
      place?.address_components?.find(
        (f) => JSON.stringify(f?.types) === JSON.stringify(["locality", "political"]),
      )?.short_name,
  );

  const states = results.map(
    (place) =>
      place?.address_components?.find(
        (f) =>
          JSON.stringify(f?.types) === JSON.stringify(["administrative_area_level_1", "political"]),
      )?.short_name,
  );

  return {
    country: countryComponent?.long_name || undefined,
    city:
      Array.isArray(cities) && cities.length > 0
        ? cities[0]
        : Array.isArray(states) && states.length > 0
        ? states[0]
        : undefined,
  };
};

const LocationInput = ({
  value,
  onChange,
  withMapView = false,
  height = "200px",
  draggableMarker = false,
  prefix = null,
  placeholder,
  className = "",
}) => {
  const {
    value: searchText,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    cache: true,
  });

  useEffect(() => {
    if (value?.location) {
      setValue(value?.location, false);
    }
  }, [value?.location, setValue]);

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: val });
      const { lat, lng } = getLatLng(results[0]);
      const addressComponents = parseAddressComponents(results);

      onChange({
        location: val,
        lat,
        lng,
        ...addressComponents,
      });
    } catch (error) {
      console.error("Error in geocoding: ", error);
    }
  };

  const handleBlur = async () => {
    if (searchText && !value?.lat && !value?.lng) {
      try {
        const results = await getGeocode({ address: searchText });
        const { lat, lng } = getLatLng(results[0]);
        const addressComponents = parseAddressComponents(results);

        onChange({
          location: searchText,
          lat,
          lng,
          ...addressComponents,
        });
      } catch (error) {
        console.error("Error in handling blur: ", error);
      }
    }
  };

  const handleInputChange = (val) => {
    setValue(val);
    onChange({ ...value, location: val });
  };

  const setLocation = useCallback(
    (LatLng) => {
      if (draggableMarker) {
        console.log({ LatLng });
        onChange({
          location: searchText || value.location,
          lat: LatLng[0],
          lng: LatLng[1],
        });
      }
    },
    [searchText, draggableMarker, value, onChange],
  );

  const options = data.map(({ description }) => ({
    value: description,
    label: description,
  }));

  return (
    <>
      <AutoComplete
        className={`location_input ${className}`}
        value={value?.location}
        onChange={handleInputChange}
        onSelect={handleSelect}
        options={status === "OK" ? options : []}>
        <Input
          onBlur={handleBlur}
          placeholder={placeholder || "Search for location"}
          prefix={
            !withMapView && !prefix ? (
              <ConfigProvider theme={{ components: { Popover: { zIndexPopup: 1051 } } }}>
                <Popover
                  cairo
                  style={{ width: 300, height: 300, zIndex: 1051, pointerEvents: "none" }}
                  content={
                    <Map
                      center={[value?.lat || 0, value?.lng || 0]}
                      width="300px"
                      height="300px"
                      markerLocation={[value?.lat || 0, value?.lng || 0]}
                      setLocation={(location) => setLocation(location)}
                    />
                  }
                  title=""
                  trigger="hover">
                  <GoogleMapsSVG />
                </Popover>
              </ConfigProvider>
            ) : (
              prefix
            )
          }
        />
      </AutoComplete>
      {withMapView && (
        <Map
          style={{ borderRadius: "8px", marginTop: "8px" }}
          center={[value?.lat || 0, value?.lng || 0]}
          width="100%"
          height={height}
          markerLocation={[value?.lat || 0, value?.lng || 0]}
          zoom={10}
          setLocation={(location) => setLocation(location)}
        />
      )}
    </>
  );
};

export default LocationInput;
