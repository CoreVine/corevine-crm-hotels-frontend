"use server"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, AirportReservationState, PaginatedData } from "@/types"
import { AirportReservationSchema } from "@/schema"
import { AirportReservation } from "@/types/models"

export type GetAirportReservationResponse = PaginatedData<AirportReservation>
export type CreateAirportReservationData = z.infer<typeof AirportReservationSchema.Create>
export type UpdateAirportReservationData = z.infer<typeof AirportReservationSchema.Update>

export async function getAirportReservations(search?: string, page?: string, status?: string): Promise<GetAirportReservationResponse> {
  try {
    const params = build({ search, page, status })
    const url = `/airport-reservations` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetAirportReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch airport reservations")
  }
}

export async function getTrashedAirportReservations(search?: string, page?: string, status?: string): Promise<GetAirportReservationResponse> {
  try {
    const params = build({ search, page, status })
    const url = `/airport-reservations-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetAirportReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch airport reservations")
  }
}

export async function getSingleAirportReservation(id: number): Promise<AirportReservation> {
  try {
    const url = `/airport-reservations/${id}`
    const token = await getToken()
    const response = await getRequest<AirportReservation>(url, loadDefaultHeaders(token))
    console.log(response.data)
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch airport reservation")
  }
}

export async function changeAirportReservationState(id: number, status: AirportReservationState): Promise<ApiResponse<AirportReservation | undefined>> {
  try {
    const url = `/airport-reservations/${id}/status`
    const token = await getToken()
    const response = await patchRequest<AirportReservation | undefined>(url, { status }, loadDefaultHeaders(token))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateAirportReservation(id: number, data: UpdateAirportReservationData, hasClient: boolean): Promise<ApiResponse<AirportReservation | undefined>> {
  try {
    const url = `/airport-reservations/${id}${!hasClient ? "/update-with-new-client" : ""}`
    const token = await getToken()
    const response = await patchRequest<AirportReservation | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.airportReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function createAirportReservation(data: UpdateAirportReservationData): Promise<ApiResponse<AirportReservation | undefined>> {
  try {
    const url = `/airport-reservations`
    const token = await getToken()
    const response = await postRequest<AirportReservation | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.airportReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreAirportReservaion(id: number): Promise<ApiResponse<AirportReservation | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<AirportReservation>(`/airport-reservations/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.airportReservations.index)
    revalidatePath(routes.airportReservations.trashed)
    console.log({ response })
    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteAirportReservaion(id: number): Promise<ApiResponse<AirportReservation | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<AirportReservation>(`/airport-reservations/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.airportReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
