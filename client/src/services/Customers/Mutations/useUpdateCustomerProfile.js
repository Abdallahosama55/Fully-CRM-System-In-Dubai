import { useMutation } from "@tanstack/react-query";
import CustomerService from "../customer.service";

export default function useUpdateCustomer(id, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (form) => CustomerService.update(id, form),
    ...config,
  });

  return {
    updateCustomer: mutateAsync,
    isPending: isPending,
  };
}
