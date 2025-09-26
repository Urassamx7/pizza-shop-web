/* eslint-disable @stylistic/jsx-props-no-multi-spaces */
import { getDailyRevenue } from '@/api/get-daily-revenue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from 'recharts'
import colors from 'tailwindcss/colors'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () => getDailyRevenue({
      from: dateRange?.from,
      to: dateRange?.to,
    }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map(chartItem => {
      return {
        date: chartItem.date,
        revenue: chartItem.revenue / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle
            className="text-base font-medium "
          >Receita no período
          </CardTitle>
          <CardDescription> Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>
            Período
          </Label>

          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        {
          chartData
            ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart

                  data={chartData}
                  style={{ fontSize: 12 }}
                >
                  <YAxis
                    axisLine={false}
                    stroke="#888"
                    tickLine={false}
                    tickFormatter={
                    (value: number) => value.toLocaleString('pt-PT', {
                      style: 'currency',
                      currency: 'MZN',
                    })
}
                    width={80}
                  />

                  <XAxis
                    axisLine={false}
                    dataKey="date"
                    dy={16}
                    tickLine={false}
                  />

                  <CartesianGrid vertical={false} className="stroke-muted" />

                  <Line
                    type="linear"
                    strokeWidth={2}
                    dataKey="revenue"
                    stroke={colors.violet[500]}
                  />

                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
              )
            : (
              <div
                className="flex h-[240px] w-full items-center justify-center"
              >
                <Loader2
                  className="h-8 w-8 text-muted-foreground animate-spin"
                />
              </div>
              )
        }
      </CardContent>
    </Card>
  )
}
