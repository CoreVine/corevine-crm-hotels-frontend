"use server"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData } from "@/types"
import { ClientSchema } from "@/schema"
import { Client } from "@/types/models"

export type GetClientResponse = PaginatedData<Client>
export type CreateClientData = z.infer<typeof ClientSchema.Create>
export type UpdateClientData = z.infer<typeof ClientSchema.Update>

export async function getClients(search?: string, page?: string): Promise<GetClientResponse> {
  try {
    const params = build({ search, page })
    const url = `/clients` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetClientResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch clients")
  }
}

export async function getAllClients(search?: string): Promise<Client[]> {
  try {
    const params = build({ search })
    const url = `/clients-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Client[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch clients")
  }
}

export async function getTrashedClients(search?: string, page?: string): Promise<GetClientResponse> {
  try {
    const params = build({ search, page })
    const url = `/clients-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetClientResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch trashed clients")
  }
}

export async function createClient(data: CreateClientData): Promise<ApiResponse<Client | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Client>("/clients", data, loadDefaultHeaders(token))
    revalidatePath(routes.clients.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateClient(id: number, data: UpdateClientData): Promise<ApiResponse<Client | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Client>(`/clients/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.clients.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreClient(id: number): Promise<ApiResponse<Client | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Client>(`/clients/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.clients.index)
    revalidatePath(routes.clients.trashed)
    console.log({ response })
    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteClient(id: number): Promise<ApiResponse<Client | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Client>(`/clients/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.clients.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
