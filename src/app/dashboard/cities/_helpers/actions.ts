"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, CityState, PaginatedData } from "@/types"
import { CitySchema } from "@/schema"
import { City } from "@/types/models"

export type GetCityResponse = PaginatedData<City>
export type CreateCityData = z.infer<typeof CitySchema.Create>
export type UpdateCityData = z.infer<typeof CitySchema.Update>

export async function getCities(search?: string, page?: string): Promise<GetCityResponse> {
  try {
    const params = build({ search, page })
    const url = `/cities` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetCityResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch cities")
  }
}

export async function getAllCities(search?: string, state?: CityState, take?: string): Promise<City[]> {
  try {
    const params = build({ search, state, take })
    const url = `/cities-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<City[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch cities")
  }
}

export async function getTrashedCities(search?: string, page?: string): Promise<GetCityResponse> {
  try {
    const params = build({ search, page })
    const url = `/cities-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetCityResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch trashed cities")
  }
}

export async function createCity(data: CreateCityData): Promise<ApiResponse<City | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<City>("/cities", data, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateCity(id: number, data: UpdateCityData): Promise<ApiResponse<City | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<City>(`/cities/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    revalidatePath(routes.cities.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreCity(id: number): Promise<ApiResponse<City | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<City>(`/cities/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    revalidatePath(routes.cities.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deleteCity(id: number): Promise<ApiResponse<City | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<City>(`/cities/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
