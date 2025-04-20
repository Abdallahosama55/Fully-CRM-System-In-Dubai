import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CompanyInfoService from "../company_info.service";

export default function useGetCompanyInfo(config = {}) {
  const storedCompanyInfo = localStorage.getItem("CompanyInfo")
    ? JSON.parse(localStorage.getItem("CompanyInfo"))
    : null;

  const query = useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_INFO],
    initialData: storedCompanyInfo,
    queryFn: () => CompanyInfoService.getCompanyInfo(),
    onSuccess: (data) => {
      localStorage.setItem("CompanyInfo", JSON.stringify(data));
    },
    ...config,
  });

  return {
    ...query,
    queryKey: [QUERY_KEY.GET_COMPANY_INFO],
  };
}
