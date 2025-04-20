import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useUpdateLocation(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, isDropOf }) => PickUpService.updateLocation(data, isDropOf),
    ...config,
  });

  return {
    updateLocation: mutateAsync,
    isPending: isPending,
  };
}
