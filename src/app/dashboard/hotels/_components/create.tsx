"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCities } from "../../cities/_helpers/hooks";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { HotelSchema } from "@/schema";
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

import { createHotel } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";
import { FilterBySearch } from "@/components/common/form/searchable-field";

export const CreateHotelModal = () => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(HotelSchema.Create)
  });

  const [searchCities, setSearchCities] = useState("");
  const [selectedCity, setSelectedSelecetedName] = useState("");
  const [cityId, setCityId] = useState<number>();

  const { cities, isCitiesLoading, isCitiesRefetching, refetchCities } = useCities(searchCities);

  const citiesValues = cities?.map((city) => ({
    id: city.id,
    label: city.name,
    value: city.name
  }));

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedSelecetedName(currentValue);
    form.setValue("city_id", id);
    setCityId(id);
  };

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof HotelSchema.Create>) => createHotel(data),
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
          <DialogTitle>Create New Hotel</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <FilterBySearch
              formLabel='City'
              value={selectedCity}
              setValue={setSearchCities}
              isLoading={isCitiesLoading || isCitiesRefetching}
              onCommandSelect={onCommandSelect}
              error={form.formState.errors.city_id?.message}
              data={citiesValues}
            />

            <InputField control={form.control} name='name' label='Name' placeholder='John Doe' />

            <InputField
              control={form.control}
              name='email'
              label='E-mail'
              placeholder='example@gmail.com'
            />

            <InputField
              control={form.control}
              name='phone_number'
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
