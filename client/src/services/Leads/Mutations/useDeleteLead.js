import { useMutation } from "@tanstack/react-query";
import LeadService from "../Leads.service";

export default function useDeleteLead(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ dealId }) => LeadService.deleteLead(dealId),
    ...config,
  });

  return {
    deleteLead: mutateAsync,
    isPending: isPending,
  };
}
