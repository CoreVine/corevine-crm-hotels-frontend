import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"
import { RoomsTable } from "./_components/table"

import { routes } from "@/lib/route"
import { getRooms } from "./_helpers/actions"
import { CreateRoomModal } from "./_components/create"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Rooms"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function RoomsPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const data = await getRooms(search, page)
  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Rooms'>
        <CreateRoomModal />
        <LinkBtn href={routes.rooms.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
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
