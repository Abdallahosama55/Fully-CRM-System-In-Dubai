import { useMutation } from "@tanstack/react-query";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingBookFlight(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => ManualBookingService.flightBooking.bookFlight(payload),
    ...config,
  });
  return tempMutation;
}
