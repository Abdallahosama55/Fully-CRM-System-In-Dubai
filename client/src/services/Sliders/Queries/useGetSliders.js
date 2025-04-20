import { useQuery } from "@tanstack/react-query";
import SliderService from "../api";
import { QUERY_KEY } from "services/constants";

export default (params, config = {}) => {
  const { data, isPending, isLoading } = useQuery({
    queryKey: [QUERY_KEY.SLIDERS, params],
    queryFn: () => SliderService.getSliders(params),
    ...config,
  });
  return { isPending, data, queryKey: [QUERY_KEY.SLIDERS, params], isLoading };
};
