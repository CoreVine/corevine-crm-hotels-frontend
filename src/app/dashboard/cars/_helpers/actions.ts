"use server"

import { z } from "zod"
import { build } from "search-params"
import { revalidatePath } from "next/cache"
import { loadDefaultHeaders } from "@/lib/api"
import { getToken } from "@/actions/auth"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { CarSchema, InternalCarLogSchema, ExternalCarLogSchema } from "@/schema"
import { ApiError, ApiResponse, PaginatedData, TSearchParams } from "@/types"
import { Car, ExternalCarLog, InternalCarLog } from "@/types/models"
import { routes } from "@/lib/route"

export async function getCarsPaginated(params?: string): Promise<PaginatedData<Car>> {
  try {
    const token = await getToken()
    const url = `/cars?${params || ""}`
    const res = await getRequest<PaginatedData<Car>>(url, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch paginated cars")
  }
}

export async function getAllCars(params?: string): Promise<Car[]> {
  try {
    const token = await getToken()
    const url = `/cars-all?${params || ""}`
    const res = await getRequest<Car[]>(url, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch all cars")
  }
}

export async function getTrashedCars(params?: string) {
  try {
    const token = await getToken()
    const url = `/cars-trashed?${params || ""}`
    const res = await getRequest<PaginatedData<Car>>(url, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch trashed cars")
  }
}

export async function getCar(id: number): Promise<Car> {
  try {
    const token = await getToken()
    const res = await getRequest<Car>(`/cars/${id}`, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch car")
  }
}

export async function createCar(data: z.infer<typeof CarSchema>): Promise<ApiResponse<Car | undefined>> {
  try {
    const token = await getToken()
    const res = await postRequest<Car>(`/cars`, data, loadDefaultHeaders(token))
    return res
  } catch (error) {
    console.error(error)
    const err = error as ApiError<undefined>
    throw new Error(err.message || "Failed to create car")
  }
}

export async function updateCar(id: number, data: z.infer<typeof CarSchema>): Promise<ApiResponse<Car | undefined>> {
  try {
    const token = await getToken()
    const res = await patchRequest<Car>(`/cars/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.cars.index)
    return res
  } catch (error) {
    console.error(error)
    const err = error as ApiError<undefined>
    throw new Error(err.message || "Failed to create car")
  }
}

export async function deleteCar(id: number): Promise<ApiResponse<Car | undefined>> {
  try {
    const token = await getToken()
    const res = await deleteRequest<Car>(`/cars/${id}`, null, loadDefaultHeaders(token))
    revalidatePath(routes.cars.index)
    return res
  } catch (error) {
    console.error(error)
    const err = error as ApiError<undefined>
    throw new Error(err.message || "Failed to create car")
  }
}

export async function restoreCar(id: number): Promise<ApiResponse<Car | undefined>> {
  try {
    const token = await getToken()
    const res = await patchRequest<Car>(`/cars/${id}/restore`, null, loadDefaultHeaders(token))
    revalidatePath(routes.cars.index)
    return res
  } catch (error) {
    console.error(error)
    const err = error as ApiError<undefined>
    throw new Error(err.message || "Failed to create car")
  }
}

// 🚘 Internal Logs

export async function getAllInternalLogs(query?: string) {
  try {
    const token = await getToken()
    const url = `/cars-internal-logs?${query || ""}`
    const res = await getRequest<PaginatedData<InternalCarLog>>(url, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch internal logs")
  }
}

export async function getInternalCarLogs(carId: number, sp: TSearchParams): Promise<PaginatedData<InternalCarLog>> {
  try {
    const token = await getToken()
    const query = build(sp)
    const res = await getRequest<PaginatedData<InternalCarLog>>(`/cars/${carId}/internal-logs?${query}`, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch internal logs")
  }
}

export async function createInternalCarLog(data: z.infer<typeof InternalCarLogSchema>) {
  try {
    const token = await getToken()
    const res = await postRequest<InternalCarLog>(`/cars/${data.car_id}/internal-logs`, data, loadDefaultHeaders(token))
    return res
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to create internal log")
  }
}

export async function getSingleInternalCarLog(carId: number, logId: number): Promise<InternalCarLog> {
  try {
    const token = await getToken()
    const res = await getRequest<InternalCarLog>(`/cars/${carId}/internal-logs/${logId}`, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch internal log")
  }
}

export async function updateInternalCarLog(carId: number, logId: number, data: z.infer<typeof InternalCarLogSchema>) {
  try {
    const token = await getToken()
    const res = await patchRequest<InternalCarLog>(`/cars/${carId}/internal-logs/${logId}`, data, loadDefaultHeaders(token))
    return res
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to update internal log")
  }
}

export async function deleteInternalCarLog(carId: number, logId: number): Promise<void> {
  try {
    const token = await getToken()
    await deleteRequest(`/cars/${carId}/internal-logs/${logId}`, loadDefaultHeaders(token))
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to delete internal log")
  }
}

export async function restoreInternalCarLog(carId: number, logId: number): Promise<void> {
  try {
    const token = await getToken()
    await patchRequest(`/cars/${carId}/internal-logs/${logId}/restore`, null, loadDefaultHeaders(token))
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to restore internal log")
  }
}

// 🚖 External Logs

export async function getAllExternalLogs(query?: string) {
  try {
    const token = await getToken()
    const url = `/cars-external-logs?${query || ""}`
    const res = await getRequest<PaginatedData<ExternalCarLog>>(url, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch external logs")
  }
}

export async function getExternalCarLogs(carId: number, sp: TSearchParams): Promise<PaginatedData<ExternalCarLog>> {
  try {
    const token = await getToken()
    const query = build(sp)
    const res = await getRequest<PaginatedData<ExternalCarLog>>(`/cars/${carId}/external-logs?${query}`, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch external logs")
  }
}

export async function createExternalCarLog(carId: number, data: z.infer<typeof ExternalCarLogSchema>) {
  try {
    const token = await getToken()
    const res = await postRequest<ExternalCarLog>(`/cars/${carId}/external-logs`, data, loadDefaultHeaders(token))
    return res
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to create external log")
  }
}

export async function getSingleExternalCarLog(carId: number, logId: number) {
  try {
    const token = await getToken()
    const res = await getRequest<ExternalCarLog>(`/cars/${carId}/external-logs/${logId}`, loadDefaultHeaders(token))
    return res
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to fetch external log")
  }
}

export async function updateExternalCarLog(carId: number, logId: number, data: z.infer<typeof ExternalCarLogSchema>) {
  try {
    const token = await getToken()
    const res = await patchRequest<ExternalCarLog>(`/cars/${carId}/external-logs/${logId}`, data, loadDefaultHeaders(token))
    return res
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to update external log")
  }
}

export async function deleteExternalCarLog(carId: number, logId: number): Promise<void> {
  try {
    const token = await getToken()
    await deleteRequest(`/cars/${carId}/external-logs/${logId}`, loadDefaultHeaders(token))
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to delete external log")
  }
}

export async function restoreExternalCarLog(carId: number, logId: number): Promise<void> {
  try {
    const token = await getToken()
    await patchRequest(`/cars/${carId}/external-logs/${logId}/restore`, null, loadDefaultHeaders(token))
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err.message || "Failed to restore external log")
  }
}
