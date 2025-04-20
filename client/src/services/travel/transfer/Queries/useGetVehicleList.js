import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TransferService from "../transfer.service";

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryFn: () => TransferService.getVehicleList(params),
    queryKey: [QUERY_KEY.VEHICLE_LIST, params],
    ...config,
  });
  return { ...query, key: [QUERY_KEY.VEHICLE_LIST, params] };
};
