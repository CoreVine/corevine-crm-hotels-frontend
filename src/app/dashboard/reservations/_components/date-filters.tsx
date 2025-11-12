"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  checkIn: Date | undefined;
  setCheckIn: React.Dispatch<React.SetStateAction<Date | undefined>>;
  checkOut: Date | undefined;
  setCheckOut: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export const HotelReservationDateFilters = ({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut
}: Props) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-2'>
        <label className='font-medium mb-2 text-sm'>Check in</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !checkIn && "text-muted-foreground"
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar mode='single' selected={checkIn} onSelect={setCheckIn} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className='space-y-2'>
        <label className='font-medium mb-2 text-sm'>Checkout</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !checkOut && "text-muted-foreground"
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {checkOut ? format(checkOut, "PPP") : <span>Pick a checkOut</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar mode='single' selected={checkOut} onSelect={setCheckOut} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
