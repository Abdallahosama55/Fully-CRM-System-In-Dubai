import { useMutation } from "@tanstack/react-query";
import CustomerService from "../customer.service";
export default function useInviteCustomer(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerService.inviteCustomer(data),
    ...config,
    
  });
  return { inviteCustomer: mutateAsync, isPending };
}
