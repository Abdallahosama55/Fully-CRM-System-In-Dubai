import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommonService from "services/common.service";
import { axiosCatch } from "utils/axiosUtils";
import LoadingPage from "components/common/LoadingPage";
import JoinMeetingNewUi from "./JoinMeetingNewUi";

export default function EventPage() {
  const { eventId } = useParams();
  const [fetchLoading, setFetchLoading] = useState(true);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setFetchLoading(true);
        const { data } = await CommonService.getEventInfo(eventId);
        setEventData(data);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setFetchLoading(false);
      }
    })();
  }, [eventId]);

  if (fetchLoading) {
    return <LoadingPage />;
  }

  return <JoinMeetingNewUi eventData={eventData} />;
}
