"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useClients } from "../../clients/_helpers/hooks";

import { airportState } from "@/lib/type-lists";
import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { routes } from "@/lib/route";

import { UpdateAirportReservationData, updateAirportReservation } from "../_helpers/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarIcon, ClockIcon, MoreHorizontal, PlaneIcon, Plus, Save, UserIcon } from "lucide-react";
import { AirportReservationSchema } from "@/schema";
import { AirportReservation } from "@/types/models";
import { SearchableData } from "@/components/common/form/searchable-data";
import { LoadingButton } from "@/components/common/loading-button";
import { SelectField } from "@/components/common/form/select-field";
import { InputField } from "@/components/common/form/input-field";
import { SelectItem } from "@/components/ui/select";
import { GoBack } from "../../_components/go-back";
import { Form } from "@/components/ui/form";

export const UpdateAirportReservationForm = ({
  reservation
}: {
  reservation: AirportReservation;
}) => {
  const form = useForm({
    resolver: zodResolver(AirportReservationSchema.Update),
    defaultValues: {
      client_id: reservation.reservation.client.id,
      runner: reservation.runner,
      airport_name: reservation.airport_name,
      coming_from: reservation.coming_from,
      airline: reservation.airline,
      flight_number: reservation.flight_number,
      passenger_count: reservation.passenger_count,
      persons_count: reservation.persons_count,
      statment: reservation.statment,
      price: reservation.price,
      status: reservation.status,
      arrival_date: reservation.arrival_date,
      arrival_time: reservation.arrival_time
    }
  });

  const router = useRouter();

  const [hasClient, setHasClient] = useState(true);

  const [searchClients, setSearchClientsValue] = useState(reservation.reservation.client.name);
  const [debouncedSearchClients] = useDebounce(searchClients, 500);
  const { modifiedClients, isClientsLoading, isClientsRefetching } =
    useClients(debouncedSearchClients);

  const mutation = useMutation({
    mutationFn: ({ data, hasClient }: { data: UpdateAirportReservationData; hasClient: boolean }) =>
      updateAirportReservation(reservation.id, data, hasClient),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          form.reset();
          router.push(routes.airportReservations.index);
        }
      })
  });

  const handleSubmit = () => {
    mutation.mutate({
      data: form.getValues(),
      hasClient
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <Tabs defaultValue='select-client'>
          <TabsList>
            <TabsTrigger onClick={() => setHasClient(true)} value='select-client'>
              Select Client
            </TabsTrigger>
            <TabsTrigger onClick={() => setHasClient(false)} value='new-client'>
              New Client
            </TabsTrigger>
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
              <PlaneIcon className='size-5' />
            </div>
            Reservations Details
          </h4>
          <div className='grid xl:grid-cols-2 gap-4'>
            <InputField
              name='airport_name'
              label='Airport Name'
              placeholder='Airport Name'
              control={form.control}
            />
            <InputField
              name='airline'
              label='Airline'
              placeholder='Airline'
              control={form.control}
            />

            <InputField name='runner' label='Runner' placeholder='Runner' control={form.control} />
            <InputField
              name='flight_number'
              label='Flight No.'
              placeholder='Flight No.'
              control={form.control}
            />

            <InputField
              name='passenger_count'
              label='Passengers count'
              placeholder='Passengers count'
              control={form.control}
              valueAsNumber
            />

            <InputField
              name='persons_count'
              label='Persons Count'
              placeholder='Persons Count'
              control={form.control}
              valueAsNumber
            />

            <InputField
              name='statment'
              label='Statement'
              placeholder='Statement'
              control={form.control}
              valueAsNumber
            />

            <InputField
              name='price'
              label='Price'
              placeholder='Price'
              control={form.control}
              valueAsNumber
            />
          </div>
        </section>

        <section className='space-y-4 border p-4 rounded-md shadow'>
          <h4 className='flex gap-2 pb-2 mb-4 border-b font-semibold items-center'>
            <div className='p-2 rounded-md bg-primary text-white'>
              <ClockIcon className='size-5' />
            </div>
            Additional Details
          </h4>
          <div className='grid xl:grid-cols-2 gap-4'>
            <InputField
              name='coming_from'
              label='Coming from'
              placeholder='Coming from'
              control={form.control}
            />
            <SelectField
              name='status'
              label='Status'
              control={form.control}
              defaultValue={reservation.status}
            >
              {airportState.map((state, idx) => (
                <SelectItem key={`state-${state.name}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectField>

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
