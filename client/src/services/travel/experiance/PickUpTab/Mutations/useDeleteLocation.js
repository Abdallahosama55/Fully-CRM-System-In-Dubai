import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useDeleteLocation(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, isDropOf }) => PickUpService.deleteLocation(id, isDropOf),
    ...config,
  });

  return {
    deleteLocation: mutateAsync,
    isPending: isPending,
  };
}
