"use server"

import { getRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"

import { getToken } from "@/actions/auth"

import { ApiError, PaginatedData, TSearchParams } from "@/types"
import { AirportReservationLog } from "@/types/models"
import { build } from "search-params"

export type GetLogResponse = PaginatedData<AirportReservationLog>

export async function getAirportReservationHistory(id: number): Promise<GetLogResponse> {
  try {
    const url = `/airport-reservations/${id}/logs`
    const token = await getToken()
    const response = await getRequest<GetLogResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Hotel Reservation Logs")
  }
}

export async function getAirportReservationLog(reservationId: number, id: number): Promise<AirportReservationLog> {
  try {
    const url = `/airport-reservations/${reservationId}/logs/${id}`
    const token = await getToken()
    const response = await getRequest<AirportReservationLog>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Log")
  }
}

export async function getAllAirportReservationLogs(params: TSearchParams): Promise<GetLogResponse> {
  try {
    const sp = build(params)
    const url = `/airport-reservations-history?${sp}`
    const token = await getToken()
    const response = await getRequest<GetLogResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Log")
  }
}
