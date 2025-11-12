import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Invoice } from "@/types/models"

import { EmptyTableState } from "../../_components/empty-table"
import { DeleteModal } from "../../_components/delete-modal"
import { deleteInvoice, restoreInvoice } from "../_helpers/actions"
import { RestoreModal } from "../../_components/restore-modal"
import { LinkBtn } from "@/components/common/button-link"
import { Edit, Eye } from "lucide-react"
import { routes } from "@/lib/route"
import { diffForHumans } from "@/lib/utils"

type Props = {
  invoices: Invoice[]
}

export const InvoicesTable = ({ invoices }: Props) => {
  if (invoices.length === 0) return <EmptyTableState />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Proxy Name</TableHead>
          <TableHead>From1</TableHead>
          <TableHead>To1</TableHead>
          <TableHead>Reservation #</TableHead>
          <TableHead>Creation Date</TableHead>
          <TableHead>Nights Count</TableHead>
          <TableHead>From2</TableHead>
          <TableHead>To2</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Payment (EGP)</TableHead>
          <TableHead>Payment (SAR)</TableHead>
          <TableHead>Payment (USD)</TableHead>
          <TableHead>Collection (EGP)</TableHead>
          <TableHead>Collection (SAR)</TableHead>
          <TableHead>Collection (USD)</TableHead>
          <TableHead>Collection Link</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={`invoice-row-${invoice.id}`}>
            <TableCell className='font-bold'>{invoice.id}</TableCell>
            <TableCell>{invoice.agent?.name || "N/A"}</TableCell>
            <TableCell>{invoice.hotel?.name || "N/A"}</TableCell>
            <TableCell>{invoice.category?.name || "N/A"}</TableCell>
            <TableCell>{invoice.customer_name || "N/A"}</TableCell>
            <TableCell>{invoice.proxy_name || "N/A"}</TableCell>
            <TableCell>{invoice.from1 || "N/A"}</TableCell>
            <TableCell>{invoice.to1 || "N/A"}</TableCell>
            <TableCell>{invoice.reservation_number || "N/A"}</TableCell>
            <TableCell>{diffForHumans(invoice.creation_date) || "N/A"}</TableCell>
            <TableCell>{invoice.nights_count || "N/A"}</TableCell>

            <TableCell>{invoice?.from2 || "N/A"}</TableCell>
            <TableCell>{invoice?.to2 || "N/A"}</TableCell>

            <TableCell>{invoice?.amount || "N/A"}</TableCell>

            <TableCell>{invoice?.payment?.amount_egp || "N/A"}</TableCell>
            <TableCell>{invoice?.payment?.amount_sar || "N/A"}</TableCell>
            <TableCell>{invoice?.payment?.amount_usd || "N/A"}</TableCell>

            <TableCell>{invoice?.collection?.amount_egp || "N/A"}</TableCell>
            <TableCell>{invoice?.collection?.amount_sar || "N/A"}</TableCell>
            <TableCell>{invoice?.collection?.amount_usd || "N/A"}</TableCell>
            <TableCell>{invoice?.collection?.link || "N/A"}</TableCell>
            <TableCell className='space-x-2 max-w-[220px]'>
              {invoice.deleted_at ? (
                <RestoreModal action={restoreInvoice} id={invoice.id} />
              ) : (
                <>
                  <LinkBtn href={routes.invoices.show(invoice.id)} size='icon' variant='outline' icon={Eye} />
                  <LinkBtn href={routes.invoices.edit(invoice.id)} size='icon' variant='outline' icon={Edit} />
                  <DeleteModal action={deleteInvoice} id={invoice.id} />
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
