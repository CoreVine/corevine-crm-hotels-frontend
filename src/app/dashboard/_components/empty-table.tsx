import { FileText } from "lucide-react";

export function EmptyTableState({ children }: { children?: React.ReactNode }) {
  return (
    <div className='w-full flex flex-col items-center justify-center py-10 border p-4 rounded-md shadow'>
      <FileText className='h-12 w-12 text-gray-400' />
      <h2 className='mt-4 text-lg font-semibold text-gray-700'>No Data Available</h2>
      <p className='mt-1 text-sm text-gray-500 mb-4'>Add new entries to see data here.</p>
      {children && children}
    </div>
  );
}
