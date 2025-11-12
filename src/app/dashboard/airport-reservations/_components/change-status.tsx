"use client";

import { AirportReservationState } from "@/types";
import { useChangeAirportReservationStatus } from "../_helpers/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { carState } from "@/lib/type-lists";

type Props = {
  airportReservationId: number;
  defaultValue: AirportReservationState;
};

export const ChangeAirportReservationStatus = ({ defaultValue, airportReservationId }: Props) => {
  const mutation = useChangeAirportReservationStatus(airportReservationId);

  const handleChangeStatus = (status: AirportReservationState) => {
    mutation.mutate(status);
  };

  return (
    <Select
      disabled={mutation.isPending}
      defaultValue={defaultValue}
      onValueChange={(val) => handleChangeStatus(val as AirportReservationState)}
    >
      <SelectTrigger disabled={mutation.isPending}>
        <SelectValue placeholder='Status' />
      </SelectTrigger>
      <SelectContent>
        {carState.map((state) => (
          <SelectItem value={state.value}>{state.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
