import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useAddSession(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, productId }) => AvailabilityService.addSession(productId, data),
    ...config,
  });

  return {
    addSession: mutateAsync,
    isPending: isPending,
  };
}
