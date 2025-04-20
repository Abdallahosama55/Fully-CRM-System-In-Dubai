import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useAddDropOfService(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PickUpService.addDropOfService(productId, data),
    ...config,
  });

  return {
    addDropOfService: mutateAsync,
    isPending: isPending,
  };
}
