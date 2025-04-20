import { useMutation } from "@tanstack/react-query";
import ChartersService from "../charters.service";

export default (config = {}) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (id) => ChartersService.deleteFlight(id),
    ...config,
  });
  return {
    deleteFlight: mutateAsync,
    isPending,
  };
};
