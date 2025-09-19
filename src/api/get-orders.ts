import { api } from '@/lib/axios'

export interface GetoOrdersQuery {
  pageIndex?: number | null;
  perPage?: number;
  status?: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled';
}

interface GetOrdersResponse {
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

export async function getOrders({ pageIndex }:GetoOrdersQuery):Promise<GetOrdersResponse> {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,

    },
  })

  return response.data
}
