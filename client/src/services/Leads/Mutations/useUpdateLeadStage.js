import { useMutation } from "@tanstack/react-query";
import LeadsService from "../Leads.service";

export default function useUpdateLeadStage(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => LeadsService.updateLeadStage(data),
    ...config,
  });
  return { updateLeadStage: mutateAsync, isPending };
}
