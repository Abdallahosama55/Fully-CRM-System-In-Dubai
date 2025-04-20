import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../index";

export default function useFlipExperianceState(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (id) => ExperianceService.activateExperiance(id),
    ...config,
  });

  return tempMutation;
}
