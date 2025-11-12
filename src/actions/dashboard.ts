"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { postRequest, getRequest } from "@/lib/axios"
import { getToken } from "./auth"
import { z } from "zod"

import { SendEmailSchema } from "@/schema"
import { ApiError, EmailResponse } from "@/types"
import logger from "@/lib/logger"
import { DashboardStats } from "@/types/models"

export type EmailData = z.infer<typeof SendEmailSchema>

export async function getDashboardStats() {
  try {
    const token = await getToken()
    const response = await getRequest<DashboardStats>("/reservations-stats", loadDefaultHeaders(token))
    const data = response.data
    return data
  } catch (error) {
    logger.error(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to fetch dashboard stats")
  }
}

export async function sendEmail(file: File | null, data: EmailData, selectedIds: number[]) {
  try {
    const formData = new FormData()

    if (file) formData.append("file", file)

    formData.append("type", data.type)
    formData.append("from", data.from)
    formData.append("subject", data.subject)
    formData.append("message", data.message)

    selectedIds.forEach((id, idx) => {
      formData.append(`selected_reservations[${idx}]`, id.toString())
    })

    const token = await getToken()
    const response = await postRequest<EmailResponse>(`/send-mail`, formData, loadDefaultHeaders(token))
    return response
  } catch (error) {
    logger.error("Error sending email: ", error)
    const err = error as ApiError<EmailResponse>
    throw new Error(err?.message || "Failed to send email")
  }
}
