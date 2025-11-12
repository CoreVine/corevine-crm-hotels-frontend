import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const ShortcutLink = ({ label, icon: Icon, href }: Props) => {
  return (
    <Link
      href={href}
      className='bg-white border shadow-xs p-1 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-all'
    >
      <div className='p-2 rounded-md flex place-content-center bg-gray-200'>
        <Icon size={14} className='text-gray-500' />
      </div>
      <p className='text-sm text-center'>{label}</p>
    </Link>
  );
};
