import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BrandingService from "../branding.service";

export default (config) => {
  const query = useQuery({
    queryFn: () => BrandingService.getBranding(),
    queryKey: [QUERY_KEY.GET_BRANDING],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_BRANDING] };
};
