import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useAddPickUpMeetingPoint(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PickUpService.addPickUpMeetingPoint(productId, data),
    ...config,
  });

  return {
    addPickUpMeetingPoint: mutateAsync,
    isPending: isPending,
  };
}
