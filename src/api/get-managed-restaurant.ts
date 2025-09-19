import { api } from '@/lib/axios'

export interface GetManagetRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  managerId: string | null;
  description: string | null;
}

export async function getManagedRestaurant(): Promise<GetManagetRestaurantResponse> {
  const response = await api.get<GetManagetRestaurantResponse>('/managed-restaurant')

  return response.data
}
