"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { revalidatePath } from "next/cache"
import { getToken } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData } from "@/types"
import { RoomSchema } from "@/schema"
import { Room } from "@/types/models"

export type GetRoomResponse = PaginatedData<Room>
export type CreateRoomData = z.infer<typeof RoomSchema.Create>
export type UpdateRoomData = z.infer<typeof RoomSchema.Update>

export async function getRooms(search?: string, page?: string): Promise<GetRoomResponse> {
  try {
    const params = build({ search, page })
    const url = `/rooms` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetRoomResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "failed to fetch rooms")
  }
}

export async function getAllRooms(search?: string, take?: string): Promise<Room[]> {
  try {
    const params = build({ search, take })
    const url = `/rooms-all` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<Room[]>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "failed to fetch rooms")
  }
}

export async function getTrashedRooms(search?: string, page?: string): Promise<GetRoomResponse> {
  try {
    const params = build({ search, page })
    const url = `/rooms-trashed` + (params ? `?${params}` : "")
    const token = await getToken()
    const response = await getRequest<GetRoomResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "failed to fetch rooms")
  }
}

export async function createRoom(data: CreateRoomData): Promise<ApiResponse<Room | undefined>> {
  try {
    const token = await getToken()
    const response = await postRequest<Room>("/rooms", data, loadDefaultHeaders(token))
    revalidatePath(routes.rooms.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function updateRoom(id: number, data: UpdateRoomData): Promise<ApiResponse<Room | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Room>(`/rooms/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.rooms.index)
    revalidatePath(routes.rooms.edit(id))
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function restoreRoom(id: number): Promise<ApiResponse<Room | undefined>> {
  try {
    const token = await getToken()
    const response = await patchRequest<Room>(`/rooms/${id}/restore`, undefined, loadDefaultHeaders(token))
    revalidatePath(routes.rooms.index)
    revalidatePath(routes.rooms.trashed)

    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}

export async function deleteRoom(id: number): Promise<ApiResponse<Room | undefined>> {
  try {
    const token = await getToken()
    const response = await deleteRequest<Room>(`/rooms/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.rooms.index)
    return response
  } catch (error) {
    return error as ApiError<undefined>
  }
}
