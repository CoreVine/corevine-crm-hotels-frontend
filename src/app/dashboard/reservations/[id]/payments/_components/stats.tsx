"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ReservationPaymentStatistics } from "@/types"
import { TrendingUp, TrendingDown, DollarSign, Building2, Users, CreditCard } from "lucide-react"

type Props = {
  stats: ReservationPaymentStatistics
  currency?: string
}

export const ReservationPaymentStats = ({ stats, currency = "USD" }: Props) => {
  const formatCurrency = (amount: string) => {
    const numAmount = Number.parseFloat(amount)
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency
    }).format(numAmount)
  }

  return (
    <Card>
      <CardContent className='p-6'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          <div className='text-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2'>
              <TrendingUp className='h-4 w-4 text-green-600' />
            </div>
            <p className='text-xs text-muted-foreground'>Credit</p>
            <p className='text-lg font-bold text-green-600'>{formatCurrency(stats.total_credit)}</p>
          </div>

          <div className='text-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mx-auto mb-2'>
              <TrendingDown className='h-4 w-4 text-red-600' />
            </div>
            <p className='text-xs text-muted-foreground'>Debit</p>
            <p className='text-lg font-bold text-red-600'>{formatCurrency(stats.total_debit)}</p>
          </div>

          <div className='text-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2'>
              <CreditCard className='h-4 w-4 text-blue-600' />
            </div>
            <p className='text-xs text-muted-foreground'>Payment</p>
            <p className='text-lg font-bold text-blue-600'>{formatCurrency(stats.total_payment)}</p>
          </div>

          <div className='text-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2'>
              <DollarSign className='h-4 w-4 text-purple-600' />
            </div>
            <p className='text-xs text-muted-foreground'>Profit</p>
            <p className='text-lg font-bold text-purple-600'>{formatCurrency(stats.total_profit)}</p>
          </div>

          <div className='text-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-2'>
              <Building2 className='h-4 w-4 text-orange-600' />
            </div>
            <p className='text-xs text-muted-foreground'>Markup</p>
            <p className='text-lg font-bold text-orange-600'>{formatCurrency(stats.total_company_markup)}</p>
          </div>

          <div className='text-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full mx-auto mb-2'>
              <Users className='h-4 w-4 text-teal-600' />
            </div>
            <p className='text-xs text-muted-foreground'>Commission</p>
            <p className='text-lg font-bold text-teal-600'>{formatCurrency(stats.total_agent_commission)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
