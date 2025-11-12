import { notFound } from "next/navigation"
import { getAirportReservationLog } from "../../_helpers/actions"
import { PageTitle } from "@/app/dashboard/_components/title"
import { LogChangesPage } from "../../_components/log-changes-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Log Details"
}

type Props = {
  params: Promise<{ id: string; logId: string }>
}

export default async function ViewHistoryDetails({ params }: Props) {
  const { id, logId } = await params

  const log = await getAirportReservationLog(+id, +logId)
  if (!log) return notFound()

  console.log("log", log)

  const pageTitle = (
    <span>
      Log Details - Airport Reservation <b>#{log.subject_id}</b>
    </span>
  )

  return (
    <div>
      <PageTitle label={pageTitle} />
      <LogChangesPage log={log} />
    </div>
  )
}
