import { useMutation } from "@tanstack/react-query";
import LabelsService from "../labels.service";

export default function useDeleteLabel(labelId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => LabelsService.deleteLabel(labelId),
    ...config,
  });

  return {
    deleteLabel: mutateAsync,
    isDeleteLabelPending: isPending,
  };
}
