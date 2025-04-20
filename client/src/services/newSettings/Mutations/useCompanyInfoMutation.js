import { useMutation } from "@tanstack/react-query";
import companyInfoService from "../companyInfo.service";

export default function useCompanyInfoMutation(config = {}) {
  const { mutateAsync: editAddress, isPending: isPendingEditAddress } = useMutation({
    mutationFn: ({ id, data }) => companyInfoService.editAddress(id, data),
    ...config,
  });

  const { mutateAsync: editContactInfo, isPending: isPendingEditContactInfo } = useMutation({
    mutationFn: ({ id, data }) => companyInfoService.editContactInfo(id, data),
    ...config,
  });

  const { mutateAsync: editContactPerson, isPending: isPendingEditContactPerson } = useMutation({
    mutationFn: ({ id, data }) => companyInfoService.editContactPerson(id, data),
    ...config,
  });

  const { mutateAsync: editMainInfo, isPending: isPendingEditMainInfo } = useMutation({
    mutationFn: ({ id, data }) => companyInfoService.editMainInfo(id, data),
    ...config,
  });

  const { mutateAsync: editWorkingTime, isPending: isPendingEditWorkingTime } = useMutation({
    mutationFn: ({ id, data }) => companyInfoService.editWorkingTime(id, data),
    ...config,
  });

  return {
    isPendingEditAddress,
    isPendingEditContactInfo,
    isPendingEditContactPerson,
    isPendingEditMainInfo,
    isPendingEditWorkingTime,
    editAddress,
    editContactInfo,
    editContactPerson,
    editMainInfo,
    editWorkingTime,
  };
}
