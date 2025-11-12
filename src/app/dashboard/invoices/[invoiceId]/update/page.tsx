import { UpdateInvoiceForm } from "../../_components/update"
import { PageTitle } from "@/app/dashboard/_components/title"

import { getInvoice } from "../../_helpers/actions"
import { GoBack } from "@/app/dashboard/_components/go-back"

type Props = {
  params: Promise<{ invoiceId: string }>
}

export default async function UpdateInvoicePage({ params }: Props) {
  const { invoiceId } = await params

  const invoice = await getInvoice(+invoiceId)

  return (
    <div>
      <PageTitle label={`Update Invoice - ${invoice.id}`}>
        <GoBack />
      </PageTitle>
      <UpdateInvoiceForm invoice={invoice} />
    </div>
  )
}
