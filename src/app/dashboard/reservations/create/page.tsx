import { Metadata } from "next";
import { PageTitle } from "../../_components/title";
import { CreateReservationForm } from "../_components/create/create-form";

export const metadata: Metadata = {
  title: "Create Reservation",
  description: "Create a new reservation"
};

export default function CreateReservationPage() {
  return (
    <div>
      <PageTitle label='Create Reservation' />
      <CreateReservationForm />
    </div>
  );
}
