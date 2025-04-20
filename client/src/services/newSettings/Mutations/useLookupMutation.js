import { useMutation } from "@tanstack/react-query";
import cityService from "../cities.service";
import constantService from "../constant.server";
import categoriesService from "../categories.service";
import countriesService from "../countries.service";
import departementService from "../departements.service";
import jobTitlesService from "../jobTitles.service";
import statesService from "../states.service";
import TravelSettingsService from "services/travel/Settings/travelSettings.service";

const getServiceAdd = (type, params) => {
  switch (type) {
    case "cites":
      return cityService.addCity(params);

    case "countries":
      return countriesService.addCountry(params);
    case "job":
      return jobTitlesService.addJobTitle(params);
    case "departements":
      return departementService.addDepartement(params);
    case "states":
      return statesService.addState(params);
    case "category":
      return categoriesService.addCategory(params);
    default:
      return [];
  }
};

export default function useLookupMutation({ type } = {}, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => getServiceAdd(type, data),
    ...config,
  });

  return {
    addLookup: mutateAsync,
    isPending: isPending,
  };
}
