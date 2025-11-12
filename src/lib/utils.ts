import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { toast } from "react-toastify"
import { ApiResponse } from "@/types"

import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateForMySQL = (date: Date) => date.toISOString().split("T")[0]

export function showResponse<T>(data: ApiResponse<T>, execute?: () => void) {
  if (data?.status >= 200 && data?.status <= 299) {
    toast.success(data?.message)
    if (execute) execute()
    return
  }
  toast.error(data?.message)
  if (execute) execute()
  return
}

export function diffForHumans(date: Date) {
  return moment(date).fromNow()
}

export function capitalize(str: string | undefined | null): string {
  if (!str) return ""
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export function toTitleCase(str: string): string {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
