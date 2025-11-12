import { PaginationLinks } from "../../_components/pagination"
import { TSearchParams } from "@/types"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"

import { getAllCarReservationLogs } from "./_helpers/actions"
import { CarReservationLogsTable } from "./_components/table"

export const metadata: Metadata = {
  title: `Car Reservation History`
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function AirportReservationsHistory({ searchParams }: Props) {
  const sp = await searchParams
  const logs = await getAllCarReservationLogs(sp)

  return (
    <div>
      <PageTitle label='Car History' />
      <CarReservationLogsTable logs={logs.data} />
      <PaginationLinks pagination={logs} />
    </div>
  )
}
