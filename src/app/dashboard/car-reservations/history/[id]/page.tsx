import { notFound } from "next/navigation"
import { Metadata } from "next"
import { PaginationLinks } from "@/app/dashboard/_components/pagination"
import { PageTitle } from "@/app/dashboard/_components/title"
import { getCarReservationHistory } from "../_helpers/actions"
import { CarReservationLogsTable } from "../_components/table"

export const metadata: Metadata = {
  title: `Car Reservation History`
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function CarReservationsHistory({ params }: Props) {
  const { id } = await params

  const history = await getCarReservationHistory(+id)

  if (isNaN(+id)) return notFound()

  return (
    <div>
      <PageTitle label='History' />
      <CarReservationLogsTable logs={history.data} />
      <PaginationLinks pagination={history} />
    </div>
  )
}
