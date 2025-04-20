import { useMutation } from "@tanstack/react-query";
import StoreService from "../api";

export default () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data) => StoreService.addOrder(data),
  });
  return { addPlaceOrder: mutateAsync };
};
