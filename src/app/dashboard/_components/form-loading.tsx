import { Skeleton } from "@/components/ui/skeleton"

export const FormLoading = () => {
  return (
    <div className='xl:px-8 py-8'>
      <div className={"flex items-center justify-between border-b mb-4 pb-4"}>
        <Skeleton className='h-10 w-44' />
        <div className='flex gap-2 items-center'>
          <Skeleton className='h-10 w-20' />
          <Skeleton className='h-10 w-20' />
        </div>
      </div>

      <div className='xl:w-1/2 w-full'>
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-2'>
          <div className='mb-4 space-y-2'>
            <Skeleton className='h-2 w-32' />
            <Skeleton className='h-9 w-full' />
          </div>
          <div className='mb-4 space-y-2'>
            <Skeleton className='h-2 w-32' />
            <Skeleton className='h-9 w-full' />
          </div>
        </div>
        <div className='mb-4 space-y-2'>
          <Skeleton className='h-2 w-32' />
          <Skeleton className='h-9 w-full' />
        </div>
        <div className='mb-4 space-y-2'>
          <Skeleton className='h-2 w-32' />
          <Skeleton className='h-9 w-full' />
        </div>
        <div className='mb-4 space-y-2'>
          <Skeleton className='h-2 w-32' />
          <Skeleton className='h-9 w-full' />
        </div>
        <div className='mb-4 space-y-2'>
          <Skeleton className='h-2 w-32' />
          <Skeleton className='h-9 w-full' />
        </div>
        <div className='mb-4 space-y-2'>
          <Skeleton className='h-2 w-32' />
          <Skeleton className='h-9 w-full' />
        </div>
        <div className='mb-4 space-y-2'>
          <Skeleton className='h-2 w-32' />
          <Skeleton className='h-9 w-full' />
        </div>

        <Skeleton className='h-10 w-20' />
      </div>
    </div>
  )
}
