"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, CityState, PaginatedData } from "@/types"
import { MealSchema } from "@/schema"
import { Meal } from "@/types/models"

export type GetMealResponse = PaginatedData<Meal>
export type CreateMealData = z.infer<typeof MealSchema.Create>
export type UpdateMealData = z.infer<typeof MealSchema.Update>

export async function getMeals(search?: string, page?: string): Promise<GetMealResponse> {
  try {
    const params = build({ search, page })
    const url = `/meals` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetMealResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch meals")
  }
}

export async function getAllMeals(search?: string, state?: CityState, take?: string): Promise<Meal[]> {
  try {
    const params = build({ search, state, take })
    const url = `/meals-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Meal[]>(url, loadDefaultHeaders(token))
    console.log({ response })
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch all meals")
  }
}

export async function getTrashedMeals(search?: string, page?: string): Promise<GetMealResponse> {
  try {
    const params = build({ search, page })
    const url = `/meals-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetMealResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch trashed meals")
  }
}

export async function createMeal(data: CreateMealData): Promise<ApiResponse<Meal | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Meal>("/meals", data, loadDefaultHeaders(token))
    revalidatePath(routes.meals.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateMeal(id: number, data: UpdateMealData): Promise<ApiResponse<Meal | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Meal>(`/meals/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.meals.index)
    revalidatePath(routes.meals.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreMeal(id: number): Promise<ApiResponse<Meal | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Meal>(`/meals/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.meals.index)
    revalidatePath(routes.meals.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deleteMeal(id: number): Promise<ApiResponse<Meal | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Meal>(`/meals/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.meals.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
