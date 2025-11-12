import { HotelReservationsAllFilters } from "./_components/all-filters"
import { HotelReservationsTable } from "../reservations/_components/table"
import { ArchiveIcon, Plus } from "lucide-react"
import { PaginationLinks } from "../_components/pagination"
import { TSearchParams } from "@/types"
import { PageTitle } from "../_components/title"
import { LinkBtn } from "@/components/common/button-link"

import { getHotelReservations } from "../reservations/_helpers/actions"
import { capitalize } from "@/lib/utils"
import { routes } from "@/lib/route"

type Props = {
  searchParams: Promise<TSearchParams>
}

export async function generateMetadata({ searchParams }: Props) {
  const { status } = await searchParams

  return {
    title: "Reservations" + (status ? ` - ${capitalize(status as string)}` : ""),
    description: "Manage reservations",
    searchParams
  }
}

export default async function ReservationsPage({ searchParams }: Props) {
  const { status } = await searchParams

  const sp = await searchParams
  const data = await getHotelReservations(sp)

  return (
    <div className='w-full min-w-full'>
      <PageTitle label={`Filter Reservations`}>
        <LinkBtn href={routes.reservations.create} icon={Plus} variant='outline'>
          New Reservation
        </LinkBtn>
        <LinkBtn href={routes.reservations.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>

      <HotelReservationsAllFilters />

      <section className='mt-4'>
        <HotelReservationsTable status={status} data={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
