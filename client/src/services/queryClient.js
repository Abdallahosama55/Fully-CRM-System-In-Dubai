import { QueryClient } from "@tanstack/react-query";
import { axiosCatch } from "utils/axiosUtils";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        try {
          axiosCatch(error);
        } catch (e) {}
      },
    },
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});
