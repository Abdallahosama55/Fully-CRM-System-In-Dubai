import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PickUpService from "../pick_up.service";

export default function useGetLocationById({ id, isDropOf }, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PICK_UP_LOCATION_BY_ID],
    queryFn: () => PickUpService.getLocationById(id, isDropOf),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PICK_UP_LOCATION_BY_ID] };
}
