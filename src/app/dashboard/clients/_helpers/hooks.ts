import { useQuery } from "@tanstack/react-query"

import { QueryKeys } from "@/lib/query-keys"
import { getAllClients } from "./actions"

export function useClients(search?: string) {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: QueryKeys.clients(search),
    queryFn: () => getAllClients(search)
  })

  return {
    clients: data,
    modifiedClients: data?.map((client) => ({
      id: client.id,
      label: client.name
    })),
    isClientsLoading: isLoading,
    isClientsRefetching: isRefetching,
    refetchClients: refetch
  }
}
