import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PaginationLinks } from "@/app/dashboard/_components/pagination"
import { PageTitle } from "@/app/dashboard/_components/title"
import { getAirportReservationHistory, getAirportReservationLog } from "../_helpers/actions"
import { AirportReservationLogsTable } from "../_components/table"

export const metadata: Metadata = {
  title: `Airport Reservation History`
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function AirportReservationsHistory({ params }: Props) {
  const { id } = await params

  const history = await getAirportReservationHistory(+id)

  if (isNaN(+id)) return notFound()

  return (
    <div>
      <PageTitle label='History' />
      <AirportReservationLogsTable logs={history.data} />
      <PaginationLinks pagination={history} />
    </div>
  )
}
