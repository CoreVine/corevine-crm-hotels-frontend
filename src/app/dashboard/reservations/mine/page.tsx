import { HotelReservationsAllFilters } from "../_components/all-filters"
import { HotelReservationsTable } from "../../reservations/_components/table"
import { PaginationLinks } from "../../_components/pagination"
import { PageTitle } from "../../_components/title"
import { LinkBtn } from "@/components/common/button-link"
import { Plus } from "lucide-react"

import { routes } from "@/lib/route"
import { getMyHotelReservations } from "../../reservations/_helpers/actions"
import { capitalize } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Reservations"
}

type Props = {
  searchParams: Promise<Record<string, string>>
}

export default async function ReservationsPage({ searchParams }: Props) {
  const params = await searchParams
  const data = await getMyHotelReservations(params)

  return (
    <div className='w-full min-w-full'>
      <PageTitle label='My Reservations'>
        <LinkBtn href={routes.reservations.create} icon={Plus} variant='outline'>
          New Reservation
        </LinkBtn>
      </PageTitle>
      <HotelReservationsAllFilters />
      <section className='mt-4'>
        <HotelReservationsTable data={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
