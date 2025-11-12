"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClassValue } from "class-variance-authority/types";
import { Button } from "@/components/ui/button";

type Props = {
  defaultValue?: string;
  buttonClassName?: ClassValue;
  children?: React.ReactNode;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  selectedValue?: string;
};

export const SearchBox = ({ value, setValue, children, buttonClassName, selectedValue }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue);
    }
  }, [selectedValue, setValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn("justify-between", buttonClassName)}
        >
          {value ? value : "Select..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 z-50 min-w-[600px]'>
        <Command>
          <CommandInput
            onValueChange={(search: string) => setValue(search)}
            placeholder='Search...'
          />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
