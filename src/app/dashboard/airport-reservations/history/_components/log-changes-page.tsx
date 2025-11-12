"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, User } from "lucide-react"
import { diffForHumans } from "@/lib/utils"

export function LogChangesPage({ log }: { log: any }) {
  const findChanges = () => {
    const changes: { field: string; oldValue: any; newValue: any }[] = []
    const { attributes, old } = log?.properties

    for (const key in attributes) {
      if (JSON.stringify(attributes?.[key]) !== JSON.stringify(old?.[key])) {
        changes.push({
          field: key,
          oldValue: old?.[key],
          newValue: attributes?.[key]
        })
      }
    }

    return changes
  }

  const changes = findChanges()

  return (
    <div className='py-6 space-y-6'>
      <Card>
        <CardHeader className='pb-3'>
          <div className='flex justify-between items-start'>
            <div>
              <CardTitle className='text-2xl'>{log?.description}</CardTitle>
              <CardDescription className='mt-1'>
                Log ID: {log?.id} • Event: {log?.event}
              </CardDescription>
            </div>
            <Badge variant='outline' className='capitalize'>
              {log?.event}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div className='flex items-center gap-2'>
              <User className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Changed by:</span>
              <span className='font-medium'>{log?.causer?.name ?? "N/A"}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>Time:</span>
              <span className='font-medium'>{diffForHumans(log?.created_at)}</span>
            </div>
          </div>

          <div className='mb-6'>
            <h3 className='text-lg font-medium mb-2'>Airport Reservation Details</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Client</p>
                <p className='font-medium'>{log?.subject?.reservation?.client?.name ?? "N/A"}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Airport Name</p>
                <p className='font-medium'>{log?.subject?.airport_name ?? "N/A"}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Flight Number</p>
                <p className='font-medium'>{log?.subject?.flight_number ?? "N/A"}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Arrival Date</p>
                <p className='font-medium'>{log?.subject?.arrival_date ?? "N/A"}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Arrival Time</p>
                <p className='font-medium'>{log?.subject?.arrival_time ?? "N/A"}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Status</p>
                <p className='font-medium capitalize'>{log?.subject?.status?.replace("_", " ") ?? "N/A"}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue='changes'>
            <TabsList className='mb-4'>
              <TabsTrigger value='changes'>Changes Only</TabsTrigger>
              <TabsTrigger value='all'>All Fields</TabsTrigger>
            </TabsList>

            <TabsContent value='changes' className='space-y-4'>
              <h3 className='text-lg font-medium'>Changed Fields</h3>
              {changes?.length === 0 ? (
                <p className='text-muted-foreground'>No changes detected</p>
              ) : (
                <div className='border rounded-lg overflow-hidden'>
                  <div className='grid grid-cols-3 bg-muted p-3 font-medium text-sm'>
                    <div>Field</div>
                    <div>Old Value</div>
                    <div>New Value</div>
                  </div>
                  <div className='divide-y'>
                    {changes?.map((change, index) => (
                      <div key={index} className='grid grid-cols-3 p-3 hover:bg-muted/50'>
                        <div className='font-medium capitalize'>{change?.field.replace("_", " ")}</div>
                        <div className='flex items-center'>
                          <span className='text-red-500 mr-2'>{change?.oldValue === null ? "null" : String(change?.oldValue)}</span>
                          <ArrowRight className='h-4 w-4 text-muted-foreground' />
                        </div>
                        <div className='text-green-600 font-medium'>{change?.newValue === null ? "null" : String(change?.newValue)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value='all'>
              <h3 className='text-lg font-medium mb-4'>All Fields</h3>
              <div className='border rounded-lg overflow-hidden'>
                <div className='grid grid-cols-3 bg-muted p-3 font-medium text-sm'>
                  <div>Field</div>
                  <div>Old Value</div>
                  <div>New Value</div>
                </div>
                <div className='divide-y'>
                  {Object.keys(log?.properties?.attributes).map((key, index) => {
                    const oldValue = log?.properties?.old?.[key]
                    const newValue = log?.properties?.attributes[key]
                    const hasChanged = JSON.stringify(oldValue) !== JSON.stringify(newValue)
                    return (
                      <div key={index} className={`grid grid-cols-3 p-3 hover:bg-muted/50 ${hasChanged ? "bg-amber-50" : ""}`}>
                        <div className='font-medium capitalize'>{key.replace("_", " ")}</div>
                        <div className={hasChanged ? "text-red-500" : ""}>
                          {oldValue === null ? "null" : String(oldValue)}
                          {hasChanged && <ArrowRight className='inline h-4 w-4 mx-2 text-muted-foreground' />}
                        </div>
                        <div className={hasChanged ? "text-green-600 font-medium" : ""}>{newValue === null ? "null" : String(newValue)}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
