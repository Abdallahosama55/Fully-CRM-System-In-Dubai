import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../experiance.service";

export default function useAddCategoriesAndThemes(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, productId }) => ExperianceService.addCategoriesAndThemes(data, productId),
    ...config,
  });

  return {
    addCategoriesAndThemes: mutateAsync,
    isPending: isPending,
  };
}
