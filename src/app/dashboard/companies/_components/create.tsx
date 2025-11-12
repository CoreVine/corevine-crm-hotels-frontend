"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { CompanySchema } from "@/schema";
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

import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { cityState } from "@/lib/type-lists";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";
import { createCompany } from "../_helpers/actions";

export const CreateCompanyModal = () => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(CompanySchema.Create)
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CompanySchema.Create>) => createCompany(data),
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
          <DialogTitle>Create New Company</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <SelectField control={form.control} name='state' label='State'>
              {cityState.map((state, idx) => (
                <SelectItem key={`state-${state.value}-${idx}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
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
