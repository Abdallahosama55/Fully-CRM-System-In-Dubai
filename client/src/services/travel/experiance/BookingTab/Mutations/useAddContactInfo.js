import { useMutation } from "@tanstack/react-query";
import BookingService from "../booking.service";

export default function useAddContactInfo(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ productId, data }) => BookingService.addContactInfo(productId, data),
    ...config,
  });

  return {
    addContactInfo: mutateAsync,
    isPending: isPending,
  };
}
