import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "./actions";

import { QueryKeys } from "@/lib/query-keys";

export function useRooms(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.rooms(search),
    queryFn: ({ queryKey }) => getAllRooms(queryKey[1])
  });

  return {
    rooms: query.data,
    modifiedRooms: query.data?.map((room) => ({
      label: room.room_type,
      id: room.id
    })),
    isRoomsLoading: query.isLoading,
    isRoomsError: query.isError,
    isRoomsRefetching: query.isRefetching,
    refetchRooms: query.refetch
  };
}
