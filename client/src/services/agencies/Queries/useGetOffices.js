import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import OfficesService from "../offices.service";

export default (params, config) => {
  const query = useQuery({
    queryFn: () => OfficesService.getOffices(params),
    queryKey: [QUERY_KEY.GET_OFFICES, params],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_OFFICES, params] };
};
