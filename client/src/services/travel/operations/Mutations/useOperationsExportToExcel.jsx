import { useMutation } from "@tanstack/react-query";
import operatinsService from "../operations.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => operatinsService.exportToExcel(data.body, data.params),
    ...config,
  });

  return mutatino;
};
