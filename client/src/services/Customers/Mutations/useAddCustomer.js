import { useMutation } from "@tanstack/react-query";
import CustomerService from "../customer.service";

export default function useAddCustomer(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerService.add(data),
    ...config,
  });

  return {
    addCustomer: mutateAsync,
    isPending: isPending,
  };
}
