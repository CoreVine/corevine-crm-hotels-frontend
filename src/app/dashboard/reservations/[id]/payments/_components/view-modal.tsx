"use client"

import type { ReservationPayment } from "@/types/models"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Calendar, User, Building2, CreditCard, FileText, Paperclip } from "lucide-react"

type Props = {
  payment: ReservationPayment
}

export const ViewReservationPaymentModal = ({ payment }: Props) => {
  const formatCurrency = (amount: number, currencyCode?: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode || "USD"
    }).format(amount)
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <Eye className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl min-w-7xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <CreditCard className='h-5 w-5' />
            Payment Details - Reservation #{payment.reservation_id}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Payment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                <Building2 className='h-4 w-4' />
                Payment Overview
              </CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Payment ID</p>
                <p className='font-semibold'>#{payment.id}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Collection Type</p>
                <Badge variant='secondary'>{payment.collection_type}</Badge>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Date</p>
                <p className='flex items-center gap-1'>
                  <Calendar className='h-3 w-3' />
                  {formatDate(payment.date)}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Collector</p>
                <p className='flex items-center gap-1'>
                  <User className='h-3 w-3' />
                  {payment.collector_name}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Currency</p>
                <p className='font-medium'>
                  {payment.currency?.name} ({payment.currency?.code})
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Category</p>
                <Badge variant={payment.category?.type === "revenue" ? "default" : "destructive"}>{payment.category?.name}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Financial Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200'>
                    <span className='font-medium text-green-800'>Credit</span>
                    <span className='font-bold text-green-800 text-lg'>{formatCurrency(payment.credit, payment.currency?.code)}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200'>
                    <span className='font-medium text-red-800'>Debit</span>
                    <span className='font-bold text-red-800 text-lg'>{formatCurrency(payment.debit, payment.currency?.code)}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200'>
                    <span className='font-medium text-blue-800'>Total Payment</span>
                    <span className='font-bold text-blue-800 text-lg'>{formatCurrency(payment.payment, payment.currency?.code)}</span>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200'>
                    <span className='font-medium text-purple-800'>Profit</span>
                    <span className='font-bold text-purple-800 text-lg'>{formatCurrency(payment.profit, payment.currency?.code)}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200'>
                    <span className='font-medium text-orange-800'>Company Markup</span>
                    <span className='font-bold text-orange-800'>{formatCurrency(payment.company_markup, payment.currency?.code)}</span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200'>
                    <span className='font-medium text-teal-800'>Agent Commission</span>
                    <span className='font-bold text-teal-800'>{formatCurrency(payment.agent_commission, payment.currency?.code)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservation Details */}
          {payment.reservation && (
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Reservation Information</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Client</p>
                  <p className='font-medium'>{payment.reservation.client?.name || "N/A"}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Agent</p>
                  <p className='font-medium'>{payment.reservation.agent?.name || "N/A"}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Reservation Date</p>
                  <p>{formatDate(payment.reservation.reservation_date)}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Services</p>
                  <div className='flex gap-1 flex-wrap'>
                    {payment.reservation.has_hotel && <Badge variant='outline'>Hotel</Badge>}
                    {payment.reservation.has_car && <Badge variant='outline'>Car</Badge>}
                    {payment.reservation.has_airport && <Badge variant='outline'>Airport</Badge>}
                  </div>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-muted-foreground'>Email Status</p>
                  <Badge variant={payment.reservation.has_sent_email ? "default" : "secondary"}>{payment.reservation.has_sent_email ? "Sent" : "Not Sent"}</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {payment.statement && (
                <div className='space-y-2'>
                  <p className='text-sm font-medium text-muted-foreground flex items-center gap-1'>
                    <FileText className='h-3 w-3' />
                    Statement
                  </p>
                  <p className='text-sm bg-muted p-3 rounded-md'>{payment.statement}</p>
                </div>
              )}

              {payment.notes && (
                <div className='space-y-2'>
                  <p className='text-sm font-medium text-muted-foreground'>Notes</p>
                  <p className='text-sm bg-muted p-3 rounded-md'>{payment.notes}</p>
                </div>
              )}

              {payment.attachment && (
                <div className='space-y-2'>
                  <p className='text-sm font-medium text-muted-foreground flex items-center gap-1'>
                    <Paperclip className='h-3 w-3' />
                    Attachment
                  </p>
                  <Button variant='outline' size='sm' asChild>
                    <a href={payment.attachment} target='_blank' rel='noopener noreferrer'>
                      View Attachment
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Record Information</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Created At</p>
                <p className='text-sm'>{formatDate(payment.created_at)}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>Last Updated</p>
                <p className='text-sm'>{formatDate(payment.updated_at)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
