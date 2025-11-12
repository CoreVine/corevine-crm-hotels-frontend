import { HotelReservationLogsTable } from "./_components/table"
import { PaginationLinks } from "../../_components/pagination"
import { TSearchParams } from "@/types"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"

import { getAllLogs } from "./_helpers/actions"

export const metadata: Metadata = {
  title: `Hotel Reservation History`
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function HotelReservationsHistory({ searchParams }: Props) {
  const sp = await searchParams
  const logs = await getAllLogs(sp)

  console.log("logs", logs)

  return (
    <div>
      <PageTitle label='History' />
      <HotelReservationLogsTable logs={logs.data} />
      <PaginationLinks pagination={logs} />
    </div>
  )
}
