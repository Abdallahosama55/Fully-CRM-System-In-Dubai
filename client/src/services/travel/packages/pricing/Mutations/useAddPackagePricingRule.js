import { useMutation } from "@tanstack/react-query";
import PackagesPricingService from "../pricing.service";

export default (tripId, config) => {
  const mutatino = useMutation({
    mutationFn: (data) => PackagesPricingService.addPricingRule({...data , tripId}),
    ...config,
  });

  return mutatino;
};
