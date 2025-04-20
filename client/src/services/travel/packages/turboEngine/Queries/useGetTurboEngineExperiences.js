import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesTurboEngineService from "../turbo_engine.service";


export default function useGetTurboEngineExperiences(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_TURBO_ENGINE_EXPERIENCES , params],
    queryFn: () => PackagesTurboEngineService.getExperiences(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_TURBO_ENGINE_EXPERIENCES , params] };
}
