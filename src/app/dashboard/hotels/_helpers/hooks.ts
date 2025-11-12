import { useQuery } from "@tanstack/react-query";
import { getAllHotels, getHotelsByCity } from "./actions";

import { QueryKeys } from "@/lib/query-keys";

export function useHotels(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.hotels(search),
    queryFn: ({ queryKey }) => getAllHotels(queryKey[1])
  });

  return {
    hotels: query.data,
    modifiedHotels: query.data?.map((hotel) => ({
      id: hotel.id,
      label: hotel.name
    })),
    isHotelsLoading: query.isLoading,
    isHotelsError: query.isError,
    isHotelsRefetching: query.isRefetching,
    refetchHotels: query.refetch
  };
}

export function useHotelsByCity(cityId: number, search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.hotelsByCity(cityId, search),
    queryFn: ({ queryKey }) => getHotelsByCity(Number(queryKey[1]), queryKey[2] as string)
  });

  return {
    hotels: query.data,
    modifiedHotels: query.data?.map((hotel) => ({
      id: hotel.id,
      label: hotel.name
    })),
    isHotelsLoading: query.isLoading,
    isHotelsError: query.isError,
    isHotelsRefetching: query.isRefetching,
    refetchHotels: query.refetch
  };
}
