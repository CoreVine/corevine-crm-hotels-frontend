"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
type Props = {
  optionDateFrom: Date | undefined;
  setOptionDateFrom: React.Dispatch<React.SetStateAction<Date | undefined>>;
  optionDateTo: Date | undefined;
  setOptionDateTo: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export const HotelReservationOptionDateFilters = ({
  optionDateFrom,
  setOptionDateFrom,
  optionDateTo,
  setOptionDateTo
}: Props) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-2'>
        <label className='font-medium mb-2 text-sm'>Option Date From</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !optionDateFrom && "text-muted-foreground"
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {optionDateFrom ? format(optionDateFrom, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={optionDateFrom}
              onSelect={setOptionDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className='space-y-2'>
        <label className='font-medium mb-2 text-sm'>Option Date To</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !optionDateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {optionDateTo ? format(optionDateTo, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={optionDateTo}
              onSelect={setOptionDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
