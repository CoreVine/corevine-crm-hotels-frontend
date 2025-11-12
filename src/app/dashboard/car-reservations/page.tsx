import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Plus, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { getCarReservations } from "./_helpers/actions"
import { CarReservationsTable } from "./_components/table"
import { CarStatusFilter } from "./_components/status-filter"

export const metadata: Metadata = {
  title: "Car Movements"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function CarReservationsPage({ searchParams }: Props) {
  const { search, page, status } = await searchParams

  const data = await getCarReservations(search, page, status)

  return (
    <div className='w-full min-w-full'>
      <PageTitle label='Car Movements'>
        <LinkBtn href={routes.carReservations.create} icon={Plus} variant='outline'>
          New Car Movement
        </LinkBtn>
        <LinkBtn href={routes.carReservations.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <div className='grid grid-cols-2 gap-4 items-center'>
        <SearchFilter />
        <CarStatusFilter />
      </div>
      <section className='mt-4'>
        <CarReservationsTable carReservations={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
