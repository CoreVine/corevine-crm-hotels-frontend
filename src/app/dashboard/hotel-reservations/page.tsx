import { getRoomRequests } from "../reservations/_helpers/actions"
import { routes } from "@/lib/route"

import { HotelReservationsAllFilters } from "../reservations/_components/all-filters"
import { HotelReservationsTable } from "../reservations/_components/table"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { LinkBtn } from "@/components/common/button-link"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Room Requests"
}

type Props = {
  searchParams: Promise<Record<string, string>>
}

export default async function HotelReservationsPage({ searchParams }: Props) {
  const sp = await searchParams
  const reservations = await getRoomRequests(sp)

  const { status } = sp

  return (
    <div className='w-full min-w-full'>
      <PageTitle label={`Filter Reservations`}>
        <LinkBtn href={routes.reservations.create} icon={Plus} variant='outline'>
          New Reservation
        </LinkBtn>
      </PageTitle>
      <HotelReservationsAllFilters />
      <section className='mt-4'>
        <HotelReservationsTable label='Room Requests' status={status} data={reservations.data} />
        <PaginationLinks pagination={reservations} />
      </section>
    </div>
  )
}
