import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import SliderService from "../slider.service";

export default function useGetUpCommingEvents(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_UPCOMING_EVENTS],
    queryFn: () => SliderService.getUpCommingEvents(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_UPCOMING_EVENTS] };
}
