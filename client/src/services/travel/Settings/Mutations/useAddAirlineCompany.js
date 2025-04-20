import { useMutation } from "@tanstack/react-query";
import TravelSettingsService from "../travelSettings.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ ...data }) => TravelSettingsService.addAirlineCompany(data),
    ...config,
  });
  return { addAirlineCompany: mutateAsync, isPending };
};
