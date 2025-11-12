import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { InvoicesTable } from "./_components/table"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Plus } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { getInvoices } from "./_helpers/actions"
import { routes } from "@/lib/route"

export const metadata: Metadata = {
  title: "Invoices"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function InvoicesPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getInvoices(sp)

  return (
    <div>
      <PageTitle label='Invoices'>
        <LinkBtn href={routes.invoices.create} variant='outline' icon={Plus}>
          Create
        </LinkBtn>
        <LinkBtn href={routes.invoices.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <SearchFilter />
      <section className='mt-4'>
        <InvoicesTable invoices={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
