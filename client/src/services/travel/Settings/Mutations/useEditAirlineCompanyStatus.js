import { useMutation } from "@tanstack/react-query";
import TravelSettingsService from "../travelSettings.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, ...data }) => TravelSettingsService.editStatusAirlineCompany(id, data),
    ...config,
  });
  return { editStatusAirlineCompany: mutateAsync, isPending };
};
