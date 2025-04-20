import { useMutation } from "@tanstack/react-query";
import meetingsService from "../meetings.service";

export default (config = {}) => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, ...data }) => meetingsService.UpdateLabel(id, data),

    ...config,
  });
  return { updateMeetingLabel: mutateAsync };
};
