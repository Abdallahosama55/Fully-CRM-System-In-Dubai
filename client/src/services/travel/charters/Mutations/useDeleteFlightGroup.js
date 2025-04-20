import { useMutation } from "@tanstack/react-query";
import ChartersService from "../charters.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (groupId) => ChartersService.deleteFlightGroup(groupId),
    ...config,
  });
  return {
    deleteFlightGroup: mutateAsync,
    isPending: isPending,
  };
};
