import { getHotel, getHotelAgings } from "../../_helpers/actions"

import { CreateHotelAgingModal } from "../../_components/aging/create-modal"
import { PaginationLinks } from "@/app/dashboard/_components/pagination"
import { HotelAgingTable } from "../../_components/aging/table"
import { TSearchParams } from "@/types"
import { PageTitle } from "@/app/dashboard/_components/title"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Hotel Aging"
}

type Props = {
  params: Promise<{ hotelId: string }>
  searchParams: Promise<TSearchParams>
}

export default async function HotelIdAging({ searchParams, params }: Props) {
  const { hotelId } = await params

  const hotel = await getHotel(+hotelId)

  const sp = await searchParams
  const data = await getHotelAgings(+hotelId, sp)

  if (!hotel) return notFound()

  const pageTitle = (
    <span className='flex gap-2'>
      <span>Hotel</span>
      <b>
        {hotel.name} # {hotel.id}
      </b>
    </span>
  )

  return (
    <div>
      <PageTitle label={pageTitle}>
        <CreateHotelAgingModal hotelId={+hotelId} />
      </PageTitle>

      <section className='mt-4'>
        <HotelAgingTable hotelId={+hotelId} data={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
