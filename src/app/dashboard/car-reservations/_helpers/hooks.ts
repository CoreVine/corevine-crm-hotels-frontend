import { useMutation, useQuery } from "@tanstack/react-query";
import { changeCarReservationState } from "./actions";

import { ApiError, CarReservationState } from "@/types";
import { showResponse } from "@/lib/utils";

export function useChangeCarReservationStatus(id: number) {
  return useMutation({
    mutationFn: (status: CarReservationState) => changeCarReservationState(id, status),
    onSuccess: (data) => showResponse(data),
    onError: (error: ApiError<any>) => showResponse(error)
  });
}
