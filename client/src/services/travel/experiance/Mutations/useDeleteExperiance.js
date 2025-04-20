import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../index";

export default function useDeleteExperiance(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (id) => ExperianceService.deleteExperiance(id),
    ...config,
  });

  return tempMutation;
}
