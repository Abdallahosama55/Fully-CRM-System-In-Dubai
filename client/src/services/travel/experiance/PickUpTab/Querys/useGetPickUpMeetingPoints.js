import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PickUpService from "../pick_up.service";

export default function useGetPickUpMeetingPoints(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PICK_UP_MEETING_POINTS],
    queryFn: () => PickUpService.getPickUpMeetingPoints(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PICK_UP_MEETING_POINTS] };
}
