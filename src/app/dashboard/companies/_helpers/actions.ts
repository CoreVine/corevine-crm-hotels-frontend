"use server"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, CityState, PaginatedData } from "@/types"
import { CitySchema } from "@/schema"
import { Company } from "@/types/models"

export type GetCompanyResponse = PaginatedData<Company>
export type CreateCompanyData = z.infer<typeof CitySchema.Create>
export type UpdateCompanyData = z.infer<typeof CitySchema.Update>

export async function getCompanies(search?: string, page?: string): Promise<GetCompanyResponse> {
  try {
    const params = build({ search, page })
    const url = `/companies` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetCompanyResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error("Error getting companies")
  }
}

export async function getAllCompanies(
  search?: string,
  state?: CityState,
  take?: string
): Promise<Company[]> {
  try {
    const params = build({ search, state, take })
    const url = `/companies-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Company[]>(url, loadDefaultHeaders(token))
    console.log({ response })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get companies")
  }
}

export async function getTrashedCompanies(
  search?: string,
  page?: string
): Promise<GetCompanyResponse> {
  try {
    const params = build({ search, page })
    const url = `/companies-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetCompanyResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get trashed companies")
  }
}

export async function createCompany(
  data: CreateCompanyData
): Promise<ApiResponse<Company | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Company>("/companies", data, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateCompany(
  id: number,
  data: UpdateCompanyData
): Promise<ApiResponse<Company | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Company>(
      `/companies/${id}`,
      data,
      loadDefaultHeaders(token)
    )
    revalidatePath(routes.cities.index)
    revalidatePath(routes.cities.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreCompany(id: number): Promise<ApiResponse<Company | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Company>(
      `/companies/${id}/restore`,
      undefined,
      loadDefaultHeaders(token)
    )
    revalidatePath(routes.cities.index)
    revalidatePath(routes.cities.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deleteCompany(id: number): Promise<ApiResponse<Company | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Company>(`/companies/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.cities.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
