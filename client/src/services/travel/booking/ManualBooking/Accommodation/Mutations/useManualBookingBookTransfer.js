import { useMutation } from "@tanstack/react-query";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingBookTransfer(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => ManualBookingService.transferBooking.bookTransfer(payload),
    ...config,
  });
  return tempMutation;
}
