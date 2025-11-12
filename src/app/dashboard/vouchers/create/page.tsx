import { Metadata } from "next"
import { PageTitle } from "../../_components/title"
import { CreateVoucherForm } from "../_components/create/create-form"

export const metadata: Metadata = {
  title: "Create Voucher",
  description: "Create a new Voucher"
}

export default function CreateVoucherPage() {
  return (
    <div>
      <PageTitle label='Create Voucher' />
      <CreateVoucherForm />
    </div>
  )
}
