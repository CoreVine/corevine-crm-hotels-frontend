import { AirportReservationState, TInternalCarLogStatus, HotelReservationState, CarReservationState, Timestamps, RateState, CompanyState, UserRole, PaymentTypeState, TCarTransmission, TCarType } from "."

export type User = Timestamps & {
  id: number
  email: string
  name: string
  password: string
  contact_number: string
  address: string
  role: UserRole
  state: "pending" | "approved"
}

type Category = Timestamps & {
  id: number
  name: string
  is_active: boolean
  type: "revenue" | "expense"
}

type Currency = Timestamps & {
  id: number
  name: string
  code: string
  is_active: boolean
  value: string
}

type Client = Timestamps & {
  id: number
  name: string
  phone: string
  email: string
  nationality: string
}

type Hotel = Timestamps & {
  id: number
  city_id: number
  name: string
  email: string
  phone_number: string
  city: City
}

type City = {
  id: number
  name: string
  state: string
  deleted_at: string | null
}

type Meal = Timestamps & {
  id: number
  meal_type: string
  state: string
}
type PaymentType = Timestamps & {
  id: number
  name: string
  state: PaymentTypeState
}

type Room = Timestamps & {
  id: number
  room_type: string
  hotel_id: number
  hotel: Hotel
}

type HotelEmail = Timestamps & {
  id: number
  hotel_id: number
  email: string
  hotel: Hotel
}

type Driver = Timestamps & {
  id: number
  name: string
  phone: string
}

type Rate = Timestamps & {
  id: number
  name: string
  state: RateState
}

type Company = Timestamps & {
  id: number
  name: string
  state: CompanyState
}

type Reservation = Timestamps & {
  id: number
  client_id: number
  agent_id: number
  has_hotel: boolean
  has_sent_email: boolean
  has_car: boolean
  has_airport: boolean
  reservation_date: string
  notes: string
  client: Client
  agent?: User
  hotel?: Omit<HotelReservation, "reservation">
  car?: Omit<CarReservation, "reservation">
  airport?: Omit<AirportReservation, "reservation">
}

type HotelReservation = Timestamps & {
  id: number
  reservation_id: number
  hotel_id: number
  city_id: number
  meal_id: number
  company_id: number
  rate_id: number
  check_in: Date
  check_out: Date
  rooms_count: number
  view: string
  pax_count: number
  adults: number
  children: number
  option_date: Date
  price_type: "static" | "dynamic"
  status: HotelReservationState
  confirmation_number: string
  price: number
  room: Room
  payment_type: PaymentType
  rate: Rate
  hotel: Hotel
  meal: Meal
  city: City
  company: Company
  reservation: Reservation
}

type HotelReservationPrice = {
  id: number
  hotel_reservation_id: number
  day_number: number
  price: number
}

type Voucher = Timestamps & {
  id: number
  company_id: number
  city_id: number
  hotel_id: number
  meal_id: number
  room_id: number
  client_name: string
  nationality: string
  check_in: Date
  check_out: Date
  pax: number
  rooms_count: number
  children: number
  adults: number
  hcn: string
  view: string
  internal_confirmation: string
  notes: string
  room: Room
  hotel: Hotel
  meal: Meal
  city: City
  company: Company
}

type CarReservation = Timestamps & {
  id: number
  reservation_id: number
  driver_id: number
  airline: string
  meeting_point: string
  arrival_date: Date
  arrival_time: string | undefined
  status: CarReservationState
  coming_from: string
  comments: string
  price: number
  driver: Driver
  reservation: Reservation
}

type AirportReservation = Timestamps & {
  id: number
  reservation_id: number
  airline: string
  airport_name: string
  runner: string
  flight_number: string
  passenger_count: number
  coming_from: string
  persons_count: number
  statment: number
  arrival_date: Date
  arrival_time: string | undefined
  status: AirportReservationState
  price: number
  reservation: Reservation
}

type HotelReservationLog = {
  id: number
  log_name: string
  description: string
  subject_type: string
  subject: HotelReservation
  event: string
  subject_id: number
  causer_type: string
  causer_id: number
  batch_uuid: string | null
  created_at: Date
  updated_at: Date
  causer: User
  properties: {
    attributes: HotelReservation
    old: HotelReservation
  }
}

type AirportReservationLog = {
  id: number
  log_name: string
  description: string
  subject_type: string
  subject: AirportReservation
  event: string
  subject_id: number
  causer_type: string
  causer_id: number
  batch_uuid: string | null
  created_at: Date
  updated_at: Date
  causer: User
  properties: {
    attributes: AirportReservation
    old: AirportReservation
  }
}

type CarReservationLog = {
  id: number
  log_name: string
  description: string
  subject_type: string
  subject: CarReservation
  event: string
  subject_id: number
  causer_type: string
  causer_id: number
  batch_uuid: string | null
  created_at: Date
  updated_at: Date
  causer: User
  properties: {
    attributes: CarReservation
    old: CarReservation
  }
}

type InvoiceCollection = Timestamps & {
  amount_egp: string
  amount_sar: string
  amount_usd: string
  link: string
}

type InvoicePayment = Timestamps & {
  amount_egp: string
  amount_sar: string
  amount_usd: string
}

type Invoice = Timestamps & {
  id: number
  agent_id: number
  hotel_id: number
  category_id: number
  amount: string
  creation_date: Date
  from1: string
  to1: string
  from2?: string
  to2?: string
  agent: User
  hotel: Hotel
  category: Category
  customer_name: string
  proxy_name: string
  reservation_number: string
  nights_count: number
  collection: InvoiceCollection
  payment: InvoicePayment
}

type DashboardStats = {
  rooms: {
    today: number
    tomorrow: number
  }
  airport: {
    today: number
    tomorrow: number
  }
  car: {
    today: number
    tomorrow: number
  }
  reservations: {
    new: number
    done: number
    cancelled: number
    in_revision: number
  }
}

type Car = Timestamps & {
  id: number
  make: string
  model: string
  code: string
  year: number
  vin: string
  seating_capacity: number
  transmission: TCarTransmission
  image: string
  image_url: string | null
  type: TCarType
}

type InternalCarLog = Timestamps & {
  id: number
  amount_currency_id: number
  reservation_id: number
  driver_id: number
  client_id: number
  car_id: number
  reservation: Reservation
  driver: Driver
  car: Car
  currency: Currency
  status: TInternalCarLogStatus
  client: Client
  price_usd: number
  amount: number
  notes: string | null
  date: Date
}

type ExternalCarLog = Timestamps & {
  id: number
  reservation_id: number
  driver_id: number
  client_id: number
  car_id: number
  reservation: Reservation
  driver: Driver
  car: Car
  client: Client
  cost: number
  collection: number
  amount_egp: number
  profit: number
  notes: string | null
  date: Date
}

type ReservationPayment = Timestamps & {
  id: number
  debit: number
  credit: number
  profit: number
  collector_name: string
  reservation_id: number
  currency_id: number
  category_id: number
  collection_type: string
  company_markup: number
  agent_commission: number
  payment: number
  notes: string
  date: Date
  statement: string
  attachment: string
  reservation: Reservation
  currency: Currency
  category: Category
}

type Expense = Timestamps & {
  id: number
  receipt_number: string
  currency_id: number
  category_id: number
  amount: number
  notes: string
  status: string
  date: Date
  payment_method: string
  statement: string
  currency: Currency
  category: Category
}

type HotelAging = Timestamps & {
  id: number
  currency_id: number
  category_id: number
  hotel_id: number
  reservation_id: number
  amount: number
  due_date: Date
  paid_date: Date
  notes: string
  status: string
  payment_method: string
  hotel: Hotel
  currency: Currency
  category: Category
  reservation: Reservation
}
