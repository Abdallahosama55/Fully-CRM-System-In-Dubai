import { useMutation } from "@tanstack/react-query";
import LabelsService from "../labels.service";

export default function useAddLabel(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => LabelsService.addLabel(data),
    ...config,
  });

  return {
    addLabel: mutateAsync,
    isAddLabelPending: isPending,
  };
}
