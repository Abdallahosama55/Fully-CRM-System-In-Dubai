import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";
import TransferBookingService from "../transfer.booking.service";

export default (id , config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY_CLIENT.VEHICLE_BY_ID, id],
    queryFn: () => TransferBookingService.getTransferById(id),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY_CLIENT.VEHICLE_BY_ID , id] };
};
