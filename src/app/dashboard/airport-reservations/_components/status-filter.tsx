"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { airportState } from "@/lib/type-lists"
import { useRouter, useSearchParams } from "next/navigation"
import { build } from "search-params"

export const AirportStatusFilter = () => {
  const router = useRouter()
  const sp = useSearchParams()

  const onChange = (value: string) => {
    const params = build({ status: value })
    router.push(`?${params}`)
  }

  const clearFilters = () => {
    const params = build({})
    router.push(`?${params}`)
  }

  return (
    <div className='flex gap-2'>
      <Select onValueChange={onChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Filter by Status' />
        </SelectTrigger>
        <SelectContent>
          {airportState.map((state) => (
            <SelectItem value={state.value} key={`airport-status-filter-${state.value}`}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={clearFilters} variant='outline'>
        Clear
      </Button>
    </div>
  )
}
