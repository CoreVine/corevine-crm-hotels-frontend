import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "./actions"

import { TSearchParams } from "@/types"
import { QueryKeys } from "@/lib/query-keys"

export function useCategories(sp?: TSearchParams) {
  const query = useQuery({
    queryKey: QueryKeys.categories(sp),
    queryFn: ({ queryKey }) => getAllCategories(queryKey[1] as TSearchParams)
  })

  return {
    cities: query.data,
    modifiedCategories: query.data?.map((currency) => ({
      label: currency.name,
      id: currency.id
    })),
    isCategoriesLoading: query.isLoading,
    isCategoriesError: query.isError,
    isCategoriesRefetching: query.isRefetching,
    refetchCategories: query.refetch
  }
}
