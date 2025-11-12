import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { getTrashedRooms } from "../_helpers/actions"
import { RoomsTable } from "../_components/table"

export const metadata: Metadata = {
  title: "Archived Rooms"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function TrashedRoomsPaeg({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getTrashedRooms(search, page)

  return (
    <div>
      <PageTitle label='Archived Rooms'>
        <GoBack />
      </PageTitle>

      <section>
        <SearchFilter />
      </section>

      <section className='mt-4'>
        <RoomsTable rooms={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
