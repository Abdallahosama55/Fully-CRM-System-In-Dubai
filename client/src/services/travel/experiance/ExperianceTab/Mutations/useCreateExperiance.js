import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../experiance.service";

export default function useCreateExperiance(config = {}) {
  const tempMutation = useMutation({
    mutationFn: ({ generalInfo, id }) => {
      return ExperianceService.createExperiance(generalInfo, id);
    },
    ...config,
  });

  return tempMutation;
}
