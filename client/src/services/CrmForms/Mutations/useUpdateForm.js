import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "../forms.service";
import { QUERY_KEY } from "services/constants";

export default (config = {}) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ groupId, ...rest }) => FormService.updateForm(groupId, rest),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_FORMS] });
      config?.onSuccess?.(...args);
    },
    onError: config?.onError,
  });

  return {
    updateForm: mutateAsync,
    isPending,
  };
};
