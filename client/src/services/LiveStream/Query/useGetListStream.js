import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import LiveStreamService from "services/liveStream.service";
import LiveStream from "views/VirtualSupport/LiveStream";

// eslint-disable-next-line import/no-anonymous-default-export
export default (config = {}) => {
  const data = useQuery({
    queryKey: [QUERY_KEY.LIVE_STREAM_LIST],
    queryFn: () => LiveStreamService.listLiveStreams(),
    ...config,
  });
  return { ...data, key: [QUERY_KEY.LIVE_STREAM_LIST] };
};
