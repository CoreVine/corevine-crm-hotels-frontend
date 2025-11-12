import { useQuery } from "@tanstack/react-query"
import { getAllCurrencies } from "./actions"

import { TSearchParams } from "@/types"
import { QueryKeys } from "@/lib/query-keys"

export function useCurrencies(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.currencies(),
    queryFn: ({ queryKey }) => getAllCurrencies(queryKey[1])
  })

  return {
    cities: query.data,
    modifiedCurrencies: query.data?.map((currency) => ({
      label: currency.name + " - " + currency.code,
      id: currency.id
    })),
    isCurrenciesLoading: query.isLoading,
    isCurrenciesError: query.isError,
    isCurrenciesRefetching: query.isRefetching,
    refetchCurrencies: query.refetch
  }
}
