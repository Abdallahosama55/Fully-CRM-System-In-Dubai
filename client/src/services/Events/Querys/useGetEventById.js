import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import EventService from "../Events.service";

export default function useGetEventById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_BY_ID, id],
    queryFn: () => EventService.getEventById(id),
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_EVENT_BY_ID, id] };
}
