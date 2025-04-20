import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BOOKING_BASE = "/common";

const getSupplierData = () => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/get-supplier-data`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const useGetSupplierData = (code, config) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.AIRLINE_BY_CODE, code],
    queryFn: () => getSupplierData(code),
    staleTime: Infinity,
    cacheTime: Infinity, 
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.AIRLINE_BY_CODE, code] };
};

export default useGetSupplierData;