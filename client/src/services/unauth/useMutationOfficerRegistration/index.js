import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AI_API_BASE_TRAVEL_ENDPOINT } from "services/config";

const createOfficerRegistration = (payload) => {
  return axios
    .post(`${AI_API_BASE_TRAVEL_ENDPOINT}/dashboard/unauth/officer-registration`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw error;
    });
};
export default function useMutationOfficerRegistration(config = {}) {
  const OfficerRegistration = useMutation({
    mutationFn: (data) => createOfficerRegistration(data),
    ...config,
  });

  return OfficerRegistration;
}
