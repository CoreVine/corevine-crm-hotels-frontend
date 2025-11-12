import { useForm } from "react-hook-form"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { emailTypes } from "@/lib/type-lists"
import { toast } from "react-toastify"
import { showResponse } from "@/lib/utils"
import { EmailData, sendEmail } from "@/actions/dashboard"

import { SendEmailSchema } from "@/schema"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { Form } from "@/components/ui/form"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { InputField } from "@/components/common/form/input-field"
import { FileField } from "@/components/common/form/file-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HotelEmail } from "@/types/models"

type Mutation = {
  file: File | null
  data: EmailData
}

type Props = {
  selectedIds: number[]
}

export function SendEmailModal({ selectedIds }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(SendEmailSchema)
  })

  const mutation = useMutation({
    mutationFn: (data: Mutation) => sendEmail(data.file, data.data, selectedIds),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) {
          form.reset()
          setOpen(false)
        }
      })
  })

  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please select a file to attach")
      return
    }
    mutation.mutate({ file, data: form.getValues() })
  }

  const showErrors = () => {
    console.log(form.formState.errors)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Mail} variant='outline'>
          Send E-mail
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send An Email</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <SelectField name='type' label='Type' control={form.control}>
              {emailTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectField>

            <InputField name='from' label='From' control={form.control} />

            <InputField name='subject' label='Subject' control={form.control} />

            <InputField isTextarea name='message' label='Message' control={form.control} />

            <FileField label='Attachment' onChange={setFile} />

            <LoadingButton loading={mutation.isPending}>Send</LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
