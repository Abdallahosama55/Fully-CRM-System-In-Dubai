import { useMutation } from "@tanstack/react-query";
import ChartersService from "../charters.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ groupId, ...rest }) => ChartersService.editFlight(groupId, rest),
    ...config,
  });
  return {
    editFlights: mutateAsync,
    isPending,
  };
};
