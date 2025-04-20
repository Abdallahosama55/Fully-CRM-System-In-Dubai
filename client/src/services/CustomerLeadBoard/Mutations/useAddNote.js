import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useAddNote(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerLeadBoardService.addNote(data),
    ...config,
  });

  return {
    addNote: mutateAsync,
    isPending: isPending,
  };
}
