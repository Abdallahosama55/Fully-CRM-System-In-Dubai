import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesMyInventoryService from "../my_Inventory.service";


export default function useGetMyInventoryExperiences(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_MY_INVENTORY_EXPERIENCES , params],
    queryFn: () => PackagesMyInventoryService.getExperiences(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_MY_INVENTORY_EXPERIENCES , params] };
}
