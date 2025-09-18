/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BarChart } from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart, Pie,
  Tooltip,
  Cell,
} from 'recharts'
import colors from 'tailwindcss/colors'

const data = [
  { product: 'Pizza Margherita', amount: 123 },
  { product: 'Pizza Pepperoni', amount: 240 },
  { product: 'Pizza Quatro Queijos', amount: 92 },
  { product: 'Pizza Calabresa', amount: 100 },
  { product: 'Pizza Portuguesa', amount: 101 },
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle
            className="text-base font-medium "
          >Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>

            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={64}
              strokeWidth={8}
              label={(props) => {
                const {
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                } = props as any
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx
                      ? 'start'
                      : 'end'}
                    dominantBaseline="central"
                  >
                    {
                        data[index].product.length > 12
                          ? data[index].product
                              .substring(0, 12)
                              .concat('...')
                          : data[index].product
}
                    ({value})
                  </text>
                )
              }}
              labelLine={false}
            >
              {
                    data.map((_, index) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                          className="stroke-background hover: opacity-80"
                        />
                      )
                    })
                }
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
