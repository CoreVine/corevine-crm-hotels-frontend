"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ApiError } from "@/types"
import { useRouter } from "next/navigation"

export default function ErrorPage({ error }: { error: ApiError<any> }) {
  const router = useRouter()
  console.error({ error })

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 rounded-md shadow border text-center'>
      <h1 className='text-3xl font-bold'>An Error Has Occured</h1>
      <p className='text-red-700 mt-2 text-xl capitalize'>"{error?.message || "An unexpected error occurred."}"</p>

      <div className='mt-4'>
        <Button onClick={() => router.refresh()}>Try again</Button>
        <Link href='/dashboard' className='ml-4 text-blue-500 underline'>
          Go Home
        </Link>
      </div>
    </div>
  )
}
