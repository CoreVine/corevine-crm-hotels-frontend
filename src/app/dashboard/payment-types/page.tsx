import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { PaymentTypesTable } from "./_components/table"
import { getPaymentTypes } from "./_helpers/actions"
import { CreatePaymentTypeModal } from "./_components/create"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Payment Types"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getPaymentTypes(search, page)

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Payment Types'>
        <CreatePaymentTypeModal />
        <LinkBtn href={routes.paymentTypes.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
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
