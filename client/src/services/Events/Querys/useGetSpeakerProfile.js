import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import EventService from "../Events.service";

export default function useGetSpeakerProfile(eventId, userId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_SPEAKER_PROFILE_BY_ID, eventId, userId],
    queryFn: () => EventService.getSpeakerProfile(eventId, userId),
    retry:false,
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_SPEAKER_PROFILE_BY_ID, eventId, userId] };
}
