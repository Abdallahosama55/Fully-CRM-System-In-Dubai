import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesCommonService from "../common.service";

export default function useListPackagesThemes(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_THEMES],
    queryFn: () => PackagesCommonService.listThemes(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_THEMES] };
}
