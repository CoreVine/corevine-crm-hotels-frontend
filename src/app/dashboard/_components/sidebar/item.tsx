"use client"

import Link from "next/link"

import { ChevronDown } from "lucide-react"

import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TSidebarItem } from "@/types"
import { AdminSidebarSubItem } from "./subitem"
import { cn } from "@/lib/utils"

type Props = {
  item: TSidebarItem
}

export const AdminSidebarItem = ({ item }: Props) => {
  const hasItems = item?.items && item?.items?.length > 0

  return (
    <Collapsible className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className='flex gap-2 items-center justify-between'>
            <Link className={cn("flex gap-2 items-center", !hasItems && "w-full")} href={item.href}>
              <item.icon size={16} />
              {item.title}
            </Link>
            {item?.items && <ChevronDown className='ml-auto' />}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item?.items?.map((subItem, idx) => (
              <AdminSidebarSubItem key={`subitem-${idx}`} subItem={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
