"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { CategorySchema, CitySchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { updateCategory } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { z } from "zod"
import { Category } from "@/types/models"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { categoryType } from "@/lib/type-lists"
import { CheckboxField } from "@/components/common/form/checkbox-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const UpdateCategoryModal = ({ category }: { category: Category }) => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category.name,
      type: category.type,
      is_active: category.is_active
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CategorySchema>) => updateCategory(category.id, data),
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
            Update Category - <b>{category.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' defaultValue={category.name} />
            <SelectField control={form.control} name='Type' label='Type' defaultValue={category.type}>
              {categoryType.map((state, idx) => (
                <SelectItem key={`category-state-${state.value}-${idx}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectField>
            <div className='flex gap-2 items-center'>
              <Checkbox defaultChecked={category.is_active} onCheckedChange={(checked) => form.setValue("is_active", !!checked)} id='is_active' />
              <Label htmlFor='is_active'>Is Active?</Label>
            </div>
            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
