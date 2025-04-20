import { useMutation } from "@tanstack/react-query";
import NotesService from "../notes.service";

export default function useAddNote(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => NotesService.addNote(data),
    ...config,
  });

  return {
    addNote: mutateAsync,
    isPending: isPending,
  };
}
