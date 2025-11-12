"use client"

import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { CreateReservationData, createReservation } from "../../_helpers/actions"
import { formatDateForMySQL, showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { ReservationSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { ShowContent } from "./show-content"
import { AirportForm } from "./airport"
import { ClientForm } from "./client"
import { ZodErrors } from "@/components/common/zod-errors"
import { HotelForm } from "./hotel"
import { CarForm } from "./car"
import { GoBack } from "@/app/dashboard/_components/go-back"
import { Form } from "@/components/ui/form"

export const CreateReservationForm = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(ReservationSchema.Create),
    defaultValues: {
      hasClient: true,
      hotel: {
        status: "new"
      }
    }
  })

  const [hasClient, setHasClient] = useState(true)
  const [includeAirport, setIncludeAirport] = useState(false)
  const [includeCar, setIncludeCar] = useState(false)

  const [checkIn, setCheckIn] = useState(new Date())
  const [checkOut, setCheckOut] = useState(new Date())
  const [daysDifference, setDaysDifference] = useState(0)
  const [priceType, setPriceType] = useState("static")

  const mutation = useMutation({
    mutationFn: ({ data, hasClient }: { data: CreateReservationData; hasClient: boolean }) => createReservation(data, hasClient),
    onSuccess: (data) =>
      showResponse(data, () => {
        console.log("success data", data)
        if (data.status === 201) {
          form.reset()
          router.refresh()
        }
      }),
    onError: (error: any) => showResponse(error)
  })

  const onSubmit = () => {
    console.log("onSubmit", form.getValues())
    mutation.mutate({
      data: form.getValues(),
      hasClient
    })
  }

  useEffect(() => {
    form.setValue("hotel.check_in", formatDateForMySQL(checkIn) as any)
    form.setValue("hotel.check_out", formatDateForMySQL(checkOut) as any)
  }, [checkIn, checkOut])

  useEffect(() => {
    form.setValue("hotel.price_type", priceType as "static" | "dynamic")
  }, [priceType])

  return (
    <div>
      <Form {...form}>
        <ZodErrors errors={form.formState.errors} />

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Client Information Section */}
          <ClientForm hasClient={hasClient} setHasClient={setHasClient} form={form} />

          {/* Hotel Information Section */}
          <HotelForm form={form} priceType={priceType} setPriceType={setPriceType} daysDifference={daysDifference} setDaysDifference={setDaysDifference} checkIn={checkIn} setCheckIn={setCheckIn} checkOut={checkOut} setCheckOut={setCheckOut} />

          {/* Airport Information Section */}
          <ShowContent label='Include Airport Information' include={includeAirport} setInclude={setIncludeAirport} />

          {includeAirport && <AirportForm form={form} />}

          {/* Car Information Section */}
          <ShowContent label='Include Car Information' include={includeCar} setInclude={setIncludeCar} />

          {includeCar && <CarForm form={form} />}

          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit'>
              Submit Reservation
            </LoadingButton>
            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  )
}
