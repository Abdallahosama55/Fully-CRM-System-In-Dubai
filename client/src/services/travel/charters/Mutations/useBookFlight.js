import { useMutation } from "@tanstack/react-query";
import ChartersService from "../charters.service";

export default (config = {}) => {
  const mutation = useMutation({
    mutationFn: ({ ...data }) => ChartersService.bookFlight(data),
    ...config,
  });

  return mutation;
};
