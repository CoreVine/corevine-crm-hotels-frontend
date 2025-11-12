import { getCar, getExternalCarLogs, getInternalCarLogs } from "../_helpers/actions"
import { notFound } from "next/navigation"
import { PageTitle } from "../../_components/title"
import { CreateCarInternalLogModal } from "../_components/internal-logs/create-internal-log"
import { InternalCarLogsTable } from "../_components/internal-logs/internal-logs-table"
import { PaginationLinks } from "../../_components/pagination"
import { TSearchParams } from "@/types"
import { CreateCarExternalLogModal } from "../_components/external-logs/create-external-log"
import { ExternalCarLogsTable } from "../_components/external-logs/external-logs-table"

export const metadata = {
  title: "Car Details"
}

type Props = {
  params: Promise<{ carId: number }>
  searchParams: Promise<TSearchParams>
}

export default async function ViewCarPage({ params, searchParams }: Props) {
  const { carId } = await params

  const sp = await searchParams
  const car = await getCar(+carId)
  const internalLogs = await getInternalCarLogs(+carId, sp)
  const externalLogs = await getExternalCarLogs(+carId, sp)

  if (!car) return notFound()

  const pageTitle = (
    <span>
      Car - {car.make} {car.model} ({car.year}) <b className='text-xs text-muted-foreground capitalize'>{car.type}</b>
    </span>
  )

  return (
    <div>
      <PageTitle label={pageTitle}>{car.type == "internal" ? <CreateCarInternalLogModal car={car} /> : <CreateCarExternalLogModal car={car} />}</PageTitle>

      {car.type == "internal" ? <InternalCarLogsTable logs={internalLogs.data} /> : <ExternalCarLogsTable logs={externalLogs.data} />}
      {car.type == "internal" ? <PaginationLinks pagination={internalLogs} /> : <PaginationLinks pagination={externalLogs} />}
    </div>
  )
}
