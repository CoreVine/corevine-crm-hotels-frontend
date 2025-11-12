import { PageTitle } from "@/app/dashboard/_components/title";
import { Metadata } from "next";
import { UpdateReservationForm } from "../../_components/update/update-form";
import { notFound } from "next/navigation";
import { getSingleReservation } from "../../_helpers/actions";

export const metadata: Metadata = {
  title: "Update Reservation",
  description: "Update a reservation"
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CreateReservationPage({ params }: Props) {
  const { id } = await params;

  const reservation = await getSingleReservation(+id);
  if (!reservation) return notFound();

  return (
    <div>
      <PageTitle label='Update Reservation' />
      <UpdateReservationForm reservation={reservation} />
    </div>
  );
}
