import { Metadata } from "next"
import { PageTitle } from "../../_components/title"
import { CreateInvoiceForm } from "../_components/create"

export const metadata: Metadata = {
  title: "Create Invoice"
}

export default function CreateInvoicePage() {
  return (
    <div>
      <PageTitle label='Create New Invoice' />
      <CreateInvoiceForm />
    </div>
  )
}
