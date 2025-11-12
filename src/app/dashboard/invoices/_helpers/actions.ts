"use server"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData, TSearchParams } from "@/types"
import { InvoiceSchema } from "@/schema"
import { Invoice } from "@/types/models"

export type GetInvoiceResponse = PaginatedData<Invoice>

export type CreateInvoiceData = z.infer<typeof InvoiceSchema>
export type UpdateInvoiceData = z.infer<typeof InvoiceSchema>

export async function getInvoices(sp: TSearchParams): Promise<GetInvoiceResponse> {
  try {
    const params = build(sp)
    const url = `/invoices?${params}`
    const token = await getToken()
    const response = await getRequest<GetInvoiceResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Invoices")
  }
}

export async function getInvoice(id: number): Promise<Invoice> {
  try {
    const url = `/invoices/${id}`
    const token = await getToken()
    const response = await getRequest<Invoice>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch invoice")
  }
}

export async function getTrashedInvoices(sp: TSearchParams): Promise<GetInvoiceResponse> {
  try {
    const params = build(sp)
    const url = `/invoices-trashed?${params}`
    const token = await getToken()
    const response = await getRequest<GetInvoiceResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch trashed Invoices")
  }
}

export async function createInvoice(data: CreateInvoiceData): Promise<ApiResponse<Invoice | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Invoice>("/invoices", data, loadDefaultHeaders(token))
    revalidatePath(routes.invoices.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateInvoice(id: number, data: UpdateInvoiceData): Promise<ApiResponse<Invoice | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Invoice>(`/invoices/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.invoices.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreInvoice(id: number): Promise<ApiResponse<Invoice | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Invoice>(`/invoices/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.invoices.index)
    revalidatePath(routes.invoices.trashed)
    console.log({ response })
    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteInvoice(id: number): Promise<ApiResponse<Invoice | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Invoice>(`/invoices/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.invoices.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
