import { useMutation } from "@tanstack/react-query";
import meetingsService from "../meetings.service";

export default function useDeleteMeeting(meetingId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => meetingsService.deleteMeeting(meetingId),
    ...config,
  });

  return {
    deleteMeeting: mutateAsync,
    isDeleteMeetingPending: isPending,
  };
}
