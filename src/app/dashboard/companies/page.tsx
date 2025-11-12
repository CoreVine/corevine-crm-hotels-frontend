import { CreateCompanyModal } from "./_components/create"
import { CompaniesTable } from "./_components/table"
import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { getCompanies } from "./_helpers/actions"
import { routes } from "@/lib/route"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Companies"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function CompaniesPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const data = await getCompanies(search, page)
  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Companies'>
        <CreateCompanyModal />
        <LinkBtn href={routes.companies.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <section>
        <SearchFilter />
      </section>
      <section className='mt-4'>
        <CompaniesTable companies={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
