import { useMutation } from "@tanstack/react-query";
import CustomerService from "../customer.service";

export default function useUpdateStatusCustomer(config = {}) {
  const { mutateAsync: updateStatus, isPending } = useMutation({
    mutationFn: ({ id }) => CustomerService.updateStatus(id),
    ...config,
  });
  return { updateStatus, isPending };
}
