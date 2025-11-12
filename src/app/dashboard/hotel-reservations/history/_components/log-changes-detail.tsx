import { ArrowRight } from "lucide-react"

interface ChangeDetailProps {
  field: string
  oldValue: any
  newValue: any
  showUnchanged?: boolean
}

export function ChangeDetail({ field, oldValue, newValue, showUnchanged = false }: ChangeDetailProps) {
  const hasChanged = JSON.stringify(oldValue) !== JSON.stringify(newValue)

  if (!hasChanged && !showUnchanged) {
    return null
  }

  return (
    <div className={`grid grid-cols-3 p-3 hover:bg-muted/50 ${hasChanged ? "bg-amber-50/50" : ""}`}>
      <div className='font-medium capitalize'>{field.replace(/_/g, " ")}</div>
      <div className='flex items-center'>
        <span className={hasChanged ? "text-red-500" : ""}>{oldValue === null ? "null" : oldValue.toString()}</span>
        {hasChanged && <ArrowRight className='h-4 w-4 mx-2 text-muted-foreground' />}
      </div>
      <div className={hasChanged ? "text-green-600 font-medium" : ""}>{newValue === null ? "null" : newValue.toString()}</div>
    </div>
  )
}
