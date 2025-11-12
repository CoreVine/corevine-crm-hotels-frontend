import { getSingleCarReservation } from "../../_helpers/actions";
import { notFound } from "next/navigation";
import { PageTitle } from "../../../_components/title";
import { GoBack } from "../../../_components/go-back";
import { UpdateCarReservationForm } from "../../_components/update-form";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Update Car Reservation"
};

export default async function EditCarReservationPage({ params }: Props) {
  const { id } = await params;
  const carReservation = await getSingleCarReservation(+id);

  if (!carReservation) return notFound();

  return (
    <div>
      <PageTitle hasBB label='Update Car Reservation'>
        <GoBack />
      </PageTitle>

      <UpdateCarReservationForm reservation={carReservation} />
    </div>
  );
}
