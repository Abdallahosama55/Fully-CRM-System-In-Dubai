import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetAvailabilityById({ availabilityId, accommodationId }, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_AVAILABILITY_BY_ID, availabilityId, accommodationId],
        queryFn: () => AvailabilityService.getAvailabilityById({ availabilityId, accommodationId })
            .then((res) => {
                const temp = res.map(el => {
                    return {
                        ...el,
                        rooms: el.rooms.map(el => (
                            {
                                ...el,
                                availableRooms: Number(el.value),
                            }
                        ))
                    }
                })
                return temp
            }),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_AVAILABILITY_BY_ID, availabilityId, accommodationId] };
}
