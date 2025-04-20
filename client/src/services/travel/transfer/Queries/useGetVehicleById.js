import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TransferService from "../transfer.service";

export default (id , config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.VEHICLE_BY_ID, id],
    queryFn: () => TransferService.getVehicleById(id),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.VEHICLE_BY_ID , id] };
};
