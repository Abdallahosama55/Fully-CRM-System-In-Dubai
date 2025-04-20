import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useAddCall(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerLeadBoardService.addCall(data),
    ...config,
  });

  return {
    addCall: mutateAsync,
    isPending: isPending,
  };
}
