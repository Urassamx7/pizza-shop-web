import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { MetricsCardSkeleton } from '@/components/skeleton/metric-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

export function DayOrdersAmountCard() {
  const {
    data: dayOrdersAmount,
    isFetching: isLoadingDayOrdersAmount,
  } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  return (
    <Card>
      <CardHeader
        className="flex items-center justify-between pb-2 space-y-0"
      >
        <CardTitle
          className="text-base font-semibold"
        >Pedidos (dia)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isLoadingDayOrdersAmount && (
          <MetricsCardSkeleton />
        )}

        {dayOrdersAmount && (
          <>
            <span
              className="text-2xl font-bold tracking-tight"
            >
              {
                dayOrdersAmount.amount.toLocaleString('pt-MZ')
              }
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday >= 0
                ? (
                  <span
                    className="text-emerald-500 dark:text-emerald-400"
                  >+{dayOrdersAmount.diffFromYesterday}%
                  </span>)
                : (
                  <span
                    className="text-rose-500 dark:text-rose-400"
                  >{dayOrdersAmount.diffFromYesterday}%
                  </span>)} em relação ao dia anterior
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
