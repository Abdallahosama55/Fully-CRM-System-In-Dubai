import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../experiance.service";
export default function useUpdateDoneSteps(id, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (doneSteps) => {
      return ExperianceService.updateDoneSteps({ doneSteps, id });
    },
    ...config,
  });
  return tempMutation;
}
