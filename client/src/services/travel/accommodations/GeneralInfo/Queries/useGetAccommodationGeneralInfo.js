import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationGeneralInfoService from "../generalInfo.service";

export default function useGetAccommodationGeneralInfo(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_ACCOMMODATION_GENERAL_INFO , id],
        queryFn: () => AccommodationGeneralInfoService.getGeneralInfo(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_ACCOMMODATION_GENERAL_INFO , id] };
}
