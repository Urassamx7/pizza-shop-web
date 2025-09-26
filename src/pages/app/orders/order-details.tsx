/* eslint-disable @stylistic/jsx-closing-tag-location */
import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import { OrderDetailsSkeleton } from '@/components/skeleton/order-details'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }:OrderDetailsProps) {
  const { data: order, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>
          Descrição do pedido
        </DialogDescription>
      </DialogHeader>
      {isLoadingDetails && (<OrderDetailsSkeleton />)}
      {
        order && (<div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Status
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <OrderStatus status={order.status} />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Cliente
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer?.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  E-mail
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer?.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  {
                  formatDistanceToNow(order.createdAt,
                    { locale: ptBR, addSuffix: true })
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>

              {
                order.orderItems.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell> {product.product?.name}</TableCell>
                      <TableCell className="text-right">
                        {product.quantity}
                      </TableCell>
                      <TableCell className="text-right">{
                        (product.priceInCents / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'MZN',
                        })
                        }
                      </TableCell>
                      <TableCell className="text-right"> {
                        ((product.priceInCents * product.quantity) / 100)
                          .toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'MZN',
                          })
                        }
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>
                  Total do pedido
                </TableCell>
                <TableCell
                  className="text-right font-medium"
                >
                  {
                        (order.totalInCents / 100)
                          .toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'MZN',
                          })
                        }
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>)
      }
    </DialogContent>
  )
}
