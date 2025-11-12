import { LucideIcon } from "lucide-react"

type Props = {
  label: string
  icon: LucideIcon
  mainNumber?: number
  number: number
  color: string
  additionalItems?: { label: string; value: number }[]
}

export const DashboardStatCard = ({
  label,
  icon: Icon,
  mainNumber,
  number,
  color,
  additionalItems
}: Props) => {
  return (
    <div className='border p-3 rounded-md shadow-xs h-fit'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <div
            className='p-2 flex items-center justify-center rounded-md'
            style={{ background: color }}
          >
            <Icon size={24} className='text-white' />
          </div>
          <h2 className='text-lg font-semibold'>{label}</h2>
        </div>
        <p className='text-xl font-semibold'>{mainNumber}</p>
      </div>
      {!additionalItems && <p className='text-xl font-semibold mt-2 text-right'>{number}</p>}
      {additionalItems && (
        <div className='px-2 border-t pt-2 mt-2 grid grid-cols-2 gap-x-4'>
          {additionalItems?.map((item, index) => (
            <div key={index} className='flex justify-between mt-1'>
              <p>{item.label}</p>
              <p className='border p-0.5 px-2 text-sm font-semibold rounded-md'>{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
