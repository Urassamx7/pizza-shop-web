import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  return (
    <Card>
      <CardHeader
        className="flex items-center justify-between pb-2 space-y-0"
      >
        <CardTitle
          className="text-base font-semibold"
        >Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span
              className="text-2xl font-bold tracking-tight"
            >
              {
                (monthRevenue.revenue / 100).toLocaleString('pt-PT', {
                  style: 'currency',
                  currency: 'MZN',
                })
              }
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0
                ? (
                  <span
                    className="text-emerald-500 dark:text-emerald-400"
                  >+{monthRevenue.diffFromLastMonth}%
                  </span>)
                : (
                  <span
                    className="text-rose-500 dark:text-rose-400"
                  >{monthRevenue.diffFromLastMonth}%
                  </span>)} em relação ao mês anterior
            </p>
          </>
        )}

      </CardContent>
    </Card>
  )
}
