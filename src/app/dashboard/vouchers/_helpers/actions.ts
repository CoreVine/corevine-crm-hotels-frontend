"use server"

import { getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, VoucherState, PaginatedData } from "@/types"
import { Voucher } from "@/types/models"
import { VoucherSchema } from "@/schema"

export type GetVoucherResponse = PaginatedData<Voucher>
export type CreateVoucherData = z.infer<typeof VoucherSchema.Create>

export async function getVouchers(sp: Record<string, string>): Promise<GetVoucherResponse> {
  try {
    const params = build(sp)
    const url = `/vouchers` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetVoucherResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "failed to fetch vouchers")
  }
}

export async function getTrashedVouchers(sp: Record<string, string>): Promise<GetVoucherResponse> {
  try {
    const params = build(sp)
    const url = `/vouchers-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetVoucherResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "failed to fetch vouchers")
  }
}

export async function getSingleVoucher(id: number): Promise<Voucher> {
  try {
    const url = `/vouchers/${id}`
    const token = await getToken()
    const response = await getRequest<Voucher>(url, loadDefaultHeaders(token))
    console.log(response.data)
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "failed to fetch voucher")
  }
}

export async function changeVoucherState(id: number, status: VoucherState): Promise<ApiResponse<Voucher | undefined>> {
  try {
    const url = `/vouchers/${id}/change-status`
    const token = await getToken()
    const response = await patchRequest<Voucher | undefined>(url, { status }, loadDefaultHeaders(token))
    revalidatePath(routes.vouchers.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function createVoucher(data: CreateVoucherData): Promise<ApiResponse<Voucher | undefined>> {
  try {
    const url = `/vouchers`
    const token = await getToken()
    const response = await postRequest<Voucher | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.vouchers.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateVoucher(id: number, data: CreateVoucherData): Promise<ApiResponse<Voucher | undefined>> {
  const url = `/vouchers/${id}`
  try {
    const token = await getToken()
    const response = await patchRequest<Voucher | undefined>(url, data, loadDefaultHeaders(token))
    revalidatePath(routes.vouchers.index)
    console.log({ requestURL: url })
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
