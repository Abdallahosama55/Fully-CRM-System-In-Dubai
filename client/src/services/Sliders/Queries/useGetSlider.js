import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import SliderService from "../api";

export default (id, config = {}) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.SLIDER_INFO, id],
    queryFn: () => SliderService.getSliderById(id),
    ...config,
  });
  return { data, isLoading };
};
