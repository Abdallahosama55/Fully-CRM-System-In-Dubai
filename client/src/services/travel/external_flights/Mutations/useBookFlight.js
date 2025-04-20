import { useMutation } from "@tanstack/react-query";
import ChartersService from "../external_flights.service";

export default (config = {}) => {
  const mutation = useMutation({
    mutationFn: ({ ...data }) => ChartersService.bookFlight(data),
    ...config,
  });

  return mutation;
};
