"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData } from "@/types"
import { DriverSchema } from "@/schema"
import { Driver } from "@/types/models"

export type GetDriverResponse = PaginatedData<Driver>
export type CreateDriverData = z.infer<typeof DriverSchema.Create>
export type UpdateDriverData = z.infer<typeof DriverSchema.Update>

export async function getDrivers(search?: string, page?: string): Promise<GetDriverResponse> {
  try {
    const params = build({ search, page })
    const url = `/drivers` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetDriverResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch drviers")
  }
}

export async function getAllDrivers(search?: string): Promise<Driver[]> {
  try {
    const params = build({ search })
    const url = `/drivers-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Driver[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch drviers")
  }
}

export async function getTrashedDrivers(search?: string, page?: string): Promise<GetDriverResponse> {
  try {
    const params = build({ search, page })
    const url = `/drivers-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetDriverResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch drvier")
  }
}

export async function createDriver(data: CreateDriverData): Promise<ApiResponse<Driver | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Driver>("/drivers", data, loadDefaultHeaders(token))
    revalidatePath(routes.drivers.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateDriver(id: number, data: UpdateDriverData): Promise<ApiResponse<Driver | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Driver>(`/drivers/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.drivers.index)
    revalidatePath(routes.drivers.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreDriver(id: number): Promise<ApiResponse<Driver | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Driver>(`/drivers/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.drivers.index)
    revalidatePath(routes.drivers.trashed)

    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteDriver(id: number): Promise<ApiResponse<Driver | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Driver>(`/drivers/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.drivers.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
