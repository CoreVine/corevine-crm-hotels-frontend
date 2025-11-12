"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData, TSearchParams } from "@/types"
import { HotelAgingSchema, HotelEmailSchema, HotelSchema } from "@/schema"
import { Hotel, HotelAging, HotelEmail, Room } from "@/types/models"

export type GetHotelResponse = PaginatedData<Hotel>
export type CreateHotelData = z.infer<typeof HotelSchema.Create>
export type UpdateHotelData = z.infer<typeof HotelSchema.Update>

export async function getHotels(search?: string, page?: string): Promise<GetHotelResponse> {
  try {
    const params = build({ search, page })
    const url = `/hotels` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetHotelResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Error Fetching Hotels")
  }
}

export async function getHotel(hotelId: number): Promise<Hotel> {
  try {
    const url = `/hotels/${hotelId}`
    const token = await getToken()
    const response = await getRequest<Hotel>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Error Fetching hotel")
  }
}

export async function getHotelRooms(hotelId: number): Promise<Room[]> {
  try {
    const url = `/hotels/${hotelId}/rooms`
    const token = await getToken()
    const response = await getRequest<Room[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Error Fetching hotel")
  }
}

export async function getHotelEmails(hotelId: number): Promise<HotelEmail[]> {
  try {
    const url = `/hotels/${hotelId}/emails`
    const token = await getToken()
    const response = await getRequest<HotelEmail[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Error Fetching hotel")
  }
}

export async function getAllHotels(search?: string): Promise<Hotel[]> {
  try {
    const params = build({ search })
    const url = `/hotels-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Hotel[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Error Fetching All Hotels")
  }
}

export async function getHotelsByCity(cityId: number, search?: string): Promise<Hotel[]> {
  try {
    const params = build({ search })
    const url = `/hotels/filter/${cityId}` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Hotel[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Error Fetching Hotels By City")
  }
}

export async function getTrashedHotels(search?: string, page?: string): Promise<GetHotelResponse> {
  try {
    const params = build({ search, page })
    const url = `/hotels-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetHotelResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Error Fetching Trashed Hotels")
  }
}

export async function createHotel(data: CreateHotelData): Promise<ApiResponse<Hotel | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Hotel>("/hotels", data, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateHotel(id: number, data: UpdateHotelData): Promise<ApiResponse<Hotel | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Hotel>(`/hotels/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.index)
    revalidatePath(routes.hotels.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreHotel(id: number): Promise<ApiResponse<Hotel | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Hotel>(`/hotels/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.index)
    revalidatePath(routes.hotels.trashed)

    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteHotel(id: number): Promise<ApiResponse<Hotel | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Hotel>(`/hotels/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

//// Emails

export async function createHotelEmailAction(data: z.infer<typeof HotelEmailSchema>, hotelId: number): Promise<ApiResponse<HotelEmail | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<HotelEmail>("/hotel-emails", { ...data, hotel_id: hotelId }, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateHotelEmailAction(id: number, data: z.infer<typeof HotelEmailSchema>): Promise<ApiResponse<HotelEmail | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<HotelEmail>(`/hotel-emails/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.index)
    revalidatePath(routes.hotels.edit(id))
    revalidatePath(routes.hotels.show(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreHotelEmailAction(id: number): Promise<ApiResponse<HotelEmail | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<HotelEmail>(`/hotel-emails/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.index)
    revalidatePath(routes.hotels.trashed)
    revalidatePath(routes.hotels.show(id))

    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteHotelEmail(id: number): Promise<ApiResponse<HotelEmail | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<HotelEmail>(`/hotel-emails/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.hotels.show(id))
    revalidatePath(routes.hotels.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

// aging
export async function getHotelAgings(hotelId: number, sp: TSearchParams) {
  try {
    const query = build(sp)
    const url = `/hotels/${hotelId}/aging` + (query ? `?${query}` : "")
    const token = await getToken()
    const response = await getRequest<PaginatedData<HotelAging>>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch hotel agings")
  }
}

export async function createHotelAging(hotelId: number, data: z.infer<typeof HotelAgingSchema>) {
  try {
    const token = await getToken()
    const response = await postRequest<HotelAging>(`/hotels/${hotelId}/aging`, data, loadDefaultHeaders(token))
    revalidatePath(routes.expenses.index)
    return response
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch hotel agings")
  }
}

export async function updateHotelAging(hotelId: number, agingId: number, data: z.infer<typeof HotelAgingSchema>) {
  try {
    const token = await getToken()
    const response = await patchRequest<HotelAging>(`/hotels/${hotelId}/aging/${agingId}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.expenses.index)
    return response
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch hotel agings")
  }
}

export async function deleteHotelAging(hotelId: number, agingId: number): Promise<ApiResponse<HotelAging | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<HotelAging>(`/hotels/${hotelId}/aging/${agingId}`, loadDefaultHeaders(token))
    revalidatePath(routes.expenses.index)
    return response
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch hotel agings")
  }
}
