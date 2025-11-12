import { PaginationLinks } from "../../_components/pagination"
import { TSearchParams } from "@/types"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"

import { getAllAirportReservationLogs } from "./_helpers/actions"
import { AirportReservationLogsTable } from "./_components/table"

export const metadata: Metadata = {
  title: `Hotel Reservation History`
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function AirportReservationsHistory({ searchParams }: Props) {
  const sp = await searchParams
  const logs = await getAllAirportReservationLogs(sp)

  console.log("logs", logs)

  return (
    <div>
      <PageTitle label='Aiport History' />
      <AirportReservationLogsTable logs={logs.data} />
      <PaginationLinks pagination={logs} />
    </div>
  )
}
