"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData, TSearchParams } from "@/types"
import { CurrencySchema } from "@/schema"
import { Currency } from "@/types/models"

export type GetCurrencyResponse = PaginatedData<Currency>
export type CreateCurrencyData = z.infer<typeof CurrencySchema>
export type UpdateCurrencyData = z.infer<typeof CurrencySchema>

export async function getCurrencies(sp: TSearchParams): Promise<GetCurrencyResponse> {
  try {
    const params = build(sp)
    const url = `/currencies?${params}`
    const token = await getToken()
    const response = await getRequest<GetCurrencyResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Currencies")
  }
}

export async function getAllCurrencies(search?: string): Promise<Currency[]> {
  try {
    const url = `/currencies-all?${search}`
    const token = await getToken()
    const response = await getRequest<Currency[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Currencies")
  }
}

export async function getTrashedCurrencies(sp: TSearchParams): Promise<GetCurrencyResponse> {
  try {
    const params = build(sp)
    const url = `/currencies-trashed?${params}`
    const token = await getToken()
    const response = await getRequest<GetCurrencyResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch trashed Currencies")
  }
}

export async function createCurrency(data: CreateCurrencyData): Promise<ApiResponse<Currency | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Currency>("/currencies", data, loadDefaultHeaders(token))
    revalidatePath(routes.currencies.index)
    return response
  } catch (error) {
    console.log(error)
    return error as ApiError<undefined>
  }
}

export async function updateCurrency(id: number, data: UpdateCurrencyData): Promise<ApiResponse<Currency | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Currency>(`/currencies/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.currencies.index)
    revalidatePath(routes.currencies.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreCurrency(id: number): Promise<ApiResponse<Currency | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Currency>(`/currencies/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.currencies.index)
    revalidatePath(routes.currencies.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deleteCurrency(id: number): Promise<ApiResponse<Currency | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Currency>(`/currencies/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.currencies.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
