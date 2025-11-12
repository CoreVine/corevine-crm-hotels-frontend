"use client";

import { HotelReservationState } from "@/types";
import { useChangeHotelReservationStatus } from "../_helpers/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { hotelReservationState } from "@/lib/type-lists";

type Props = {
  id: number;
  defaultValue: HotelReservationState;
};

export const ChangeHotelReservationStatus = ({ defaultValue, id }: Props) => {
  const mutation = useChangeHotelReservationStatus(id);

  const handleChangeStatus = (status: HotelReservationState) => {
    mutation.mutate(status);
  };

  return (
    <Select
      disabled={mutation.isPending}
      defaultValue={defaultValue}
      onValueChange={(val) => handleChangeStatus(val as HotelReservationState)}
    >
      <SelectTrigger disabled={mutation.isPending}>
        <SelectValue placeholder='Status' />
      </SelectTrigger>
      <SelectContent>
        {hotelReservationState.map((state, idx) => (
          <SelectItem
            key={`${state}-${idx}-${Math.floor(Math.random() * 100000000)}`}
            value={state.value}
          >
            {state.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
