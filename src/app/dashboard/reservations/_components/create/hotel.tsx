import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchableData } from "@/components/common/form/searchable-data"
import { SelectField } from "@/components/common/form/select-field"
import { InputField } from "@/components/common/form/input-field"
import { Building } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import { useHotelsByCity } from "@/app/dashboard/hotels/_helpers/hooks"
import { usePaymentTypes } from "@/app/dashboard/payment-types/_helpers/hooks"
import { useCompanies } from "@/app/dashboard/companies/_helpers/hooks"
import { useDebounce } from "use-debounce"
import { useCities } from "@/app/dashboard/cities/_helpers/hooks"
import { useMeals } from "@/app/dashboard/meals/_helpers/hooks"
import { useRates } from "@/app/dashboard/rates/_helpers/hooks"
import { useRooms } from "@/app/dashboard/rooms/_helpers/hooks"

type Props = {
  form: any
  daysDifference: number
  checkIn: Date
  checkOut: Date
  priceType: string
  setPriceType: (type: string) => void
  setCheckIn: (date: Date) => void
  setCheckOut: (date: Date) => void
  setDaysDifference: (days: number) => void
}

export const HotelForm = ({ form, daysDifference, checkIn, checkOut, priceType, setPriceType, setCheckIn, setCheckOut, setDaysDifference }: Props) => {
  const [searchMeals, setSearchMeals] = useState<string>("")
  const [debouncedSearchMeals] = useDebounce(searchMeals, 500)

  const [searchCompanies, setSearchCompanies] = useState<string>("")
  const [debouncedSearchCompanies] = useDebounce(searchCompanies, 500)

  const [searchRates, setSearchRates] = useState<string>("")
  const [debouncedSearchRates] = useDebounce(searchRates, 500)

  const [searchPaymentTypes, setSearchPaymentTypes] = useState<string>("")
  const [debouncedSearchPaymentTypes] = useDebounce(searchPaymentTypes, 500)

  const [searchCities, setSearchCities] = useState<string>("")
  const [debouncedSearchCities] = useDebounce(searchCities, 500)

  const [searchHotels, setSearchHotels] = useState<string>("")
  const [debouncedSearchHotels] = useDebounce(searchHotels, 500)

  const [searchRooms, setSearchRooms] = useState<string>("")
  const [debouncedSearchRooms] = useDebounce(searchRooms, 500)

  const { modifiedMeals, isMealsLoading, isMealsRefetching } = useMeals(debouncedSearchMeals)
  const { modifiedCompanies, isCompaniesLoading, isCompaniesRefetching } = useCompanies(debouncedSearchCompanies)
  const { modifiedRates, isRatesLoading, isRatesRefetching } = useRates(debouncedSearchRates)
  const { modifiedPaymentTypes, isPaymentTypesLoading, isPaymentTypesRefetching } = usePaymentTypes(debouncedSearchPaymentTypes)

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)

  const { modifiedCities, isCitiesLoading, isCitiesRefetching } = useCities(debouncedSearchCities)
  const { modifiedHotels, isHotelsLoading, isHotelsRefetching } = useHotelsByCity(selectedCityId!, debouncedSearchHotels)
  const { modifiedRooms, isRoomsLoading, isRoomsRefetching } = useRooms(debouncedSearchRooms)

  useEffect(() => {
    if (checkIn && checkOut && checkOut > checkIn) {
      const diffTime = checkOut.getTime() - checkIn.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysDifference(diffDays)
    } else {
      setDaysDifference(0)
    }
  }, [checkIn, checkOut])

  return (
    <div className='space-y-4 border p-4 rounded-md shadow'>
      <div className='flex gap-2 items-center mb-4'>
        <div className='p-2 rounded-md bg-green-600 text-white'>
          <Building size={16} />
        </div>
        <h3 className='text-lg font-medium flex gap-2'>Hotel Information</h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <SearchableData
          loading={isCitiesLoading || isCitiesRefetching}
          data={modifiedCities}
          search={searchCities}
          setSearch={setSearchCities}
          label='Cities'
          formItem='hotel.city_id'
          executeFunctionWithId={(id) => setSelectedCityId(id!)}
          form={form}
          error={form.formState.errors?.hotel?.city_id?.message}
        />

        <SearchableData loading={isHotelsLoading || isHotelsRefetching} data={modifiedHotels} search={searchHotels} setSearch={setSearchHotels} label='Hotels' formItem='hotel.hotel_id' form={form} error={form.formState.errors?.hotel?.hotel_id?.message} />
        <SearchableData loading={isMealsLoading || isMealsRefetching} data={modifiedMeals} search={searchMeals} setSearch={setSearchMeals} label='Meals' formItem='hotel.meal_id' form={form} error={form.formState.errors?.hotel?.meal_id?.message} />
        <SearchableData loading={isCompaniesLoading || isCompaniesRefetching} data={modifiedCompanies} search={searchCompanies} setSearch={setSearchCompanies} label='Companies' formItem='hotel.company_id' form={form} error={form.formState.errors?.hotel?.company_id?.message} />
        <SearchableData loading={isRatesLoading || isRatesRefetching} data={modifiedRates} search={searchRates} setSearch={setSearchRates} label='Rate Id' formItem='hotel.rate_id' form={form} error={form.formState.errors?.hotel?.rate_id?.message} />
        <SearchableData loading={isRoomsLoading || isRoomsRefetching} data={modifiedRooms} search={searchRooms} setSearch={setSearchRooms} label='Room' formItem='hotel.room_id' form={form} error={form.formState.errors?.hotel?.room_id?.message} />
        <SearchableData
          loading={isPaymentTypesLoading || isPaymentTypesRefetching}
          data={modifiedPaymentTypes}
          search={searchPaymentTypes}
          setSearch={setSearchPaymentTypes}
          label='Payment Type'
          formItem='hotel.payment_type_id'
          form={form}
          error={form.formState.errors?.hotel?.payment_type_id?.message}
        />

        <div className='space-y-2'>
          <Label>Check in</Label>
          <Input onChange={(e) => setCheckIn(new Date(e.target.value))} type='date' />
        </div>

        <div className='space-y-2'>
          <Label>Check Out</Label>
          <Input onChange={(e) => setCheckOut(new Date(e.target.value))} type='date' />
        </div>

        <InputField name='hotel.option_date' label='Option Date' type='date' control={form.control} />
        <InputField name='hotel.rooms_count' label='Rooms Count' placeholder='1' valueAsNumber type='number' control={form.control} />
        <InputField name='hotel.view' label='View' placeholder='Ocean View' control={form.control} />
        <InputField name='hotel.pax_count' valueAsNumber type='number' label='Pax Count' placeholder='1' control={form.control} />
        <InputField name='hotel.adults' valueAsNumber type='number' label='Adults' placeholder='1' control={form.control} />
        <InputField name='hotel.children' valueAsNumber type='number' label='Children' placeholder='0' control={form.control} />

        <SelectField name='hotel.status' control={form.control} label='Status' defaultValue='new'>
          <SelectItem value='new'>New</SelectItem>
          <SelectItem value='in_revision'>In Revision</SelectItem>
          <SelectItem value='confirmed'>Confirmed</SelectItem>
          <SelectItem value='cancelled'>Cancelled</SelectItem>
          <SelectItem value='refunded'>Refunded</SelectItem>
          <SelectItem value='guaranteed'>Guaranteed</SelectItem>
        </SelectField>

        <InputField name='hotel.confirmation_number' label='Confirmation Number' placeholder='ABC123' control={form.control} />

        <div className='space-y-2'>
          <Label>Price type</Label>
          <Select onValueChange={(v) => setPriceType(v)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Price Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='static'>Static</SelectItem>
              <SelectItem value='dynamic'>Dynamic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {priceType === "static" ? (
          <InputField name='hotel.price' label='Price' placeholder='0' control={form.control} />
        ) : (
          <div className='border p-4 rounded-md col-span-2'>
            <p className='text-lg font-medium'>Days Price || {daysDifference}</p>
            {daysDifference == 0 && <p className='ml-4 text-gray-500'>Please select valid dates.</p>}

            <div className='mt-4 grid xl:grid-cols-3 grid-cols-1 gap-4'>
              {Array.from({ length: daysDifference }).map((_, index) => (
                <div key={`day-${index}`} className='space-y-4 py-2 px-4 border rounded-md'>
                  <p className='text-xl font-bold'>Day {index + 1}</p>
                  <InputField name={`hotel.price_list[${index}].day_number`} label={`Day Number`} valueAsNumber placeholder={`Day: ${index + 1}`} defaultValue={index + 1} control={form.control} />
                  <InputField name={`hotel.price_list[${index}].price`} label={`Price for Day ${index + 1}`} placeholder='0' control={form.control} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
