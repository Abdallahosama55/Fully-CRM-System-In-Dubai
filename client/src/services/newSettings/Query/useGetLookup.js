import { useQuery } from "@tanstack/react-query";
import cityService from "../cities.service";
import { QUERY_KEY } from "services/constants";
import countriesService from "../countries.service";
import jobTitlesService from "../jobTitles.service";
import constantService from "../constant.server";
import categoriesService from "../categories.service";
import statesService from "../states.service";
import departementService from "../departements.service";
import TravelSettingsService from "services/travel/Settings/travelSettings.service";
const fetch = (type, params) => {
  switch (type) {
    case "cites":
      return cityService.getCitiesByStateId(params);
    case "countries":
      return countriesService.getAll();
    case "job":
      return jobTitlesService.getAll();
    case "departements":
      return departementService.getAll();
    case "nationality":
      return constantService.getNationality();
    case "states":
      return statesService.getStatesByCountryId(params);
    case "category":
      return categoriesService.getCategory();
    default:
      return [];
  }
};

export default function useGetLookup({ type, params }, config = {}) {
  const { ...rest } = useQuery({
    queryFn: () => fetch(type, params),
    queryKey: [QUERY_KEY.LOOKUP + type, params],
    refetchOnMount: false,
    staleTime: Infinity,

    select: (data) => {
      return data?.data?.data;
    },
    ...config,
  });
  return { ...rest, key: [QUERY_KEY.LOOKUP + type, params] };
}
