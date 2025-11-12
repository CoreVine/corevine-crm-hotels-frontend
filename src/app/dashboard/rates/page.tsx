import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { getRates } from "./_helpers/actions"
import { CreateRateModal } from "./_components/create"
import { RatesTable } from "./_components/table"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Rates"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function RatesPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const data = await getRates(search, page)

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Rates'>
        <CreateRateModal />
        <LinkBtn href={routes.rates.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <section>
        <SearchFilter />
      </section>
      <section className='mt-4'>
        <RatesTable rates={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
