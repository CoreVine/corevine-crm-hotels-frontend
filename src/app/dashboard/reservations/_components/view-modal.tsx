"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Hotel,
  User,
  CalendarDays,
  DollarSign,
  MapPin,
  Utensils,
  Users,
  BadgeCheck,
  CreditCard,
  LucideIcon,
  Eye,
  Bed,
  Plane,
  Car,
  Building
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HotelReservation } from "@/types/models"

interface ReservationDetailsModalProps {
  reservation: HotelReservation
  triggerText?: string
}

export const HotelReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  reservation,
  triggerText = "View Details"
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const StatusBadge = ({ status }: { status: string }) => {
    return (
      <Badge
        className={`${"bg-gray-100 text-gray-800"} inline-flex items-center px-2.5 py-0.5 rounded-full`}
      >
        {status}
      </Badge>
    )
  }

  const DetailRow = ({
    icon: Icon,
    label,
    value,
    badge = null
  }: {
    icon: LucideIcon
    label: string
    value: string
    badge?: string | null
  }) => (
    <div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors'>
      <div className='bg-blue-100 p-2 rounded-full'>
        <Icon className='w-5 h-5 text-blue-600' />
      </div>
      <div className='flex-1'>
        <p className='text-sm font-medium text-gray-600'>{label}</p>
        <div className='flex items-center space-x-2'>
          <p className='text-base font-semibold text-gray-800'>{value}</p>
          {badge && <StatusBadge status={badge} />}
        </div>
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon' icon={Eye} />
      </DialogTrigger>
      <DialogContent className='max-w-7xl bg-white rounded-2xl shadow-2xl min-w-[760px] max-h-[500px] overflow-y-auto'>
        <DialogHeader className='border-b pb-4'>
          <DialogTitle className='text-2xl font-bold text-gray-800 flex items-center'>
            <BadgeCheck className='mr-3 text-green-600' />
            Reservation Details
          </DialogTitle>
        </DialogHeader>

        <div className='grid md:grid-cols-2 gap-6 p-2'>
          {/* Reservation Overview */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-gray-700 mb-3 border-b pb-2'>
              Reservation Information
            </h3>
            <DetailRow
              icon={User}
              label='Client Name'
              value={reservation?.reservation?.client?.name}
            />
            <DetailRow
              icon={CreditCard}
              label='Reservation ID'
              value={reservation?.reservation_id.toString()}
            />
            <DetailRow icon={Eye} label='View' value={reservation?.view} />
            <DetailRow icon={Bed} label='Room Count' value={reservation?.rooms_count.toString()} />
            <DetailRow
              icon={CalendarDays}
              label='Option Date'
              value={formatDate(reservation?.option_date).toString()}
            />
            <DetailRow
              icon={CalendarDays}
              label='Check-in'
              value={formatDate(reservation?.check_in).toString()}
            />
            <DetailRow
              icon={CalendarDays}
              label='Check-out'
              value={formatDate(reservation?.check_out).toString()}
            />
            <DetailRow icon={DollarSign} label='Total Price' value={`$${reservation?.price}`} />
            <DetailRow
              icon={BadgeCheck}
              label='Status'
              value={reservation?.status}
              badge={reservation?.status}
            />
          </div>

          {/* Hotel & Guest Details */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-gray-700 mb-3 border-b pb-2'>
              Hotel & Guest Information
            </h3>
            <DetailRow icon={Hotel} label='Hotel' value={reservation?.hotel?.name} />
            <DetailRow icon={MapPin} label='City' value={reservation?.city?.name} />
            <DetailRow
              icon={Users}
              label='Guests'
              value={`${reservation?.adults} Adults, ${reservation?.children} Children`}
            />
            <DetailRow icon={Bed} label='Room Type' value={reservation?.room?.room_type} />
            <DetailRow icon={Utensils} label='Meal Plan' value={reservation?.meal?.meal_type} />
            <DetailRow icon={Building} label='Company' value={reservation?.company?.name} />
            <DetailRow
              icon={Plane}
              label='Airport Status'
              value={reservation?.reservation?.has_airport ? "Yes" : "No"}
            />
            <DetailRow
              icon={Car}
              label='Car Status'
              value={reservation?.reservation?.has_car ? "Yes" : "No"}
            />
            <DetailRow
              icon={DollarSign}
              label='Payment Type'
              value={reservation?.payment_type?.name ?? "N/A"}
            />

            <DetailRow icon={DollarSign} label='Price' value={reservation?.price?.toString()} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
