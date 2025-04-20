import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesTurboEngineService from "../turbo_engine.service";


export default function useGetTurboEngineAccommodations(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_TURBO_ENGINE_ACCOMMODATIONS , params],
    queryFn: () => PackagesTurboEngineService.getAccommodations(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_TURBO_ENGINE_ACCOMMODATIONS , params] };
}
