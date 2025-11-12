"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { ClientSchema } from "@/schema";
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

import { createClient } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";

export const CreateClientModal = () => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(ClientSchema.Create)
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof ClientSchema.Create>) => createClient(data),
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
          <DialogTitle>Create New Client</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <InputField control={form.control} name='email' label='E-mail' />
            <InputField control={form.control} name='phone' label='Phone' />
            <InputField control={form.control} name='nationality' label='Nationality' />
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
