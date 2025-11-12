import { CityState, TSearchParams } from "@/types"

export const QueryKeys = {
  cities: (search?: string, state?: CityState, take?: string) => ["cities", search, state, take],
  currencies: (search?: string) => ["currencies", search],
  categories: (sp?: TSearchParams) => ["categories", sp],
  rates: (search?: string, state?: CityState, take?: string) => ["rates", search, state, take],
  companies: (search?: string, state?: CityState, take?: string) => ["companies", search, state, take],
  paymentTypes: (search?: string, state?: CityState, take?: string) => ["payment-types", search, state, take],
  clients: (search?: string) => ["clients", search],
  meals: (search?: string, state?: CityState, take?: string) => ["meals", search, state, take],
  rooms: (search?: string) => ["rooms", search],
  hotels: (search?: string, take?: string) => ["hotels", search, take],
  hotelsByCity: (cityId: number, search?: string, take?: string) => ["hotels", cityId, search, take],
  drivers: (search?: string) => ["drivers", search],
  cars: (search?: string) => ["cars", search]
}
