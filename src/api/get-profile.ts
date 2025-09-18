import { api } from '@/lib/axios'

interface GetProfileResponse {
  email: string;
  phone: string | null;
  id: string;
  name: string;
  role: 'manager' | 'customer';
  createdAt: Date;
  updatedAt: Date;
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}
