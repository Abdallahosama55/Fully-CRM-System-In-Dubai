import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useUpdateMeetingReminder(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ meetingId, statusId }) =>
      CustomerLeadBoardService.updateMeetingReminder(meetingId, statusId),
    ...config,
  });

  return {
    updateMeetingReminder: mutateAsync,
    isPending: isPending,
  };
}
