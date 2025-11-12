"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { CitySchema, PaymentTypeSchema } from "@/schema";
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

import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { City, PaymentType } from "@/types/models";
import { PaymentTypeState } from "@/types";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";
import { cityState } from "@/lib/type-lists";
import { updatePaymentType } from "../_helpers/actions";

export const UpdatePaymentTypeModal = ({ paymentType }: { paymentType: PaymentType }) => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(PaymentTypeSchema.Update),
    defaultValues: {
      name: paymentType.name,
      state: paymentType.state as PaymentTypeState
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof PaymentTypeSchema.Update>) =>
      updatePaymentType(paymentType.id, data),
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
            Update Payment Type - <b>{paymentType.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField
              control={form.control}
              name='name'
              label='Name'
              defaultValue={paymentType.name}
            />
            <SelectField
              control={form.control}
              name='state'
              label='State'
              defaultValue={paymentType.state}
            >
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectField>
            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
