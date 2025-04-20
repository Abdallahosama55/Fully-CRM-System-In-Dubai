import { useMutation } from "@tanstack/react-query";
import PickUpService from "../pick_up.service";

export default function useAddPickUpType(productId , config = {}) {
  const tempMutation = useMutation({
    mutationFn: (data) => PickUpService.addPickUpType(data , productId),
    ...config,
  });

  return tempMutation;
}
