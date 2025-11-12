"use server"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData, TSearchParams } from "@/types"
import { ExpenseSchema } from "@/schema"
import { Expense } from "@/types/models"

export type GetExpenseResponse = PaginatedData<Expense>
export type ExpenseData = z.infer<typeof ExpenseSchema>

export async function getExpenses(sp: TSearchParams): Promise<GetExpenseResponse> {
  try {
    const query = build(sp)
    const url = `/expenses` + (query ? `?${query}` : "")
    const token = await getToken()
    const response = await getRequest<GetExpenseResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch expenses")
  }
}

export async function createExpense(data: ExpenseData): Promise<ApiResponse<Expense | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Expense>("/expenses", data, loadDefaultHeaders(token))
    revalidatePath(routes.expenses.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateExpense(id: number, data: ExpenseData): Promise<ApiResponse<Expense | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Expense>(`/expenses/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.expenses.index)
    revalidatePath(routes.expenses.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreExpense(id: number): Promise<ApiResponse<Expense | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Expense>(`/expenses/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.expenses.index)
    revalidatePath(routes.expenses.trashed)

    return response
  } catch (error) {
    console.log({ error })
    return error as ApiError<undefined>
  }
}

export async function deleteExpense(id: number): Promise<ApiResponse<Expense | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Expense>(`/expenses/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.expenses.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
