import { useMutation } from "@tanstack/react-query";
import meetingsService from "../meetings.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => meetingsService.createMeeting(data),
    ...config,
  });
  return { createMeeting: mutateAsync, isPending };
};
