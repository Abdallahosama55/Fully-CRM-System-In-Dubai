import { useQuery } from "@tanstack/react-query";
import TransferBookingService from "../transfer.booking.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default (config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY_CLIENT.VEHICLE_TYPE],
    queryFn: () => TransferBookingService.getVehicleTypes(),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY_CLIENT.VEHICLE_TYPE] };
};
