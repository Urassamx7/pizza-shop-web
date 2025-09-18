/* eslint-disable @stylistic/jsx-props-no-multi-spaces */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 1500 },
  { date: '12/12', revenue: 400 },
  { date: '13/12', revenue: 1700 },
  { date: '14/12', revenue: 1100 },
  { date: '15/12', revenue: 1600 },
  { date: '16/12', revenue: 2000 },
]

export function RevenueChart() {
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
        <ResponsiveContainer width="100%" height={240}>
          <LineChart

            data={data}
            style={{ fontSize: 12 }}
          >
            <YAxis
              axisLine={false}
              stroke="#888"
              tickLine={false}
              tickFormatter={(value: number) => value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
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
      </CardContent>
    </Card>
  )
}
