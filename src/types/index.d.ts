import { z } from "zod"
import { LoginSchema } from "@/schema"
import { LucideIcon } from "lucide-react"

export type ApiResponse<T> = {
  data: T
  message: string
  status: number
  errors?: Record<string, string[]>
}

export type ApiError<T> = {
  message: string
  status: number
  data: T
  errors?: Record<string, string[]>
}

export type EmailResponse = {
  email_type: string
  from: string
  to: string
  cc: string[]
  subject: string
  message: string
  file: {
    name: string
    url: string
  }
}

type PaginationLink = {
  url: string
  label: string
  active: boolean
}

type PaginatedData<T> = {
  current_page: number
  data: T[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string | null
  links: PaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: string | null
  total: number
}

export type Language = "ar" | "en" | "fr"
export type TSidebarGroup = {
  name: string
  items: TSidebarItem[]
}
export type TSidebarItem = {
  title: string
  icon: LucideIcon
  href: string
  items?: TSidebarSubItem[]
}
export type TSidebarSubItem = {
  label: string
  href: string
}

type ReservationPaymentStatistics = {
  total_debit: string
  total_credit: string
  total_profit: string
  total_company_markup: string
  total_agent_commission: string
  total_payment: string
}

export type Timestamps = {
  deleted_at: Date
  created_at: Date
  updated_at: Date
}

type SearchableItem = {
  id: number
  label: string
  hasId?: boolean
}

type LoginData = z.infer<typeof LoginSchema>

export type DefaultSearchParams = {
  page?: string
  search?: string
  per_page?: string
  status?: string
}

export type CityState = "approved" | "pending" | "rejected"
export type MealState = "approved" | "pending" | "rejected"
export type CarReservationState = "done" | "pending" | "cancelled"
export type HotelReservationState = "in_revision" | "confirmed" | "refunded" | "cancelled" | "guaranteed"
export type AirportReservationState = "done" | "pending" | "cancelled"
export type RateState = "pending" | "approved" | "rejected"
export type CompanyState = "pending" | "approved" | "rejected"
export type PaymentTypeState = "active" | "inactive"
export type UserRole = "admin" | "reservation" | "finance"
export type VoucherState = "confirmed" | "pending" | "cancelled"
export type TCarTransmission = "automatic" | "manual"
export type TCarType = "internal" | "external"
export type TInternalCarLogStatus = "completed" | "pending" | "cancelled"
export type TCollectorType = "bank_transfer" | "cash" | "credit_card"

export type TSearchParams = Record<string, string>
