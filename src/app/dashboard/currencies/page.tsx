import { CreateCurrencyModal } from "./_components/create"
import { PaginationLinks } from "../_components/pagination"
import { CurrenciesTable } from "./_components/table"
import { TSearchParams } from "@/types"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon } from "lucide-react"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { LinkBtn } from "@/components/common/button-link"

import { getCurrencies } from "./_helpers/actions"
import { redirect } from "next/navigation"
import { isAdmin } from "@/actions/auth"
import { routes } from "@/lib/route"

type Props = {
  searchParams: Promise<TSearchParams>
}

export const metadata: Metadata = {
  title: "Currencies"
}

export default async function CurrenciesPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getCurrencies(sp)

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Currencies'>
        <CreateCurrencyModal />
        <LinkBtn href={routes.currencies.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <CurrenciesTable currencies={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
