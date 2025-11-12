"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { carState } from "@/lib/type-lists";
import { useRouter, useSearchParams } from "next/navigation";
import { build } from "search-params";

export const CarStatusFilter = () => {
  const router = useRouter();

  const onChange = (value: string) => {
    const params = build({ status: value });
    router.push(`?${params}`);
  };

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Filter by Status' />
      </SelectTrigger>
      <SelectContent>
        {carState.map((state) => (
          <SelectItem value={state.value} key={`car-status-filter-${state.value}`}>
            {state.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
