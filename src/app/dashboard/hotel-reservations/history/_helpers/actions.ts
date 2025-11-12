"use server"

import { getRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"

import { getToken } from "@/actions/auth"

import { PaginatedData, TSearchParams } from "@/types"
import { HotelReservationLog } from "@/types/models"
import { build } from "search-params"

export type GetLogResponse = PaginatedData<HotelReservationLog>

export async function getReservationHistory(id: number): Promise<GetLogResponse> {
  try {
    const url = `/hotel-reservations/${id}/logs`
    const token = await getToken()
    const response = await getRequest<GetLogResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Hotel Reservation Logs")
  }
}

export async function getLog(reservationId: number, id: number): Promise<HotelReservationLog> {
  try {
    const url = `/hotel-reservations/${reservationId}/logs/${id}`
    const token = await getToken()
    const response = await getRequest<HotelReservationLog>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Log")
  }
}

export async function getAllLogs(params: TSearchParams): Promise<GetLogResponse> {
  try {
    const sp = build(params)
    const url = `/hotel-reservations-history?${sp}`
    const token = await getToken()
    const response = await getRequest<GetLogResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Log")
  }
}
