import {
  Table,
  TableBody, TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { OrderTableRow } from './table/row'
import { OrderTableFilters } from './table/filters'
import { Pagination } from '@/components/pagination'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/api/get-orders'
import { useSearchParams } from 'react-router-dom'
import z from 'zod'
import { OrdersTableSkeleton } from '@/components/skeleton/order-table'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')
  const pageIndex = z.coerce.number()
    .transform(page => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({
      customerName,
      pageIndex,
      orderId,
      status: status === 'all'
        ? null
        : status,
    }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams(url => {
      url.set('page', String(pageIndex + 1))

      return url
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight ">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]" />
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total de pedidos</TableHead>
                  <TableHead className="w-[164px]" />
                  <TableHead className="w-[132px]" />
                </TableRow>
              </TableHeader>
              <TableBody>

                {
                  isLoadingOrders && (
                    <OrdersTableSkeleton />
                  )
                }

                {
               result && result.orders.map((order) => {
                 return (
                   <OrderTableRow key={order.orderId} order={order} />
                 )
               })
             }
              </TableBody>
            </Table>
          </div>
          {result &&
            <Pagination
              pageIndex={result.meta.pageIndex}
              perPage={result.meta.perPage}
              totalCount={result.meta.totalCount}
              onPageChange={handlePaginate}
            />}
        </div>
      </div>
    </>
  )
}
