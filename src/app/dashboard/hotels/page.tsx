import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { getHotels } from "./_helpers/actions"
import { CreateHotelModal } from "./_components/create"
import { HotelsTable } from "./_components/table"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Hotels"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const data = await getHotels(search, page)
  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Hotels'>
        <CreateHotelModal />
        <LinkBtn href={routes.hotels.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <HotelsTable hotels={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
