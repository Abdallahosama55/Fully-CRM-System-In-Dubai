import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesPassengersService from "../passengers.service";

export default function useListPackageSystemContactInformation(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_PACKAGE_SYSTEM_CONTACT_INFORMATION],
    queryFn: () => PackagesPassengersService.listSystemContactInformation(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.LIST_PACKAGE_SYSTEM_CONTACT_INFORMATION] };
}
