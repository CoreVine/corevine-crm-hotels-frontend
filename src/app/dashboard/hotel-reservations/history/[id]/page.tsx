import { getReservationHistory } from "../_helpers/actions"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { HotelReservationLogsTable } from "../_components/table"
import { PaginationLinks } from "@/app/dashboard/_components/pagination"
import { PageTitle } from "@/app/dashboard/_components/title"

export const metadata: Metadata = {
  title: `Hotel Reservation History`
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function HotelReservationsHistory({ params }: Props) {
  const { id } = await params

  const history = await getReservationHistory(+id)

  if (isNaN(+id)) return notFound()

  return (
    <div>
      <PageTitle label='History' />
      <HotelReservationLogsTable logs={history.data} />
      <PaginationLinks pagination={history} />
    </div>
  )
}
