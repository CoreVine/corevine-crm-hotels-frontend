"use server"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, HotelReservationState, PaginatedData, ReservationPaymentStatistics, TSearchParams } from "@/types"
import { HotelReservation, Reservation, ReservationPayment } from "@/types/models"
import { ReservationPaymentSchema, ReservationSchema } from "@/schema"

export type GetHotelReservationResponse = PaginatedData<HotelReservation>
export type CreateReservationData = z.infer<typeof ReservationSchema.Create> | z.infer<typeof ReservationSchema.CreateWithoutClient>
export type UpdateReservationData = z.infer<typeof ReservationSchema.Update>

export async function getHotelReservations(sp: TSearchParams): Promise<GetHotelReservationResponse> {
  try {
    const params = build(sp)
    const url = `/hotel-reservations` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetHotelReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch reservations")
  }
}

export async function getTrashedHotelReservations(sp: TSearchParams): Promise<GetHotelReservationResponse> {
  try {
    const params = build(sp)
    const url = `/hotel-reservations-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetHotelReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch reservations")
  }
}

export async function getRoomRequests(sp: TSearchParams): Promise<GetHotelReservationResponse> {
  try {
    const params = build(sp)
    const url = `/hotel-reservations-only` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetHotelReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch reservations")
  }
}

export async function getMyHotelReservations(sp: TSearchParams): Promise<GetHotelReservationResponse> {
  try {
    const params = build(sp)
    const url = `/hotel-reservations-mine` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetHotelReservationResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch reservations")
  }
}

export async function getSmallHotelReservations(sp: TSearchParams): Promise<HotelReservation[]> {
  try {
    const params = build(sp)
    const url = `/reservations-small` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<HotelReservation[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    return []
  }
}

export async function getSingleReservation(id: number): Promise<Reservation> {
  const url = `/reservations/${id}`
  const token = await getToken()
  const response = await getRequest<Reservation>(url, loadDefaultHeaders(token))
  console.log(response.data)
  return response.data
}

export async function changeHotelManyReservationState(ids: number[], status: HotelReservationState): Promise<ApiResponse<HotelReservation | undefined>> {
  try {
    const url = `/hotel-reservations/change-many-status/status`
    const token = await getToken()
    const response = await patchRequest<HotelReservation | undefined>(url, { status, ids }, loadDefaultHeaders(token))
    revalidatePath(routes.reservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function changeHotelReservationState(id: number, status: HotelReservationState): Promise<ApiResponse<HotelReservation | undefined>> {
  try {
    const url = `/hotel-reservations/${id}/change-status`
    const token = await getToken()
    const response = await patchRequest<HotelReservation | undefined>(url, { status }, loadDefaultHeaders(token))
    revalidatePath(routes.reservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function createReservation(data: CreateReservationData, hasClient?: boolean): Promise<ApiResponse<Reservation | undefined>> {
  try {
    const url = `/reservations` + (!hasClient ? "/create-with-new-client" : "")
    const token = await getToken()
    const response = await postRequest<Reservation | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.hotelReservations.index)
    return response
  } catch (error) {
    console.dir({ error }, { depth: null })
    return error as ApiError<undefined>
  }
}

export async function updateReservation(id: number, data: UpdateReservationData, hasClient?: boolean): Promise<ApiResponse<Reservation | undefined>> {
  const url = `/reservations/${id}` + (!hasClient ? "/update-with-new-client" : "")
  try {
    const token = await getToken()
    const response = await patchRequest<Reservation | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.hotelReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreHotelReservaion(id: number): Promise<ApiResponse<HotelReservation | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<HotelReservation>(`/hotel-reservations/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.hotelReservations.index)
    revalidatePath(routes.hotelReservations.trashed)
    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteHotelReservaion(id: number): Promise<ApiResponse<HotelReservation | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<HotelReservation>(`/hotel-reservations/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.hotelReservations.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

// Payments //
export async function getReservationPayments(id: number, sp: TSearchParams) {
  try {
    const query = build(sp)
    const url = `/reservation-payments/${id}` + (query ? `?${query}` : "")
    const token = await getToken()
    const response = await getRequest<PaginatedData<ReservationPayment>>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch payments")
  }
}
export async function getReservationPaymentsStats(id: number, sp: TSearchParams) {
  try {
    const query = build(sp)
    const url = `/reservation-payments/${id}/statistics` + (query ? `?${query}` : "")
    const token = await getToken()
    const response = await getRequest<ReservationPaymentStatistics>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch payment statistics")
  }
}

export async function getSingleReservationPayment(id: number) {
  try {
    const url = `/reservation-payments/${id}`
    const token = await getToken()
    const response = await getRequest<ReservationPayment>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch payment")
  }
}

export async function createReservationPayment(reservationId: number, data: z.infer<typeof ReservationPaymentSchema>) {
  try {
    const url = `/reservation-payments/${reservationId}`
    const token = await getToken()
    const response = await postRequest<ReservationPayment>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.reservations.showPayments(reservationId))
    return response
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to create payment")
  }
}

export async function updateReservationPayment(reservationId: number, paymentId: number, data: z.infer<typeof ReservationPaymentSchema>) {
  try {
    const url = `/reservation-payments/${reservationId}/${paymentId}`
    const token = await getToken()
    const response = await patchRequest<ReservationPayment>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.reservations.showPayments(reservationId))
    return response
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to update payment")
  }
}

export async function deleteReservationPayment(reservationId: number, paymentId: number) {
  try {
    const url = `/reservation-payments/${reservationId}/${paymentId}`
    const token = await getToken()
    const response = await deleteRequest<ReservationPayment>(url, loadDefaultHeaders(token))
    revalidatePath(routes.reservations.showPayments(reservationId))
    return response
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to delete payment")
  }
}
