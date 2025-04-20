import { useMutation } from "@tanstack/react-query";
import LabelsService from "../labels.service";

export default function useUpdateLabel(id, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (form) => LabelsService.editLabel(id, form),
    ...config,
  });

  return {
    updateLabel: mutateAsync,
    isUpdateLabelPending: isPending,
  };
}
