"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { showResponse } from "@/lib/utils";

import { ReservationSchema } from "@/schema";
import { Form } from "@/components/ui/form";
import { GoBack } from "@/app/dashboard/_components/go-back";
import { HotelForm } from "./hotel";
import { ClientForm } from "./client";
import { AirportForm } from "./airport";
import { CarForm } from "./car";
import { ShowContent } from "./show-content";
import { CreateReservationData, updateReservation } from "../../_helpers/actions";
import { LoadingButton } from "@/components/common/loading-button";
import { Reservation } from "@/types/models";
import { SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UpdateReservationForm = ({ reservation }: { reservation: Reservation }) => {
  const [hasClient, setHasClient] = useState(true);

  const form = useForm({
    resolver: zodResolver(
      hasClient ? ReservationSchema.CreateWithoutClient : ReservationSchema.Create
    ),
    defaultValues: {
      hasClient: true,
      hotel: reservation?.hotel,
      car: reservation?.car,
      airport: reservation?.airport,
      client: {
        client_id: reservation.client_id
      }
    }
  });

  const [includeAirport, setIncludeAirport] = useState(reservation.has_airport);
  const [includeCar, setIncludeCar] = useState(reservation.has_car);

  const mutation = useMutation({
    mutationFn: ({ data, hasClient }: { data: CreateReservationData; hasClient: boolean }) =>
      updateReservation(reservation.id, data, hasClient),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          form.reset();
        }
      }),
    onError: (error: any) => showResponse(error)
  });

  const onSubmit = () => {
    mutation.mutate({
      data: form.getValues(),
      hasClient
    });
  };

  const handleData = () => {
    if (!includeAirport) form.setValue("airport", null);
    if (!includeCar) form.setValue("car", null);
  };

  useEffect(() => {
    handleData();
  }, [includeAirport, includeCar]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Client Information Section */}
          <ClientForm
            defaultClient={reservation.client.name}
            hasClient={hasClient}
            setHasClient={setHasClient}
            form={form}
            client={reservation.client}
          />

          {/* Hotel Information Section */}
          <HotelForm
            form={form}
            hotel={reservation.hotel?.hotel?.name}
            room={reservation.hotel?.room?.room_type}
            rate={reservation.hotel?.rate?.name}
            paymentType={reservation.hotel?.payment_type?.name}
            city={reservation.hotel?.city?.name}
            company={reservation.hotel?.company?.name}
            meal={reservation.hotel?.meal?.meal_type}
            defaultStatus={reservation.hotel?.status}
          />

          {/* Airport Information Section */}
          <ShowContent
            label='Include Airport Information'
            include={includeAirport}
            setInclude={setIncludeAirport}
          />

          {includeAirport && (
            <AirportForm defaultStatus={reservation.airport?.status} form={form} />
          )}

          {/* Car Information Section */}
          <ShowContent
            label='Include Car Information'
            include={includeCar}
            setInclude={setIncludeCar}
          />

          {includeCar && (
            <CarForm
              driver={reservation.car?.driver?.name}
              defaultStatus={reservation?.car?.status}
              form={form}
            />
          )}

          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit' icon={SaveAll}>
              Save Reservation
            </LoadingButton>

            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  );
};
