import { routes } from "@/lib/route";
import {
  BedIcon,
  Building,
  CarIcon,
  CheckCheck,
  DollarSign,
  Globe,
  PercentDiamond,
  PizzaIcon,
  PlaneIcon,
  Plus,
  User,
  UserCog,
  Waves
} from "lucide-react";

export const shortcuts = [
  { label: "Clients", icon: User, href: routes.clients.index },
  { label: "Reservations", icon: CheckCheck, href: routes.reservations.index },
  { label: "New Reservation", icon: Plus, href: routes.reservations.create },
  { label: "Rooms", icon: BedIcon, href: routes.rooms.index },
  { label: "Hotels", icon: Building, href: routes.hotels.index },
  { label: "Available Cities", icon: Globe, href: routes.cities.index },
  { label: "Car Movements", icon: CarIcon, href: routes.carReservations.index },
  { label: "Airport Orders", icon: PlaneIcon, href: routes.airportReservations.index },
  { label: "Drivers", icon: UserCog, href: routes.drivers.index },
  { label: "Meals", icon: PizzaIcon, href: routes.meals.index },
  { label: "Rates", icon: PercentDiamond, href: routes.rates.index },
  { label: "Payment Types", icon: DollarSign, href: routes.paymentTypes.index }
];
