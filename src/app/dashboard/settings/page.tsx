import Link from "next/link"

import { Users, Building2, Utensils, DoorOpen, MapPin, Hotel, DollarSign, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { routes } from "@/lib/route"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure application settings, business information, and user permissions"
}

export default async function SettingsPage() {
  const settingsCategories = [
    {
      title: "Drivers",
      description: "Manage driver profiles, licenses, and availability",
      icon: <Users className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    },
    {
      title: "Companies",
      description: "Add and edit company information and business accounts",
      icon: <Building2 className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    },
    {
      title: "Meals",
      description: "Configure meal options, dietary preferences, and pricing",
      icon: <Utensils className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    },
    {
      title: "Rooms",
      description: "Set up room types, amenities, and availability",
      icon: <DoorOpen className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    },
    {
      title: "Cities",
      description: "Add and manage service locations and coverage areas",
      icon: <MapPin className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    },
    {
      title: "Hotels",
      description: "Configure partner hotels, accommodations, and facilities",
      icon: <Hotel className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    },
    {
      title: "Rates",
      description: "Set pricing structures, seasonal rates, and special offers",
      icon: <DollarSign className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    },
    {
      title: "Payment Types",
      description: "Manage accepted payment methods and processing options",
      icon: <CreditCard className='h-8 w-8 text-primary' />,
      href: routes.hotels.index
    }
  ]

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Settings' />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {settingsCategories.map((category, index) => (
          <Link key={index} href={category.href}>
            <Card className='hover:shadow-md transition-shadow cursor-pointer'>
              <CardHeader className='flex flex-row items-center gap-4 pb-2'>
                {category.icon}
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-sm'>{category.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
