import { getCarReservationLog } from "../../_helpers/actions"
import { notFound } from "next/navigation"

import { LogChangesPage } from "../../_components/log-changes-page"
import { PageTitle } from "@/app/dashboard/_components/title"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Log Details"
}

type Props = {
  params: Promise<{ id: string; logId: string }>
}

export default async function ViewHistoryDetails({ params }: Props) {
  const { id, logId } = await params
  const log = await getCarReservationLog(+id, +logId)
  if (!log) return notFound()

  const pageTitle = (
    <span>
      Log Details - Car Reservation <b>#{log.subject_id}</b>
    </span>
  )

  return (
    <div>
      <PageTitle label={pageTitle} />
      <LogChangesPage log={log} />
    </div>
  )
}
