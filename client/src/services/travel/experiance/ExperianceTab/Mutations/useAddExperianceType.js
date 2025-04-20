import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../experiance.service";
export default function useAddExperianceType(id, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (type) => {
      return ExperianceService.addExperianceType({ type, id });
    },
    ...config,
  });
  return tempMutation;
}
