import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { VouchersTable } from "../_components/table"

import { getTrashedVouchers } from "../_helpers/actions"

export const metadata: Metadata = {
  title: "Archived Hotel Reservations"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getTrashedVouchers(sp)

  return (
    <div>
      <PageTitle label='Archived Hotel Reservations'>
        <GoBack />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <VouchersTable vouchers={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
