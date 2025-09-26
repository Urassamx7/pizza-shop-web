import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableRow, TableCell } from '@/components/ui/table'
import { Search, ArrowRight, X } from 'lucide-react'
import { OrderDetails } from '../order-details'
import { OrderStatus, type OrderStatusType } from '@/components/order-status'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { approveOrder } from '@/api/approve-order'
import { dispatchOrder } from '@/api/dispatch'
import { deliverOrder } from '@/api/deliver'

interface OrderTableRowProps {
  order:{
    orderId: string;
    createdAt: string;
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled';
    total: number;
    customerName: string;
  }
}

export function OrderTableRow({ order }:OrderTableRowProps) {
  const queryClient = new QueryClient()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCached.forEach(([cacheKey, cachedData]) => {
      if (!cachedData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cachedData,
        orders: cachedData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        },
        ),
      })
    })
  }

  const {
    mutateAsync: approveOrderFn,
    isPending: isAprrovingOrder,
  } = useMutation({
    mutationFn: approveOrder,
    async  onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    },

  })

  const {
    mutateAsync: cancelOrderFn,
    isPending: iscancelingOrder,
  } = useMutation({
    mutationFn: cancelOrder,
    async  onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'canceled')
    },

  })

  const { mutateAsync: deliverOrderFn } = useMutation({
    mutationFn: deliverOrder,
    async  onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivered')
    },

  })

  const {
    mutateAsync: dispatchOrderFn,
    isPending: isDispatchingOrder,
  } = useMutation({
    mutationFn: dispatchOrder,
    async  onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
    },

  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="w-3 h-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>

      </TableCell>

      <TableCell
        className="font-mono text-xs font-medium"
      >{order.orderId}
      </TableCell>
      <TableCell
        className="text-muted-foreground"
      >{formatDistanceToNow(order.createdAt, { locale: ptBR, addSuffix: true })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">
        {order.customerName}
      </TableCell>
      <TableCell className="font-medium">
        {
          (order.total / 100).toLocaleString('pt-PT', {
            style: 'currency',
            currency: 'MZN',
          })
        }

      </TableCell>
      <TableCell>

        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isAprrovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}

      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={!['pending', 'processing'].includes(order.status) ||
            iscancelingOrder}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
