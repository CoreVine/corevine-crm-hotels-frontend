import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { getTrashedPaymentTypes } from "../_helpers/actions"
import { PaymentTypesTable } from "../_components/table"

export const metadata: Metadata = {
  title: "Archived Payment types"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getTrashedPaymentTypes(search, page)

  return (
    <div>
      <PageTitle label='Archived Payment types'>
        <GoBack />
      </PageTitle>

      <section>
        <SearchFilter />
      </section>

      <section className='mt-4'>
        <PaymentTypesTable paymentTypes={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
