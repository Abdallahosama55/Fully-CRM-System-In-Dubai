import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TransferService from "../transfer.service";

export default (config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.VEHICLE_BRANDS],
    queryFn: () => TransferService.getVehicleBrands(),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.VEHICLE_BRANDS] };
};
