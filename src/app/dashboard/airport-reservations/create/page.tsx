import { PageTitle } from "../../_components/title"
import { GoBack } from "../../_components/go-back"
import { CreateAirportReservationForm } from "../_components/create-form"

export const metadata = {
  title: "Create Airport Reservation"
}

export default function CreateAirportReservationPage() {
  return (
    <div>
      <PageTitle label='Create Airport Reservation'>
        <GoBack />
      </PageTitle>

      <CreateAirportReservationForm />
    </div>
  )
}
