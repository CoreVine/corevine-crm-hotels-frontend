import { BedIcon, Plane, CheckCheck, CarIcon } from "lucide-react"
import { SmallHotelReservationsTable } from "./reservations/_components/small-table"
import { DashboardStatCard } from "./_components/dashboard/stat-card"
import { PageTitle } from "./_components/title"
import { Metadata } from "next"

import { getSmallHotelReservations } from "./reservations/_helpers/actions"
import { getDashboardStats } from "@/actions/dashboard"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Page"
}

export default async function Home() {
  const newReservationsPromise = getSmallHotelReservations({ status: "new" })
  const cancelledReservationsPromise = getSmallHotelReservations({ status: "cancelled" })
  const doneReservationsPromise = getSmallHotelReservations({ status: "done" })
  const inRevisionReservationsPromise = getSmallHotelReservations({ status: "in_revision" })
  const dashboardStatsPromise = getDashboardStats()

  const [newReservations, cancelledReservations, doneReservations, inRevisionReservations, dashboardStats] = await Promise.all([newReservationsPromise, cancelledReservationsPromise, doneReservationsPromise, inRevisionReservationsPromise, dashboardStatsPromise])

  const stats = [
    {
      label: "Rooms",
      icon: BedIcon,
      number: dashboardStats.rooms.today + dashboardStats.rooms.tomorrow,
      color: "blue",
      additionalItems: [
        { label: "Today's", value: dashboardStats.rooms.today },
        { label: "Tomorrow", value: dashboardStats.rooms.tomorrow }
      ]
    },
    {
      label: "Airport",
      icon: Plane,
      number: dashboardStats.airport.today + dashboardStats.airport.tomorrow,
      color: "green",
      additionalItems: [
        { label: "Today's", value: dashboardStats.airport.today },
        { label: "Tomorrow", value: dashboardStats.airport.tomorrow }
      ]
    },
    {
      label: "Today's Reservations",
      icon: CheckCheck,
      number: 300,
      color: "orange",
      additionalItems: [
        { label: "New", value: dashboardStats.reservations.new },
        { label: "Cancelled", value: dashboardStats.reservations.cancelled },
        { label: "Done", value: dashboardStats.reservations.done },
        { label: "In Revision", value: dashboardStats.reservations.in_revision }
      ]
    },
    {
      label: "Car Movements",
      icon: CarIcon,
      number: dashboardStats.car.today + dashboardStats.car.tomorrow,
      color: "purple",
      additionalItems: [
        { label: "Today", value: dashboardStats.car.today },
        { label: "Tomorrow", value: dashboardStats.car.tomorrow }
      ]
    }
  ]

  return (
    <div className='space-y-8'>
      <section>
        <PageTitle label='Dashboard' />

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
          {stats.map((stat, index) => (
            <DashboardStatCard {...stat} key={`stat-${index}`} />
          ))}
        </div>
      </section>

      <section>
        <PageTitle label='Reservations' />
        <section className='grid xl:grid-cols-2 gap-4 grid-cols-1'>
          <SmallHotelReservationsTable status='new' headerLabel='New Reservations' headerBg='bg-blue-500' headerColor='text-white' reservations={newReservations} />
          <SmallHotelReservationsTable status='cancelled' headerLabel='Cancelled Reservations' headerBg='bg-red-500' headerColor='text-white' reservations={cancelledReservations} />
          <SmallHotelReservationsTable status='done' headerLabel='Done Reservations' headerBg='bg-green-500' headerColor='text-white' reservations={doneReservations} />
          <SmallHotelReservationsTable status='in_revision' headerLabel='In Revision Reservations' headerBg='bg-orange-500' headerColor='text-white' reservations={inRevisionReservations} />
        </section>
      </section>
    </div>
  )
}
