/* eslint-disable @stylistic/max-len */
import { api } from '@/lib/axios'

export interface RegisterRestaurantBodyProps {
  email: string
  managerName: string
  phone: string
  restaurantName: string
}

export async function registerRestaurant({ email, managerName, phone, restaurantName }:RegisterRestaurantBodyProps):Promise<void> {
  await api.post('/restaurants', { email, restaurantName, managerName, phone })
}
