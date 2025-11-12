import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { ApiError, LoginData } from "@/types"

import { showResponse } from "@/lib/utils"
import { loginAction } from "@/actions/auth"
import { toast } from "react-toastify"
import { routes } from "@/lib/route"

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginData) => loginAction(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) router.push(routes.home)
      }),
    onError: (error: ApiError<any>) => {
      toast.error(error.message)
    }
  })
}
