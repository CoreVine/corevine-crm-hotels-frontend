import { useQuery } from "@tanstack/react-query";
import { getAllRates } from "./actions";

import { RateState } from "@/types";
import { QueryKeys } from "@/lib/query-keys";

export function useRates(search?: string, state?: RateState) {
  const query = useQuery({
    queryKey: QueryKeys.rates(search, state),
    queryFn: ({ queryKey }) => getAllRates(queryKey[1], queryKey[2] as RateState)
  });

  return {
    rates: query.data,
    modifiedRates: query.data?.map((rate) => ({
      label: rate.name,
      id: rate.id
    })),
    isRatesLoading: query.isLoading,
    isRatesError: query.isError,
    isRatesRefetching: query.isRefetching,
    refetchRates: query.refetch
  };
}
