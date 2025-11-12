import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { InvoicesTable } from "../_components/table"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"

import { getTrashedInvoices } from "../_helpers/actions"

export const metadata: Metadata = {
  title: "Trashed Invoices"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getTrashedInvoices(sp)

  return (
    <div>
      <PageTitle label='Trashed Invoices'>
        <GoBack />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <InvoicesTable invoices={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
