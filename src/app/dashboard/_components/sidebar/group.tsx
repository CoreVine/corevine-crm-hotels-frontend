"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from "@/components/ui/sidebar"

import { TSidebarGroup } from "@/types"
import { AdminSidebarItem } from "./item"
import { useUser } from "@/hooks/auth/use-user"

type Props = {
  group: TSidebarGroup
}

export const AdminSidebarGroup = ({ group }: Props) => {
  const isManagement = group.name === "Management"
  const user = useUser()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item, index) => (
            <AdminSidebarItem key={`item-${index}`} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
