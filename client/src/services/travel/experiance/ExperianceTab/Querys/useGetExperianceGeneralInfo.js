import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";

export default function useGetExperianceGeneralInfo(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.EXPERIANCE_GENERAL_INFO_BY_ID, id],
    queryFn: () => ExperianceService.getExperianceGeneralInfo(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.EXPERIANCE_GENERAL_INFO_BY_ID, id] };
}
