import { useMutation } from "@tanstack/react-query";
import LeadService from "../Leads.service";

export default function useAddLead(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => LeadService.addLead(data),
    ...config,
  });

  return {
    addLead: mutateAsync,
    isPending: isPending,
  };
}
