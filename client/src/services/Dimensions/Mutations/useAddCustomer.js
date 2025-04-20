import { useMutation } from "@tanstack/react-query";
import DimensionsService from "services/dimensions.service";

export default function useSetDimensionEditMode(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ dimentionId, customerId }) =>
      DimensionsService.setDimensionEditMode(dimentionId, customerId),
    ...config,
  });

  return {
    setDimensionEditMode: mutateAsync,
    isPending: isPending,
  };
}
