import { useMutation } from "@tanstack/react-query";
import OfficesService from "../offices.service";

export default function useGenerateofficerToken(id, config = {}) {
  const tempMutation = useMutation({
    mutationFn: () => OfficesService.generateofficerToken(id),
    ...config,
  });
  return tempMutation;
}
