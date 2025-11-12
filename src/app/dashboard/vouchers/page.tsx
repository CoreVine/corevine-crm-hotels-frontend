import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { ArchiveIcon, Plus } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"
import { VouchersTable } from "./_components/table"

import { routes } from "@/lib/route"
import { getVouchers } from "./_helpers/actions"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"

type Props = {
  searchParams: Promise<Record<string, string>>
}

export const metadata: Metadata = {
  title: "Vouchers"
}

export default async function VouchersPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getVouchers(sp)

  return (
    <div className='w-full min-w-full'>
      <PageTitle label='Vouchers'>
        <LinkBtn href={routes.vouchers.create} icon={Plus} variant='outline'>
          New Voucher
        </LinkBtn>
        <LinkBtn href={routes.vouchers.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Trashed
        </LinkBtn>
      </PageTitle>
      <SearchFilter />
      <section className='mt-4'>
        <VouchersTable vouchers={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
