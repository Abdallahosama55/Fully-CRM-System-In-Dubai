import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaces } from "services/places.service";

const usePlacesQuery = (inatialSearchText) => {
    const [searchText, setSearchText] = useState(inatialSearchText || "");
    const query = useDebounce(searchText, 300);
    const { data: listPlace, isLoading } = useQuery({ queryKey: ["places", query], queryFn: () => fetchPlaces(query) });

    return { searchText, setSearchText, listPlace, isLoading };
};

export default usePlacesQuery;
