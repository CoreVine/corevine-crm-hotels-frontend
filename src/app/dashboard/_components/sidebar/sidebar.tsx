"use client"

import { managementGroup, sidebarGroups } from "./items"

import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

import { AdminSidebarGroup } from "./group"
import { AdminSidebarHeader } from "./header"
import { AdminSidebarFooter } from "./footer"
import { useUser } from "@/hooks/auth/use-user"

export function AppSidebar() {
  const user = useUser()

  return (
    <Sidebar>
      <AdminSidebarHeader />
      <SidebarContent>
        {sidebarGroups.map((group, i) => (
          <AdminSidebarGroup key={`group-${i}`} group={group} />
        ))}
        {user?.role === "admin" && <AdminSidebarGroup group={managementGroup} />}
      </SidebarContent>
      <AdminSidebarFooter />
    </Sidebar>
  )
}
