import { useQuery } from "@tanstack/react-query";
import { getAllDrivers } from "./actions";

import { QueryKeys } from "@/lib/query-keys";

export function useDrivers(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.drivers(search),
    queryFn: ({ queryKey }) => getAllDrivers(queryKey[1])
  });

  return {
    drivers: query.data,
    modifiedDrivers: query.data?.map((driver) => ({
      id: driver.id,
      label: driver.name
    })),
    isDriversLoading: query.isLoading,
    isDriversError: query.isError,
    isDriversRefetching: query.isRefetching,
    refetchDrivers: query.refetch
  };
}
