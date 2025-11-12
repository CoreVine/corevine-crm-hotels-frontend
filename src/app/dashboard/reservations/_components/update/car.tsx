import { useDrivers } from "@/app/dashboard/drivers/_helpers/hooks"
import { InputField } from "@/components/common/form/input-field"
import { SearchableData } from "@/components/common/form/searchable-data"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { CarIcon } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "use-debounce"

type Props = {
  form: any
  driver?: string
  defaultStatus?: string
}

export const CarForm = ({ form, driver = "", defaultStatus = "" }: Props) => {
  const [searchDrivers, setSearchDriversValue] = useState<string>(driver)
  const [debouncedSearchDrivers] = useDebounce(searchDrivers, 500)
  const { modifiedDrivers, isDriversLoading, isDriversRefetching } = useDrivers(debouncedSearchDrivers)

  return (
    <div className='space-y-4 border p-4 rounded-md shadow'>
      <div className='flex gap-2 items-center mb-4'>
        <div className='p-2 rounded-md bg-cyan-950 text-white'>
          <CarIcon size={16} />
        </div>
        <h3 className='text-lg font-medium flex gap-2'>Car Information</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <SearchableData label='Driver' search={searchDrivers} setSearch={setSearchDriversValue} data={modifiedDrivers} loading={isDriversRefetching || isDriversLoading} form={form} formItem='car.driver_id' />

        <InputField name='car.airline' label='Airline' placeholder='Delta Airlines' control={form.control} />

        <InputField name='car.meeting_point' label='Meeting Point' placeholder='Terminal 1 Arrivals' control={form.control} />

        <InputField name='car.coming_from' label='Coming From' placeholder='New York' control={form.control} />

        <SelectField name='car.status' control={form.control} label='Status' defaultValue={defaultStatus}>
          <SelectItem value='pending'>Pending</SelectItem>
          <SelectItem value='done'>Done</SelectItem>
          <SelectItem value='cancelled'>Cancelled</SelectItem>
        </SelectField>

        <InputField name='car.price' label='Price' placeholder='0' control={form.control} />

        <InputField name='car.arrival_date' label='Arrival Date' type='date' control={form.control} />

        <InputField name='car.arrival_time' label='Arrival Time' type='time' control={form.control} />

        <InputField name='car.comments' label='Comments' placeholder='Any additional information' control={form.control} />
      </div>
    </div>
  )
}
