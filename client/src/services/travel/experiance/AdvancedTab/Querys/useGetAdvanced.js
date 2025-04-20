import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AdvancedService from "../advanced.service";

export default function useGetAdvanced(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_ADVANCED],
    queryFn: () => AdvancedService.getAdvanced(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_ADVANCED] };
}
