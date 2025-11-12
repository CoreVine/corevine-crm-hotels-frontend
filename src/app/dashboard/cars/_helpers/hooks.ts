import { useQuery } from "@tanstack/react-query"
import { getAllCars } from "./actions"

import { QueryKeys } from "@/lib/query-keys"

export function useCars(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.cities(search),
    queryFn: ({ queryKey }) => getAllCars(queryKey[1])
  })

  return {
    cars: query.data,
    modifiedCars: query.data?.map((car) => ({
      label: car.make + " " + car.model + " (" + car.year + ")",
      id: car.id
    })),
    isCarsLoading: query.isLoading,
    isCarsError: query.isError,
    isCarsRefetching: query.isRefetching,
    refetchCars: query.refetch
  }
}
