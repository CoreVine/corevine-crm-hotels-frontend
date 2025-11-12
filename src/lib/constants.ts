import { PaginatedData } from "@/types"

export const LanguagesArray = ["en", "ar"]
export const LanguagesObject = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" }
]

export const LANGUAGE_COOKIE = "language"
export const AUTH_COOKIE = "token"
export const LOGO_PATH = "/images/logo/main.png"
export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const TOKEN_EXPIRATION_DATE = Date.now() + 24 * 60 * 60 * 1000 * 30
export const EmptyPaginatedData: PaginatedData<any> = {
  current_page: 0,
  data: [],
  first_page_url: "",
  from: 0,
  last_page: 0,
  last_page_url: "",
  links: [],
  next_page_url: "",
  path: "",
  per_page: 0,
  prev_page_url: "",
  to: "",
  total: 0
}
