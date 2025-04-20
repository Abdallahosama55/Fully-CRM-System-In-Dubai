import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import companyInfoService from "../companyInfo.service";

export default (config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.COMPANY_INFO, "all"],
    queryFn: () => companyInfoService.getAll(),
    ...config,
  });

  return { ...query, key: [QUERY_KEY.COMPANY_INFO, "all"] };
};
