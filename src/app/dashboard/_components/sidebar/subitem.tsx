import { SidebarMenuSubItem } from "@/components/ui/sidebar";
import { TSidebarSubItem } from "@/types";

import Link from "next/link";

type Props = {
  subItem: TSidebarSubItem;
};

export const AdminSidebarSubItem = ({ subItem }: Props) => {
  return (
    <Link href={subItem.href} className='py-1 hover:bg-gray-200 px-2 rounded-md'>
      <SidebarMenuSubItem>{subItem.label}</SidebarMenuSubItem>
    </Link>
  );
};
