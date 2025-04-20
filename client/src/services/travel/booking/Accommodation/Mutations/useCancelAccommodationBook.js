import { useMutation } from "@tanstack/react-query";
import BookingService from "../booking.service";

export default function useCancelAccommodationBook(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => BookingService.cancelAccommodationBook(payload),
    ...config,
  });
  return tempMutation;
}
