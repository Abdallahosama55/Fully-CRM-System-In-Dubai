import { useMutation } from "@tanstack/react-query";
import meetingsService from "../meetings.service";

export default (config = {}) => {
  let statusURL = "";
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, ...data }) => meetingsService.UpdateMeetingStatus(id, data),
    ...config,
  });

  const handleEndPoint = async (data) => {
    switch (data.status.name) {
      case "Confirmed":
        statusURL = "confirm";
        break;
      case "Rejected":
        statusURL = "reject";
        break;
      case "Cancelled":
        statusURL = "cancel";
        break;
      case "Completed":
        statusURL = "complete";
        break;
      default:
        statusURL = "";
        break;
    }

    if (!statusURL) return;
    await mutateAsync({ ...data });
  };

  return { UpdateMeetingStatus: handleEndPoint };
};
