import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PickUpService from "../pick_up.service";

export default function useGetPickUpMeetingPointById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PICK_UP_MEETING_POINT_BY_ID],
    queryFn: () => PickUpService.getPickUpMeetingPointById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PICK_UP_MEETING_POINT_BY_ID] };
}
