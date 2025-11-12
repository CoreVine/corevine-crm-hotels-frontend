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
import { Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { updateClient } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { Client } from "@/types/models";

export const UpdateClientModal = ({ client }: { client: Client }) => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(ClientSchema.Update),
    defaultValues: client
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof ClientSchema.Update>) => updateClient(client.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) setModal(false);
      })
  });

  const handleUpdate = () => {
    mutation.mutate(form.getValues());
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Client - <b>{client.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField
              control={form.control}
              name='name'
              label='Name'
              defaultValue={client.name}
            />
            <InputField
              control={form.control}
              name='email'
              label='E-mail'
              defaultValue={client.email}
            />
            <InputField
              control={form.control}
              name='phone'
              label='Phone'
              defaultValue={client.phone}
            />
            <InputField
              control={form.control}
              name='nationality'
              label='Nationality'
              defaultValue={client.nationality}
            />
            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
