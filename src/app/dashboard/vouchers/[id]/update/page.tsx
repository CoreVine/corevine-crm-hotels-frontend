import { PageTitle } from "@/app/dashboard/_components/title"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSingleVoucher } from "../../_helpers/actions"
import { UpdateVoucherForm } from "../../_components/update/update-form"

export const metadata: Metadata = {
  title: "Update Voucher",
  description: "Update a Voucher"
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function UpdateVoucherPage({ params }: Props) {
  const { id } = await params
  const voucher = await getSingleVoucher(+id)

  if (!voucher) return notFound()

  return (
    <div>
      <PageTitle label='Update Voucher' />
      <UpdateVoucherForm voucher={voucher} />
    </div>
  )
}
