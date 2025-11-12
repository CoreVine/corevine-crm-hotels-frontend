"use server"

import { getRequest, postRequest } from "@/lib/axios"
import { cookies } from "next/headers"

import { User } from "@/types/models"
import { AUTH_COOKIE } from "@/lib/constants"
import { ApiError, LoginData } from "@/types"
import { loadDefaultHeaders } from "@/lib/api"

import logger from "@/lib/logger"

type LoginResponse = {
  token: string
  user: User
}

export async function loginAction(data: LoginData) {
  try {
    const response = await postRequest<LoginResponse>("/login", data)
    const store = await cookies()
    if (response.status === 200) {
      store.set("token", response.data.token, {
        expires: new Date(Date.now() + (data?.rememberMe ? 7 : 1) * 24 * 60 * 60 * 1000)
      })
    }
    return response
  } catch (error) {
    logger.error("Login error: ", error)
    const err = error as ApiError<LoginResponse>
    throw new Error(err?.message || "Login failed")
  }
}

export async function getToken(): Promise<string | undefined> {
  const store = await cookies()
  const token = store.get(AUTH_COOKIE)?.value
  return token
}

export async function getUser(): Promise<User | undefined> {
  try {
    const token = await getToken()
    const response = await getRequest<User>("/me", loadDefaultHeaders(token))
    return response.data
  } catch (err) {
    logger.error("Error fetching user data:", err)
    return undefined
  }
}

export async function isAdmin() {
  const user = await getUser()
  return user?.role === "admin"
}
