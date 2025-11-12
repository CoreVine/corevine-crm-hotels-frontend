import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { LucideIcon } from "lucide-react";

type Props = {
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: LucideIcon;
  className?: ClassValue;
  hasBB?: boolean;
};

export const PageTitle = ({ label, children, icon: Icon, className, hasBB }: Props) => {
  return (
    <div
      className={cn(className, hasBB && "border-b pb-2", "flex justify-between items-center mb-4")}
    >
      <h1 className='flex gap-2 items-center text-3xl font-semibold'>
        {Icon && <Icon size={16} />}
        {label}
      </h1>
      <div className='flex gap-2'>{children}</div>
    </div>
  );
};
