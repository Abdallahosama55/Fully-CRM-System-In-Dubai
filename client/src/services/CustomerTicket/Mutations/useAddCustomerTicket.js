import { useMutation } from "@tanstack/react-query";
import CustomerTicketService from "services/customerTicket.service";

export default (config = {}) => {
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: (formData) => CustomerTicketService.add(formData),
    ...config,
  });

  return {
    createCustomerTicket: mutateAsync,
    data,
    isPending,
  };
};
