import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";
import { API_BASE } from "services/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "vindo/unauth/";

const getCountryList = () => {
  return axios
    .get(SERVICE_BASE + "country-list?page=1&limit=300")
    .then((res) => {
      // Create an instance of Intl.DisplayNames for countries
      const countryNameGetter = new Intl.DisplayNames(["en"], { type: "region" });
      return res?.data?.data?.rows?.map((country) => ({...country , name: countryNameGetter?.of(country.alpha2Code)}));
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const useUnAuthCountryList = (config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY_CLIENT.GET_SYSTEM_COUNTRY_LIST],
    queryFn: () => getCountryList(),
    staleTime: Infinity, // Prevents refetching as long as the data is fresh
    cacheTime: 24 * 60 * 60 * 1000, // Cache data for 24 hours
    ...config,
  });
  return { ...query, key: [QUERY_KEY_CLIENT.GET_ACCOMMODATION_BY_ID] };
};

export default useUnAuthCountryList;
