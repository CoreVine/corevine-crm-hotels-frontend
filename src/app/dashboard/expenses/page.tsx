import { DefaultSearchParams } from "@/types"
import { CreateExpenseModal } from "./_components/create-modal"
import { PaginationLinks } from "../_components/pagination"
import { ExpensesTable } from "./_components/table"
import { SearchFilter } from "../_components/search"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"

import { getExpenses } from "./_helpers/actions"

export const metadata: Metadata = {
  title: "Expenses"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getExpenses(sp)
  // if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Expenses'>
        <CreateExpenseModal />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <ExpensesTable data={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
