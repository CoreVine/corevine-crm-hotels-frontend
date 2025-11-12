"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { AgentSchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { updateAgent } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { z } from "zod"
import { User } from "@/types/models"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { agentRoles, agentState } from "@/lib/type-lists"

export const UpdateAgentModal = ({ agent }: { agent: User }) => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(AgentSchema.Update),
    defaultValues: agent
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof AgentSchema.Update>) => updateAgent(agent.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) setModal(false)
      })
  })

  const handleUpdate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Agent - <b>{agent.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <InputField control={form.control} name='email' label='E-mail' />
            <InputField control={form.control} name='address' label='Address' />
            <InputField control={form.control} name='contact_number' label='Phone' />
            <SelectField label='Role' name='role' control={form.control} defaultValue={agent.role}>
              {agentRoles.map((role, i) => (
                <SelectItem key={`${i}-${role.value}`} value={role.value}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectField>
            <SelectField
              label='Status'
              name='state'
              control={form.control}
              defaultValue={agent.state}
            >
              {agentState.map((state, i) => (
                <SelectItem key={`${i}-${state.value}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectField>

            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
