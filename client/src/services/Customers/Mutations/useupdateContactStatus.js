import { useMutation } from "@tanstack/react-query";
import CustomerService from "../customer.service";

export default function useupdateContactStatus(id, config = {}) {
  const { mutateAsync: updateContactStatus, isPending } = useMutation({
    mutationFn: (data) => CustomerService.updateContactStatus(id, data),
    ...config,
  });
  return { updateContactStatus, isPending };
}
