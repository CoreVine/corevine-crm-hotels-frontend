import { notFound } from "next/navigation";
import { PageTitle } from "../../../_components/title";
import { GoBack } from "../../../_components/go-back";
import { Metadata } from "next";
import { getSingleAirportReservation } from "../../_helpers/actions";
import { UpdateAirportReservationForm } from "../../_components/update-form";

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
  const airportReservation = await getSingleAirportReservation(+id);

  if (!airportReservation) return notFound();

  return (
    <div>
      <PageTitle hasBB label='Update Airport Reservation'>
        <GoBack />
      </PageTitle>

      <UpdateAirportReservationForm reservation={airportReservation} />
    </div>
  );
}
