"use client";

import { CarReservationState } from "@/types";
import { useChangeCarReservationStatus } from "../_helpers/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { carState } from "@/lib/type-lists";

type Props = {
  carReservationId: number;
  defaultValue: CarReservationState;
};

export const ChangeCarReservationStatus = ({ defaultValue, carReservationId }: Props) => {
  const mutation = useChangeCarReservationStatus(carReservationId);

  const handleChangeStatus = (status: CarReservationState) => {
    mutation.mutate(status);
  };

  return (
    <Select
      disabled={mutation.isPending}
      defaultValue={defaultValue}
      onValueChange={(val) => handleChangeStatus(val as CarReservationState)}
    >
      <SelectTrigger disabled={mutation.isPending}>
        <SelectValue placeholder='Status' />
      </SelectTrigger>
      <SelectContent>
        {carState.map((state) => (
          <SelectItem key={state.value} value={state.value}>{state.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
