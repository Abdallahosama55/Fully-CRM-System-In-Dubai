import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import EventService from "../Events.service";

export default function useGetEvents(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.EVENTS , params],
    queryFn: () => EventService.getEvents(params),
    ...config,
  });
  
  return { ...query, key: [QUERY_KEY.EVENTS , params] };
}
