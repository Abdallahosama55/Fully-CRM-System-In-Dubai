import { useMutation } from "@tanstack/react-query";
import LeadService from "../Leads.service";

export default function useUpdateLead(id, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => LeadService.updateLead(id, data),
    ...config,
  });

  return {
    updateLead: mutateAsync,
    isPending: isPending,
  };
}
