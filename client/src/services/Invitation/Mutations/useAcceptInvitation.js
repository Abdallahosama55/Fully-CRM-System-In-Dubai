import { useMutation } from "@tanstack/react-query";
import InvitationService from "../invitation.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ ...data }) => InvitationService.invitationAcceptJoinCompany(data),
    ...config,
  });

  return {
    isPending,
    invitationAcceptJoinCompany: mutateAsync,
  };
};
