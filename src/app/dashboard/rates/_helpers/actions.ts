"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, CityState, PaginatedData } from "@/types"
import { RateSchema } from "@/schema"
import { Rate } from "@/types/models"

export type GetRateResponse = PaginatedData<Rate>
export type CreateRateData = z.infer<typeof RateSchema.Create>
export type UpdateRateData = z.infer<typeof RateSchema.Update>

export async function getRates(search?: string, page?: string): Promise<GetRateResponse> {
  try {
    const params = build({ search, page })
    const url = `/rates` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetRateResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch rates")
  }
}

export async function getAllRates(search?: string, state?: CityState, take?: string): Promise<Rate[]> {
  try {
    const params = build({ search, state, take })
    const url = `/rates-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Rate[]>(url, loadDefaultHeaders(token))
    console.log({ response })
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch rates")
  }
}

export async function getTrashedRates(search?: string, page?: string): Promise<GetRateResponse> {
  try {
    const params = build({ search, page })
    const url = `/rates-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetRateResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch rates")
  }
}

export async function createRate(data: CreateRateData): Promise<ApiResponse<Rate | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Rate>("/rates", data, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateRate(id: number, data: UpdateRateData): Promise<ApiResponse<Rate | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Rate>(`/rates/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    revalidatePath(routes.cities.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreRate(id: number): Promise<ApiResponse<Rate | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Rate>(`/rates/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    revalidatePath(routes.cities.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deleteRate(id: number): Promise<ApiResponse<Rate | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Rate>(`/rates/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
