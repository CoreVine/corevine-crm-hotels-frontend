"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { getToken } from "@/actions/auth"
import { build } from "search-params"

import { ApiError, ApiResponse, CarReservationState, PaginatedData } from "@/types"
import { CarReservation } from "@/types/models"
import { z } from "zod"
import { CarReservationSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import { routes } from "@/lib/route"

export type GetCarReservationResponse = PaginatedData<CarReservation>
export type CreateCarReservationData = z.infer<typeof CarReservationSchema.Create>
export type UpdateCarReservationData = z.infer<typeof CarReservationSchema.Update>

export async function getCarReservations(search?: string, page?: string, status?: string): Promise<GetCarReservationResponse> {
  try {
    const params = build({ search, page, status })
    const url = `/car-reservations` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetCarReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch car reservations")
  }
}

export async function getTrashedCarReservations(search?: string, page?: string, status?: string): Promise<GetCarReservationResponse> {
  try {
    const params = build({ search, page, status })
    const url = `/car-reservations-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetCarReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch car reservations")
  }
}

export async function getSingleCarReservation(id: number): Promise<CarReservation> {
  try {
    const url = `/car-reservations/${id}`
    const token = await getToken()
    const response = await getRequest<CarReservation>(url, loadDefaultHeaders(token))
    console.log(response.data)
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch car reservation")
  }
}

export async function changeCarReservationState(id: number, status: CarReservationState): Promise<ApiResponse<CarReservation | undefined>> {
  try {
    const url = `/car-reservations/${id}/status`
    const token = await getToken()
    const response = await patchRequest<CarReservation | undefined>(url, { status }, loadDefaultHeaders(token))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateCarReservation(id: number, data: UpdateCarReservationData): Promise<ApiResponse<CarReservation | undefined>> {
  try {
    const url = `/car-reservations/${id}`
    const token = await getToken()
    const response = await patchRequest<CarReservation | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.carReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function createCarReservation(data: UpdateCarReservationData): Promise<ApiResponse<CarReservation | undefined>> {
  try {
    const url = `/car-reservations`
    const token = await getToken()
    const response = await postRequest<CarReservation | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.carReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreCarReservaion(id: number): Promise<ApiResponse<CarReservation | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<CarReservation>(`/car-reservations/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.carReservations.index)
    revalidatePath(routes.carReservations.trashed)
    console.log({ response })
    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteCarReservaion(id: number): Promise<ApiResponse<CarReservation | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<CarReservation>(`/car-reservations/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.carReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
