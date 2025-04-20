import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useAddMinimumNotice(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, productId }) => AvailabilityService.addMinimumNotice(productId, data),
    ...config,
  });

  return {
    addMinimumNotice: mutateAsync,
    isPending: isPending,
  };
}
