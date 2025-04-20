import { useMutation } from "@tanstack/react-query";
import AreaService from "../area.service";

export default function useAddArea(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => AreaService.addArea(payload),
    ...config,
  });

  return tempMutation;
}
