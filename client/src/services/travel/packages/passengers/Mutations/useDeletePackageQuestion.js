import { useMutation } from "@tanstack/react-query";
import PackagesPassengersService from "../passengers.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (id) => PackagesPassengersService.deleteQuestion(id),
    ...config,
  });

  return mutatino;
};
