"use client"

import { deleteHotelEmail } from "../_helpers/actions"

import { CreateHotelEmailModal } from "./create-email"
import { UpdateHotelEmailModal } from "./update-email"
import { EmptyTableState } from "../../_components/empty-table"
import { DeleteModal } from "../../_components/delete-modal"
import { HotelEmail } from "@/types/models"

type Props = {
  emails: HotelEmail[]
  hotelId: number
}

export const HotelEmails = ({ emails, hotelId }: Props) => {
  return (
    <div className='p-4 rounded-md border'>
      <div className='flex gap-2 items-center justify-between mb-4'>
        <h2 className='font-medium text-lg'>Hotel Emails</h2>
        <CreateHotelEmailModal hotelId={hotelId} />
      </div>

      {emails.length === 0 && <EmptyTableState />}

      <div className='divide-y space-y-2'>
        {emails.map((email) => (
          <div key={`single-email-${email.id}`} className='py-1 flex items-center justify-between border px-4 rounded-md'>
            <div>{email.email}</div>
            <div className='flex gap-2 items-center'>
              <UpdateHotelEmailModal email={email} />
              <DeleteModal id={email.id} action={deleteHotelEmail} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
