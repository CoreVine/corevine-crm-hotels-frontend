import { routes } from "@/lib/route"
import { HomeIcon, UsersIcon, CalendarIcon, BedIcon, CarIcon, PlaneIcon, CreditCardIcon, Cog } from "lucide-react"

export const sidebarGroups = [
  {
    name: "Application",
    items: [
      {
        title: "Dashboard",
        icon: HomeIcon,
        href: routes.home
      },

      {
        title: "Clients",
        icon: UsersIcon,
        href: routes.clients.index
      }
    ]
  },
  {
    name: "Reservations",
    items: [
      {
        title: "Reservations",
        icon: CalendarIcon,
        href: routes.reservations.index,
        items: [
          { label: "New", href: routes.reservations.indexWithStatus("new") },
          { label: "In Revision", href: routes.reservations.indexWithStatus("in_revision") },
          { label: "Confirmed", href: routes.reservations.indexWithStatus("confirmed") },
          { label: "Cancelled", href: routes.reservations.indexWithStatus("cancelled") },
          { label: "Refunded", href: routes.reservations.indexWithStatus("refunded") },
          { label: "Guranteed", href: routes.reservations.indexWithStatus("guaranteed") },
          { label: "My Reservations", href: routes.reservations.mine }
        ]
      },
      {
        title: "Room Requests",
        icon: BedIcon,
        href: routes.hotelReservations.index,
        items: [
          { label: "History", href: routes.hotelReservations.history },
          {
            label: "Confirmed",
            href: routes.hotelReservations.indexWithStatus("confirmed")
          },
          {
            label: "Cancelled",
            href: routes.hotelReservations.indexWithStatus("cancelled")
          },
          {
            label: "Refunded",
            href: routes.hotelReservations.indexWithStatus("refunded")
          }
        ]
      },
      {
        title: "Car Movements",
        icon: CarIcon,
        href: routes.carReservations.index,
        items: [
          { label: "History", href: routes.carReservations.history },
          { label: "All", href: routes.carReservations.index },
          {
            label: "Pending",
            href: routes.carReservations.indexWithStatus("pending")
          },
          {
            label: "Done",
            href: routes.carReservations.indexWithStatus("done")
          },
          {
            label: "Cancelled",
            href: routes.carReservations.indexWithStatus("cancelled")
          }
        ]
      },
      {
        title: "Airport Orders",
        icon: PlaneIcon,
        href: routes.airportReservations.index,
        items: [
          { label: "History", href: routes.airportReservations.history },
          { label: "All Airport Orders", href: routes.airportReservations.index },
          {
            label: "Pending",
            href: routes.airportReservations.indexWithStatus("pending")
          },
          {
            label: "Done",
            href: routes.airportReservations.indexWithStatus("done")
          },
          {
            label: "Cancelled",
            href: routes.airportReservations.indexWithStatus("cancelled")
          }
        ]
      },
      {
        title: "Vouchers",
        icon: CreditCardIcon,
        href: routes.vouchers.index
      }
    ]
  }
]

export const managementGroup = {
  name: "Management",
  items: [
    {
      title: "Settings",
      icon: Cog,
      href: routes.settings,
      items: [
        { label: "Invoices", href: routes.invoices.index },
        { label: "Cars", href: routes.cars.index },
        { label: "Agents", href: routes.agents.index },
        { label: "Drivers", href: routes.drivers.index },
        { label: "Companies", href: routes.companies.index },
        { label: "Categories", href: routes.categories.index },
        { label: "Currencies", href: routes.currencies.index },
        { label: "Meals", href: routes.meals.index },
        { label: "Rooms", href: routes.rooms.index },
        { label: "Cities", href: routes.cities.index },
        { label: "Hotels", href: routes.hotels.index },
        { label: "Rates", href: routes.rates.index },
        { label: "Payment Types", href: routes.paymentTypes.index },
        { label: "Expenses", href: routes.expenses.index }
      ]
    }
  ]
}
