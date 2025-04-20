import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useAddLocation(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, isDropOf }) =>
      PickUpService.addLocation(productId, data, isDropOf),
    ...config,
  });

  return {
    addLocation: mutateAsync,
    isPending: isPending,
  };
}
