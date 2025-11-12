import { useMutation, useQuery } from "@tanstack/react-query";
import { changeAirportReservationState } from "./actions";

import { AirportReservationState, ApiError } from "@/types";
import { showResponse } from "@/lib/utils";

export function useChangeAirportReservationStatus(id: number) {
  return useMutation({
    mutationFn: (status: AirportReservationState) => changeAirportReservationState(id, status),
    onSuccess: (data) => showResponse(data),
    onError: (error: ApiError<any>) => showResponse(error)
  });
}
