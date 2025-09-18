import { api } from '@/lib/axios'

export interface SignInBodyProps {
  email: string
}

export async function signIn({ email }:SignInBodyProps):Promise<void> {
  await api.post('/authenticate', { email })
}
