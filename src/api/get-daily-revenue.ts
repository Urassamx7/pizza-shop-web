import { api } from '@/lib/axios'

export type GetDailyRevenueResponse = {
  date: string
  revenue: number
}[]

interface GetDailyRevenueInPeriodQuery {
  from?: Date,
  to?: Date
}

export async function getDailyRevenue({ from, to }:GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDailyRevenueResponse>(
    '/metrics/daily-revenue-in-period',
    {
      params: {
        from, to,
      },
    },
  )

  return response.data
}
