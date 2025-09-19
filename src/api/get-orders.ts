import { api } from '@/lib/axios'

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
    totalCount: number | undefined;
  }
}

export async function getOrders():Promise<GetOrdersResponse> {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,

    },
  })

  return response.data
}
