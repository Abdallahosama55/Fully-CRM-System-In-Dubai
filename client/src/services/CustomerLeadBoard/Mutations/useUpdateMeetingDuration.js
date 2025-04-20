import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useUpdateMeetingDuration(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ meetingId, durationId }) =>
      CustomerLeadBoardService.updateMeetingDuration(meetingId, durationId),
    ...config,
  });

  return {
    updateMeetingDuration: mutateAsync,
    isPending: isPending,
  };
}
