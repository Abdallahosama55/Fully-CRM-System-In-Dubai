import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import FacilitiesAndService from "../facilities.service";

export default function useGetFacilitieById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_FACILITIES, id],
    queryFn: () => FacilitiesAndService.getFacilitieById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.LIST_FACILITIES, id] };
}
