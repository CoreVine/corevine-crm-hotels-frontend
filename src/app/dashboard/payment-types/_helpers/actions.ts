"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData } from "@/types"
import { PaymentTypeSchema } from "@/schema"
import { PaymentType } from "@/types/models"

export type GetPaymentTypeResponse = PaginatedData<PaymentType>
export type CreatePaymentTypeData = z.infer<typeof PaymentTypeSchema.Create>
export type UpdatePaymentTypeData = z.infer<typeof PaymentTypeSchema.Update>

export async function getPaymentTypes(search?: string, page?: string): Promise<GetPaymentTypeResponse> {
  try {
    const params = build({ search, page })
    const url = `/payment-types` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetPaymentTypeResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch payment types")
  }
}

export async function getAllPaymentTypes(search?: string, take?: string): Promise<PaymentType[]> {
  try {
    const params = build({ search, take })
    const url = `/payment-types-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<PaymentType[]>(url, loadDefaultHeaders(token))
    console.log({ response })
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch payment types")
  }
}

export async function getTrashedPaymentTypes(search?: string, page?: string): Promise<GetPaymentTypeResponse> {
  try {
    const params = build({ search, page })
    const url = `/payment-types-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetPaymentTypeResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch payment types")
  }
}

export async function createPaymentType(data: CreatePaymentTypeData): Promise<ApiResponse<PaymentType | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<PaymentType>("/payment-types", data, loadDefaultHeaders(token))
    revalidatePath(routes.paymentTypes.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updatePaymentType(id: number, data: UpdatePaymentTypeData): Promise<ApiResponse<PaymentType | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<PaymentType>(`/payment-types/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.paymentTypes.index)
    revalidatePath(routes.paymentTypes.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restorePaymentType(id: number): Promise<ApiResponse<PaymentType | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<PaymentType>(`/payment-types/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.paymentTypes.index)
    revalidatePath(routes.paymentTypes.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deletePaymentType(id: number): Promise<ApiResponse<PaymentType | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<PaymentType>(`/payment-types/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.paymentTypes.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
