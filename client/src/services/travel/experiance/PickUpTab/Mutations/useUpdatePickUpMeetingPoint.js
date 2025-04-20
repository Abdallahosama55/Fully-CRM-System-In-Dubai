import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useUpdatePickUpMeetingPoint(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PickUpService.updatePickUpMeetingPoint(data),
    ...config,
  });

  return {
    updatePickUpMeetingPoint: mutateAsync,
    isPending: isPending,
  };
}
