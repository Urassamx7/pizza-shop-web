import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { MetricsCardSkeleton } from '@/components/skeleton/metric-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  return (
    <Card>
      <CardHeader
        className="flex items-center justify-between pb-2 space-y-0"
      >
        <CardTitle
          className="text-base font-semibold"
        >Pedidos (mês)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount
          ? (
            <>
              <span
                className="text-2xl font-bold tracking-tight"
              >
                {
                monthOrdersAmount.amount.toLocaleString('pt-MZ')
              }
              </span>
              <p className="text-xs text-muted-foreground">
                {monthOrdersAmount.diffFromLastMonth >= 0
                  ? (
                    <span
                      className="text-emerald-500 dark:text-emerald-400"
                    >+{monthOrdersAmount.diffFromLastMonth}%
                    </span>)
                  : (
                    <span
                      className="text-rose-500 dark:text-rose-400"
                    >{monthOrdersAmount.diffFromLastMonth}%
                    </span>)} em relação ao mês anterior
              </p>
            </>
            )
          : (
            <MetricsCardSkeleton />
            )}
      </CardContent>
    </Card>
  )
}
