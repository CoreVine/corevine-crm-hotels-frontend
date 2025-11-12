"use server"

import logger from "@/lib/logger"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData, TSearchParams } from "@/types"
import { AgentSchema } from "@/schema"
import { User } from "@/types/models"

export type GetAgentResponse = PaginatedData<User>
export type CreateAgentData = z.infer<typeof AgentSchema.Create>
export type UpdateAgentData = z.infer<typeof AgentSchema.Update>

export async function getAgents(searchParams: TSearchParams): Promise<GetAgentResponse> {
  try {
    const token = await getToken()
    const sp = build(searchParams)
    const url = `/agents?${sp}`
    const response = await getRequest<GetAgentResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    logger.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch Agents")
  }
}

export async function getAllAgents(search?: string): Promise<User[]> {
  try {
    const params = build({ search })
    const url = `/agents-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<User[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    logger.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch Agents")
  }
}

export async function getTrashedAgents(searchParams: TSearchParams): Promise<GetAgentResponse> {
  try {
    const sp = build(searchParams)
    const url = `/agents-trashed?${sp}`
    const token = await getToken()
    const response = await getRequest<GetAgentResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    logger.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch trashed Agents")
  }
}

export async function createAgent(data: CreateAgentData): Promise<ApiResponse<User | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<User>("/agents", data, loadDefaultHeaders(token))
    revalidatePath(routes.agents.index)
    return response
  } catch (error) {
    logger.error(error)
    return error as ApiError<undefined>
  }
}

export async function updateAgent(id: number, data: UpdateAgentData): Promise<ApiResponse<User | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<User>(`/agents/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.agents.index)
    return response
  } catch (error) {
    logger.error(error)
    return error as ApiError<undefined>
  }
}

export async function restoreAgent(id: number): Promise<ApiResponse<User | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<User>(`/agents/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.agents.index)
    revalidatePath(routes.agents.trashed)
    return response
  } catch (error) {
    logger.error(error)
    return error as ApiError<undefined>
  }
}

export async function deleteAgent(id: number): Promise<ApiResponse<User | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<User>(`/agents/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.agents.index)
    return response
  } catch (error) {
    logger.error(error)
    return error as ApiError<undefined>
  }
}
