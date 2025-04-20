import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useDeletePickUpMeetingPoint(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => PickUpService.deletePickUpMeetingPoint(id),
    ...config,
  });

  return {
    deletePickUpMeetingPoint: mutateAsync,
    isPending: isPending,
  };
}
