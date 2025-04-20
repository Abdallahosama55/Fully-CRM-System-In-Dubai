import { useMutation } from "@tanstack/react-query";
import CustomerService from "../customer.service";

export default function useDeleteCustomerAttachment(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerService.deleteAttachment(data?.attachmentId, data?.customerId),
    ...config,
  });

  return {
    deleteCustomerAttachment: mutateAsync,
    isPending: isPending,
  };
}
