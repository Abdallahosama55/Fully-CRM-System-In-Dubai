import { useMutation } from "@tanstack/react-query";
import ChartersService from "../charters.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => {
      console.log("data", data);
      ChartersService.addFlight(data);
    },
    ...config,
  });

  return { addFlight: mutateAsync, isPending };
};
