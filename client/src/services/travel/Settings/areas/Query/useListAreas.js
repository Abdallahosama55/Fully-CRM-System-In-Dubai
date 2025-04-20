import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AreaService from "../area.service";

export default (params, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_AREAS, params],
    queryFn: () => AreaService.listAreas(params),
    ...config,
  });

  return { ...query, key: [QUERY_KEY.LIST_AREAS, params] };
};
