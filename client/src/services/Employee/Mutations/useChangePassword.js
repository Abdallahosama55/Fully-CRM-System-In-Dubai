import { useMutation } from "@tanstack/react-query";
import EmployeeService from "../employee.service";

export default function useChangePassword(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => EmployeeService.changePassword(data),
    ...config,
  });

  return {
    changePassword: mutateAsync,
    isPending: isPending,
  };
}
