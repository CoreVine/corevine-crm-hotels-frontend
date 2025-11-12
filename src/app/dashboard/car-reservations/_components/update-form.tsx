"use client";

import { useMutation } from "@tanstack/react-query";
import { useDrivers } from "../../drivers/_helpers/hooks";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useClients } from "@/app/dashboard/clients/_helpers/hooks";

import { zodResolver } from "@hookform/resolvers/zod";
import { showResponse } from "@/lib/utils";
import { carState } from "@/lib/type-lists";

import { LoadingButton } from "@/components/common/loading-button";
import { CarReservationSchema } from "@/schema";
import { InputField } from "@/components/common/form/input-field";
import { Form } from "@/components/ui/form";
import { CarIcon, ClockIcon, Plus, Save, UserIcon } from "lucide-react";
import { CarReservation } from "@/types/models";
import { GoBack } from "../../_components/go-back";
import { UpdateCarReservationData, updateCarReservation } from "../_helpers/actions";
import { SelectField } from "@/components/common/form/select-field";
import { SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchableData } from "@/components/common/form/searchable-data";

type Props = {
  reservation: CarReservation;
};

export const UpdateCarReservationForm = ({ reservation }: Props) => {
  const form = useForm({
    resolver: zodResolver(CarReservationSchema.Update),
    defaultValues: {
      driver_id: reservation?.driver_id,
      client_id: reservation?.reservation?.client_id,
      airline: reservation?.airline,
      meeting_point: reservation?.meeting_point,
      price: reservation?.price,
      status: reservation?.status,
      coming_from: reservation?.coming_from,
      arrival_date: reservation?.arrival_date,
      arrival_time: reservation?.arrival_time,
      comments: reservation?.comments
    }
  });

  const [searchDrivers, setSearchDriversValue] = useState(reservation.driver.name);
  const [searchClients, setSearchClientsValue] = useState(reservation.reservation.client.name);

  const [debouncedSearchDrivers] = useDebounce(searchDrivers, 500);
  const [debouncedSearchClients] = useDebounce(searchClients, 500);

  const { modifiedDrivers, isDriversLoading, isDriversRefetching } =
    useDrivers(debouncedSearchDrivers);
  const { modifiedClients, isClientsLoading, isClientsRefetching } =
    useClients(debouncedSearchClients);

  const mutation = useMutation({
    mutationFn: (data: UpdateCarReservationData) => updateCarReservation(reservation.id, data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    console.log({
      formValues: form.getValues()
    });
    mutation.mutate(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <Tabs defaultValue='select-client'>
          <TabsList>
            <TabsTrigger value='select-client'>Select Client</TabsTrigger>
            <TabsTrigger value='new-client'>New Client</TabsTrigger>
          </TabsList>

          <section className='space-y-4 border p-4 rounded-md shadow'>
            <h4 className='flex gap-2 pb-2 mb-4 border-b font-semibold items-center'>
              <div className='p-2 rounded-md bg-primary text-white'>
                <UserIcon className='size-5' />
              </div>
              Client Details
            </h4>
            <TabsContent value='new-client'>
              <div className='grid xl:grid-cols-2 gap-4'>
                <InputField
                  name='client_name'
                  label='Client Name'
                  placeholder='Client Name'
                  control={form.control}
                />
                <InputField name='email' label='Email' placeholder='Email' control={form.control} />
                <InputField name='phone' label='Phone' placeholder='Phone' control={form.control} />
                <InputField
                  name='nationality'
                  label='Nationality'
                  placeholder='Nationality'
                  control={form.control}
                />
              </div>
            </TabsContent>

            <TabsContent value='select-client'>
              <SearchableData
                label='Client'
                search={searchClients}
                setSearch={setSearchClientsValue}
                data={modifiedClients}
                defaultSelected={reservation.reservation.client.name}
                loading={isClientsRefetching || isClientsLoading}
                form={form}
                formItem='client_id'
              />
            </TabsContent>
          </section>
        </Tabs>

        <section className='space-y-4 border p-4 rounded-md shadow'>
          <h4 className='flex gap-2 pb-2 mb-4 border-b font-semibold items-center'>
            <div className='p-2 rounded-md bg-primary text-white'>
              <CarIcon className='size-5' />
            </div>
            Reservations Details
          </h4>
          <div className='grid xl:grid-cols-2 gap-4'>
            <InputField
              name='airline'
              label='Airline'
              placeholder='Airline'
              control={form.control}
            />

            <InputField
              name='coming_from'
              label='Coming From'
              placeholder='Coming From'
              control={form.control}
            />

            <InputField
              name='meeting_point'
              label='Meeting Point'
              placeholder='Meeting Point'
              control={form.control}
            />

            <InputField
              name='price'
              label='Price'
              placeholder='Price'
              control={form.control}
              valueAsNumber
            />

            <SelectField
              name='status'
              label='Status'
              control={form.control}
              defaultValue={reservation.status}
            >
              {carState.map((state, idx) => (
                <SelectItem key={`state-${state.name}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectField>

            <SearchableData
              label='Driver'
              search={searchDrivers}
              setSearch={setSearchDriversValue}
              data={modifiedDrivers}
              defaultSelected={reservation.driver.name}
              loading={isDriversRefetching || isDriversLoading}
              form={form}
              formItem='driver_id'
            />
          </div>
        </section>

        <section className='space-y-4 border p-4 rounded-md shadow'>
          <h4 className='flex gap-2 pb-2 mb-4 border-b font-semibold items-center'>
            <div className='p-2 rounded-md bg-primary text-white'>
              <ClockIcon className='size-5' />
            </div>
            Time & Date Details
          </h4>
          <div className='grid xl:grid-cols-2 gap-4'>
            <InputField
              name='arrival_date'
              label='Arrival Date'
              placeholder='Arrival Date'
              type='date'
              control={form.control}
            />
            <InputField
              name='arrival_time'
              label='Arrival Time'
              placeholder='Arrival Time'
              type='time'
              control={form.control}
            />
          </div>

          <InputField
            name='comments'
            label='Comments'
            placeholder='Comments'
            isTextarea
            control={form.control}
          />
        </section>

        <div className='flex gap-2'>
          <LoadingButton loading={mutation.isPending} type='submit' icon={Save}>
            Update
          </LoadingButton>
          <GoBack />
        </div>
      </form>
    </Form>
  );
};
