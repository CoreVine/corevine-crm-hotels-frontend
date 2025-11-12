import { PageTitle } from "../../_components/title"
import { Metadata } from "next"

import { getHotel, getHotelEmails, getHotelRooms } from "../_helpers/actions"
import { HotelRooms } from "../_components/hotel-rooms"
import { HotelEmails } from "../_components/hotel-emails"

export const metadata: Metadata = {
  title: "Hotel Details"
}

type Props = {
  params: Promise<{ hotelId: string }>
}

export default async function ViewHotelPage({ params }: Props) {
  const { hotelId } = await params

  const hotel = await getHotel(+hotelId)
  const rooms = await getHotelRooms(+hotelId)
  const emails = await getHotelEmails(+hotelId)

  const pageTitle = (
    <span>
      Hotel - <b>{hotel.name}</b>
    </span>
  )

  return (
    <div className='space-y-2'>
      <PageTitle label={pageTitle} />
      <HotelRooms hotelName={hotel.name} rooms={rooms} />
      <HotelEmails hotelId={hotel.id} emails={emails} />
    </div>
  )
}
