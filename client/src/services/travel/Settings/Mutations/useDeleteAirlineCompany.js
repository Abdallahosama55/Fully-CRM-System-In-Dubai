import { useMutation } from "@tanstack/react-query";
import TravelSettingsService from "../travelSettings.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => TravelSettingsService.deleteAirlineCompany(id),
    ...config,
  });
  return { deleteAirlineCompany: mutateAsync, isPending };
};
