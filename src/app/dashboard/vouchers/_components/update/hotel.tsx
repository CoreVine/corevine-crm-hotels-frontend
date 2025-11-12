import { SearchableData } from "@/components/common/form/searchable-data"
import { InputField } from "@/components/common/form/input-field"
import { Building } from "lucide-react"

import { useState } from "react"
import { useMeals } from "@/app/dashboard/meals/_helpers/hooks"
import { useDebounce } from "use-debounce"
import { useCompanies } from "@/app/dashboard/companies/_helpers/hooks"
import { useCities } from "@/app/dashboard/cities/_helpers/hooks"
import { useHotelsByCity } from "@/app/dashboard/hotels/_helpers/hooks"
import { useRooms } from "@/app/dashboard/rooms/_helpers/hooks"

type Props = {
  form: any
  meal: string
  company: string
  city: string
  hotel: string
  room: string
}

export const HotelForm = ({ form, meal, company, city, hotel, room }: Props) => {
  const [searchMeals, setSearchMeals] = useState<string>(meal)
  const [debouncedSearchMeals] = useDebounce(searchMeals, 500)

  const [searchCompanies, setSearchCompanies] = useState<string>(company)
  const [debouncedSearchCompanies] = useDebounce(searchCompanies, 500)

  const [searchCities, setSearchCities] = useState<string>(city)
  const [debouncedSearchCities] = useDebounce(searchCities, 500)

  const [searchHotels, setSearchHotels] = useState<string>(hotel)
  const [debouncedSearchHotels] = useDebounce(searchHotels, 500)

  const [searchRooms, setSearchRooms] = useState<string>(room)
  const [debouncedSearchRooms] = useDebounce(searchRooms, 500)

  const { modifiedMeals, isMealsLoading, isMealsRefetching } = useMeals(debouncedSearchMeals)
  const { modifiedCompanies, isCompaniesLoading, isCompaniesRefetching } =
    useCompanies(debouncedSearchCompanies)

  const { modifiedRooms, isRoomsLoading, isRoomsRefetching } = useRooms(debouncedSearchRooms)

  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)

  const { modifiedCities, isCitiesLoading, isCitiesRefetching } = useCities(debouncedSearchCities)
  const { modifiedHotels, isHotelsLoading, isHotelsRefetching } = useHotelsByCity(
    selectedCityId!,
    debouncedSearchHotels
  )

  return (
    <div className='space-y-4 border p-4 rounded-md shadow'>
      <div className='flex gap-2 items-center mb-4'>
        <div className='p-2 rounded-md bg-green-600 text-white'>
          <Building size={16} />
        </div>
        <h3 className='text-lg font-medium flex gap-2'>Hotel Information</h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='col-span-2'>
          <SearchableData
            loading={isCompaniesLoading || isCompaniesRefetching}
            data={modifiedCompanies}
            search={searchCompanies}
            setSearch={setSearchCompanies}
            label='Companies'
            formItem='company_id'
            form={form}
            error={form.formState.errors?.company_id?.message}
          />
        </div>

        <SearchableData
          loading={isCitiesLoading || isCitiesRefetching}
          data={modifiedCities}
          search={searchCities}
          setSearch={setSearchCities}
          label='Cities'
          formItem='city_id'
          executeFunctionWithId={(id) => setSelectedCityId(id!)}
          form={form}
          error={form.formState.errors?.city_id?.message}
        />

        <SearchableData
          loading={isHotelsLoading || isHotelsRefetching}
          data={modifiedHotels}
          search={searchHotels}
          setSearch={setSearchHotels}
          label='Hotels'
          formItem='hotel_id'
          form={form}
          error={form.formState.errors?.hotel_id?.message}
        />

        <SearchableData
          loading={isMealsLoading || isMealsRefetching}
          data={modifiedMeals}
          search={searchMeals}
          setSearch={setSearchMeals}
          label='Meals'
          formItem='meal_id'
          form={form}
          error={form.formState.errors?.meal_id?.message}
        />

        <SearchableData
          loading={isRoomsLoading || isRoomsRefetching}
          data={modifiedRooms}
          search={searchRooms}
          setSearch={setSearchRooms}
          label='Room'
          formItem='room_id'
          form={form}
          error={form.formState.errors?.room_id?.message}
        />

        <div className='grid col-span-2 xl:grid-cols-2 gap-4'>
          <InputField name='client_name' label='Client Name' control={form.control} />
          <InputField name='nationality' label='Nationality' control={form.control} />
        </div>

        <InputField
          name='rooms_count'
          label='Rooms Count'
          placeholder='1'
          valueAsNumber
          type='number'
          control={form.control}
        />

        <InputField name='view' label='View' placeholder='View' control={form.control} />

        <InputField
          name='pax'
          valueAsNumber
          type='number'
          label='Pax'
          placeholder='1'
          control={form.control}
        />

        <InputField
          name='adults'
          valueAsNumber
          type='number'
          label='Adults'
          placeholder='1'
          control={form.control}
        />

        <InputField
          name='children'
          valueAsNumber
          type='number'
          label='Children'
          placeholder='0'
          control={form.control}
        />

        <InputField name='hcn' label='HCN' placeholder='ABC' control={form.control} />

        <InputField
          name='internal_confirmation'
          label='Internal Confirmation'
          placeholder='ABC123'
          control={form.control}
        />

        <div className='col-span-2'>
          <InputField
            name='notes'
            label='Notes'
            placeholder='ABC123'
            isTextarea
            control={form.control}
          />
        </div>
      </div>
    </div>
  )
}
