"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { CitySchema } from "@/schema";
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

import { updateCity } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { City } from "@/types/models";
import { CityState } from "@/types";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";
import { cityState } from "@/lib/type-lists";

export const UpdateCityModal = ({ city }: { city: City }) => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(CitySchema.Update),
    defaultValues: {
      name: city.name,
      state: city.state as CityState
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CitySchema.Update>) => updateCity(city.id, data),
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
            Update City - <b>{city.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' defaultValue={city.name} />
            <SelectField
              control={form.control}
              name='state'
              label='State'
              defaultValue={city.state}
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
