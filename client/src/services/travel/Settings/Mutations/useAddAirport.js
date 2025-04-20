import { useMutation } from "@tanstack/react-query";
import TravelSettingsService from "../travelSettings.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ ...data }) => TravelSettingsService.addAirport(data),
    ...config,
  });
  return { addAirport: mutateAsync, isPending };
};
