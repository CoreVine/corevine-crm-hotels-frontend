"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { CategorySchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

import { createCategory } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { z } from "zod"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { categoryType } from "@/lib/type-lists"
import { CheckboxField } from "@/components/common/form/checkbox-field"
import { Label } from "@/components/ui/label"

export const CreateCategoryModal = () => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(CategorySchema)
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CategorySchema>) => createCategory(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          setModal(false)
          form.reset()
        }
      })
  })

  const handleCreate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <SelectField control={form.control} name='type' label='Type'>
              {categoryType.map((state, idx) => (
                <SelectItem key={`state-${state.value}-${idx}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectField>
            <div className='flex gap-2 items-center'>
              <Checkbox onCheckedChange={(checked) => form.setValue("is_active", !!checked)} id='is_active' />
              <Label htmlFor='is_active'>Is Active?</Label>
            </div>
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
