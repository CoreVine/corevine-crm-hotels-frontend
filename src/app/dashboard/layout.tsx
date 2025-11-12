import { Navbar } from "./_components/navbar/navbar"
import { AppSidebar } from "./_components/sidebar/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

import { getUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  if (!user) return redirect("/login")

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='overflow-hidden w-full'>
        <Navbar />
        <main className='p-6'>{children}</main>
      </div>
    </SidebarProvider>
  )
}
