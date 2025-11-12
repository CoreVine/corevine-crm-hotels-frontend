import { Metadata } from "next"
import { LoginForm } from "./_components/login-form"
import { getUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Login",
  description: "Login page"
}

export default async function LoginPage() {
  const user = await getUser()
  if (user) return redirect("/dashboard")

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='border rounded-md xl:w-1/3 w-3/4 shadow-md'>
        <LoginForm />
      </div>
    </div>
  )
}
