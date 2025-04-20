import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useAddPickUpTiming(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PickUpService.addPickUpTiming(productId, data),
    ...config,
  });

  return {
    addPickUpTiming: mutateAsync,
    isPending: isPending,
  };
}
