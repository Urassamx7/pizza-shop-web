import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  status?: string | null
  customerName?: string | null
}

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled';
    total: number;
    customerName: string;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  }
}

export async function getOrders({ pageIndex, orderId, status, customerName }:GetOrdersQuery):Promise<GetOrdersResponse> {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      customerName,
      pageIndex,
      orderId,
      status,
    },
  })

  return response.data
}
