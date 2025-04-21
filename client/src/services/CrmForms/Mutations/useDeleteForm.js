import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "../forms.service";
import { QUERY_KEY } from "services/constants";

export default (config = {}) => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (id) => FormService.deleteForm(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_FORMS] });
      config.onSuccess?.(...args);
    },
    onError: config.onError,
  });

  return {
    deleteForm: mutateAsync,
    isPending,
  };
};
