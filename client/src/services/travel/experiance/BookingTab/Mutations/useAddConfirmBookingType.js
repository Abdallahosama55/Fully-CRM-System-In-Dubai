import { useMutation } from "@tanstack/react-query";
import BookingService from "../booking.service";

export default function useAddConfirmBookingType(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, productId }) => BookingService.addConfirmBookingType(productId, data),
    ...config,
  });

  return {
    addConfirmBookingType: mutateAsync,
    isPending: isPending,
  };
}
