"use server"

import { getRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"

import { getToken } from "@/actions/auth"

import { ApiError, PaginatedData, TSearchParams } from "@/types"
import { CarReservationLog } from "@/types/models"
import { build } from "search-params"

type GetLogResponse = PaginatedData<CarReservationLog>

export async function getCarReservationHistory(id: number): Promise<GetLogResponse> {
  try {
    const url = `/car-reservations/${id}/logs`
    const token = await getToken()
    const response = await getRequest<GetLogResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Hotel Reservation Logs")
  }
}

export async function getCarReservationLog(reservationId: number, id: number): Promise<CarReservationLog> {
  try {
    const url = `/car-reservations/${reservationId}/logs/${id}`
    const token = await getToken()
    const response = await getRequest<CarReservationLog>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Log")
  }
}

export async function getAllCarReservationLogs(params: TSearchParams): Promise<GetLogResponse> {
  try {
    const sp = build(params)
    const url = `/car-reservations-history?${sp}`
    const token = await getToken()
    const response = await getRequest<GetLogResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Log")
  }
}
