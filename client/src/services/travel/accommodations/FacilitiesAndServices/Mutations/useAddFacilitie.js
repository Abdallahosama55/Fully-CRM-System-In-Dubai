import { useMutation } from "@tanstack/react-query";
import FacilitiesAndService from "../facilities.service";

export default function useAddFacilitie(id, config = {}) {
  return useMutation({
    mutationFn: (data) => {
      return FacilitiesAndService.addFacilitie(id, data);
    },
    ...config,
  });
}
