import { api } from '@/lib/axios'

interface UpdateProfileReq {
  name: string,
  description: string | null
}

export async function updateProfile({ description, name }:UpdateProfileReq) {
  await api.put('/profile', { name, description })
}
