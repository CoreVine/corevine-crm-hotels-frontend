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
import { City, Company } from "@/types/models";
import { CityState } from "@/types";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";
import { cityState } from "@/lib/type-lists";
import { updateCompany } from "../_helpers/actions";

export const UpdateCompanyModal = ({ company }: { company: Company }) => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(CompanySchema.Update),
    defaultValues: {
      name: company.name,
      state: company.state as CityState
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CompanySchema.Update>) => updateCompany(company.id, data),
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
            Update Company - <b>{company.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField
              control={form.control}
              name='name'
              label='Name'
              defaultValue={company.name}
            />

            <SelectField
              control={form.control}
              name='state'
              label='State'
              defaultValue={company.state}
            >
              {cityState.map((state, idx) => (
                <SelectItem key={`state-${state.value}-${idx}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
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
