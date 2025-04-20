import { useMutation } from "@tanstack/react-query";
import OfficesService from "../offices.service";

export default function useUpdateOfficePassword(id, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => {
      return OfficesService.updateOfficePassword({ id, ...payload });
    },
    ...config,
  });
  return tempMutation;
}
