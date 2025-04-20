import { useMutation } from "@tanstack/react-query";
import ExperianceStepsService from "../steps.service";

export default function useUpdateExperianceSteps(config = {}) {
  const { mutate, isPending } = useMutation({
    mutationFn: (steps) => ExperianceStepsService.updateExperianceSteps(steps),
    ...config,
  });

  return {
    updateExperianceSteps: mutate,
    isPending: isPending,
  };
}
