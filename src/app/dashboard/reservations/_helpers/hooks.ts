import { useMutation, useQuery } from "@tanstack/react-query"
import { changeHotelManyReservationState, changeHotelReservationState } from "./actions"

import { ApiError, HotelReservationState } from "@/types"
import { showResponse } from "@/lib/utils"

export function useChangeHotelReservationStatus(id: number) {
  return useMutation({
    mutationFn: (status: HotelReservationState) => changeHotelReservationState(id, status),
    onSuccess: (data) => showResponse(data),
    onError: (error: ApiError<any>) => showResponse(error)
  })
}

export function useChangeManyHotelReservationStatus() {
  return useMutation({
    mutationFn: ({ ids, status }: { ids: number[]; status: HotelReservationState }) => changeHotelManyReservationState(ids, status),
    onSuccess: (data) => showResponse(data),
    onError: (error: ApiError<any>) => showResponse(error)
  })
}
