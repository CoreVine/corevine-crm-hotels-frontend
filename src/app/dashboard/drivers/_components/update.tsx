"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { DriverSchema } from "@/schema";
import { InputField } from "@/components/common/form/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Edit, SaveAll } from "lucide-react";
import { Driver } from "@/types/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { updateDriver } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";

export const UpdateDriverModal = ({ driver }: { driver: Driver }) => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(DriverSchema.Update),
    defaultValues: {
      name: driver.name,
      phone: driver.phone
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof DriverSchema.Update>) => updateDriver(driver.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) {
          setModal(false);
          form.reset();
        }
      })
  });

  const handleUpdate = () => {
    mutation.mutate(form.getValues());
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} variant='outline' />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Driver</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' placeholder='John Doe' />
            <InputField
              control={form.control}
              name='phone'
              label='Phone'
              placeholder='01123999999'
            />
            <LoadingButton loading={mutation.isPending} icon={SaveAll}>
              Save
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
