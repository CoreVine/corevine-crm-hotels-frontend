import { useQuery } from "@tanstack/react-query";
import { getAllCities } from "./actions";

import { CityState } from "@/types";
import { QueryKeys } from "@/lib/query-keys";

export function useCities(search?: string, state?: CityState) {
  const query = useQuery({
    queryKey: QueryKeys.cities(search, state),
    queryFn: ({ queryKey }) => getAllCities(queryKey[1], queryKey[2] as CityState)
  });

  return {
    cities: query.data,
    modifiedCities: query.data?.map((city) => ({
      label: city.name,
      id: city.id
    })),
    isCitiesLoading: query.isLoading,
    isCitiesError: query.isError,
    isCitiesRefetching: query.isRefetching,
    refetchCities: query.refetch
  };
}
