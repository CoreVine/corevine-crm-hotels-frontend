import { CreateCarReservationForm } from "../_components/create-form"
import { PageTitle } from "../../_components/title"
import { GoBack } from "../../_components/go-back"

export const metadata = {
  title: "Create Car Reservation"
}

export default function CreateCarReservationPage() {
  return (
    <div>
      <PageTitle label='Create Car Reservation'>
        <GoBack />
      </PageTitle>

      <CreateCarReservationForm />
    </div>
  )
}
