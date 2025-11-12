import { useDebounce } from "use-debounce"
import { useClients } from "@/app/dashboard/clients/_helpers/hooks"
import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchableData } from "@/components/common/form/searchable-data"
import { InputField } from "@/components/common/form/input-field"
import { UserIcon } from "lucide-react"

type Props = {
  form: any
  hasClient: boolean
  setHasClient: React.Dispatch<React.SetStateAction<boolean>>
}

export const ClientForm = ({ form, setHasClient }: Props) => {
  const [searchClients, setSearchClientsValue] = useState("")
  const [debouncedSearchClients] = useDebounce(searchClients, 500)

  const { modifiedClients, isClientsLoading, isClientsRefetching } = useClients(debouncedSearchClients)

  return (
    <Tabs defaultValue='select-client'>
      <TabsList>
        <TabsTrigger onClick={() => setHasClient(true)} value='select-client'>
          Select Existing Client
        </TabsTrigger>
        <TabsTrigger onClick={() => setHasClient(false)} value='new-client'>
          New Client
        </TabsTrigger>
      </TabsList>

      <section className='space-y-4 border p-4 rounded-md shadow'>
        <div className='flex gap-2 mb-4 font-semibold items-center'>
          <div className='p-2 rounded-md bg-indigo-500 text-white'>
            <UserIcon className='size-5' />
          </div>
          <h4>Client Details</h4>
        </div>

        <TabsContent value='new-client' className='mb-0'>
          <div className='grid xl:grid-cols-2 gap-4'>
            <InputField name='client.name' label='Client Name' placeholder='Client Name' control={form.control} />
            <InputField name='client.email' label='Email' placeholder='Email' control={form.control} />
            <InputField name='client.phone' label='Phone' placeholder='Phone' control={form.control} />
            <InputField name='client.nationality' label='Nationality' placeholder='Nationality' control={form.control} />
          </div>
        </TabsContent>

        <TabsContent value='select-client'>
          <SearchableData label='Client' search={searchClients} setSearch={setSearchClientsValue} data={modifiedClients} loading={isClientsRefetching || isClientsLoading} form={form} formItem='client.client_id' />
        </TabsContent>
      </section>
    </Tabs>
  )
}
