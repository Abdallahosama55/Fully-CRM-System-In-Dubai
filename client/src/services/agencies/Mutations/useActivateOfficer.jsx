import { useMutation } from "@tanstack/react-query";
import OfficesService from "../offices.service";

export default function useActivateOffice(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (data) => {
      return OfficesService.activateOfficer(data);
    },
    ...config,
  });
  return tempMutation;
}
