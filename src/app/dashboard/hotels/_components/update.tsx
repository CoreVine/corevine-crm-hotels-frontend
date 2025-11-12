"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCities } from "../../cities/_helpers/hooks";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/common/loading-button";
import { HotelSchema } from "@/schema";
import { InputField } from "@/components/common/form/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Edit } from "lucide-react";
import { FilterBySearch } from "@/components/common/form/searchable-field";
import { Hotel } from "@/types/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { updateHotel } from "../_helpers/actions";
import { showResponse } from "@/lib/utils";
import { z } from "zod";

export const UpdateHotelModal = ({ hotel }: { hotel: Hotel }) => {
  const [modal, setModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(HotelSchema.Update),
    defaultValues: {
      name: hotel.name,
      email: hotel.email,
      phone_number: hotel.phone_number,
      city_id: hotel.city_id
    }
  });

  const [searchCities, setSearchCities] = useState(hotel.city.name);
  const [selectedCity, setSelectedSelecetedName] = useState(hotel.city.name);
  const [cityId, setCityId] = useState<number>(hotel.city_id);

  const { cities, isCitiesLoading, isCitiesRefetching } = useCities(searchCities);

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
    mutationFn: (data: z.infer<typeof HotelSchema.Update>) => updateHotel(hotel.id, data),
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
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Hotel - <b>{hotel.name}</b>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
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

            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
