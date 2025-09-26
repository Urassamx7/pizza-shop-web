/* eslint-disable @stylistic/jsx-props-no-multi-spaces */
import { getDailyRevenue } from '@/api/get-daily-revenue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
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
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period'],
    queryFn: getDailyRevenue,
  })

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
      </CardHeader>
      <CardContent>
        {
          dailyRevenueInPeriod && (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart

                data={dailyRevenueInPeriod}
                style={{ fontSize: 12 }}
              >
                <YAxis
                  axisLine={false}
                  stroke="#888"
                  tickLine={false}
                  tickFormatter={
                    (value: number) => (value / 100).toLocaleString('pt-PT', {
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
        }
      </CardContent>
    </Card>
  )
}
