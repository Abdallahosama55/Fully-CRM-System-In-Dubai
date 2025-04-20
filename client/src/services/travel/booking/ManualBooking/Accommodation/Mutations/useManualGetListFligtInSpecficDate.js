import { useMutation } from "@tanstack/react-query";
import ManualBookingService from "../../manual.booking.service";

export default function useManualGetListFligtInSpecficDate(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => ManualBookingService.flightBooking.GetListFligtInSpecficDate(payload),
    ...config,
  });
  return tempMutation;
}
