"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { PaymentTypeSchema } from "@/schema";
import { InputField } from "@/components/common/form/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { createPaymentType } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { cityState } from "@/lib/type-lists";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";

export const CreatePaymentTypeModal = () => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(PaymentTypeSchema.Create)
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof PaymentTypeSchema.Create>) => createPaymentType(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          setModal(false);
          form.reset();
        }
      })
  });

  const handleCreate = () => {
    mutation.mutate(form.getValues());
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Payment Type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <SelectField control={form.control} name='state' label='State'>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectField>
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
