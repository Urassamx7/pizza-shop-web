import { api } from '@/lib/axios'

export type GetDailyRevenueResponse = {
  date: string
  revenue: number
}[]

export async function getDailyRevenue() {
  const response = await api.get<GetDailyRevenueResponse>(
    '/metrics/daily-revenue-in-period',
  )

  return response.data
}
