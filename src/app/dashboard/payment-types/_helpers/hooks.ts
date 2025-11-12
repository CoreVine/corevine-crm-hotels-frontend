import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/lib/query-keys";
import { getAllPaymentTypes } from "./actions";

export function usePaymentTypes(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.paymentTypes(search),
    queryFn: ({ queryKey }) => getAllPaymentTypes(queryKey[1])
  });

  return {
    paymentTypes: query.data,
    modifiedPaymentTypes: query.data?.map((paymentType) => ({
      id: paymentType.id,
      label: paymentType.name
    })),
    isPaymentTypesLoading: query.isLoading,
    isPaymentTypesError: query.isError,
    isPaymentTypesRefetching: query.isRefetching,
    refetchPaymentTypes: query.refetch
  };
}
