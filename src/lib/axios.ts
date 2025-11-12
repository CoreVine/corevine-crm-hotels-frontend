import axios from "axios"

import { API_URL } from "./constants"

import { loadDefaultHeaders } from "./api"
import { ApiError, ApiResponse } from "@/types"
import { cookies } from "next/headers"
import { getToken } from "@/actions/auth"

const api = axios.create({
  baseURL: API_URL,
  headers: loadDefaultHeaders()
})

api.interceptors.request.use(async (config) => {
  const token = await getToken()

  config.headers = {
    ...loadDefaultHeaders(token),
    ...config.headers
  }

  return config
})

export const getRequest = async <T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get<ApiResponse<T>>(url, {
      headers
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const postRequest = async <T>(url: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, body, {
      headers
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const putRequest = async <T>(url: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  try {
    const response = await api.put<ApiResponse<T>>(url, body, {
      headers
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const patchRequest = async <T>(url: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  try {
    const response = await api.patch<ApiResponse<T>>(url, body, {
      headers
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const deleteRequest = async <T>(url: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  try {
    const response = await api.delete<ApiResponse<T>>(url, {
      headers,
      data: body
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

const handleApiError = (error: any): ApiError<any> => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || "Something went wrong",
      status: (error.response?.status as number) || 500,
      data: error.response?.data || null
    }
  }
  return { message: "Network error", status: 500, data: null }
}

export default api
