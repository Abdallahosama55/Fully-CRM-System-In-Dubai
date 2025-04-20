import { useMutation } from "@tanstack/react-query";
import CustomerService from "../customer.service";

export default function useSendEmail(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerService.sendEmail(data),
    ...config,
  });

  return {
    sendEmail: mutateAsync,
    isPending: isPending,
  };
}
