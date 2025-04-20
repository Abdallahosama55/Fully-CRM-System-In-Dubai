const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export const fetchPlaces = async (query) => {
    const response = await fetch(`${NOMINATIM_BASE_URL}q=${query}&format=json&addressdetails=1&polygon_geojson=0`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map((place) => ({
        label: place?.display_name,
        value: place?.display_name,
        key: place?.place_id,
        lat: place?.lat,
        lon: place?.lon,
        city: place?.city || place?.state,
        country: place?.country
    }));
};


export const isValidLocation = async (location) => {
    // Search
    const params = {
        q: location,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    try {
        const result = await fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions).then((res) => res.text());
        return Boolean(JSON.parse(result).find(el => el?.display_name === location))
    } catch (error) {
        return false;
    }
}

export default { fetchPlaces, isValidLocation }