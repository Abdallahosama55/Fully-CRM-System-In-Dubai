import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesCommonService from "../common.service";

export default function useListPackagesWhoCanJoin(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_WHO_CAN_JOIN],
    queryFn: () => PackagesCommonService.listWhoCanJoin(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_WHO_CAN_JOIN] };
}
