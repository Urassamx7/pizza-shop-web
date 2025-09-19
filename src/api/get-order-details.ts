import { api } from '@/lib/axios'

interface GetOrderDetailsParams {
  orderId: string
}

interface GetOrderDetailsResponse {
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled';
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  } | null;
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    } | null;
  }[];
}

export async function getOrderDetails({ orderId }:GetOrderDetailsParams): Promise<GetOrderDetailsResponse> {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
