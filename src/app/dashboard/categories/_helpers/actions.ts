"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData, TSearchParams } from "@/types"
import { CategorySchema } from "@/schema"
import { Category } from "@/types/models"

export type GetCategoryResponse = PaginatedData<Category>
export type CreateCategoryData = z.infer<typeof CategorySchema>
export type UpdateCategoryData = z.infer<typeof CategorySchema>

export async function getCategories(sp: TSearchParams): Promise<GetCategoryResponse> {
  try {
    const params = build(sp)
    const url = `/categories?${params}`
    const token = await getToken()
    const response = await getRequest<GetCategoryResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Categories")
  }
}

export async function getAllCategories(sp: TSearchParams): Promise<Category[]> {
  try {
    const params = build(sp)
    const url = `/categories-all?${params}`
    const token = await getToken()
    const response = await getRequest<Category[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Categories")
  }
}

export async function getTrashedCategories(sp: TSearchParams): Promise<GetCategoryResponse> {
  try {
    const params = build(sp)
    const url = `/categories-trashed?${params}`
    const token = await getToken()
    const response = await getRequest<GetCategoryResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch trashed Categories")
  }
}

export async function createCategory(data: CreateCategoryData): Promise<ApiResponse<Category | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Category>("/categories", data, loadDefaultHeaders(token))
    revalidatePath(routes.categories.index)
    return response
  } catch (error) {
    console.log(error)
    return error as ApiError<undefined>
  }
}

export async function updateCategory(id: number, data: UpdateCategoryData): Promise<ApiResponse<Category | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Category>(`/categories/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.categories.index)
    revalidatePath(routes.categories.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreCategory(id: number): Promise<ApiResponse<Category | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Category>(`/categories/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.categories.index)
    revalidatePath(routes.categories.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deleteCategory(id: number): Promise<ApiResponse<Category | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Category>(`/categories/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.categories.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
