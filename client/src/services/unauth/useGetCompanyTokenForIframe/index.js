import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "services/config";
import { useEffect } from "react";
import { useUserContext } from "context/userContext";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "vindo/unauth/";

const createCompany = (payload) => {
  return axios
    .post(SERVICE_BASE + "create-company", payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const useGetCompanyTokenForIframe = (payload, config = {}) => {
  const { user, setUser } = useUserContext();

  const createCompanyMutation = useMutation({
    mutationFn: (payload) => createCompany(payload),
    onSuccess: (res, payload) => {
      axios.defaults.headers.authorization = res?.vindoWebDashboardAccessToken;
      setUser(res);
      if (config?.onSuccess && typeof config?.onSuccess === "function") {
        config.onSuccess(payload, res);
      }
    },
    ...config,
  });
  useEffect(() => {
    if (!user && payload?.id && payload?.name) {
      createCompanyMutation.mutate(payload);
    }
  }, [payload?.id, payload?.name]);

  return createCompanyMutation;
};

export default useGetCompanyTokenForIframe;
