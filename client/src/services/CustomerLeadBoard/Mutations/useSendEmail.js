import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useSendEmail(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerLeadBoardService.sendEmail(data),
    ...config,
  });

  return {
    sendEmail: mutateAsync,
    isPending: isPending,
  };
}
