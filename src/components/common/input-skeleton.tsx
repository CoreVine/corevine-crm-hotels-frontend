import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Skeleton } from "../ui/skeleton";

type Props = {
  className?: ClassValue;
};

export const InputSkeleton = ({ className }: Props) => {
  return (
    <div className={cn(className, "space-y-2 my-2")}>
      <Skeleton className='h-4 w-32' />
      <Skeleton className='h-9 w-full' />
    </div>
  );
};
