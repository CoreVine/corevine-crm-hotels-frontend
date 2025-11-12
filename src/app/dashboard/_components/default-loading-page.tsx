import { Skeleton } from "@/components/ui/skeleton";
import { LoadingTable } from "./table-loading";

export function DefaultLoadingPage() {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <div className='space-y-2'>
          <Skeleton className='w-96 h-4' />
          <Skeleton className='w-32 h-4' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='w-32 h-9' />
          <Skeleton className='w-32 h-9' />
        </div>
      </div>
      <LoadingTable />
    </div>
  );
}
