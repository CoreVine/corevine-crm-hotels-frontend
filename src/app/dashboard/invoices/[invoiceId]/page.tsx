import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard, Hotel, User } from "lucide-react"
import { PageTitle } from "../../_components/title"

import { diffForHumans } from "@/lib/utils"
import { getInvoice } from "../_helpers/actions"
import { Metadata } from "next"

type Props = {
  params: Promise<{ invoiceId: string }>
}

export const metadata: Metadata = {
  title: "Invoice Details"
}

export default async function InvoiceView({ params }: Props) {
  const { invoiceId } = await params
  const invoice = await getInvoice(+invoiceId)

  return (
    <div>
      <PageTitle label='Invoice Details' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
            <CardDescription>Basic information about this invoice</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Invoice ID</p>
                <p className='font-medium'>{invoice.id}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Amount</p>
                <p className='font-medium'>${invoice.amount}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Creation Date</p>
                <p className='font-medium'>{diffForHumans(invoice.creation_date)}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Nights</p>
                <p className='font-medium'>{invoice.nights_count}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Customer</p>
                <p className='font-medium'>{invoice.customer_name}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Proxy</p>
                <p className='font-medium'>{invoice.proxy_name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stay Periods */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Calendar className='h-5 w-5' />
              Stay Periods
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-medium mb-2'>First Period</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-muted-foreground'>From</p>
                  <p className='font-medium'>{invoice.from1.toString()}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>To</p>
                  <p className='font-medium'>{invoice.to1.toString()}</p>
                </div>
              </div>
            </div>

            {invoice.from2 && invoice.to2 && (
              <div>
                <h3 className='font-medium mb-2'>Second Period</h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>From</p>
                    <p className='font-medium'>{invoice.from2}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>To</p>
                    <p className='font-medium'>{invoice.to2}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Agent Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Agent Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div>
                <p className='text-sm text-muted-foreground'>Name</p>
                <p className='font-medium'>{invoice.agent.name}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Email</p>
                <p className='font-medium'>{invoice.agent.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Hotel className='h-5 w-5' />
              Hotel Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div>
                <p className='text-sm text-muted-foreground'>Name</p>
                <p className='font-medium'>{invoice.hotel.name}</p>
              </div>

              <div>
                <p className='text-sm text-muted-foreground'>Hotel Phone</p>
                <p className='font-medium'>{invoice.hotel.phone_number}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Category</p>
                <p className='font-medium'>{invoice.category.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CreditCard className='h-5 w-5' />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Collection Details */}
              <div>
                <h3 className='font-medium mb-4'>Collection Details</h3>
                <div className='space-y-3'>
                  <div className='grid grid-cols-2 gap-2'>
                    <p className='text-sm text-muted-foreground'>Amount (EGP)</p>
                    <p className='font-medium'>{invoice.collection.amount_egp}</p>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <p className='text-sm text-muted-foreground'>Amount (SAR)</p>
                    <p className='font-medium'>{invoice.collection.amount_sar}</p>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <p className='text-sm text-muted-foreground'>Amount (USD)</p>
                    <p className='font-medium'>${invoice.collection.amount_usd}</p>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <p className='text-sm text-muted-foreground'>Payment Link</p>
                    <p className='font-medium'>{invoice.collection.link}</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className='font-medium mb-4'>Payment Details</h3>
                <div className='space-y-3'>
                  <div className='grid grid-cols-2 gap-2'>
                    <p className='text-sm text-muted-foreground'>Amount (EGP)</p>
                    <p className='font-medium'>{invoice.payment.amount_egp}</p>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <p className='text-sm text-muted-foreground'>Amount (SAR)</p>
                    <p className='font-medium'>{invoice.payment.amount_sar}</p>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <p className='text-sm text-muted-foreground'>Amount (USD)</p>
                    <p className='font-medium'>${invoice.payment.amount_usd}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mt-6 text-sm text-muted-foreground'>
        <p>
          Created: {diffForHumans(invoice.creation_date)} • Last Updated: {diffForHumans(invoice.updated_at)}
        </p>
      </div>
    </div>
  )
}
