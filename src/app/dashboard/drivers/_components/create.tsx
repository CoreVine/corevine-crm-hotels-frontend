"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCities } from "../../cities/_helpers/hooks";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { DriverSchema, HotelSchema } from "@/schema";
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

import { createDriver } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { FilterBySearch } from "@/components/common/form/searchable-field";

export const CreateDriverModal = () => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(DriverSchema.Create)
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof DriverSchema.Create>) => createDriver(data),
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
        <Button icon={Plus} variant='outline'>
          Create Driver
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Driver</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' placeholder='John Doe' />

            <InputField
              control={form.control}
              name='phone'
              label='Phone'
              placeholder='01123999999'
            />

            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
