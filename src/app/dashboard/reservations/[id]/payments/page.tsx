import { getReservationPayments, getReservationPaymentsStats } from "../../_helpers/actions"

import { ReservationPaymentsTable } from "./_components/table"
import { PaginationLinks } from "../../../_components/pagination"
import { TSearchParams } from "@/types"
import { PageTitle } from "../../../_components/title"
import { Metadata } from "next"
import { CreateReservationPaymentModal } from "./_components/create-modal"
import { notFound } from "next/navigation"
import { getUser } from "@/actions/auth"
import { ReservationPaymentStats } from "./_components/stats"

export const metadata: Metadata = {
  title: "Reservation Payments"
}

type Props = {
  searchParams: Promise<TSearchParams>
  params: Promise<{ id: string }>
}

export default async function Payments({ params, searchParams }: Props) {
  const { id } = await params

  const sp = await searchParams
  const data = await getReservationPayments(+id, sp)
  const stats = await getReservationPaymentsStats(+id, sp)
  const user = await getUser()

  if (isNaN(+id)) return notFound()
  if (!user) return notFound()
  if (!["finance", "admin"].includes(user?.role)) return notFound()

  const pageTitle = (
    <span>
      Reservation Finance Details - <b>{id}</b>
    </span>
  )

  return (
    <div className='space-y-4'>
      <PageTitle label={pageTitle}>
        <CreateReservationPaymentModal reservationId={+id} />
      </PageTitle>
      <ReservationPaymentsTable reservationId={+id} data={data.data} />
      <ReservationPaymentStats stats={stats} />
      <PaginationLinks pagination={data} />
    </div>
  )
}
