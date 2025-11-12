import { useQuery } from "@tanstack/react-query";

import { CityState } from "@/types";
import { QueryKeys } from "@/lib/query-keys";

import { getAllCompanies } from "./actions";

export function useCompanies(search?: string, state?: CityState) {
  const query = useQuery({
    queryKey: QueryKeys.cities(search, state),
    queryFn: ({ queryKey }) => getAllCompanies(queryKey[1], queryKey[2] as CityState)
  });

  return {
    companies: query.data,
    modifiedCompanies: query.data?.map((company) => ({
      id: company.id,
      label: company.name
    })),
    isCompaniesLoading: query.isLoading,
    isCompaniesError: query.isError,
    isCompaniesRefetching: query.isRefetching,
    refetchCompanies: query.refetch
  };
}
