import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import SliderService from "../slider.service";

export default function useGetSliderById(id, config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.GET_SLIDER_BY_ID, id],
    queryFn: () => SliderService.getById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_SLIDER_BY_ID, id] };
}
