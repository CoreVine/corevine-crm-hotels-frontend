"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { MealSchema } from "@/schema";
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

import { updateMeal } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { City, Meal } from "@/types/models";
import { CityState } from "@/types";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";
import { cityState } from "@/lib/type-lists";

export const UpdateMealModal = ({ meal }: { meal: Meal }) => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(MealSchema.Update),
    defaultValues: {
      meal_type: meal.meal_type,
      state: meal.state as CityState
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof MealSchema.Update>) => updateMeal(meal.id, data),
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
            Update Meal - <b>{meal.meal_type}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField
              control={form.control}
              name='meal_type'
              label='Meal Type'
              defaultValue={meal.meal_type}
            />
            <SelectField
              control={form.control}
              name='state'
              label='State'
              defaultValue={meal.state}
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
