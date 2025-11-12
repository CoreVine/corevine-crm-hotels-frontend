import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Plus, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { AirportReservationsTable } from "./_components/table"
import { getAirportReservations } from "./_helpers/actions"
import { AirportStatusFilter } from "./_components/status-filter"

export const metadata: Metadata = {
  title: "Airport Reservations"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function CarReservationsPage({ searchParams }: Props) {
  const { search, page, status } = await searchParams

  const data = await getAirportReservations(search, page, status)

  return (
    <div className='w-full min-w-full'>
      <PageTitle label='Airport Reservations'>
        <LinkBtn href={routes.airportReservations.create} icon={Plus} variant='outline'>
          New Airport Reservation
        </LinkBtn>
        <LinkBtn
          href={routes.airportReservations.trashed}
          icon={ArchiveIcon}
          variant='outline-warning'
        >
          Archived
        </LinkBtn>
      </PageTitle>
      <div className='grid grid-cols-2 gap-4'>
        <SearchFilter />
        <AirportStatusFilter />
      </div>
      <section className='mt-4'>
        <AirportReservationsTable airportReservations={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
